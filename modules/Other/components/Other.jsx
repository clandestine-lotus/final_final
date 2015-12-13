/*eslint-disable*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CounterActions from 'dux/counter/'
import Counter from './Counter.jsx'
import Immutable from 'immutable'
// import ReactMixin from 'react-mixin';

// @ReactMixin.decorate(ReactMeteorData)

class Other extends Component {
  render() {
    // this gets injected by the connect() call
    const { count, dispatch } = this.props;
    return (
      <Counter count={count} {...bindActionCreators(CounterActions, dispatch)} />
    );
  }
}

function select(state) {
  return {
    count: state.counter
  }
}

// ESLINT: console.logs, uppercase functions should be constructors
console.log(Immutable);
let a = Immutable.Map({a: 1, b: 2, c: 3})
console.log(a.get('b'));
// console.log(Meteor);
Meteor.call('doSomething', {}, function (e, data) {
  console.log(e);
  console.log(data);
});

export default connect(select)(Other)
