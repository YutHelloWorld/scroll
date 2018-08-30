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
      arr: [1,2,3,4,5,6,7],
      c: 0
    }
    this.el = React.createRef();
    this.inner = React.createRef();
  }
  
  autoPlay = () => {
    this.play = setInterval(() => {
      this.scroll.scrollBy(0, -5,1000)
    },100)
  }

  clearPlay= () => {
    clearInterval(this.play)
  }

  handleScroll = ({x, y}) => {
    const perHeight = 100;  // 单个卡片高度
    let count = 250; // 可视高度
    let n,head,body
    let arr = this.state.arr
    
    let remain
    const length = arr.length
    const totalHeight = length *perHeight;
    
    if (y<=0) {
      remain = totalHeight + y
      n = parseInt(-y / perHeight)
      // 2.5个向上取整3个作为上限
      if (remain < Math.ceil(count/perHeight)*perHeight && remain >= count ) {
        head = arr.slice(0, n);
        body = arr.slice(n)
        arr = body.concat(head)
        this.setState({
          arr
        })
        this.scroll.scrollTo(0,0,0);
      }
    } else {
      const j =  Math.ceil(count/perHeight)
      head = arr.slice(0, j)
      body = arr.slice(j)
      arr = body.concat(head)
      this.setState({
        arr
      })
      this.scroll.scrollTo(0, (j- length) * perHeight,0)
    }
  }
  
  
  componentDidMount() {
    this.scroll = new BScroll(this.el.current,{
      probeType: 3,
      // click: true,
      momentum: false,
      // bounce: false
    })
    this.scroll.on('scroll',this.handleScroll)
    this.autoPlay();
  }
  
  componentWillUnmount() {
    this.clearPlay();
    this.scroll.destroy();
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
      <div style={{overflowY: 'auto', width: 100, height: 250, marginTop: 50, background: 'hsl(20, 50%, 90%)' }} ref={this.el}> 
        <div ref={this.inner}>
          {arr.map((v,i) => <Item v={v} key={v} />)}
        </div>
      </div>
    )
  }
}
