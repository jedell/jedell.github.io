import './App.css';
import Particles from '../node_modules/react-particles-js';
import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import { PlayerSidebar } from './PlayerSidebar';
import PlayerList from './components/player-list.component'

import Matter from "matter-js";

const desktopLinkStyle = {
  fontSize: '18px',
  marginRight: '10px',
  color: '#ffffff',
};

const particlesStyle = require('./particles.json');

class HeaderNav extends React.Component {
  render() {
    return (
      <div className="nav-link" > <Link to={'/#' + this.props.link} replace>{this.props.link}</Link></div>
    );
  }
}

class HeaderLink extends React.Component {
  render() {
    return (
      <div className="nav-link">
        <Link to={"/" + this.props.link}>{this.props.link}</Link>
      </div>
    )
  }
}

function Header() {
  return (
    <div>
      <header id="header">
        <div id="header-nav">
          <HeaderNav link={'home'} />
          <HeaderNav link={'about'} />
          <HeaderNav link={'resume'} />
          <HeaderLink link={'game'} />
        </div>

        <div id="header-icons">
          <div id="header-nav-logos">
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/jedell"><i
              style={desktopLinkStyle} className="fab fa-github"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/joseph-r-edell-63b267139/"><i
              style={desktopLinkStyle} className="fab fa-linkedin"></i></a>
            <a href="mailto:jre2016@gmail.com"><i style={desktopLinkStyle}
              className="fas fa-envelope"></i></a>
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/cockapoodaily"><i style={desktopLinkStyle}
              className="fab fa-twitter"></i></a>

          </div>
        </div>

      </header>
    </div>
  );
};

const homeFonts1 = {
  fontFamily: 'VT323',
}

const homeFonts2 = {
  fontFamily: 'Open Sans'
}

function Home() {
  return (
    <section id="home">
      <div id="home-content">
        <div id="home-introduction">
          <div id="home-title" data-aos="fade-in" data-aos-delay="150" data-aos-duration="2000"
            style={homeFonts1} className="gradient">
            Hello, welcome...
          </div>

          <div id="home-text" data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000"
            style={homeFonts2}>
            My name is <b>Joey Edell</b>.
            I studied computer science and economics at <b>Oberlin College</b>. I am currently enrolled in NYU's
            Computer Science Master's program.
          </div>
        </div>

      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div id="about-title" data-aos="fade-in" data-aos-delay="150" data-aos-duration="2000">About</div>
      <div id="about-text">
        <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000">I was born in
          Chicago and spent my former years there until moving to Oberlin, Ohio to attend college. I began my
          undergraduate academic career as an economics major until discovering a love for coding as a
          third-year. Since, I completed the computer science major and have taken classes in machine learning and
          AI, computer architecture,
          data structures, algorithms, and systems programming.
        </p>

        <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000">
          As a result, I have quite a few projects, both
          academic and personal, under
          my belt. I was also a member of Oberlin's varsity lacrosse team and the finance and
          investment club, and worked as a grading assistant in the computer science department.
        </p>

        <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000">I enjoy running (thanks to cross
          country), playing the guitar, and coding.
          This site is my first foray into web development and I have found
          myself enjoying
          it as well. In the summer of 2021, I worked for Deloitte as a Tax Technology intern where I assisted in
          UI and backend
          testing.
        </p>

        <p data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000">Feel free to reach out with anything via <a target="_blank" rel="noopener noreferrer" href="mailto:jre2016@gmail.com">email</a>,
          or follow any of the links in the top right corner to visit my <a target="_blank"
            rel="noopener noreferrer" href="https://github.com/jedell">Github</a>, <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/joseph-r-edell-63b267139">LinkedIn</a>, or <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/cockapoodaily">cockapoos daily twitter page</a>.
        </p>
      </div>

    </section>
  );
};

var listStyle = {
  listStyle: 'none',
};

function Resume() {
  return (
    <section id="resume">
      <div id="resume-title" data-aos="fade-in" data-aos-delay="150" data-aos-duration="2000"> <a target="_blank" rel="noopener noreferrer" href="https://drive.google.com/file/d/1v8QUuC9ANsuRGCLBbpfhk3bBl7W0kyEh/view?usp=sharing">Resume</a> </div>
      <div id="resume-click" data-aos="fade-in" data-aos-delay="150" data-aos-duration="2000">click me ^</div>
      <div id="resume-text">
        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000">
          <div id="resume-sub">Experience</div>
          <ul style={listStyle}>
            <li>➤ Software Engineering Intern, <a a target="_blank" rel="noopener noreferrer" href="https://contenda.co">Contenda</a></li>
            <li>➤ Tax Technology Intern, Deloitte Tax LLP</li>
            <li>➤ Grading Assistant, Oberlin College CSCI Department</li>
          </ul>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000">

          <div id="resume-sub">Education</div>
          <ul style={listStyle}>
            <li>➤ New York University, M.S. Computer Science, in progress</li>
            <li>➤ Oberlin College, B.A. Computer Science, Economics, 2017 - 2021</li>
          </ul>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000">

          <div id="resume-sub">Skills</div>
          <ul style={listStyle}>
            <li>Python, Java, C, React, Angular, SQL, HTML/CSS, Git, HTTP, Unix, Racket, Excel, Alteryx</li>
          </ul>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="2000">

          <div id="resume-sub">Relevant Coursework</div>
          <ul style={listStyle}>
            <li>➤ AI, data structures, systems programming, algorithms</li>
            <li>➤ Econometrics, U.S. monetary policy, money and banking, macro/microeconomics</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Main() {
  return (
    <div className="App">
      <img className="meteor" src="meteor3.gif" alt="meteor" />
      <Home className="Home" />
      <About />
      <Resume />
    </div>
  )
}

class Game extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
  }

  render() {
    return (
      <div id="game">
        <PlayerSidebar width={100} height={"100vh"}>
          <PlayerList/>
        </PlayerSidebar>
        {/* <div>Coming Soon...</div> */}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path='/game'>
            <Game />
          </Route>
          <Route path='/'>
            <Main />
          </Route>
        </Switch>
      </Router>
      <Particles className="Particles" params={particlesStyle} />
    </div>
  );
}

export default App;
