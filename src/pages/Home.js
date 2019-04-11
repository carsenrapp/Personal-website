import React, { Component } from 'react'
import '../App.css'

import Nav from '../components/Nav'


class Home extends Component {
  constructor(props) {
  super(props)

  this.state = {}
    
 }


 render(){
     return(
        <div className="home page">
          <Nav
            streetNav={() => this.props.history.push('/Photos/Street')}
            otherNav={() => this.props.history.push('/Photos/Other')}
          ></Nav>
          <main className="homeMain">
          <div>
            <h1>Carsen Rapp</h1>
            <p>Web application developer <span className="highlight">@</span> <br className="mobile"/>the City of Shawnee</p>
            <p>Web tutor <span className="highlight">@</span> <br className="mobile"/>Johnson County Community College</p>
          </div>
          </main>
        </div>
     )
 }
}

export default Home