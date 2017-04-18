// import React from 'react';
// import { render } from 'react-dom';
// import App from './components/App';
//
// render(
//   <App />,
//   document.getElementById('root')
// );

var Child = React.createClass({
  render : function() {
    var key = 0;
    var textVals = this.props.children.map(function(text) {
      var date = new Date().toString();
      return <li key={key++}>{key} . {text} - {date}</li>;
    });
    return (
      <div>
        <p>{this.props.textVal}</p>
        <ul>{textVals}</ul>
      </div>
    );
  }
});

var ChildInput = React.createClass({
  _onChange : function(e) {
    this.props.onChange(e.target.value);
  },

  _onKeyDown : function(e) {
    if(e.keyCode == 13) {
      this.props.onSave(e.target.value);
      e.target.value = "";
    }
  },

  render : function() {
    return (
      <input type="text" onChange={this._onChange} onKeyDown={this._onKeyDown} />
    );
  }
});

var Form = React.createClass({
  getInitialState : function() {
    return {
      textVal : "",
      children : []
    };
  },

  setStateTextVal : function(text) {
    this.setState({
      textVal : text
    });
  },

  setStateChildren : function(text) {
    var textVals = this.state.children.concat(text);
    this.setState({children : textVals})
  },

  render : function() {
    return (
      <div>
        <p>入力してエンターキーを押してください</p>
        <ChildInput onChange={this.setStateTextVal} onSave={this.setStateChildren} />
        <Child textVal={this.state.textVal} children={this.state.children} />
      </div>
    );
  }
});

var App = React.createClass({
  render : function() {
    return (
      <Form />
    );
  }
});


React.render(<App />, document.getElementById('root'));
