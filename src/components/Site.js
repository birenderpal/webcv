import React from 'react'
import { PageContainer, PageRow, PageTitle, SectionRow } from './Pages'
import {urls} from '../config/config'
import classnames from 'classnames'

export default class Site extends React.Component {
    state={}
    componentDidMount(){
        fetch(urls.site)
        .then(res => res.json())
        .then(json =>this.setState({...json}))
    }

    renderBody = (body)=>{
        console.log(body)
        return(
        <SectionRow hasGutters = {true}>
                {body.sections.map((section,key) =>      
                    <SiteSection key={key} {...section}/>                        
                )}
        </SectionRow>
    )}
    
    render(){
    
    return (
        <PageContainer>
            {this.state.page?<PageTitle {...this.state.page}/>:null}
            <PageRow className="centered">
                <div className="span-21">
                    {this.state.body?this.renderBody(this.state.body):null}
                </div>
            </PageRow>
        </PageContainer>
    )
}
}
const RenderText = props =>{
    const {text}=props.settings
    console.log(text)
    return(
        <div className={props.class}
            dangerouslySetInnerHTML={{__html:text}}>
        </div>
    )
}
const RenderImage = props =>{
    return(
        <div className="arch-image">
                    <img src={props.settings.url} />
        </div>
    )
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

const SectionComponent = props =>{
    if (props.type==="text")
        return <RenderText {...props}/>
    if (props.type==="image")
        return <RenderImage {...props}/>
}


const SiteSection = props =>{
    const {title,grid,component,settings}=props
    const sectionClasses = classnames(settings.class)
    return(
            <div className={grid}>
                <div className={sectionClasses}>
                    {title?<h1 className={title.class} style={{textAlign:title.align}}>{title.text}</h1>:null}
                    {component?<SectionComponent {...component}/>:null}
                </div>
            </div>
    )
}