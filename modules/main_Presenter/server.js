// Import only global methods that the server will use
// ? Server would call them with Meteor.call('methodName', a,r,g,s, callback)
// ? Alternative : methodName(a,r,g,s)
// ??? This previous sentence needs checking. Please do it.
import './globals/example.js'
// import './globals/collections.js'
