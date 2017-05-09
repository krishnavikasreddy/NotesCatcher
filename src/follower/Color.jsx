import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = {
  container: {
    width: 20,
    height: 20,
    border: '0px none',
    padding: 0,
    margin: 0,
  },
  red: {
    background: 'red',
  },
  blue: {
    background: 'blue',
  },
  green: {
    background: 'green',
  },
  yellow: {
    background: 'yellow',
  },
};

class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: style[props.color],
    };
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      color: style[nextprops.color],
    });
  }

  render() {
    return (
      <button
        style={Object.assign({}, style.container, this.state.color)}
        onClick={this.props.onClick}
      />
    );
  }
}

Color.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
};

Color.defaultProps = {
  color: 'red',
  onClick: () => {},
};

export default Color;
