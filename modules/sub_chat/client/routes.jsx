  // Register path with router in root/entry/client/routes.jsx
export default {
  path: 'chat',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./posts.jsx'))
    })
  }
}

