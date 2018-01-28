import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'whatwg-fetch';
import PlayerStats from '../components/playerStats.component';
import numeral from 'numeral';

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
        '?IncludeLinks=true&RoundId=14&Stat=Points&Take=500').then((response) => {
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

    const basketballcolumns = [
      {
        Header: 'Rank',
        accessor: 'Rank',
        minWidth: 40
      }, {
        Header: 'Position',
        accessor: 'PositionAbbreviation',
        minWidth: 60
      }, {
        Header: 'First Name',
        accessor: 'FirstName',
        minWidth: 70
      }, {
        Header: 'Last Name',
        accessor: 'LastName',
        minWidth: 70
      }, {
        Header: 'Team Name',
        accessor: 'TeamName',
        minWidth: 70
      }, {
        Header: 'Weight',
        accessor: 'WeightPounds',
        minWidth: 70
      }, {
        Header: 'Height',
        accessor: 'HeightFeet',
        minWidth: 70
      }, {
        Header: 'Assists',
        accessor: 'StatisticDetails.AssistsPerGame',
        minWidth: 70
      }, {
        Header: 'Rebound',
        accessor: 'StatisticDetails.ReboundsTotalPerGame',
        minWidth: 70
      }, {
        Header: 'Points',
        accessor: 'StatisticDetails.PointsPerGame',
        minWidth: 70
      }, {
        Header: 'Steals',
        accessor: 'StatisticDetails.StealsPerGame',
        minWidth: 70
      },{
        Header: 'Blocks',
        accessor: 'StatisticDetails.BlockedShotsPerGame',
        minWidth: 70
      },{
        Header: 'FG%',
        accessor: 'StatisticDetails.FieldGoalsPercentage',
        minWidth: 70,
        Cell : props => <span>{(props.value === 1)?('1.000'):(numeral(props.value).format('.000'))}</span>      
      }, {
        Header: '3PT%',
        accessor: 'StatisticDetails.ThreePointFieldGoalsPercentage',
        minWidth: 70,
        Cell : props => <span>{(props.value === 1)?('1.000'):(numeral(props.value).format('.000'))}</span>              
      },{
        Header: 'FT%',
        accessor: 'StatisticDetails.FreeThrowsPercentage',
        minWidth: 70,
        Cell : props => <span>{(props.value === 1)?('1.000'):(numeral(props.value).format('.000'))}</span>             
      },{
        Header: 'Plus/Minus',
        accessor: 'StatisticDetails.PlusMinus',
        minWidth: 70
      },{
        Header: 'Turnovers',
        accessor: 'StatisticDetails.TurnoversPerGame',
        minWidth: 70
      },{
        expander: true,
        minWidth: 70,
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
      headerClassName = 'header'
      className = '-striped'
      defaultPageSize={100}
      resizable={false}
      pageSizeOptions={[100, 200, 500]}
      data={data} 
      columns={basketballcolumns} 
      SubComponent={row => {
        console.log(row)
        return (
          <PlayerStats row = {row}/>                    
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