import React from "react";
import Avatar from '@material-ui/core/Avatar';
import getChampionImageLinkByKey from "../readDDragon";
import Box from '@material-ui/core/Box';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import "../App.css";

class ChampionPortrait extends React.Component {

  static defaultProps = {
    wrapperProps: {
      m: 1
    },
    borderProps: {
      border: 3,
      borderRadius: "50%"
    },
    fallbackIcon: <CheckBoxOutlineBlankIcon style={{ fontSize: 80 }} />
  };

  state = {
    src: ""
  }

  componentDidMount() {
    // TODO: Set image when no champion is selected
    if (this.props.championKey !== 0)
      getChampionImageLinkByKey(this.props.championKey)
        .then((link) => this.setState({src:link}))
    else
      this.setState({src: ""})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // TODO: Set image when no champion is selected
    if (prevProps.championKey !== this.props.championKey)
    {
      if (this.props.championKey !== 0)
        getChampionImageLinkByKey(this.props.championKey)
          .then((link) => this.setState({src:link}))
      else
        this.setState({src: ""})
    }
  }

  render() {
    return(
      <Box {...this.props.wrapperProps}>
        <Box {...this.props.borderProps}>
          <Avatar key={this.state.src} src={this.state.src} className={this.props.className} >
            {this.props.fallbackIcon}
          </Avatar>
        </Box>
      </Box>
    )
  }
}

export default ChampionPortrait