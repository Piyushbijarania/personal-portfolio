import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis';
import './App.css'
import { Topbar } from './components/Topbar'
import { LongLine } from './components/LongLine'
import MagicBento from './components/MagicBento'
import ProfileCard from './components/ProfileCard'
import ScrollStack, { ScrollStackItem } from './components/ScrollStack'
// import "remixicon/fonts/remixicon.css";

function App() {
  const [count, setCount] = useState(0)
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center bg-black text-stone-400 text-base sm:text-lg">
        <Topbar lenisRef={lenisRef} />
        <div className="w-full max-w-2xl mx-auto pl-2">
          <h1
            id="projects"
            className="text-4xl mt-12 sm:text-5xl text-center pt-12 pb-3 text-stone-400 tracking-tight"
          >
            Projects
          </h1>
          <div className="flex justify-center mb-8">
            <div className="h-0.5 w-50 bg-stone-400 "></div>
          </div>
          
          <div className='w-full pt-4'>
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="132, 0, 255"
            />
          </div>
          <div className="flex w-full justify-center items-center py-10" id="about">
            <div className="bg-stone-900/60 rounded-2xl p-6 shadow-lg max-w-2xl w-full flex flex-col items-center">
              <h2 className="text-2xl font-bold text-purple-400 mb-3 text-center">Hi, I'm Piyush Choudhary</h2>
              <p className="text-base text-stone-200 mb-1 text-center">
                Student at <span className="font-semibold text-purple-300">BIT Mesra</span>
              </p>
              <p className="text-sm text-stone-300 mb-1 text-center">
                🚀 <span className="font-semibold">Web3 Enthusiast</span> with 4+ years in Crypto
              </p>
              <p className="text-sm text-stone-300 mb-1 text-center">
                <span className="font-semibold">DeFi</span>, <span className="font-semibold">NFTs</span>, <span className="font-semibold">DePIN</span>, <span className="font-semibold">Metaverse</span>
              </p>
              <p className="text-sm text-stone-300 text-center mb-4">
                Passionate about <span className="font-semibold text-purple-300">innovation</span> and <span className="font-semibold text-purple-300">problem-solving</span>.
              </p>
              <div className="w-full">
                <h3 className="text-lg font-semibold text-purple-300 mb-1 text-center">Skills</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "React", "Tailwind", "Node.js", "Express.js", "JWT", "Rust", "C", "Python", "Figma"
                  ].map(skill => (
                    <span
                      key={skill}
                      className="bg-stone-800 text-purple-200 px-3 py-1 rounded-full text-xs font-medium shadow"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-2 mb-8">
            <LongLine />
            <p className="pt-2 text-stone-400 text-center text-xs">
              © 2025 Piyush Choudhary. All rights reserved.
            </p>
            <p className="pt-3 font-bold text-stone-400 text-center text-xs">
              Built with <span className="text-red-400">❤️</span> by Piyush Choudhary
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
