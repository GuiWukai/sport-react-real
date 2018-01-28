import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class SeasonGraph extends Component {

	render () {
        
        var row = this.props.row

        var gamesplayed = row.row["_original"].StatisticDetails.GamesPlayed
        var ftm = row.row["_original"].StatisticDetails.FreeThrowsMade
        var tpm = row.row["_original"].StatisticDetails.ThreePointFieldGoalsMade
        var tr = row.row["_original"].StatisticDetails.ReboundsTotal
        var ta = row.row["_original"].StatisticDetails.Assists

        var data = [
            {name: 'GP', 'Stats/Season': gamesplayed, amt: 20},
            {name: 'FTM','Stats/Season': ftm, amt: 2210},
            {name: '3PM', 'Stats/Season': tpm, amt: 2290},
            {name: 'Rebounds', 'Stats/Season': tr, amt: 2000},
            {name: 'Assists', 'Stats/Season': ta, amt: 2181},
        ]

        return (

            <BarChart width={400} height={250} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="Stats/Season" fill="#82ca9d" />
            </BarChart>
        );
    }
}