const getSVG = Meteor.npmRequire('google-slides-downloader')

Meteor.methods({
  // method for creating a new presentation in database with svg elements
  createPresentation: function (url, id, gid, cb) {
    // change privacy setting of the presentation to public
    GoogleApi.post('drive/v2/files/' + gid + '/permissions', {data: {'type': 'anyone', 'role': 'reader'}}, function (err, result) {
      // pass in url to get an array of svgs
      getSVG.getSVGs(url).then(function (svgs){
        // update or insert a presentation in database
        Presentations.upsert({gid: gid.toString()}, {
          svgs: svgs,
          url: url,
          user: id,
          gid: gid
        });
        // return svgs;
      })
    })
  }
})
