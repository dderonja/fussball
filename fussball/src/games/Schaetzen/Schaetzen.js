import React, { Component } from 'react';
import intro from "./intro10.mp4";
import ReactPlayer from 'react-player'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import backgroundMusic from './backgroundMusic.mp3';
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

class Schaetzen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,
            points: [0,0,0,0],
            pointsOld: [0,0,0,0],
            currentRound: -1,
            roundList: [{question: "Wie viel Geld warfen Rom-Besucher im Jahr 2016 in den berühmten Trevi-Brunnen?", answer: 1400000},
                {question: "Wie viel Liter Kunstblut gingen für beide Teile des Kultfilms Kill Bill drauf?", answer: 1700},
                {question: "Wie viele Sprachen werden auf der Welt insgesamt gesprochen?", answer: 6500},
                {question: "Wie viele Apps wurden in Deutschland im Jahr 2012 heruntergeladen?", answer: 1700000000},
                {question: "Wenn die Freiheitsstatue Schuhe tragen würde, in welcher Größe wären diese?", answer: 1143},
                {question: "Wie viele Menschen sind beim Versuch, den Mount Everest zu besteigen, gestorben?", answer: 300},
                {question: "Wie viele Scheidungen gab es 2013 in Deutschland?", answer: 170000},
                {question: "Wie viel Gramm wiegt dieses Nashorn?", answer: "200"}],
            buttonLabel: "START",
            showPoints: false,
            answer1: 0,
            answer2: 0,
            answer3: 0,
            answer4: 0,
            label: '',
            playstatus: Sound.status.STOPPED


        };







    }


    startGame(){
        var list = [];


        this.setState({
            playerList: list
        });


        this.props.handleNextPage(list);









    }




    nextRound(){
        if(this.state.buttonLabel === "START"){

            var curr = this.state.currentRound +1;
            if(curr === 0){
                this.setState({
                    playstatus: Sound.status.PLAYING
                })
            }

            if(curr===8){
                this.props.handleEnd(this.state.points)
            }else{
                this.setState({
                    showPoints: false,
                    currentRound: curr,
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    buttonLabel: 'ANTWORT',
                    label: this.state.roundList[curr].question
                })
            }
        }else if(this.state.buttonLabel === "ANTWORT"){
            this.setState({
                buttonLabel: "PUNKTE",
                label: this.state.roundList[this.state.currentRound].answer

            })
        }else if(this.state.buttonLabel === "PUNKTE"){
            this.calcPoints(this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4);
            this.setState({
                showPoints: true,
                buttonLabel: "START"
            })
        }
    }


    calcPoints(a1, a2, a3, a4){

        let diff1 = Math.abs(a1-this.state.roundList[this.state.currentRound].answer);
        let diff2 = Math.abs(a2-this.state.roundList[this.state.currentRound].answer);
        let diff3 = Math.abs(a3-this.state.roundList[this.state.currentRound].answer);
        let diff4 = Math.abs(a4-this.state.roundList[this.state.currentRound].answer);

        let pointList = [{label: 0, value: diff1}, {label: 1, value: diff2}, {label: 2, value: diff3}, {label: 3, value: diff4}]
        pointList = pointList.sort(function(a,b){
            return parseInt(b.value)  - parseInt(a.value);
        });



        var points = Object.assign([], this.state.points);
        var oldPoints = JSON.parse(JSON.stringify(this.state.points));

        points[pointList[0].label] += 0.25;
        points[pointList[1].label] += 0.5;
        points[pointList[2].label] += 0.75;
        points[pointList[3].label] += 1;




        this.setState({
            points: points,
            pointsOld: oldPoints
        })



    }












    renderImage(){

        if(this.state.currentRound===-1) {
            return (
                <div>
                    <ReactPlayer height="720px" width="1080" style={{marginTop: 50}} url={intro} playing/>
                </div>
            )
        }else if (!this.state.showPoints) {
                return (

                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionLeave={false}
                        transitionAppearTimeout={2000}
                        transitionEnterTimeout={2000}
                        transitionLeaveTimeout={1}>


                        <div key={this.state.currentRound}
                             style={{marginLeft: 15, border: '10px solid #222', fontSize: 50, lineHeight: '500px'}}>

                            <p style={{
                                lineHeight: 1.5,
                                verticalAlign: "middle"
                            }}>{this.state.label}</p>

                        </div>

                        <div>
                            <div style={{fontSize: 40, marginTop: 50}}>
                                <label>Antwort {this.state.playerList[0].name}:</label>
                                <input onChange={(e)=> this.setState({answer1: e.target.value})} value={this.state.answer1}></input>
                            </div>
                            <div style={{fontSize: 40, marginTop: 50}}>
                                <label>Antwort {this.state.playerList[1].name}:</label>
                                <input onChange={(e)=> this.setState({answer2: e.target.value})} value={this.state.answer2}></input>
                            </div>
                            <div style={{fontSize: 40, marginTop: 50}}>
                                <label>Antwort {this.state.playerList[2].name}:</label>
                                <input onChange={(e)=> this.setState({answer3: e.target.value})} value={this.state.answer3}></input>
                            </div>
                            <div style={{fontSize: 40, marginTop: 50}}>
                                <label>Antwort {this.state.playerList[3].name}:</label>
                                <input onChange={(e)=> this.setState({answer4: e.target.value})} value={this.state.answer4}></input>
                            </div>


                        </div>


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





    render(){
        return (
            <div style={{width: "99%"}}>

                <div>

                    <Sound
                        url={backgroundMusic}
                        playStatus={this.state.playstatus}
                        volume={70}
                        onFinishedPlaying={() => this.setState({ playstatus: Sound.status.PLAYING })}

                    />


                    <Row style={{marginBottom:20, marginTop:20}}>

                        <Col sm="12">
                            {this.renderImage()}
                        </Col>

                    </Row>
                    <Row style={{ position: 'absolute', bottom: 40, left: 45}}>


                        <Col sm="2">
                            <Button style={{height: 100, width: 250, fontSize: 40, marginLeft: 20, backgroundColor: `${this.state.rightButtonColor}`}} onClick={() => this.nextRound()}>{this.state.buttonLabel}</Button>
                        </Col>
                    </Row>










                </div>


            </div>
        );
    };
}

export default Schaetzen;
