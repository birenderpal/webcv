import React from 'react';
import './styles.scss';
import { Page } from './components';
import { Header } from './components/Header';
import throttle from 'lodash.throttle';
import { urls } from './config/config';
const navBarItems = new Set();

class App extends React.Component {
  state = { content: [], isScrolled: false, pageRendered: false };
  myRefs = {};

  renderContent = content => {
    return content.map((page, key) => {
      let { component, settings, children } = page;
      if (component === 'page') {
        if (settings.navbaritem) {
          navBarItems.add(settings.name);
          settings.id = Array.from(navBarItems).indexOf(settings.name);
          Array.from(navBarItems).forEach(link => {
            this.myRefs[settings.name] = React.createRef();
            return { link: React.createRef() };
          });

          return (
            <Page
              ref={this.myRefs[settings.name]}
              key={key}
              {...settings}
              components={children}
            ></Page>
          );
        }
        return <Page key={key} {...settings} components={children}></Page>;
      }
    });
  };

  componentDidMount() {
    const URL = urls.TEST_URL;
    fetch(URL)
      .then(res => res.json())
      .then(json => this.setState({ ...json[0] }));

    window.addEventListener('scroll', this.throttledScrollHandler);
  }

  scrollListener = () => {
    if (window.scrollY > 1 && this.state.isScrolled === false) {
      this.setState({ isScrolled: true });
    } else if (window.scrollY < 1) {
      this.setState({ isScrolled: false });
    }
    Object.keys(this.myRefs).forEach((value, key) => {
      let ref = this.myRefs[value].current.pageRef
        ? this.myRefs[value].current.pageRef.current
        : this.myRefs[value].current;
      if (window.scrollY + window.innerHeight > ref.offsetTop) {
        ref.firstChild.classList.add('fade-in');
      }
    });
  };

  throttledScrollHandler = throttle(this.scrollListener, 100);

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollHandler);
  }

  render() {
    return (
      <div className="App bp-typography">
        {this.renderContent(this.state.content)}
        <Header
          isFixed
          links={Array.from(navBarItems)}
          isScrolled={this.state.isScrolled}
        />
      </div>
    );
  }
}
export default App;
