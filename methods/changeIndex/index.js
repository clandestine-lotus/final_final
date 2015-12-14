import Presentations from 'db/Presentations'

  // method for changing the index of the slide for the current presentation
export default function (gid, index, cb) {
    Presentations.update({gid: gid.toString()}, {$set: {index: index}})
}

