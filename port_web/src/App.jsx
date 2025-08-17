import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Topbar } from './components/Topbar'
// import "remixicon/fonts/remixicon.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-stone-400 text-4xl">
        <Topbar />
        <div className="w-full max-w-4xl pt-24 mx-auto">
          <div className="p-4 text-center">
            <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
            <p className="mt-4">This is a simple portfolio website built with React and Tailwind CSS.</p>
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
