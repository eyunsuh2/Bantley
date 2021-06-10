import React from "react";
import ChampionPortrait from './ChampionPortrait';

import "../App.css";
import Hidden from '@material-ui/core/Hidden';
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

class TeamPicks extends React.Component {
  render() {
    return(
      <div id={this.props.id}>
        {this.props.picks.map((v) => {
          return <ChampionPortrait championKey={v}
                                   wrapperProps={this.props.portraitWrapperProps}
                                   borderProps={this.props.portraitBorderProps}/>
        })}
      </div>
    )
  }
}

export default TeamPicks