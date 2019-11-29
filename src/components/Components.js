import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import TextField, { Input } from '@material/react-text-field'
import $ from 'jquery'

const StyledDiv = styled.div`${props => props.css}`
const StyledButton = styled.button`${props => props.css}`
const StyledImage = styled.img`${props => props.css}`
const StyledClickImage = styled.a`${props => props.css}`

export const Grid = (props) => {
    const {
        style,
        id,
        children
    } = props
    const gridClasses = classnames("page-row", props.class)

    return style && style.length > 1 ? (<StyledDiv css={style} className={gridClasses} id={id}>
        {children}
    </StyledDiv>)
        :
        (<div className={gridClasses} id={id}>
            {children}
        </div>)
}

export const Button = props => {
    const {
        style,
        text,
        url } = props
    return style && style.length > 1 ?
        (<StyledButton css={style} className={props.class}>
            {url ? <a href={url}>{text}</a> : text}

        </StyledButton>
        )
        :
        <button className={props.class}>
            {url ? <a href={url}>{text}</a> : text}
        </button>
}

const contactMe = (e) => {
    const a = e.currentTarget
    if (a.hash !== "") {
        e.preventDefault();
        var hash = a.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 1500, function () {
        });
        //let page_id = hash.replace("#","")
        $(hash).children(".page-container").addClass('fade-in')
    }

}


export const ContactButton = props => {
    const {
        contactID,
    } = props
    return (
        <a className="bp-btn-hero bp-upper" href={contactID} onClick={contactMe}>contact</a>
    )
}

export const Column = (props) => {
    const {
        style,
        children
    } = props
    const gridClasses = classnames(props.class)
    return (style.length && style) ?
        (
            <StyledDiv css={style} className={gridClasses}>
                {children}
            </StyledDiv>)
        :
        <div className={gridClasses}>
            {children}
        </div>

}

export const Image = (props) => {
    const {
        style,
        image,
        width,
        height,
        clickable,
        onclick
    } = props

    const imageClass = classnames(props.class)
    return (clickable ?

        (<StyledClickImage css={style} className={imageClass} href={onclick} target="_blank" rel="noopener noreferrer"
            style={{ backgroundImage: `url(${image.path})` }} />)
        :
        <StyledImage css={style} className={imageClass} src={image.path} height={image.height} width={image.width} />
    )
}
export const Heading = props => {
    const {
        tag,
        text
    } = props
    const headerClasses = classnames(props.class)
    const TagName = tag || 'p'
    return (
        <TagName className={headerClasses}>{text}</TagName>
    )
}

export const Divider = props => {
    const {
        style
    } = props
    return (style && style.length > 1 ?
        <StyledDiv css={style} className={props.class} /> : <div className={props.class} />
    )
}

export const Header = props => {
    const {
        id,
        text,
        style,
        title,
        tag,
        subtitle,
        subtext,
        quote,
        author } = props
    const headerClasses = classnames(props.class)
    const TagName = tag || 'p'
    const SubTitle = subtitle && subtitle.length > 0 ? <p className="page-header-subtitle">"{subtitle}"</p> : null
    const SubText = subtext && subtext.length > 0 ? <p className="page-header-subtext">"{subtext}"</p> : null
    const Quote = quote && quote.length > 0 ? <p className="quote">"{quote}"<br />{author && author.length > 0 ? `- ${author} -` : null}
    </p> : null
    return (
        <div>
            <StyledDiv css={style} id={id}
                className={headerClasses}>
                {title}
            </StyledDiv>
            {SubTitle}
            {Quote}
            {SubText}
        </div>
    )
}


export const TextComponent = props => {
    const {
        id,
        text,
        style
    } = props
    const textClasses = classnames(props.class)
    return (
        <StyledDiv css={style} id={id} className={textClasses}
            dangerouslySetInnerHTML={{ __html: text }}>
        </StyledDiv>
    )
}

export class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        if (this.state.message.length < 2 || this.state.name.length < 1) {
            alert(`Sorry, can't send an incomplete message, Please provide all details`);
            e.preventDefault();

        }
        else if (this.state.email.length < 5 && this.state.phone.length < 5) {
            alert(`One of email or phone is required`);
            e.preventDefault();
        } else {
            let message = { "message": this.state.message, "name": this.state.name, "email": this.state.email, "phone": this.state.phone }
            fetch(this.props.apiGatewayURL,
                {
                    method: 'POST',
                    body: JSON.stringify(message)
                }
            )
                .then(response => response.json())
            alert('Message has been sent');
            this.setState({ name: "", email: "", message: "", phone: "" })
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