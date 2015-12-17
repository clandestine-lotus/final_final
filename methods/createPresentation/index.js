const getSVG = Meteor.npmRequire('google-slides-downloader')
import Presentations from 'db/Presentations'
import Codes from 'db/Codes'

  // method for creating a new presentation in database with svg elements
export default function (url, id, gid, cb) {
  // change privacy setting of the presentation to public
  let doIt = Meteor.bindEnvironment((err, svgs)=>{
    if(err) {
      console.error('from bind env ', err)
    }
    Meteor.call('createSharingCode', 4, function (err, res) {
      console.log('code ', res);
      Presentations.upsert({gid: gid}, {$set:
        {
          svgs: svgs,
          url: url,
          user: id,
          gid: gid,
          index: 0,
          code: res
        }
      });
    });
    // update or insert a presentation in database
    // setTimeout(function () {
    //   console.log('cleanup ', gid);
    //   Presentations.update(
    //     {gid: gid},
    //     {$unset: {code: ''}}
    //   );
    // }, 1000);
  });
  // let cleanup = Meteor.bindEnvironment((gid) => {
  //   console.log('cleanup', gid);
  //   Presentations.update(
  //     {gid: gid},
  //     {$unset: {code: ''}}
  //   );
  // });
  GoogleApi.post('drive/v2/files/' + gid + '/permissions', {data: {'type': 'anyone', 'role': 'reader'}}, function (err, result) {
    // pass in url to get an array of svgs
    getSVG.getSVGs(url, doIt);
  });
}
