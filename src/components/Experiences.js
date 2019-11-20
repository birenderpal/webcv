import React from 'react'
import {PageTitle,PageContainer,PageRow,SectionRow} from './Pages'
import {urls} from '../config/config'



export class Experiences extends React.Component {
    state={}    
        componentDidMount(){
            fetch(urls.experience)
            .then(res=>res.json())
            .then(jsonData=>
                    this.setState({...jsonData})                
            )
        }
    renderBody = (body) =>(
            <div className="span-21">
                {body.map((section,key)=><ExperiencesDetails {...section} key={key}/>)}
            </div>
    )
    
    render(){
        return (
            <PageContainer>
                {this.state.page?<PageTitle {...this.state.page}/>:null}
                <PageRow className="centered" key="experience_key">
                    {this.state.body?this.renderBody(this.state.body):null}                   
                </PageRow>
            </PageContainer>
        )
    }
}

const ExperiencesDetails = props =>{

    const {experiences}=props.sectionData
        return (
            <>
                {experiences.map((exp) =>{
                    return (
                        <SectionRow className="bp-exp animate casts-shadow" hasGutters={false} key={exp.id}>
                            <div className="span-5 exp-logo">
                                <div className="exp-card">
                                    <a 
                                        className="badge-logo"
                                        href={exp.orgWebsite}
                                        target="_blank" rel="noopener noreferrer"
                                        style={{backgroundImage:`url(${exp.companyLogo})`}}>                        
                                    </a>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="span-16 exp-details">
                                <p className="section-subtitle">{exp.orgName}</p>
                                <p className="section-title-subtext">{`${exp.jobTitle}, ${exp.duration}`}</p>
                                <p className="section-text">
                                    {exp.jobSummary.map((value,key)=>{
                                        return(<span key={`${exp.id}_${exp.orgName}_${key}`}>
                                            {`${value}`}
                                            <br/>
                                        </span>
                                        )                                        
                                    })}                                    
                                </p>
                            </div>
                        </SectionRow>
                    )
                    })}
            </>
        )
    }
