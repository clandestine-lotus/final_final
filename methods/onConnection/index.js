export default function () {
  Meteor.onConnection(function (connection) {
    console.log(connection);
    connection.onClose(function () {
      console.log('left')
    })
  })
}
