import React, { Component } from 'react'
import BScroll from 'better-scroll'
function Item({v, style}) {
  const _style = { width: 100,height: 100, background: `hsl(${30 + 50*v},60%,50%)`, textAlign: 'center' }
  return <div style={Object.assign(_style, style)}>item {v}</div>
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: [1,2,3,4,1,2,3,4],
      style: {
        animation: 'scroll 3s linear 0s infinite running'
      }
    }
  }   

  handleClick = () => {
    console.log(this.state.style.animation.includes('running'));
    if (this.state.style.animation.includes('running')){
      this.setState({
        style: {
          animation: 'scroll 1s linear 0s infinite paused'
        }
      })
    }else {
      this.setState({
        style: {
          animation: 'scroll 1s linear 0s infinite running'
        }
      })
    }
  }
  
  componentWillMount() {
    const style = `@keyframes scroll {
      0% {
        transform: translate(0,0) scale(1) translateZ(0);
      }
      100% {
        transform: translate(0,-${100*4}px) scale(1) translateZ(0);
      }
    }`
    const styleEl = document.createElement('style')
    styleEl.textContent = style
    document.querySelector('head').appendChild(styleEl)
  }

  render() {
    const { arr, style } = this.state
    const _style = {overflowY: 'auto', width: 100, height: 250, margin: 50, background: 'hsl(20, 50%, 90%)'}
    return (
      <div className="container" style={_style}> 
        <div style={style} onClick={this.handleClick}>
          {arr.map((v,i) => <Item v={v} key={i} />)}
        </div>
      </div>
    )
  }
}
