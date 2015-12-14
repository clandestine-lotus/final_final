// import all methods here (export must be a function)
import doSomething from './method1'
import Presentations from '../modules/db/Presentations.js'
const getSVG = Meteor.npmRequire('google-slides-downloader')

// add to combined Meteor.methods, which will have the var name.
Meteor.methods({
  createPresentation: function (url, id, gid, cb) {
    // change privacy setting of the presentation to public
    let doIt = Meteor.bindEnvironment((err, svgs)=>{
      if(err) {
        console.error('from bind env ', err)
      }
      // update or insert a presentation in database
      Presentations.upsert({gid: gid}, {
        svgs: svgs,
        url: url,
        user: id,
        gid: gid,
        index: 0
      });
    })
    GoogleApi.post('drive/v2/files/' + gid + '/permissions', {data: {'type': 'anyone', 'role': 'reader'}}, function (err, result) {
      // pass in url to get an array of svgs
      getSVG.getSVGs(url, doIt);
    });
  }, 
  changeIndex: function (gid, index, cb) {
    console.log('are we updating?')
    Presentations.update({gid: gid.toString()}, {$set: {index: index}})
  } 
})
