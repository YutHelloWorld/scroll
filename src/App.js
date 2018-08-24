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
      arr: [1,2,3,4],
      c: 0
    }
    this.el = React.createRef();
  }
  
  

  handleScroll = ({x, y}) => {
    const itemCount = 4
    const perHeight = 100;
    const { c } = this.state
    let n
    if (y<0) {
      n = parseInt((-y) / perHeight);
      
      if(n===2) {
        if(!c) {
          this.setState({
            arr: [3,4,1,2],
            c: 1
          })
          console.log('n---',n);
        } else {
          this.setState({
            arr: [1,2,3,4],
            c: 0
          })
          console.log('n---',n);
        }
        this.scroll.scrollTo(0,0)
      }
    } else {
      n = parseInt((y) / perHeight);
      if (!c) {
        this.setState({
          arr: [3,4,1,2],
          c: 1
        })
      }else {
        this.setState({
          arr: [1,2,3,4],
          c: 0
        })
      }
      
      this.scroll.scrollTo(0,-200)
    }
    
  }
  
  
  componentDidMount() {
    this.scroll = new BScroll(this.el.current,{
      probeType: 3,
      click: true,
      // bounce: false,
      // momentum: false
    })
    this.scroll.on('scroll',this.handleScroll)
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    this.scroll = new BScroll(this.el.current,{
      probeType: 3,
      click: true,
      // bounce: false,
      // momentum: false
    })
    this.scroll.on('scroll',this.handleScroll)
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.state.arr) !== JSON.stringify(nextState.arr)
  }
  
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.translateYs);
  }
  
  render() {
    const { arr } = this.state
    return (
      <div style={{overflowY: 'auto', width: 100, height: 200, marginTop: 100, background: 'hsl(20, 50%, 90%)' }} ref={this.el}> 
        <div>
          {arr.map((v,i) => <Item v={v} key={v} />)}
        </div>
      </div>
    )
  }
}
