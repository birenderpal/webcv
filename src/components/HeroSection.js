import React from 'react'
import $ from 'jquery'
import {urls} from '../config/config'

export default class HeroSection extends React.Component{
    constructor(props){
        super(props)                      
        this.contactMe = this.contactMe.bind(this)
    }
    contactMe =(e)=>{
        const a = e.currentTarget
        if (a.hash !== "") {
            e.preventDefault();
            var hash = a.hash;

            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 1500, function(){
            });
                //let page_id = hash.replace("#","")
                $(hash).children(".page-container").addClass('fade-in')
        }                          

    }


    render(){
        
        return (
            <>
            <section  id="page_hero">                    
                <div className="bp-container-full">
                <div className="bp-hero">
                    <div className="bp-hero-body-container">
                        <div className="bp-hero-body">
                            <div className="bp-hero-text bp-typography-h5">Hi, I am</div>
                                <div className="bp-hero-title">Birender</div>
                                <div className="hero-button-row">
                                <a className="bp-btn-hero bp-upper" href={`#${this.props.contactId}`} onClick={this.contactMe}>contact</a>
                                <a href={urls.cv} className="bp-btn-hero bp-upper">Resume</a>
                                
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
        )
    }
}