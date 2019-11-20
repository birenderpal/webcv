import React from 'react'
import { PageTitle, PageContainer, PageRow, SectionRow } from './Pages'
import {urls} from '../config/config'

export class AboutMe extends React.Component{
    state = { body: [], aside: [], page: "" }

    componentDidMount(){
        fetch(urls.about)
        .then(res => res.json())
        .then(json => this.setState({ ...json}))
    }
    renderBody = (body)=> (
        <div className="span-14 aboutme">
           {body.map((section,key)=><TextAboutMe {...section} key={key}/>)}
        </div>
    )
    renderAside = (aside) => (
                <div className="span-9 side-col box-shadow">
                    {aside.map((section,key)=><DetailsAboutMe {...section} key={key}/>)}
                </div>
            )
    render(){
        return (
            <PageContainer>
                {this.state.page?<PageTitle {...this.state.page}/>:null}
                                
                <PageRow className="centered">
                    <div className="span-21">                        
                        <SectionRow hasGutters={false}>
                            {this.state.body ? this.renderBody(this.state.body) : null}

                            <div className="divider"></div>
                            {this.state.aside ?
                                this.renderAside(this.state.aside) : null}

                        </SectionRow>
                        
                    </div>
                </PageRow>
            </PageContainer>
        )
    
    }
}
export const TextAboutMe = (props) => {
    return (
            <div>
                <p className="section-title bp-capital">
                    {props.sectionTitle}
                </p>
                <div className="section-text">
                    {props.sectionData["lines"].map((lines, lkey) => {
                        return (<p key={`${props.sectionTitle}${lkey}`}>{lines.line}</p>)
                    })}
                </div>
            </div>

    )
}

const renderItems = (items) =>
    (<div className="section-text">
    {items.map((item,key)=>
        (
            <div key={key} className="section-row no-gutters flex-start languages">
                <div className={item.itemStyle}>
                    <strong>{item.item}</strong>
                </div>
                <div className={item.valueStyle}>
                    {item.value}
                </div>
            </div>
        ) 
    )}          
    </div>)


const renderLines = (lines) =>{
    return(<div className="section-text">
        {lines.map((line,key)=>{
            return(
                <p key={key}>{line.line}</p>
                )
            })}
    </div>)
}

export const DetailsAboutMe =(props)=>{
        return(
            
                    <div className="detail-item">
                        <h3  className="section-subtitle bp-capital">
                            {props.sectionTitle}
                        </h3>
                        {props.sectionData.lines?renderLines(props.sectionData.lines):
                    renderItems(props.sectionData.items)}
                    </div>                                                                   

        )
    }

