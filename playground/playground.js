import React, { Component, PropTypes } from 'react';
import Example1 from '../examples/example1';
import Example2 from '../examples/example2';
import Example3 from '../examples/example3';
import Example4 from '../examples/example4';

const style = {
  zIndex: '1000',
  position: 'fixed',
  top: '0px',
  left: '0px',
  padding: '20px',
  background: 'rgba(0,0,0,.2)'
};

class Playground extends Component {
  constructor() {
    super();
    this.state = {
      example: localStorage['example'] ? localStorage['example'] : '1'
    };
  }

  change = val => {
    localStorage['example'] = val;
    this.setState({ example: val });
  };

  render() {
    let example;
    switch(this.state.example) {
    case '1': example = <Example1/>; break;
    case '2': example = <Example2/>; break;
    case '3': example = <Example3/>; break;
    case '4': example = <Example4/>; break;
    }

    return (
      <div>
        <div style={style}>
          <label>
            <input type="radio" name="example" value="1" checked={this.state.example === '1'} onChange={() => this.change('1')}/>
            Example 1
          </label>
          <br/>
          <label>
            <input type="radio" name="example" value="2" checked={this.state.example === '2'} onChange={() => this.change('2')}/>
            Example 2
          </label>
          <br/>
          <label>
            <input type="radio" name="example" value="3" checked={this.state.example === '3'} onChange={() => this.change('3')}/>
            Example 3
          </label>
          <br/>
          <label>
            <input type="radio" name="example" value="4" checked={this.state.example === '4'} onChange={() => this.change('4')}/>
            Example 4
          </label>
        </div>

        {example}
      </div>
    );
  }
}

export default Playground;
