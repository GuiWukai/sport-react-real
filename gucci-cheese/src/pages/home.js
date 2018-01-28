import React, { Component } from 'react';
import Table from '../components/table.component';
import {ChooseSport} from '../components/chooseSport.component';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      bascketball: 'http://conu.astuce.media/api/sports/basketball/gfx/statistic/person/ranking.json' +
      '?IncludeLinks=false&RoundId=14&Stat=Points&Take=200'
    }
    this.handleState = this.handleState.bind(this)
  }

  handleState(sport) {
    console.log(sport)
  }

  render() {

    var handleState = this.handleState

    return (
      <div>
          <ChooseSport handleState = {handleState}/>
          <Table />
      </div>
    );
  }
}