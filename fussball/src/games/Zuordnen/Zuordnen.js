import React, { Component } from 'react';
import backgroundMusic from "./backgroundMusic.mp3"
import '../../App.css';
import start from "./start.jpg"
import intro from "./intro8.mp4"
import ReactPlayer from 'react-player'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
import Inline from "./Inline"

class Zuordnen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,
            currentRound: -1,
            buttonLabel: "CONTINUE",
            points: [0,0,0,0],
            pointsOld: [0,0,0,0],
            currPlayer: 0,

        };

    }


    startGame(){
        var list = [];


        this.setState({
            playerList: list
        });


        this.props.handleNextPage(list);


    }

    incPlayer(e){
        this.setState({
            currPlayer: e
        })
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


                    <Inline key={this.state.currentRound} playerList={this.props.playerList1} currentRound={this.state.currentRound} incPlayer={(e)=> this.incPlayer(e)}></Inline>








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

    nextRound(){

        if(this.state.showPoints){
            let curr = this.state.currentRound + 1;
            if(curr === 8){
                this.props.handleEnd(this.state.points);
            }else {
                this.setState({
                    currentRound: curr,
                    showPoints: false,
                    currPlayer: curr % 4
                })
            }
        }else{
            this.setState({
                showPoints: true,
                pointsOld: this.state.points
            })
        }

    }


    render(){
        return (
            <div style={{width: "99%"}}>
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

export default Zuordnen;
