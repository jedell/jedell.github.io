import { useState } from "react";
import FlaskLogo from "./images/FlaskLogo";
import KubernetesLogo from "./images/KubernetesLogo";
import NodeLogo from "./images/NodeLogo";
import ReactLogo from "./images/ReactLogo";
import AWSLogo from "./images/AWSLogo";
import GitLogo from "./images/GitLogo";
import CSSLogo from "./images/CSSLogo";
import GithubLogo from "./images/GithubLogo";
import LinkedinLogo from "./images/LinkedInLogo";


let SECTIONS = ['home', 'about', 'projects']
let COURSES = ['Machine Learning', 'Artificial Intellegence', 'Distributed Systems', 'Operating Systems', 'Computer Graphics', 'Algorithms', 'Privacy and Security']
let COURSE_ITEMS = COURSES.map((i) => <li key={i}>{i}</li>)

function DarkToggle({ colour = 'bg-[#A76031]', on = false, onToggle = () => { }, tabIndex = 0 }) {
  const [isOn, setIsOn] = useState(on);

  function toggle() {
    setIsOn(!isOn);
    onToggle(!isOn);
  }

  function handleClick() {
    toggle();
  }

  function handleKeyDown({ key }) {
    if (key === 'Enter') toggle();
  }

  return (
    <div
      role="checkbox"
      aria-checked={isOn ? 'true' : 'false'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      className={`cursor-pointer w-11 h-5 ${isOn ? 'bg-[#f58282]' : 'bg-[#A76031]'} rounded-full relative px-1.5 flex items-center${isOn ? '' : ' justify-end'}`}
    >
      <div className={`w-4 h-4 rounded-full absolute transform duration-200 ease-out bg-white left-0.5 ${isOn ? 'translate-x-6' : 'translate-x-0'}`} />
      {isOn ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <header className="fixed pl-4 z-10 dark:text-[#FEFDFB] bg-transparent text-[#333531] w-full">
        <div className="flex justify-between pb-2">
          <div className="flex flex-row gap-4">
            <div className="font-bold"><a className="" href={'#' + SECTIONS[0]}>{SECTIONS[0]}</a></div>
            <div className="font-bold"><a className="" href={'#' + SECTIONS[1]}>{SECTIONS[1]}</a></div>
            <div className="font-bold"><a className="" href={'#' + SECTIONS[2]}>{SECTIONS[2]}</a></div>
          </div>
          <div className="flex flex-row gap-4 pt-2 pr-4">
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/joseph-edell-63b267139/"><LinkedinLogo color={`${isDarkMode ? '#FEFDFB' : "#333531"}`} fillColor={`${isDarkMode ? "#111827" : '#FEFDFB'}`} /></a>
            <a target="_blank" rel="noreferrer" href="https://github.com/jedell"><GithubLogo color={`${isDarkMode ? '#FEFDFB' : "#333531"}`} /></a>
            <DarkToggle onToggle={setIsDarkMode} />
          </div>
        </div>
      </header>
      <div className={`dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531] `}>
        <section id={SECTIONS[0]} className="h-full w-full relative flex flex-col items-center content-center pl-8 pr-8">
          <div className="flex flex-col content-center items-start m-0 text-md lg:w-7/12 md:w-8/12 sm:w-9/12 pt-8 pb-8">
            <div className="typing border-r-2 border-[#A76031] dark:border-[#f58282]">Hi, I'm Joey!</div>
            <p className="text-left indent-8 pt-4">I am pursuing a MS in CS from <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://cims.nyu.edu/dynamic/">New York University</a>.
              I previously studied CS and economics at <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://www.oberlin.edu/">Oberlin College</a>.
              My interests include NLP, AI in games, procedural generation, simulations, and visualizations.
              I've worked at <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://www.marcus.com/us/en">Goldman Sachs</a> implementing testing
              frameworks, <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://contenda.co/">Contenda</a> automating content generation,
              and <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://www2.deloitte.com/us/en.html">Deloitte</a> streamlining tax automation processes.</p>
          </div>
        </section>

        <section id={SECTIONS[1]} className="h-full w-full relative flex flex-col items-center content-center pl-8 pr-8">
          <div className="flex flex-col items-start justify-evenly m-auto space-y-1 text-md lg:w-7/12 md:w-8/12 sm:w-9/12">
            <div className="flex flex-col pb-8">
              <b><h2 className="">COURSEWORK</h2></b>
              <ul className="pl-5 list-disc">
                {COURSE_ITEMS}
              </ul>
            </div>
            <div className="flex flex-col pb-8">
              <b><h2 className="">CODING</h2></b>
              <div className="flex flex-row flex-wrap gap-y-4 gap-x-10 items-center">
                <div className=""><img className="" width="32" alt="Python-logo-notext" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/128px-Python-logo-notext.svg.png" /></div>
                <div className=""><img className="" width="32" alt="ISO C++ Logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/64px-ISO_C%2B%2B_Logo.svg.png" /></div>
                <div className=""><img className="" width="32" alt="Java-logo-notext" src="https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/131px-Java_programming_language_logo.svg.png" /></div>
                <div className=""><img className="" width="32" alt="Unofficial JavaScript logo 2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/64px-Unofficial_JavaScript_logo_2.svg.png" /></div>
                <CSSLogo color={`${isDarkMode ? '#ffffff' : '#000000'}`} />
                <div className=""><img className="" width="32" alt="Racket-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Racket-logo.svg/64px-Racket-logo.svg.png" /></div>
              </div>
            </div>
            <div className="flex flex-col pb-8">
              <b><h2 className="">FRAMEWORKS/TOOLS</h2></b>
              <div className="flex flex-row flex-wrap gap-y-4 gap-x-10 items-center pt-2">
                <ReactLogo width={32} color="#61dafb" />
                <NodeLogo width={64} color={`${isDarkMode ? '#dddddd' : '#333333'}`} />
                <FlaskLogo dark={isDarkMode} />
                <div className=""><img className="" width="32" alt="Docker logo" src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" /></div>
                <KubernetesLogo color={`${isDarkMode ? '#ffffff' : '#000000'}`} />
                <div className=""><img className="" width="64" alt="Spring Framework Logo 2018" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spring_Framework_Logo_2018.svg/128px-Spring_Framework_Logo_2018.svg.png" /></div>
                <AWSLogo color={`${isDarkMode ? '#dde3ed' : '#252F3E'}`} />
                <div className=""><img className="" width="64" alt="Google Cloud logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/128px-Google_Cloud_logo.svg.png" /></div>
                <GitLogo color={`${isDarkMode ? '#ebe6da' : '#413000'}`} />
              </div>
              {/* React, Node, Flask, Docker, Kubernetes, Spring, AWS, Google Cloud, Git */}
            </div>
          </div>
        </section>

        <section id={SECTIONS[2]} className="h-full w-full relative flex flex-col items-center content-center pl-8 pr-8">
          <div className="flex flex-col items-start justify-evenly m-auto space-y-1 pt-4 pb-8 text-md lg:w-7/12 md:w-8/12 sm:w-9/12 ">
            <b><h2 className="">PROJECTS</h2></b>
            <ul className="pl-5 list-disc">
              <li>Planet generator in C++ using <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://www.raylib.com/">raylib</a></li>
              <li>Business formation rate predictions using LSTM networks in Python and <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://www.tensorflow.org/" >Tensorflow</a></li>
              <li>Generic <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://en.wikipedia.org/wiki/Markov_decision_process">Markov process</a> solver in C++</li>
              <li>Audio visualizer with React and <a className="text-[#A76031] dark:text-[#f58282] underline" href="https://threejs.org/">Three.js</a></li>
            </ul>

          </div>
        </section>
      </div>
      <div className="flex flex-col items-end content-center pl-8 pr-4 pb-1 dark:bg-gray-900 dark:text-[#FEFDFB] bg-[#FEFDFB] text-[#333531]">
        <footer className="">© jre6163[at]nyu.edu  {` `}</footer>
      </div>
    </div>
  );
}

export default App;
