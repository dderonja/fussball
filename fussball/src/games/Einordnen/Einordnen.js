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
import Sound from "react-sound";
import backgroundMusic from "./backgroundMusic.mp3"
import ReactPlayer from "react-player";
import intro from "./intro14.mp4";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Einordnen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,
            orderedList: [],
            roundList: [
                {startItem: {label: "Jägermeister", value: "35"},
                    items: [
                        {label: "Berentzen saurer Apfel", value: 16},
                        {label: "Absolut Vodka", value: "40"},
                        {label: "Sierra Tequila Silver", value: "38"},
                        {label: "Killepitsch", value: "42"},
                        {label: "Berliner Luft", value: "18"},
                        {label: "Licor 43", value: 31},
                        {label: "Hendrick's Gin", value: 44},
                        {label: "Verpoorten Eierlikör", value: "20"}
                    ]

            }
            ],
            currentRound: -1,
            points: [0,0,0,0],
            pointsOld: [0,0,0,0],
            position: 0,
            showPoints: true,
            currPlayer: 0,
            buttonLabel: 'START'



        };


    }

    nextRound(){

        if(this.state.showPoints){
            let curr = this.state.currentRound + 1;
            if(curr === 8){
                this.props.handleEnd(this.state.points);
            }else {
                var list = [];
                list.push(this.state.roundList[curr].startItem);
                this.setState({
                    currentRound: curr,
                    showPoints: false,
                    currPlayer: curr % 4,
                    orderedList: list
                })
            }
        }else{
            this.setState({
                showPoints: true,
                pointsOld: this.state.points
            })
        }

    }

    wrongAnswer(){

        var points = Object.assign([], this.state.points);
        var oldPoints = Object.assign([], this.state.points);



        points[0] = points [0] + 1;
        points[1] = points [1] + 1;
        points[2] = points [2] + 1;
        points[3] = points [3] + 1;
        points[this.state.currPlayer] = points[this.state.currPlayer] - 1


        this.setState({
            showPoints: true,
            pointsOld: oldPoints,
            points: points,

        })



    }



    renderImage(){

        if(this.state.currentRound===-1){

            return(
                <ReactPlayer height="720px" width="1080" style={{marginTop: 50}} url={intro} playing />
            )
        }else {

            if (!this.state.showPoints) {
                return (

                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionLeave={false}
                        transitionAppearTimeout={2000}
                        transitionEnterTimeout={2000}
                        transitionLeaveTimeout={1}>

                        <Row>
                            <Col sm="5">
                                <div style={{fontSize: '30px', width: '70%'}}>1</div>
                                {
                                    this.state.orderedList.map((item, index)=>{


                                    return(
                                        <div style={{marginLeft: "10px", marginTop: "10px", width: '70%'}}>
                                            <div className="left-block-top">
                                                {item.label}
                                            </div>
                                            <div style={{fontSize: '30px'}}>
                                            {index+2}
                                            </div>
                                        </div>


                                    )

                                })}
                            </Col>
                            <Col sm="7">
                                <Row>
                                    <Col>
                                        <div style={{textAlign: "center", fontSize: "40px"}}>
                                            {this.state.playerList[this.state.position %4].name} ist am Zug
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "200px"}}>
                                    {this.state.roundList[this.state.currentRound].items.map((item)=>{

                                        return(
                                            <Col sm="4">
                                                <div style={{height: '120px'}} className="bot-block-upper" id={item.label}>
                                                    {item.label}
                                                </div>
                                            </Col>

                                        )

                                    })}
                                </Row>
                            </Col>
                        </Row>

                    </ReactCSSTransitionGroup>

                )
            } else {
                return (
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionLeave={false}
                        transitionAppearTimeout={2000}
                        transitionEnterTimeout={2000}
                        transitionLeaveTimeout={1}>


                        <div key={this.state.currentRound + 100}
                             style={{border: '10px solid #222', height: 720, fontSize: 80}}>
                            <b>Punktestand</b>
                            <div>
                                {this.state.playerList[0].name}: {this.state.points[0]} (+{this.state.points[0] - this.state.pointsOld[0]})
                            </div>
                            <div>
                                {this.state.playerList[1].name}: {this.state.points[1]} (+{this.state.points[1] - this.state.pointsOld[1]})
                            </div>
                            <div>
                                {this.state.playerList[2].name}: {this.state.points[2]} (+{this.state.points[2] - this.state.pointsOld[2]})
                            </div>
                            <div>
                                {this.state.playerList[3].name}: {this.state.points[3]} (+{this.state.points[3] - this.state.pointsOld[3]})
                            </div>
                        </div>


                    </ReactCSSTransitionGroup>
                )
            }
        }


    }

    render(){
        return (
            <div style={{width: "95%"}}>

                <Sound
                    url={backgroundMusic}
                    playStatus={this.state.playStatus}
                    volume={30}
                    onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}

                />


                <div>



                    <Row style={{marginBottom:20, marginTop:20}}>



                        <Col sm="10">
                            {this.renderImage()}
                        </Col>
                        <Col sm="2">

                            <Button style={{height: 100, width: 250, fontSize: 35, marginLeft: 20, backgroundColor: `${this.state.rightButtonColor}`}} onClick={() => this.nextRound()}>{this.state.buttonLabel}</Button>
                            <Button style={{height: 100, width: 250, fontSize: 35, marginLeft: 20, marginTop: 40, backgroundColor: 'red'}} onClick={() => this.wrongAnswer()}>FALSCH</Button>
                        </Col>

                    </Row>




                </div>

            </div>
        );
    };
}

export default Einordnen;
