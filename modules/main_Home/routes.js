module.exports = {
  // Register path with router in root/entry/client/routes.jsx
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./home.jsx'))
    })
  }
}
