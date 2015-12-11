/*
  This is the entry point. Export a react component here.
*/

import React, { Component } from 'react'
import selectPresentation from '../../globals/selectPresentation'

export default class Preview extends Component {
  propTypes: {
    // require data proto --> contains all link info
    data: React.PropTypes.object.isRequired
  }

  // set state of svgs to empty array
  // getInitialState() {
  //   return {svgs: []}
  // }

  selectPresentation() {
    let link = this.props.data.link.slice(0, this.props.data.link.length - 7) + 'embed';
    let params = {
      user: Meteor.user()._id,
      link: link,
      gid: this.props.data.gid
    }
    selectPresentation(params);
    // declare identifier variables in function scope
    // let react = this;
    // // opens a query and waits for a change to occur
    // Presentations.find({gid: gid.toString()}).observe({
    //   added: function (newDoc) {
    //     console.log('we have a change', newDoc);
    //     react.setState({svgs: newDoc.svgs});

    //   }
    // });
    // // call method to create a presentation
    // Meteor.call('createPresentation', link, user, gid, function (err, result) {
    //   if(err){
    //     console.error(err);
    //   };
    // })
  }

  makeSlides() {
    if(this.state.svgs.length > 0){
      return <Slides svgs={this.state.svgs} />
    }
  }

  render() {
    return (
        <div onClick={this.selectPresentation.bind(this)}>
          <img src={this.props.data.thumbnail}/>
          <h1>presentation: {this.props.data.title}</h1>
        </div>
    )
  }
}
