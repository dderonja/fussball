import React, { Component } from 'react';

import './App.css';
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

class Startscreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,

            player1Name: '',
            player2Name: '',
            player3Name: '',
            player4Name: ''

        };







    }

    handlePlayer1Change = (comment) =>{

        this.setState({
            player1Name: comment.target.value
        })


    };
    handlePlayer2Change = (comment) =>{

        this.setState({
            player2Name: comment.target.value
        })


    };
    handlePlayer3Change = (comment) =>{

        this.setState({
            player3Name: comment.target.value
        })


    };
    handlePlayer4Change = (comment) =>{

        this.setState({
            player4Name: comment.target.value
        })


    };
    startGame(){
        var list = [];
        if(this.state.player1Name!== ''){
            list.push({name: this.state.player1Name, points: 0, color: 'red'});
        }
        if(this.state.player2Name!== ''){
            list.push({name: this.state.player2Name, points: 0, color: 'blue'});
        }
        if(this.state.player3Name!== ''){
            list.push({name: this.state.player3Name, points: 0, color: 'green'});
        }if(this.state.player4Name!== ''){
            list.push({name: this.state.player4Name, points: 0, color: 'yellow'});
        }

        this.setState({
            playerList: list
        });

        this.props.handleToUpdate(list);
        this.props.handleNextPage(list);






        console.log(this.state.playerList)


    }






















    render(){
        return (
            <div style={{width: "95%"}}>
                <Row style={{marginTop: 200, marginLeft: 100}}>
                    <Col>
                <Row>
                    <Col>
                        <Form action="" method="post" inline>
                            <FormGroup className="pr-1" style={{fontSize: 50}}>
                                <Label htmlFor="exampleInputName2" className="pr-1">Name of Player 1</Label>
                                <Input type="text" id="exampleInputName2" style={{fontSize:50, height: 60}} onChange={(e) => this.handlePlayer1Change(e)}/>
                            </FormGroup>
                        </Form>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form action="" method="post" inline>
                            <FormGroup className="pr-1" style={{fontSize: 50}}>
                                <Label htmlFor="exampleInputName2" className="pr-1">Name of Player 2 </Label>
                                <Input type="text" id="exampleInputName2" style={{fontSize:50, height: 60}} onChange={(e) => this.handlePlayer2Change(e)}/>
                            </FormGroup>
                        </Form>

                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Form action="" method="post" inline>
                            <FormGroup className="pr-1" style={{fontSize: 50}}>
                                <Label htmlFor="exampleInputName2" className="pr-1">Name of Player 3</Label>
                                <Input type="text" id="exampleInputName2" style={{fontSize:50, height: 60}} onChange={(e) => this.handlePlayer3Change(e)}/>
                            </FormGroup>
                        </Form>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form action="" method="post" inline>
                            <FormGroup className="pr-1" style={{fontSize: 50}}>
                                <Label htmlFor="exampleInputName2" className="pr-1">Name of Player 4</Label>
                                <Input type="text" id="exampleInputName2" style={{fontSize:50, height: 60}} onChange={(e) => this.handlePlayer4Change(e)}/>
                            </FormGroup>
                        </Form>

                    </Col>
                </Row>

                    </Col>
                    <Col> <Button style={{height: 300, width: 500, fontSize: 50, marginLeft: 100}} onClick={() => this.startGame()}>Start Game</Button>
                    </Col>
                </Row>
            </div>
        );
    };
}

export default Startscreen;
