import { useState } from 'react'
import './App.css'
import { Topbar } from './components/Topbar'
import { LongLine } from './components/LongLine'
import ProfileCard from './components/ProfileCard'
// import "remixicon/fonts/remixicon.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className=" flex flex-col  justify-center min-h-screen bg-black text-stone-400 text-2xl">
        <Topbar />
        <LongLine />
        <div className="w-full max-w-4xl pt-24 mx-auto pl-20">
          <div className='flex pt-6'>
                <ProfileCard
                  name="Piyush Choudhary"
                  title="Engineer"
                  handle=""
                  status=""
                  contactText=""
                  avatarUrl="public/ProfileCard.jpg"
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
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Projects</h2>
            <p className="mt-2">Here are some of my recent projects:</p>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
