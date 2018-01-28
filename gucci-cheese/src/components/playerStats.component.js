import React, {Component} from 'react';
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend
} from 'recharts';
import SeasonGraph from '../components/seasonGraphStats';

export default class PlayerStats extends Component {

    render() {
        var row = this.props.row
        
        var blocks = row.row["_original"].StatisticDetails.BlockedShotsPerGame*100/3;
        var points = row.row["_original"].StatisticDetails.PointsPerGame*100/31;
        var steals = row.row["_original"].StatisticDetails.StealsPerGame*100/2.5;
        var assists = row.row["_original"].StatisticDetails.AssistsPerGame*100/10.5;
        var fg = row.row["_original"].StatisticDetails.FieldGoalsPercentage*100;
        var rebounds = row.row["_original"].StatisticDetails.ReboundsTotalPerGame*100/16;
        var pt3 = row.row["_original"].StatisticDetails.ThreePointFieldGoalsPercentage*100;
        var ft = row.row["_original"].StatisticDetails.FreeThrowsPercentage*100;

        var imageLink = row.row["_original"].DynamicLinks['default-thumbnail'];

        var cdata = [
          { subject: 'Points', A: points, fullMark: 40 },
          { subject: 'Rebounds', A: rebounds, fullMark: 20 },
          { subject: 'Assists', A: assists, fullMark: 12 },
          { subject: 'Steal', A: steals, fullMark: 3 },
          { subject: 'Blocks', A: blocks, fullMark: 3 },
          { subject: '3PT%', A: pt3, fullMark: 1 },
          { subject: 'FT%', A: ft, fullMark: 1 },
          { subject: 'FG%', A: fg, fullMark: 1 }
        ]
        return (
            <div style ={{display: 'flex'}}>
                <img style={{height: '200px', margin: '25px'}} src={imageLink} alt='player'/>
                <div>
                    <RadarChart outerRadius={90} width={400} height={250} data={cdata}>
                        <PolarGrid/>
                        <PolarAngleAxis dataKey="subject"/>
                        <PolarRadiusAxis angle={90} domain={[0, 100]}/>
                        <Radar
                            name='Stats/Game'
                            dataKey="A"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.6}/>
                        <Legend/>
                    </RadarChart>
                </div>
                <div>
                    <SeasonGraph row = {row}/>
                </div>
            </div>
        )
    }
}