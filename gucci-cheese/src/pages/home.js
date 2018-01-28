import React, { Component } from 'react';
import Table from '../components/table.component';
// import {ChooseSport} from '../components/chooseSport.component';

// var basketball = 'http://conu.astuce.media/api/sports/basketball/gfx/statistic/person/ranking.json' +
// '?IncludeLinks=false&RoundId=14&Stat=Points&Take=200'
// var baseball = 'http://conu.astuce.media/api/sports/football/person/stats?Coverage=Season&Take=300&Skip=0&affiliation=17435833f1ed42848320a80f013bbb3f&season=84f210d08e644c6e89e4a80f013cf46b&OrderBy=-Goals&callback=myCallback'

export default class Home extends Component {
  // constructor(props){
  //   super(props)
  //   // this.handleState = this.handleState.bind(this)
  // }

  // handleState(sport) {
  //   if(sport === 'basketball'){
  //     this.setState({
  //       current: basketball
  //     })
  //   }else{
  //     this.setState({
  //       current: baseball
  //     })
  //   }
  // }

  render() {

    // var handleState = this.handleState

    return (
      <div>
          {/* <ChooseSport handleState = {handleState}/> */}
          <Table/>
      </div>
    );
  }
}