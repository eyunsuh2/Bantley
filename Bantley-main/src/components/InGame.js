import React from "react";

import "../App.css";
import BanViewer from "./BanViewer";
import PickViewer from "./PickViewer"

class InGame extends React.Component {
  render() {
    return(
      <div>
        <BanViewer className="container" bans={this.props.bans} />
        <PickViewer className="container" picks={this.props.picks}/>
      </div>
    )
  }
}

export default InGame