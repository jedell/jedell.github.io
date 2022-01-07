import React, { Component } from "react";
import axios from 'axios';

export default class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/players/')
            .then(response => {
                this.setState({ players: response.data })
            })
            .catch(err => {console.log(err)});
        console.log(this.state.players)
    }

    render() {
        return (
        <ul>
            {this.state.players.map(player => {
            return (<li key={player._id}>{player.name}</li>)
        })}
            <li>test</li>

        </ul>
        )
    }
}