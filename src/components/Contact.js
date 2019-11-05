
import React from 'react';
import TextField, { Input } from '@material/react-text-field'
import {PageTitle,PageRow,PageContainer,SectionRow} from './Pages'
import {urls} from '../config/config'
export default class Contact extends React.Component {
    state={}    
    componentDidMount(){
        fetch(urls.contact)
        .then(res =>res.json())
        .then(json =>this.setState({...json}))
    }
    renderBody = (body)=>(
        <PageRow className="centered">
            <div className="span-22">
                {body.map((section,key)=>
                    <ContactSection key={key} {...section} {...this.state.meta}/>
                )}
            </div>
        </PageRow>
    )
    render(){

    return (
            <PageContainer>
                {this.state.page? <PageTitle {...this.state.page}/>:null}
                {this.state.body? this.renderBody(this.state.body):null}
            </PageContainer>
    )
}
}

const renderCard = (cards) =>(
    cards.map((card,key)=>
        <ContactCard key={key} {...card}>
            <i className={card.iconClass}></i>
        </ContactCard>
    )

)

const renderLines = (lines) =>(
    lines.map((line,key)=>{
        return(
        <p className="section-text message-text" key={key}>
            {line.line} 
        </p>   
        )                    
    })
)
const ContactSection = props =>{
    const {sectionData,sectionTitle,sectionStyle} = props
    if (sectionStyle==="contact-card"){
        if (sectionData.contactCards.length > 1){
            return(
            <div className="bp-contact-card-group">
                {renderCard(sectionData.contactCards)}                
            </div>)
        }
        else{
            renderCard(sectionData.contactCards)
        }
    }
    else{
        return(
        <SectionRow className="space-evenly" hasGutters={false}>
            <div className={sectionStyle}>
                <p className="section-title">{sectionTitle}</p> 
                {renderLines(sectionData.lines)}
            </div>
            <div className="span-11">
                <ContactForm apiGatewayURL={props.apiGatewayURL}/>            
            </div>

        </SectionRow>
    )

    }
}
export const ContactCard = (props) =>{
    return(
        <div className="contact-card">
            <p className="contact-icon"> 
                {props.children}
            </p>            
            <p className="section-text">{props.linkDetail}</p>
            <a className="contact-link" href={props.link}>
                    <span className="contact-details">
                    {props.message}
                    </span>
            
            </a>

        </div>

    )
}
class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        if (this.state.message.length < 2 || this.state.name.length < 1){
            alert(`Sorry, can't send an incomplete message, Please provide all details`);
            e.preventDefault();

        }
        else if (this.state.email.length < 5 && this.state.phone.length < 5) {
            alert(`One of email or phone is required`);
            e.preventDefault();
        } else {
            let message = {"message":this.state.message,"name":this.state.name,"email":this.state.email,"phone":this.state.phone}
            fetch(this.props.apiGatewayURL,
                    {
                        method: 'POST',
                        body: JSON.stringify(message)
                    }
                )
            .then(response => response.json())
            alert('Message has been sent');
            this.setState({name:"",email:"",message:"",phone:""})
            e.preventDefault();
        }
    }
    render() {
        return (
            <form className="bp-form contact-form" onSubmit={this.handleSubmit}>
                <TextField
                    label='Name'
                    className="bp-text-field">
                    <Input
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.currentTarget.value })} />
                </TextField>

                <TextField
                    label='Email'
                    className="bp-text-field">
                    <Input
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.currentTarget.value })} />
                </TextField>
                <TextField
                    label='Phone'
                    className="bp-text-field">
                    <Input
                        value={this.state.phone}
                        onChange={(e) => this.setState({ phone: e.currentTarget.value })} />
                </TextField>

                <TextField
                    label='Message'
                    textarea={true}
                    className="bp-text-field bp-text-area">

                    <Input
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.currentTarget.value })} />
                </TextField>
                <h1>
                    <button 
                        className="bp-btn contact-btn">
                        <span className="bp-upper">
                        Submit
                        </span>
                        
                </button>
                </h1>
            </form>
        )
    }
}