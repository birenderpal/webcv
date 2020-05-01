import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import PropTypes, { arrayOf } from 'prop-types';
import $ from 'jquery';

export const Header = ({ links, isScrolled, isFixed }) => {
  const [isOpen, setOpen] = useState(false);
  const linkRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    if (!isScrolled) {
      console.log('remove active class');
      console.log(linkRef);
      linkRef.current.childNodes.forEach(elem =>
        elem.classList.remove('is-clicked'),
      );
    }
  }, [isScrolled]);

  const handleClick = (e, isMobile, index) => {
    const aTag = e.currentTarget;
    if (aTag.hash !== '') {
      e.preventDefault();
      var hash = aTag.hash;

      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        1500,
        function() {},
      );
      if (isMobile) {
        mobileRef.current.childNodes.forEach(elem => {
          elem.classList.remove('active');
        });
        mobileRef.current.childNodes[index].classList.add('active');
        setOpen(!isOpen);
      } else {
        linkRef.current.childNodes.forEach(elem =>
          elem.classList.remove('is-clicked'),
        );
        linkRef.current.childNodes[index].classList.add('is-clicked');
      }
    }
  };
  const headerClasses = classnames('bp-header', 'bp-header-fixed', {
    'is-scrolled': isScrolled && !isOpen,
  });
  return (
    <header key="header-key" id="header" className={headerClasses}>
      <div className={classnames('bp-mobile-drawer', { 'is-open': isOpen })}>
        <button className="bp-mobile-menu" onClick={() => setOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="nav nav-align-centre">
        <nav className="nav-list nav-primary" ref={linkRef}>
          {links.map((link, index) => (
            <a
              key={`${link}-{$index}`}
              href={`#${index}`}
              className="bp-upper nav-list-item"
              onClick={e => handleClick(e, false, index)}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
      <div className={classnames('nav-mobile', { 'is-open': isOpen })}>
        <nav
          className={classnames('nav-list-mobile', { 'is-open': isOpen })}
          ref={mobileRef}
        >
          {links.map((link, index) => (
            <a
              key={`${link}-{$index}`}
              href={`#${index}`}
              className="bp-upper nav-mobile-list-item"
              onClick={e => handleClick(e, true, index)}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

Header.defaultProps = {
  isFixed: true,
};
Header.propTypes = {
  isFixed: PropTypes.bool,
  isScrolled: PropTypes.bool,
  links: PropTypes.array.isRequired,
};

Header.displayName = 'Header';
