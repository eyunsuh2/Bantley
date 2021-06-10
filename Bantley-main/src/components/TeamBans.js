import React from "react";
import ChampionPortrait from './ChampionPortrait';
import BlockIcon from '@material-ui/icons/Block';

import "../App.css";

class TeamBans extends React.Component {
  render() {
    return(
      <div className={this.props.className} id={this.props.id}>
        {this.props.bans.map( (v) => {
          return <ChampionPortrait
            championKey={v}
            className="banned-champion"
            fallbackIcon={<BlockIcon color="primary" style={{ fontSize: 50 }}/>}
            borderProps={this.props.portraitBorderProps}/>
        })}
      </div>
    )
  }
}

export default TeamBans