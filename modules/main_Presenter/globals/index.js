export default function () {
  console.log(Meteor.user())  

  // Meteor.onConnection(function (connection) {
  //   console.log(connection);
  //   connection.onClose(function () {
  //     console.log('left')
  //   })
  // })
}
