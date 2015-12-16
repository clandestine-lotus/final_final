import Presentations from 'db/Presentations'

export default function (gid) {
  Meteor.onConnection(function (connection) {
    console.log(connection);
    connection.onClose(function () {
      console.log('closing');
      Presentations.update(
        {gid: gid},
        {$unset: {code: ""}}
      )
    })
  })
}
