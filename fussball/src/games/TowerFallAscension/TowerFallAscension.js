import React, { Component } from 'react';

import '../../App.css';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    Label,
    Form,
    Input,
    Button

} from 'reactstrap';

class TowerFallAscension extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,

        };







    }


    startGame(){
        var list = [];


        this.setState({
            playerList: list
        });


        this.props.handleNextPage(list);









    }






















    render(){
        return (
            <div style={{width: "95%"}}>

            </div>
        );
    };
}

export default TowerFallAscension;
