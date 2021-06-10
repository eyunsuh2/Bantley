import React from "react";

import TeamBans from "./TeamBans"
import "../App.css";

class BanViewer extends React.Component {
  render() {
    return(
      <div>
        <TeamBans className={this.props.className}
                  id='blue-ban'
                  bans={this.props.bans.blue}
                  portraitBorderProps={{
                    border: 3,
                    borderRadius: "50%",
                    borderColor: "rgb(73, 180, 255)"
                  }}/>
        <TeamBans className={this.props.className}
                  id='purple-ban'
                  bans={this.props.bans.purple}
                  portraitBorderProps={{
                    border: 3,
                    borderRadius: "50%",
                    borderColor: "rgb(255, 88, 89)"
                  }}/>
      </div>
    )
  }
}

export default BanViewer