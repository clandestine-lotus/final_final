import Audience from 'db/Audience'

export default function (data) { 
  Audience.insert(data, (x, y)=> {
    console.log(x, y)
  })
}
