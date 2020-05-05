import React, { useRef, useState, useEffect } from 'react';
import './styles.scss';
import { Page } from './components';
import { Header } from './components/Header';
import throttle from 'lodash.throttle';
import { urls } from './config/config';

const App = () => {
  const [content, setContent] = useState([]);
  const [isScrolled, setScrolled] = useState(false);
  const navBarItems = new Set();
  useEffect(() => {
    const URL = urls.TEST_URL;
    fetch(URL)
      .then(res => res.json())
      .then(json => setContent(json[0]['content']));
    window.addEventListener('scroll', throttledScrollHandler);
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [throttledScrollHandler]);

  const scrollListener = () => {
    if (window.scrollY > 1 && isScrolled === false) {
      setScrolled(true);
    } else if (window.scrollY < 1) {
      setScrolled(false);
    }
  };

  const throttledScrollHandler = throttle(scrollListener, 100);

  const renderContent = content => {
    return content.map((page, key) => {
      let { component, settings, children } = page;
      if (component === 'page') {
        if (settings.navbaritem) {
          navBarItems.add(settings.name);
          settings.id = Array.from(navBarItems).indexOf(settings.name);
          return <Page key={key} {...settings} components={children}></Page>;
        }
        return <Page key={key} {...settings} components={children}></Page>;
      }
    });
  };

  return (
    <div className="App bp-typography">
      {renderContent(content)}
      <Header isFixed links={Array.from(navBarItems)} isScrolled={isScrolled} />
    </div>
  );
};
export default App;
