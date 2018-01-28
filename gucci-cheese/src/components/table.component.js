import React, {Component} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'whatwg-fetch';
import {RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend} from 'recharts';
import Total from './total.component.js'
// import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
var rd3 = require('recharts');

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
        '?IncludeLinks=false&RoundId=14&Stat=Points&Take=500').then((response) => {
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
        Header: 'Blocks',
        accessor: 'StatisticDetails.BlockedShotsPerGame'
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
      defaultPageSize={100}
      resizable={false}
      pageSizeOptions={[100, 200, 500]}
      data={data}
      columns={columns}
      SubComponent={row => {
        console.log(row)

        var blocks = row.row["_original"].StatisticDetails.BlockedShotsPerGame*100/3;
        var points = row.row["_original"].StatisticDetails.PointsPerGame*100/31;
        var steals = row.row["_original"].StatisticDetails.StealsPerGame*100/2.5;
        var assists = row.row["_original"].StatisticDetails.AssistsPerGame*100/10.5;
        var fg = row.row["_original"].StatisticDetails.FieldGoalsPercentage*100;
        var rebounds = row.row["_original"].StatisticDetails.ReboundsTotalPerGame*100/16;

        var cdata = [
          { subject: 'Points', A: points, fullMark: 40 },
          { subject: 'Rebounds', A: rebounds, fullMark: 20 },
          { subject: 'Assists', A: assists, fullMark: 12 },
          { subject: 'FG%', A: fg, fullMark: 1 },
          { subject: 'Steal', A: steals, fullMark: 3 },
          { subject: 'Blocks', A: blocks, fullMark: 3 },
        ]
        console.log(cdata)
        return (
            // <div>
            //   <div>
            //       <RadarChart outerRadius={90} width={730} height={250} data={cdata}>
            //         <PolarGrid />
            //         <PolarAngleAxis dataKey="subject" />
            //         <PolarRadiusAxis angle={30} domain={[0, 100]} />
            //         <Radar name='Stats per game' dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            //         <Legend />
            //       </RadarChart>
            //     </div>
            //   <div>
            //
            //   </div>
            // </div>
            <Total
              data = {cdata}
            />

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
