import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Color from 'follower/Color';

const style = {
  container: {
    width: 20,
    height: 20,
    display: 'inline-flex',
  },
  popover: {
    display: 'none',
    position: 'absolute',
    width: 40,
    height: 40,
    marginTop: '22px',
  },
};

class ColorChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popover: {},
      activeColor: 'red',
    };
  }

  componentDidMount() {
    if (this.props.hide) {
      this.hide();
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.hide) {
      this.hide();
    }
  }

  onClick = () => {
    this.setState({ popover: { display: 'block' } });
  }

  hide() {
    this.setState({ popover: { display: 'none' } });
  }

  changeColor = (color) => {
    this.setState({ activeColor: color });
    this.props.currentNote.changeColor(color);
    this.hide();
  }

  render() {
    return (
      <div style={style.container}>
        <Color
          color={this.state.activeColor}
          onClick={this.onClick}
        />
        <div style={Object.assign({}, style.popover, this.state.popover)}>
          <Color
            color="red"
            onClick={() => this.changeColor('red')}
          />
          <Color
            color="green"
            onClick={() => this.changeColor('green')}
          />
          <Color
            color="yellow"
            onClick={() => this.changeColor('yellow')}
          />
          <Color
            color="blue"
            onClick={() => this.changeColor('blue')}
          />
        </div>
      </div>
    );
  }
}

ColorChanger.propTypes = {
  hide: PropTypes.bool.isRequired,
  currentNote: PropTypes.object.isRequired, // eslint-disable-line
};


export default ColorChanger;
