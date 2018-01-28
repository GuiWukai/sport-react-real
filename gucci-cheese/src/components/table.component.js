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
        Header: 'Position',
        accessor: 'PositionAbbreviation'
      }, {
        Header: 'First Name',
        accessor: 'FirstName'
      }, {
        Header: 'Last Name',
        accessor: 'LastName'
      }, {
        Header: 'Team Name',
        accessor: 'TeamName'
      }, {
        Header: 'Weight',
        accessor: 'WeightPounds'
      }, {
        Header: 'Height',
        accessor: 'HeightFeet'
      }, {
        Header: 'Assists',
        accessor: 'StatisticDetails.AssistsPerGame'
      }, {
        Header: 'Rebound',
        accessor: 'StatisticDetails.ReboundsTotalPerGame'
      }, {
        Header: 'Points',
        accessor: 'StatisticDetails.PointsPerGame'
      }, {
        Header: 'Steals',
        accessor: 'StatisticDetails.StealsPerGame'
      }, {
        Header: 'FG%',
        accessor: 'StatisticDetails.FieldGoalsPercentage'
      }, {
        expander: true,
        Header: () => <strong>More</strong>,
        Expander: ({ isExpanded, ...rest }) =>
            <div className = "extend-button">
            {isExpanded
                ? <span className="extend-button__logo">-</span>
                : <span className="extend-button__logo">+</span>}
            </div>,
        style: {
            cursor: "pointer",
            fontSize: 25,
            padding: "0",
            textAlign: "center",
            userSelect: "none"
        }
    }  
    ]

    return (
      <ReactTable 
      data={data} 
      columns={columns} 
      SubComponent={row => {
        console.log(row)
        return (
            <div>
              <div>{row.row["_original"].Age}</div>
            </div>                      
        );
      }}
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            this.setState(function(state) {
              var row = rowInfo.row
              if(row.active !== undefined || row.active === false){
                row.active = true   
                return {
                  currentSelect: state.currentSelect.concat(row)
                }             
              }else{
                row.active = false
              }
              
            }
          )
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
      }
    }
    />
        
      
      ) 
    }
}