// Exports a redux connection at the bottom
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Login from 'sub_Login/client/index'
import * as homeActions from './components/HomeReductions'
import Presentations from 'db/Presentations'
import Select from 'main_SelectPresentation/client/index'

import { RaisedButton, AppBar, Dialog } from 'material-ui'

let Home = React.createClass({
  componentWillMount() {
    // Track login state to show/hide presentations button dynamically
    Tracker.autorun(() => {
      if (Meteor.userId()){
        this.props.login();
      } else {
        this.props.logout();
      }
    });
  },

  submitCode(event) {
    event.preventDefault();

    let code = event.target[0].value;
    // Validate code
    let pres = Presentations.findOne({ code })
    if (pres) {
      this.props.codeValidation(false);
      this.props.submitCode(pres.gid);
    } else {
      this.props.codeValidation(true);
    }
  },

  render() {
    let hero = {
      // TODO: make height responsive
      height: window.innerHeight,
      backgroundImage: 'url("http://www.yafta.org/wp-content/uploads/2015/08/yafta_public-speaking_05-3600x2400.jpg")',
      backgroundSize: 'cover',
    }

    const title = {
      color: 'white',
      fontSize: '4rem',
      fontWeight: '300',
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
    }

    const create = {
      height: '7rem',
      width: '30rem',
    }

    const join = Object.assign({}, create, {
      textAlign: 'center',
      fontSize: '3rem',
      color: '#00bcd4',
      margin: '0',
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
          <Dialog
            title="Select a Presentation"
            actions={[{ text: 'Cancel' }]}
            autoDetectWindowHeight
            autoScrollBodyContent
            open={this.props.home.get('showSelect')}
            onRequestClose={this.props.openSelect.bind(null, false)}
          ><Select />
          </Dialog>

          <div className="row u-full-width">
            <div className="column" style={createOrJoin}>
              <RaisedButton
                disabled={!this.props.home.get('loggedIn')}
                label={this.props.home.get('loggedIn') ? 'Create!' : 'Login to create'}
                labelStyle={this.props.home.get('loggedIn') ? {color: '#00bcd4', fontSize: '3rem'} : {fontSize: '2.5rem'}}
                style={create}
                onClick={this.props.openSelect.bind(null, true)}
                onTouchTap={this.props.openSelect.bind(null, true)}
              />
              <div style={{fontSize: '3rem', margin: '1rem'}}>- or -</div>

              <form onSubmit={this.submitCode.bind(this)} style={{margin: '0'}}>
                <input placeholder="Enter Code" maxLength={4} style={join} />
              </form>

              {this.props.home.get('presentationCode') ? <Link to = "/audience">Join!</Link> : null}
              {this.props.home.get('invalidCode') ? 'Please Enter Valid Code' : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
    home: state.home,
  }
}

export default connect(mapStateToProps, homeActions)(Home)
