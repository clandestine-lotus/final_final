import React, { Component } from 'react';
import { Link } from 'react-router';
import Slides from 'sub_Slides/client/Slides'

export default class Home extends Component {
  test() {
    (() => {
      console.log('HEEELLLOOOOOOOOOO');
    })()

    // console.log('these are slides', Slides);
  }

  render() {
    return (
      < div >
        {this.test()}
        < Link to = "/" > Home < /Link><br />
        < Link to = "other" > Other < /Link><br />
        < Link to = "settings" > Settings < /Link><br />
        < Link to = "presenter" > Presenter < /Link>

        < h1 > This is the Home component. < /h1>
        < Slides />
      < /div>
    );
  }
}
