
import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import {TextComponent,Grid,Column,Heading,Image,Button,Header,Divider,ContactForm,ContactButton} from '.'
import {AnimatedSection,Section} from './Section'
const StyledDiv = styled.div`${props => props.css}`


const processChildren = props =>{
    return(
    props.map((child,key)=>{        
        const {component,settings,children,columns}=child
        if (component ==="section"){
            if (children && children.length)
                return <Section key={key} {...settings}>
                    {processChildren(children)}
                </Section>
        }
        if (component ==="animatedSection"){
            if (children && children.length)
                return <AnimatedSection key={key} {...settings}>
                    {processChildren(children)}
                </AnimatedSection>
        }
        if (component === "divider")
            return <Divider key={key} {...settings}/>
        if (component === "text")
            return <TextComponent key={key} {...settings}/>
        if (component === "header"){
            return <Header key={key} {...settings}/>
        }
        if (component === "heading"){
            return <Heading key={key} {...settings}/>
        }

        if (component === "contactForm"){
            return <ContactForm key={key} {...settings}/>
        }
        if (component === "image" || component === "backgroundImage"){
            return <Image key={key} {...settings}/>
        }
        if (component === "button"){
            return <Button key={key} {...settings}/>
        }
        if (component === "contactButton"){
            return <ContactButton key={key} {...settings}/>
        }

        if (component === "grid")
            return(
                <Grid key={key} {...settings}>
                    {columns.map((column,key)=>{
                        return (
                         <Column key={key} {...column.settings}>
                            {processChildren(column.children)}
                        </Column>)
                    })}
                </Grid>)
    }))
}    


export const Page = React.forwardRef((props,ref)=>{
    const {id,components,style,published,hero} = props
    const pageClass = classnames({"page":!hero},props.class)    
    if (published)
        return (<StyledDiv ref={ref} css={style} className={pageClass} id={id}>
            <div className="page-container">
                {processChildren(components)}
           </div>
        </StyledDiv>)
})
