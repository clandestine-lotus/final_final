// Exports a redux connection at the bottom
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { Pace } from 'sub_Pace/client/index'
import Login from 'sub_Login/client/index'
import * as homeActions from './components/HomeActions'
import Presentations from 'db/Presentations'

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
    // TODO: add code validation
    let pres = Presentations.findOne({code: code})
    if (pres) {
      this.props.codeValidation(false);
      this.props.submitCode(pres.gid);
    } else {
      this.props.codeValidation(true);
    }
  }

  render() {
    return (
      <div >
        <Login />

        <br />
        <Link to="/deckpicker"> test </Link>
        {this.props.Home.get('loggedIn') ? <Link to = "/selectpresentation"> Make a presentation </Link> : null}

        <form onSubmit={this.submitCode.bind(this)}>
          <input placeholder="Enter presentation code" />
        </form>

        {this.props.Home.get('presentationCode') ? <Link to = "/audience"> Join a presentation </Link> : null}
        {this.props.Home.get('invalidCode') ? 'Please Enter Valid Code' : null}

        <Pace />
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
