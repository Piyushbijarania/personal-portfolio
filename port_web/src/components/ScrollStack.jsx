import { useLayoutEffect, useRef, useCallback } from "react";


export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  // No scrollerRef, global scroll only
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const lastScrollYRef = useRef(window.scrollY);
  const SCROLL_THRESHOLD = 2; // Only update if scroll changes by 2px or more

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const endElement = document.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? endElement.getBoundingClientRect().top + window.scrollY : 0;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    // 1. Batch all DOM reads first
    const cardLayouts = cardsRef.current.map((card, i) => {
      if (!card) return null;
      const cardRect = card.getBoundingClientRect();
      const cardTop = cardRect.top + window.scrollY;
      return { card, cardTop, i };
    });

    // 2. Compute all transforms
    const transforms = cardLayouts.map((layout, i) => {
      if (!layout) return null;
      const { card, cardTop } = layout;
      const triggerStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * i);
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + (i * itemScale);
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardLayouts.length; j++) {
          if (!cardLayouts[j]) continue;
          const jCardTop = cardLayouts[j].cardTop;
          const jTriggerStart = jCardTop - stackPositionPx - (itemStackDistance * j);
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + (itemStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + (itemStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      return { card, i, newTransform };
    });

    // 3. Batch all DOM writes
    transforms.forEach((t, i) => {
      if (!t) return;
      const { card, newTransform } = t;
      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged = !lastTransform || 
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';
        card.style.transform = transform;
        card.style.filter = filter;
        lastTransformsRef.current.set(i, newTransform);
      }
    });

    // 4. Stack complete logic (unchanged)
    const last = transforms[transforms.length - 1];
    if (last) {
      const { card, newTransform } = last;
      const cardTop = cardLayouts[cardLayouts.length - 1].cardTop;
      const pinStart = cardTop - stackPositionPx - (itemStackDistance * (cardLayouts.length - 1));
      const pinEnd = endElementTop - containerHeight / 2;
      const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isInView && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (!isInView && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    }

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
  ]);

  // Use rAF to batch scroll updates for smoothness
  const tickingRef = useRef(false);
  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(() => {
        updateCardTransforms();
        tickingRef.current = false;
      });
    }
  }, [updateCardTransforms]);


  useLayoutEffect(() => {
    const cards = Array.from(document.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    window.addEventListener('scroll', handleScroll);
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    onStackComplete,
    updateCardTransforms,
    handleScroll,
  ]);

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-[50rem] min-h-screen">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
