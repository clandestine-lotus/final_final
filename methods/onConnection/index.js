import Presentations from 'db/Presentations'

export default function (gid) {
  Meteor.onConnection(function (connection) {
    console.log(connection);
    connection.onClose(function () {
      Presentations.update(
        {gid: gid},
        {$set: {code: null}},
        function () {
          console.log('dine')
        }
      )
    })
  })
}
