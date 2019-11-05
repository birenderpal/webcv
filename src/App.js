import React from 'react';
import HeroSection from './components/HeroSection'
import Header from './components/Header';
import { Page } from './components/Pages'
import { Skills } from './components/Skills'
import { AboutMe } from './components/AboutMe';
import { Experiences } from './components/Experiences';
import './styles.scss';
import Contact from './components/Contact';
import Site from './components/Site';
import throttle from 'lodash.throttle'

const links = [
  {
    id: 'about',
    name: 'Profile',
    component: <AboutMe />
  },
  {
    id: 'experience',
    name: 'experience',
    component: <Experiences />
  },
  {
    id: 'skills',
    name: 'Skills',
    component: <Skills />
  },
  {
    id: 'contact',
    name: 'contact',
    component: <Contact />
  },
  {
    id: 'site',
    name: 'about',
    component: <Site />
  },

]
class App extends React.Component {
  state = { isScrolled: false }
  myRefs = links.map((link) => {
    return React.createRef();
  })
  linkRef = React.createRef();
  scrollListener = () => {
    if (window.scrollY > 1 && this.state.isScrolled === false) {
      this.setState({ isScrolled: true })
    }
    else if (window.scrollY < 1) {
      this.setState({ isScrolled: false })
    }
    this.myRefs.forEach((value, key) => {
      let ref = (value.current.pageRef) ? value.current.pageRef.current : value.current
      if ((window.scrollY + window.innerHeight) > ref.offsetTop) {
        ref.firstChild.classList.add('fade-in')
      }
    })
  }

  throttledScrollHandler = throttle(this.scrollListener, 100)

  componentDidMount() {
    window.addEventListener('scroll', this.throttledScrollHandler)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollHandler)
  }

  render() {
    let contactID = links.findIndex(link => link.id === "contact")
    return (
      <div className="bp-typography">
        <Header ref={this.linkRef} links={links} isScrolled={this.state.isScrolled}>

        </Header>

        <HeroSection contactId={contactID}
        />

        {links.map((link, key) => {
          return (
            <Page id={key} key={key} className={`page-${link.id}`} ref={this.myRefs[key]}>

              {link.component}

            </Page>
          )
        })}
      </div>
    );
  }
}

export default App;
