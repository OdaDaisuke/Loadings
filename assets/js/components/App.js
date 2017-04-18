import React, { Component, PropTypes } from 'react'
import Router from 'react-router'

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="app">Home</Link></li>
          <li><Link to="item" params={{itemId : "12"}}>item</Link></li>
          <li><Link to="about">about</Link></li>
        </ul>
        test
        <RouteHandler />
      </div>
    )
  }
}

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={Index} />
    <Route name="item" handler={Item} path="item/:itemId" />
    <Route name="login" handler={Login} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});
