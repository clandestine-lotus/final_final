import Presentations from 'db/Presentations'

export default function (gid) {
  // window.onunload = function () {
  let doit = Meteor.bindEnvironment((gid) => {
    console.log('connection closed!!!');
    Presentations.update(
      {gid: gid},
      {$unset: {code: ""}}
    );
  });
  doit(gid);
  // }
  // Meteor.onConnection(function (connection) {
  //   console.log('connecte!!! ', connection);
  //   connection.onClose(function () {
  //   });
  // });
}


// let doIt = Meteor.bindEnvironment((err, svgs)=>{
//     if(err) {
//       console.error('from bind env ', err)
//     }
//     Meteor.call('createSharingCode', 4, function (err, res) {
//       console.log('code ', res);
//       Presentations.upsert({gid: gid}, {$set:
//         {
//           svgs: svgs,
//           url: url,
//           user: id,
//           gid: gid,
//           index: 0,
//           code: res
//         }
//       });
//     });
//     // update or insert a presentation in database
//     setTimeout(function () {
//       console.log('cleanup ', gid);
//       Presentations.update(
//         {gid: gid},
//         {$unset: {code: ''}}
//       );
//     }, 1000);
//   });