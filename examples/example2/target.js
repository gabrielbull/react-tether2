import React, { Component, PropTypes } from 'react';
import Source from './source';

class Target extends Component {
  constructor() {
    super();
    this.state = { showSource: false };
  }

  componentDidMount() {
    this.setState({ showSource: true });
  }

  render() {
    return (
      <div style={{ background: 'green', height: '50px', width: '200px', marginLeft: '800px' }}>
        Tether Target
        { this.state.showSource ? <Source target={this}/> : null }
      </div>
    );
  }
}

export default Target;
