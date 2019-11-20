import React from 'react'
import AOS from 'aos'; 
import 'aos/dist/aos.css';
import classnames from 'classnames'
import styled from 'styled-components'

const StyledDiv = styled.div`${props => props.css}`
export class AnimatedSection extends React.Component{
    constructor(props, context) { 
        super(props, context); 
        AOS.init(); 
      } 
      componentWillReceiveProps (){ 
        AOS.refresh(); 
      } 
      render(){
    const {id,
            style,
            animateOnce,
            animation,
            animationEasing,
            duration
                    } = this.props
    const sectionClass = classnames(this.props.class)
    return(
        <StyledDiv data-aos={animation} data-aos-once={animateOnce} data-aos-easing={animationEasing} data-aos-duration={duration} css={style} className={sectionClass} id={id}>
            {this.props.children}
        </StyledDiv>
    )
}
}

export const Section = props =>{
  const {id,style} = props
  const sectionClass = classnames(props.class)
  return(
      <StyledDiv css={style} className={sectionClass} id={id}>
          {props.children}
      </StyledDiv>
  )
}

