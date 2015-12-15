// Exports a redux connection at the bottom
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Login from 'sub_Login/client/index'
import * as homeActions from './components/HomeActions'

class Home extends Component {
  componentWillMount() {
    // Track login state to show/hide presentations button dynamically
    Tracker.autorun(() => {
      if (Meteor.userId()){
        this.props.login();
      } else {
        this.props.logout();
      }
    });
  }

  submitCode(event) {
    event.preventDefault();
    let code = event.target[0].value;
    let submitCode = this.props.submitCode;

    // TODO: add code validation
    const validCode = true;
    if (!validCode) {
      return false;
    }

    submitCode(code);
  }

  render() {
    return (
      <div >
        <Login />

        <br />
        {this.props.Home.loggedIn ? <Link to = "/selectpresentation"> Make a presentation </Link> : null}

        <form onSubmit={this.submitCode.bind(this)}>
          <input placeholder="Enter presentation code" />
        </form>

        {this.props.Home.presentationCode ? <Link to = "/audience"> Join a presentation </Link> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Home: state.Home
  }
}

export default connect(mapStateToProps, homeActions)(Home)
