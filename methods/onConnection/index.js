import Codes from 'db/Codes'
import Presentations from 'db/Presentations'

export default function (gid) {
  Meteor.onConnection(function (connection) {
    console.log('connecte!!! ', connection);
    connection.onClose(function () {
      console.log('connection closed!!!');
      Presentations.update(
        {gid: gid},
        {$unset: {code: ""}}
      );
    });
  });
}
