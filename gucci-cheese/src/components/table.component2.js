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
    fetch('http://conu.astuce.media/api/sports/football/person/stats?Coverage=Season&Take=300&Skip=0&affiliation=17435833f1ed42848320a80f013bbb3f&season=84f210d08e644c6e89e4a80f013cf46b&OrderBy=-Goals&callback=myCallback').then((response) => {
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
        accessor: 'PositionCode'
        Cell: props => <span>{props.value.toUpperCase()} </span>
      }, {
        Header: 'Age',
        accessor: 'Age'
      }, {
        Header: 'Weight',
        accessor: 'WeightPounds'
      }, {
        Header: 'Goals',
        accessor: 'Statistics.Goals'
      }, {
        Header: 'Touches',
        accessor: 'Touches'
      },{
        
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