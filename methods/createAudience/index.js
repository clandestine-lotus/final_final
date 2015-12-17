import Audience from 'db/Audience'

export default function (info) {
  Audience.insert(info, (err, id)=> {
    if(err) {
      console.error(err) 
    }
    console.log(id)
  })
}
