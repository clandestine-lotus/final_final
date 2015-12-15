import Audience from 'db/Audience'

  // method for changing the index of the slide for the current presentation
export function updatePace (id, delta) {
  Audience.update(
    {presId: id},
    {
      $setOnInsert: {rawSpeed: delta},
      $inc: {rawSpeed: delta},
    },
    { upsert: true }
  )
}

export function updateUserCount (id, delta) {
  Audience.update(
    {presId: id},
    {
      $setOnInsert: {numUsers: 1},
      $inc: {numUsers: delta},
    },
    { upsert: true }
  )
}
