import React from 'react'
import classnames from 'classnames'
import PropType from 'prop-types'

export const Page = React.forwardRef((props,ref)=>{
    const {
        className,
        id,
      } = props;  
    const pageClassList = classnames("page", className)
    return(
            <section key={id} className={pageClassList} id={id} ref={ref}>
                {props.children}
            </section>
        )

})

export const PageTitle = (props) =>{
    const {
        pageTitle,
        pageSubtitle,
        hasQuote, 
        author,
        className
      } = props;  
    const authorTag = author ? `- ${author} -`:null
    const subtitleClasses = classnames("page-header-subtext", {"quote":hasQuote})
    const pageHeaderClasses = classnames("page-header",className)
    return(
            <div className={pageHeaderClasses}>
                <h1 className="page-header-title page-title-lines">{pageTitle}</h1>
                <p className={subtitleClasses}>
                    {`"${pageSubtitle}"`}
                    <br/>                    
                    {authorTag}
                </p>
            </div>
        )
}

PageTitle.propTypes={
    pageTitle:PropType.any.isRequired,
    pageSubtitle:PropType.any,
    hasQuote:PropType.bool, 
    author:PropType.string,
    className:PropType.string
}


/*
Page Container 
with padding right and left.
Responsive padding.
Min-width: 1440px

*/

export const PageContainer = (props)=>{
    const{
        className,
        castShadow,
        id,
        key,
        animate        
    } = props
    const pageContainerClasses = classnames("page-container",{"page-container-cast-shadow":castShadow,"animate":animate},className)
    return(
        <div className={pageContainerClasses} id={id} key={key}>
            {props.children}
        </div>
    )
}

PageContainer.propTypes = {
    className:PropType.string,
    castShadow:PropType.bool,
    id:PropType.any,
    key:PropType.any,
    animate:PropType.bool
}

export const PageRow = React.forwardRef((props,ref)=>{
    const{
        className,
        id,
        animate        
    } = props
    const pageRowClasses = classnames("page-row",{"animate":animate},className)
    return(
        <div className={pageRowClasses} id={id} key={id} ref={ref}>
            {props.children}
        </div>
    )
})



export const PageContent = (props)=>{
    const {className,
        id,
        key,
        animate
    } = props
    const pageContentClass = classnames("page-content",{"animate":animate},className)
    return(
        <div className={pageContentClass}>
            {props.children}
        </div>)
}

export const PageSection = React.forwardRef((props,ref)=>{
    const {className,
        id,
        animate
    } = props
    const pageSectionClass = classnames("page-section",{"animate":animate},className)
    return(
        <div key={id} className={pageSectionClass} ref={ref}>
            {props.children}
        </div>)
})

export const SectionRow = React.forwardRef((props,ref) =>{
    const {className,
    id,
    animate,
    hasGutters
    } =props

    const sectionClasses = classnames("section-row",{"animate":animate,"no-gutters":!hasGutters},className)
    return(
        <div className={sectionClasses} ref={ref}>
            {props.children}
        </div>
    )
})
