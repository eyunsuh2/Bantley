import React from "react";
import ChampionPortrait from './ChampionPortrait';

import "../App.css";

class ChampionRecommend extends React.Component {
  render() {
    return(
      <div className="champion-recommend-container">
        <ChampionPortrait championKey={this.props.championKey}/>
      </div>
    )
  }
}

export default ChampionRecommend