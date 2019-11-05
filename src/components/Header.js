import React from 'react'
import classnames from 'classnames'
import $ from 'jquery'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state={isClicked:false,isScrolled:false}
        this.handleClick = this.handleClick.bind(this)
        this.linkRef = React.createRef()
        this.mobileRef = React.createRef()
    }
    
    componentDidUpdate(){
        if (!this.props.isScrolled){
            this.linkRef.current.childNodes.forEach(elem=>elem.classList.remove('is-clicked'))
        }
    }    
    handleClick(e,isMobile){
        const a = e.currentTarget
        if (a.hash !== "") {
            e.preventDefault();
            var hash = a.hash;

            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 1500, function(){
                
            });
            if (isMobile){
                a.parentNode.childNodes.forEach(elem=>{elem.classList.remove('active')})
                a.classList.add('active')
                this.setState({isOpen:!this.state.isOpen})
            }
            else{
                a.parentNode.childNodes.forEach(elem=>{elem.classList.remove('is-clicked')})
                a.classList.add('is-clicked')
            }
        }                          
    }
    render(){   
    return (

        <HeaderBar isScrolled={this.props.isScrolled && !this.state.isOpen} isFixed={true}>
            <div className={classnames("bp-mobile-drawer",{ "is-open": this.state.isOpen })}>
                <button className="bp-mobile-menu" onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    
                </button>
            </div>
            <NavBar 
                isMobileNav={false}                 
                links={this.props.links}
                alignCentre={true}
                handleClick={this.handleClick}
                ref={this.linkRef}            
            />                        
            <NavBar 
                isMobileNav={true} 
                isOpen = {this.state.isOpen} 
                links={this.props.links}
                handleClick={this.handleClick}   
                ref={this.mobileRef}         
            />
        </HeaderBar>
    )
    }
}
export default Header

export const HeaderBar = (props) =>{
    const {
        isFixed,
        className,
        isScrolled
    }=props

    const headerClasses = classnames("bp-header", {"bp-header-fixed":isFixed,"is-scrolled":isScrolled},className)
    return(
        <header key="header-key" id="header" className={headerClasses}>
            {props.children}
        </header>

    )
}
export const NavBar = React.forwardRef((props,ref) =>{
    const {
        isMobileNav,
        className,
        isOpen,
        handleClick,
        alignCentre,
        links
    } = props
    const navBarClasses = classnames({"nav":!isMobileNav,"nav-mobile":isMobileNav, "is-open":isOpen,"nav-align-centre":alignCentre})
    const navClasses = classnames({"nav-list":!isMobileNav,"nav-primary":!isMobileNav},{"nav-list-mobile":isMobileNav,"is-open":isOpen},className)
    const navListClasses = classnames("bp-upper",{"nav-list-item":!isMobileNav,"nav-mobile-list-item":isMobileNav},className)
    return(
            <div className={navBarClasses}>
                <nav className={navClasses} ref={ref}>
                    {links.map((l,k) => (
                        <a key={k} href={`#${k}`} className={navListClasses}            
                                onClick={(e)=>handleClick(e,isMobileNav)}>
                                {l.name}
                            </a>                                            
                    ))}                    
                </nav>
                
            </div>        
    )
})

