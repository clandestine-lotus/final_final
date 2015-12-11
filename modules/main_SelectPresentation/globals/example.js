const getSVG = Meteor.npmRequire('google-slides-downloader')
import Presentations from './collections'

Meteor.methods({
  // method for creating a new presentation in database with svg elements
  createPresentation: function (url, id, gid, cb) {
    // change privacy setting of the presentation to public
    let doIt = Meteor.bindEnvironment((err, svgs)=>{
      if(err) {
        console.error(err)
      }
      // update or insert a presentation in database
      Presentations.upsert({gid: gid}, {
        svgs: svgs,
        url: url,
        user: id,
        gid: gid
      });
      console.log("did we get to here?",err, svgs)
    })
    console.log('inside teh method call')
    GoogleApi.post('drive/v2/files/' + gid + '/permissions', {data: {'type': 'anyone', 'role': 'reader'}}, function (err, result) {
      // pass in url to get an array of svgs
      getSVG.getSVGs(url, doIt)
    })
  },
  test: function () {
    console.log('hello');
  }
})
