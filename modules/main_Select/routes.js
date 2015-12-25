module.exports = {
  // Register path with router in root/entry/client/routes.jsx
  path: 'select',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./select.jsx'))
    })
  }
}
