import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'whatwg-fetch';

export default class Table extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      currentSelect: []
    }
    this.getData()
  }

  getData() {
    fetch('http://conu.astuce.media/api/sports/basketball/gfx/statistic/person/ranking.json' +
        '?IncludeLinks=false&RoundId=14&Stat=Points&Take=200').then((response) => {
      return response.json()
    }).then((json) => {
      console.log(json)
      this.setState({data: json})
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  render() {

    console.log(this.state)

    const data = this.state.data;

    const columns = [
      {
        Header: 'Rank',
        accessor: 'Rank'
      }, {
        Header: 'First Name',
        accessor: 'FirstName'
      }, {
        Header: 'Last Name',
        accessor: 'LastName'
      }, {
        Header: 'Position',
        accessor: 'PositionAbbreviation'
      }, {
        Header: 'Team Name',
        accessor: 'TeamName'
      }, {
        Header: 'Weight',
        accessor: 'WeightPounds'
      }, {
        Header: 'Assists',
        accessor: 'StatisticDetails.Assists'
      }, {
        Header: 'Age',
        accessor: 'Age'
      }, {
        Header: 'Age',
        accessor: 'Age'
      }
    ]

    return (
      <ReactTable data={data} columns={columns} 
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            this.setState(function(state) {
              return {
               currentSelect: state.currentSelect.concat(rowInfo.row)
              }
            })
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)

            // IMPORTANT! React-Table uses onClick internally to trigger
            // events like expanding SubComponents and pivots.
            // By default a custom 'onClick' handler will override this functionality.
            // If you want to fire the original onClick handler, call the
            // 'handleOriginal' function.
            if (handleOriginal) {
              handleOriginal()
            }
          }
        }
      }}
      />
        
      
      ) 
    }
}