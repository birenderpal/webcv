import React from 'react'
import { PageTitle, PageContainer, PageSection, SectionRow, PageRow } from './Pages'
import {urls} from '../config/config'

export class Skills extends React.Component {
    state = { body: [], aside: [], page: "" }
    componentDidMount() {
        // fetch skill data from s3 CMS.
        fetch(urls.skills)
            .then(res => res.json())
            .then(json => this.setState({ ...json }))
    }
    render() {
        return (
            <PageContainer>
                {this.state.page?<PageTitle {...this.state.page} />:null}
                
                {this.state.body.map((section,key) => {
                    if (section.style === "certification-card")
                        return <Certification key={key} {...section} />
                    if (section.style === "skill-card")
                        return <SkillCard key={key} {...section} />
                    return <SkillMap key={key} {...section} />
                })}
            </PageContainer>
        )
    }
}

const Certification = props => {
    return (
        <PageRow className="centered">
            <div className="span-19">
                <hr />
                <PageSection>
                    <p className="section-title">{props.sectionTitle}</p>
                    <div className="section-row certificatons">
                        {props.sectionData.map((value, key) => {
                            return (<CertificationCard key={`"certification_"+${key}`}
                                verifyUrl={value.verifyUrl}
                                badge={value.badge}>
                            </CertificationCard>)
                        })}
                    </div>
                </PageSection>
            </div>
        </PageRow>
    )
}

const CertificationCard = (props) => {
    return (
        <div className="exp-card">
            <a
                className="certification-logo"
                href={props.verifyUrl}
                target="_blank" rel="noopener noreferrer"
                style={{ backgroundImage: `url(${props.badge})` }}>
            </a>
        </div>

    )
}
const SkillMap = props => {
    return (
        <PageRow className="centered">
            <div className="span-19">
                <p className="section-title">{props.sectionTitle}</p>
                <SectionRow hasGutters={false}>
                    {props.sectionData.map((item, key) => {
                        return (
                            <div key={key} className="tech-skill-card">
                                <p className="skill-category section-subtitle">{item.skillCategory}</p>
                                <div className="tech-skill-card-body">
                                    {item.skills.map((skill, key) =>
                                        <p key={`${key}-${skill}`}><span className="skill-badge-grey">{skill.name}</span></p>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                </SectionRow>
            </div>
        </PageRow>

    )
}


const renderCard = (skill,key) => {
    return (
        <div className="skill-card" key={key}>
            <div className="skill-card-body">
                <img src={skill.logo} alt="" />
                <h3 className="skill-title">{skill.skillCategory}</h3>
                <p className="section-text skill-text">{skill.skillDescription}</p>
            </div>
        </div>
    )
}

const SkillCard = props => {
    return (
        <PageRow className="centered">
            <div className="span-19">
                <p className="section-title">{props.sectionTitle}</p>
                <SectionRow hasGutters={false}>
                    <div className="skill-card-group">
                        {props.sectionData.map((skill,key) => renderCard(skill,key))}
                    </div>
                </SectionRow>
            </div>
        </PageRow>

    )
}