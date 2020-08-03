import React from "react";



export default class Audio extends React.Component<any, any> {
  audio: React.RefObject<any>

  constructor(props: any) {
    super(props);

    this.audio = React.createRef()
  }

  componentDidMount() {
    this.audio.current.play()
  }


  render() {
    return <audio src="/meta/dida.mp3" controls loop ref={this.audio}/>
  }

  componentWillUnmount() {
    this.audio.current.pause()
  }
}
