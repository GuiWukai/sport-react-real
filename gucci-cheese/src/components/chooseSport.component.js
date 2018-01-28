import React, {Component} from 'react';

export class ChooseSport extends Component {

    render() {

        const handleState = this.props.handleState

        return(
            <div>
                <button onClick={() => handleState('basketball')}>Basketball</button>
                <button onClick={() => handleState('hockey')}>Hockey</button>
                <button onClick={() => handleState('baseball')}>Baseball</button>
            </div>
        );
    }
}