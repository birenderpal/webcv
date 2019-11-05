import React from 'react'
import { PageContainer, PageRow, PageTitle, SectionRow } from './Pages'
import {urls} from '../config/config'

export default class Site extends React.Component {
    state={}
    componentDidMount(){
        fetch(urls.site)
        .then(res => res.json())
        .then(json =>this.setState({...json}))
    }

    renderBody = (body)=>(
        <SectionRow hasGutters = {true}>
            <div className="span-24 primary-background">
                {body.map((section,key) =>      
                        <SiteSection key={key} {...section}/>
                        
                )}
            </div>
        </SectionRow>
    )
    
    render(){
    
    return (
        <PageContainer>
            {this.state.page?<PageTitle {...this.state.page}/>:null}
            <PageRow className="centered">
                <div className="span-19">
                    <hr />
                    {this.state.body?this.renderBody(this.state.body):null}
                </div>
            </PageRow>
        </PageContainer>
    )
}
}
const renderLines = (lines) =>{
    return(<div className="section-text">
        {lines.map((line,key)=>{
            return(
                <p className="section-text" key={key}>{line.line}</p>
                )
            })}
    </div>)
}
const renderList = (lines) =>{
    return (
        <div className="section-text">
        <ul>
            {lines.map((line,key)=>(
                <li key={key}>{line.line}</li>
            ))}
        </ul>

        </div>
    )
}



const SiteSection = props =>{
    const {sectionTitle,sectionData,sectionStyle}=props
    return(
            <>
                        <h1 className="section-title">{sectionTitle}</h1>
                        {sectionData.logo?<div className="arch-image">
                            <img src={sectionData.logo} />
                        </div>:null}
                        {sectionData.lineStyle?renderList(sectionData.lines):renderLines(sectionData.lines)}                                                                    
            </>
    )
}