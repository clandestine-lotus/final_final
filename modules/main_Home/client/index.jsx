// Exports a redux connection at the bottom
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Pace from 'sub_Pace/client/index'
import { Speedometer } from 'sub_Speedometer/client/index'
import Login from 'sub_Login/client/index'
import * as homeActions from './components/HomeActions'
import Presentations from 'db/Presentations'

import { RaisedButton, AppBar } from 'material-ui'

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
    const hero = {
      // TODO: make height responsive
      height: window.innerHeight,
      backgroundImage: 'url("http://www.yafta.org/wp-content/uploads/2015/08/yafta_public-speaking_05-3600x2400.jpg")',
      backgroundSize: 'cover',
    }

    const title = {
      color: 'white',
      fontSize: '4rem',
      fontWeight: '100',
      textDecoration: 'none',
    }

    const nav = {
      position: 'fixed',
      top: '0',
      left: '0',
    }

    const createOrJoin = {
      padding: '4rem 0',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -25%)',
      textAlign: 'center',
      color: 'white',
      // backgroundColor: 'rgba(255, 255, 255, 0.7)',
    }

    const create = {
      height: '7rem',
      width: '30rem',
    }

    const join = Object.assign(create, {
      textAlign: 'center',
      fontSize: '3rem',
      color: 'black',
    })

    return (
      <div className="hero" style={hero}>
      <AppBar
        title={<Link to="/" style={title}>final_final</Link>}
        iconElementRight={<Login />}
        showMenuIconButton={false}
        style={nav}
      />

        <div>
          <div className="row u-full-width">
            <div className="column" style={createOrJoin}>
              {/*this.props.Home.get('loggedIn') ? <Link to = "/selectpresentation"> Make a presentation </Link> : null*/}
              <Link to="/deckpicker">
                <RaisedButton disabled={!Meteor.userId()} style={create}>
                  <span style={{fontSize: '3rem'}}>{Meteor.userId() ? 'Create' : 'Login to create'}</span>
                </RaisedButton>
              </Link>

              <div style={{fontSize: '3rem', margin: '1rem'}}>- or -</div>

              <form onSubmit={this.submitCode.bind(this)}>
                <input placeholder="Enter Code" maxLength={4} style={join} />
              </form>

              {this.props.Home.get('presentationCode') ? <Link to = "/audience"> Join a presentation </Link> : null}
              {this.props.Home.get('invalidCode') ? 'Please Enter Valid Code' : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
        /*<Speedometer speed={parseFloat(store.getState().pace.get('currentPace'))} />

          <Pace />*/

function mapStateToProps(state) {
  return {
    Home: state.Home,
    State: state,
  }
}

export default connect(mapStateToProps, homeActions)(Home)
