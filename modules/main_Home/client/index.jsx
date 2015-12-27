// Exports a redux connection at the bottom
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Login from 'sub_Login/client'
import * as homeActions from 'dux/HomeReductions'
// Use getMeteorData() instead
import Codes from 'db/Codes'
import Select from 'main_Select/client'

import { RaisedButton, AppBar, Dialog } from 'material-ui'
// TODO: Use theming to pick colors
import { Colors } from 'material-ui/styles'

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

  // Get the presentation data for shortcode validation
  // getMeteorData() {

  // },

  submitCode(event) {
    event.preventDefault();

    let code = event.target[0].value;
    // Validate code
    let show = Codes.findOne(code)
    if (show) {
      this.props.codeValidation(false);
      this.props.submitCode(show._id);
    } else {
      this.props.codeValidation(true);
    }
  },

  render() {
    let primaryColor = Colors.cyan500;

    let hero = {
      height: '100vh',
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

    const dialogTitle = {
      backgroundColor: primaryColor,
      color: 'white',
      padding: '1rem 2rem',
      fontWeight: '300',
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
      color: primaryColor,
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
            title={<h3 style={dialogTitle}>Select a Presentation</h3>}
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
                labelStyle={this.props.home.get('loggedIn') ? {color: primaryColor, fontSize: '3rem'} : {fontSize: '2.5rem'}}
                style={create}
                onClick={this.props.openSelect.bind(null, true)}
                onTouchTap={this.props.openSelect.bind(null, true)}
              />
              <div style={{fontSize: '3rem', margin: '1rem'}}>- or -</div>

              <form onSubmit={this.submitCode} style={{margin: '0'}}>
                <input placeholder="Enter Code" maxLength={4} style={join} />
              </form>

              {/*TODO: Simplify this double tertiary*/}
              {this.props.home.get('presentationCode') ?  <Link to = {`/audience/${this.props.home.get('presentationCode')}`}>Join!</Link> : null}
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
