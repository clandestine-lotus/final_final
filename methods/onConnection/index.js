import Codes from 'db/Codes'

export default function (gid) {
  Meteor.onConnection(function (connection) {
    console.log(connection);
    connection.onClose(function () {
      console.log('closing', gid);
      Codes.remove({gid: gid});
    })
  })
}
