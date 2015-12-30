/*
  This is the entry point. Export a react component here.
*/
import React, {Component} from 'react'
import AudienceCard from './components/AudienceCard'

import { List } from 'material-ui'

export default class AudienceList extends Component{

  render() {
    return (
      <List
        primaryText="Audience Members"
      >
        Audience Members
        {this.props.audience.map((user, i) => {
          return <AudienceCard user={user} key={i} />
        })}
      </List>
    )
  }
}
