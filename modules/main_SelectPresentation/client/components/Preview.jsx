/*
  This is the entry point. Export a react component here.
*/

import React, { Component } from 'react'

export default class Preview extends Component {
  constructor() {
    super();
    this.presentation = this.presentation.bind(this);
  }

  presentation() {
    this.props.setPresentation(5);
    // declare identifier variables in function scope
    let user = Meteor.user()._id;
    let link = this.props.data.link;
    let gid = this.props.data.gid;
    let react = this;
    // opens a query and waits for a change to occur
    // call method to create a presentation
    Meteor.call('createPresentation', link, user, gid, function (err, result) {
      if(err){
        console.error('from preview ', err);
      };
      console.log(react);
      console.log(result);
      react.props.setPresentation(gid);
      // reRoute to the projector view! 
    })
  }

  render() {
    return (
        <div onClick={this.presentation}>
          <img src={this.props.data.thumbnail}/>
          <h1>{this.props.data.title}</h1>
        </div>
    )
  }
}
