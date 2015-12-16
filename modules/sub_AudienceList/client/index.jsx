/*
  This is the entry point. Export a react component here.
*/
import React, {Component} from 'react';
import AudienceCard from './components/AudienceCard'

export default class AudienceList extends Component{
  
  render() {
    return (
      <div>
        Audience Members
        {this.props.audience.map((user) =>{
          return <AudienceCard user={user} />
        })}
      </div>
    )
  }
}
