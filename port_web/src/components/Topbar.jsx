// import "remixicon/fonts/remixicon.css";


export function Topbar() {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-4xl h-16 bg-stone-100/10 backdrop-blur-md z-50 rounded-full shadow-lg border border-gray-200 flex items-center justify-between px-8">
      <div className="text-xl space-x-6 text-gray-500 pb-1 ">
        <a className="hover:text-stone-300 " href="https://x.com/Piyushj8i" target="_blank" rel="noopener noreferrer">
                <i className="ri-twitter-x-line"></i>
        </a>
        <a className="hover:text-stone-300" href="https://github.com/Piyushbijarania" target="_blank" rel="noopener noreferrer">
                <i className="ri-github-line"></i>
        </a>
        <a className="hover:text-stone-300" href="https://www.linkedin.com/in/piyush-choudhary-0x/" target="_blank" rel="noopener noreferrer">
                <i className="ri-linkedin-line"></i>
        </a>
      </div>
      <div className="space-x-6 text-xl  text-gray-500 pb-1">
        <a href="#" className="hover:text-stone-300 "> Projects</a>
        <a href="#about" className="hover:text-stone-300">About</a>
        <a href="#" className="hover:text-stone-300">Contact</a>
      </div>
    </div>
  )
}
