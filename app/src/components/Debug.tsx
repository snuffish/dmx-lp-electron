// @ts-nocheck
import { Box, Container, Grid } from "@material-ui/core"
import React, { Component, useEffect } from "react"
import { useSelector } from "react-redux"

// class Debug extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       tempo: 0,
//       buttons: []
//     }
//   }

//   componentDidMount() {
     
//   }

//   componentDidUpdate(prevProps, prevState, snapshot?) {
      
//   }

  

//   render() {
//     return (
//       <>xxx
//         {/* <br />
//         <span>Color: {color}</span> */}
//         {/* <br />
//         <span><b>BPM:</b> {(60 * 1000) / window.tempo}</span> | <span><b>Tempo:</b> {window.tempo}</span><br />
//         <span>
//           <b>Buttons</b>
//           <br />
//           {JSON.stringify(buttons)}
//         </span> */}
//       </>
//     )
//   }
// }

const Debug = () => {
  const tempo = useSelector((state: any) => state.pad.tempo)
  const buttons = useSelector((state: any) => state.pad.buttons)

  return (
    <>
      {/* <Grid
        container
        direction='row'
        alignItems='center'
        sx={{ minHeight: '100vh' }}>
        xxx
      </Grid> */}
      {/* <br />
      <span>Color: {color}</span> */}
      <br />
      <span><b>BPM:</b> {(60 * 1000) / window.tempo}</span><br/>
      <span><b>Brightness:</b> {window.brightnessRatio}%</span><br/>
      <span><b>Tempo:</b> {window.tempo}</span><br/>
      {/* <span>
        <b>Buttons</b>
        <br />
        {JSON.stringify(buttons)}
      </span> */}
    </>
  )
}

export default Debug
