import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis';
import './App.css'
import { Topbar } from './components/Topbar'
import { LongLine } from './components/LongLine'
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
      <div className="flex flex-col justify-center bg-black text-stone-400 text-2xl">
        <Topbar />
        <LongLine />
        <div className="w-full max-w-4xl pt-24 mx-auto pl-20">
          <div className='w-full pt-6 '>
            <ScrollStack>
              <ScrollStackItem itemClassName="bg-stone-300">
                <h2>Project 1</h2>
                <p>This is the first card in the stack</p>
              </ScrollStackItem>
              <ScrollStackItem itemClassName="bg-stone-300">
                <h2>Project 2</h2>
                <p>This is the second card in the stack</p>
              </ScrollStackItem>
              <ScrollStackItem itemClassName="bg-stone-300">
                <h2>Project 3</h2>
                <p>This is the third card in the stack</p>
              </ScrollStackItem>
            </ScrollStack>
          </div>
          <div className='flex ' id="about">
                <ProfileCard
                  name="Piyush Choudhary"
                  title="Engineer"
                  handle=""
                  status=""
                  contactText=""
                  avatarUrl="/ProfileCard.jpg"
                  showUserInfo={false}
                  enableTilt={true}
                  enableMobileTilt={false}
                  showBehindGradient={false}
                  onContactClick={() => console.log('Contact clicked')}
                  />
                  <div className='pt-20'>
                    <h1 className='text-4xl pl-4 '>Hi, I'm Piyush Choudhary, an undergrad at BIT Mesra.</h1>
                    <h3 className='text-xl pl-5 mt-2'>
                      I love creating things using AI. I have experience with various AI tools and have created several innovative projects.
                    </h3>
                  </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
