import React from "react";
import ChampionRecommend from './ChampionRecommend';

import "../App.css";

class RecommendViewer extends React.Component {
  render() {
    let renderElem = this.props.recommends.slice(0,3)
    return(
      <div>
        <h2 className="recommend-viewer-title">{this.props.title}</h2>
        <div className="recommend-viewer-container">
          {renderElem.map(v => {
            return <ChampionRecommend {...v}/>
          })}
        </div>
      </div>
    )
  }
}

export default RecommendViewer