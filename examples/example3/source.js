import React, { Component, PropTypes } from 'react';
import { Overflow } from 'react-tether2';

const style = {
  background: 'blue',
  padding: '10px',
  minHeight: '20px',
  overflow: 'scroll',
  boxSizing: 'border-box'
};

class Source extends Component {
  render() {
    return (
      <Overflow target={this.props.target}>
        <div style={style}>
          Tether Source<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
          Line<br/>
        </div>
      </Overflow>
    );
  }
}

export default Source;
