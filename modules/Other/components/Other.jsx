import React, { Component } from 'react'
import style from '../css/other.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CounterActions from './CounterActions.jsx'
import Counter from './Counter.jsx'

// import ReactMixin from 'react-mixin';

// @ReactMixin.decorate(ReactMeteorData)

class Other extends Component {
  render() {
    // this gets injected by the connect() call
    const { counter, dispatch } = this.props;
    return (
      <Counter counter={counter} {...bindActionCreators(CounterActions, dispatch)} />
    );
  }
}

function select(state) {
  return {
    counter: state.counter
  }
}

// console.log(Meteor);
Meteor.call('doSomething', {}, function (e, data) {
  console.log(e);
  console.log(data);
});

export default connect(select)(Other)
