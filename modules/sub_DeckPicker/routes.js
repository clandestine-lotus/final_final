module.exports = {
  // Register path with router in root/entry/client/routes.jsx
  path: 'deckpicker',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./index.jsx'))
    })
  }
}
