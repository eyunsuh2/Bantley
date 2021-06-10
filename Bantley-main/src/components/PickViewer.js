import React from "react";
import TeamPicks from "./TeamPicks"

class PickViewer extends React.Component {
  render() {
    return(
      <div className={this.props.className}>
        <TeamPicks id="blue-pick"
                   picks={this.props.picks.blue}
                   portraitWrapperProps={{
                     marginTop: 1,
                     marginBottom: 1,
                     // marginLeft: 0.5,
                     p: 2,
                     pl: 1,
                     pr: 11,
                     bgcolor: "rgb(137, 160, 181)",
                     // borderRadius: "16px"
                   }}
                   portraitBorderProps={{
                     border: 3,
                     borderRadius: "50%",
                     borderColor: "rgb(73, 180, 255)"
                   }}/>
        <TeamPicks id="purple-pick"
                   picks={this.props.picks.purple}
                   portraitWrapperProps={{
                     marginTop: 1,
                     marginBottom: 1,
                     // marginRight: 0.5,
                     p: 2,
                     pr: 1,
                     pl: 11,
                     bgcolor: "rgb(137, 160, 181)",
                     // borderRadius: "16px"
                   }}
                   portraitBorderProps={{
                     border: 3,
                     borderRadius: "50%",
                     borderColor: "rgb(255, 88, 89)"
                   }}/>
      </div>
    )
  }
}

export default PickViewer