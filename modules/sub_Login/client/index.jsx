/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react';

export default class Login extends Component {
  componentDidMount() {
    // console.log(Template.loginButtons.toString());

    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      React.findDOMNode(this.refs.container));
  }

  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}
