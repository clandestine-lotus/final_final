module.exports = {
  path: 'other',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Other'))
    })
  }
}

if (Meteor.isServer){
  console.log('THIS IS SERVER');
}
