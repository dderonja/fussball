import React, { Component } from 'react';
import timer from "./timer.mp3"
import endSound from "./end-sound.mp3"
import buzzer from "./buzzer.mp3"
import backgroundMusic2 from "./backgroundMusic2.mp3"
import newpic from "./newpic.mp3"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactPlayer from 'react-player'
import intro from './intro11.mp4'
import feiertage from './bild1.png'
import disziplinen from './Bild2.png'
import sternzeichen from './Bild3.png'
import laender from './Bild4.png'
import geld from './Bild5.png'
import zahlen from './Bild6.png'
import start from './start.jpg'



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

const ProgressBar = (props) => {
    return (
        <div className="progress-bar1">

            <Filler percentage={props.percentage} buzzerColor={props.buzzerColor} />
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler1" style={{ width: `${props.percentage}%`, background: `${props.buzzerColor}`}}/>
}




class WasFehlt extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,
            roundList: [
                {name: "Start", image: start},
                {name: "Tag der deutschen Einheit", image: feiertage},
                {name: "Weitsprung", image: disziplinen},
                {name: "Widder", image: sternzeichen},
                {name: "Chile", image: laender},
                {name: "20 Euro", image: geld},
                {name: "324", image: zahlen}],
            time: {},
            seconds: 5,
            buzzingPlayer: 0,
            percentage: 0,
            testWord: '',
            currentRound: 0,
            showTimer: 'hidden',
            buttonLabel: 'START',
            displayButton: 'hidden',
            rightButtonColor: 'grey',
            buzzingActive: false,
            transition: "width 5s ease-in",
            points: [0,0,0,0],
            pointsOld: [0,0,0,0],
            showPoints: false,
            buzzerColor: '',
            playStatus: Sound.status.STOPPED,
            playStatus2: Sound.status.STOPPED



        };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.nextStep = this.nextStep.bind(this);










    }



    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });

        window.addEventListener('keydown', this.handleKey);

    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKey);
    }

    handleKey = e => {
        console.log(e.keyCode);

        if(e.keyCode===49 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.startTimer();
            this.setState({
                buzzingPlayer: 1,
                percentage: 100,
                showTimer: '',
                testWord: this.state.playerList[0].name,
                buzzingActive: false,
                transition: "width 5s ease-in",
                buzzerColor: 'red',
                playStatus2: Sound.status.STOPPED

            });



        }else if(e.keyCode === 50 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.startTimer();
            this.setState({
                buzzingPlayer: 2,
                percentage: 100,
                showTimer: '',
                testWord: this.state.playerList[1].name,
                buzzingActive: false,
                transition: "width 5s ease-in",
                buzzerColor: 'blue',
                playStatus2: Sound.status.STOPPED

            });

        }else if(e.keyCode === 51 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.startTimer();
            this.setState({
                buzzingPlayer: 3,
                percentage: 100,
                showTimer: '',
                testWord: this.state.playerList[2].name,
                buzzingActive: false,
                transition: "width 5s ease-in",
                buzzerColor: 'green',
                playStatus2: Sound.status.STOPPED

            });

        }else if(e.keyCode === 52 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.startTimer();
            this.setState({
                buzzingPlayer: 4,
                percentage: 100,
                showTimer: '',
                testWord: this.state.playerList[3].name,
                buzzingActive: false,
                transition: "width 5s ease-in",
                buzzerColor: 'yellow',
                playStatus2: Sound.status.STOPPED

            });

        }
    };


    startTimer() {

        this.buzzer.play();
        if (this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;



        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.timer);
            this.timer=0;
            this.setState({time: {},
                seconds: 5})
            this.endSound.play();

        }else {
            this.beep.play();
        }








    }

    startGame(){
        var list = [];


        this.setState({
            playerList: list
        });


        this.props.handleNextPage(list);

    }

    renderBuzzer(){
        if(this.state.buzzingPlayer !== 0){
            return (
                <div>
                    {this.props.playerList1[this.state.buzzingPlayer-1].name} buzzed first
                </div>

            )
        }
    }

    nextStep() {
        console.log(this.state.percentage)
        if(this.state.percentage === 100) this.setState({percentage: 0})
        this.setState({ percentage: this.state.percentage + 100 })
    }

    renderImage(){

        if(this.state.currentRound === 0){
            return(
                <ReactPlayer volume="0.1" height="720px" width="1080" style={{marginTop: 50}} url={intro} playing/>
            )}else if(!this.state.showPoints) {
            return (

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionLeave={false}
                    transitionAppearTimeout={3000}
                    transitionEnterTimeout={3000}
                    transitionLeaveTimeout={1}>


                    <img key={this.state.currentRound} src={this.state.roundList[this.state.currentRound].image}
                         style={{border: '10px solid #222'}}></img>


                </ReactCSSTransitionGroup>


            )
        }else{
            return (
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionLeave={false}
                    transitionAppearTimeout={2000}
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1}>


                    <div key={this.state.currentRound+100} style={{border: '10px solid #222', height: 720, fontSize: 80}}>
                        <b>Punktestand</b>
                        <div>
                            {this.state.playerList[0].name}: {this.state.points[0]}  (+{this.state.points[0]-this.state.pointsOld[0]})
                        </div>
                        <div>
                            {this.state.playerList[1].name}: {this.state.points[1]}  (+{this.state.points[1]-this.state.pointsOld[1]})
                        </div>
                        <div>
                            {this.state.playerList[2].name}: {this.state.points[2]}  (+{this.state.points[2]-this.state.pointsOld[2]})
                        </div>
                        <div>
                            {this.state.playerList[3].name}: {this.state.points[3]}  (+{this.state.points[3]-this.state.pointsOld[3]})
                        </div>
                    </div>


                </ReactCSSTransitionGroup>
            )
        }


    }
    nextRound(){

        if(this.state.buttonLabel === 'START') {
            if(this.state.currentRound +1 > 6){
                this.props.handleEnd(this.state.points);
            }else {

                var currRound = (this.state.currentRound) + 1;
                if (currRound === 1) {
                    this.setState({
                        playStatus: Sound.status.PLAYING
                    })
                }

                this.setState({
                    currentRound: currRound,
                    testWord: "JETZT BUZZERN",
                    buzzingActive: true,
                    buttonLabel: "CHECK",
                    showPoints: false,
                    playStatus2: Sound.status.PLAYING


                })
            }
        }else if(this.state.buttonLabel==='CHECK'){
            this.setState({
                testWord: this.state.roundList[this.state.currentRound].name,
                buttonLabel: 'RICHTIG',
                rightButtonColor: 'green',
                displayButton: '',
                percentage: 0,
                transition: 'none',
                buzzingActive: false

            })
        }else if(this.state.buttonLabel==='RICHTIG'){

            var points = Object.assign([], this.state.points);
            var oldPoints = Object.assign([], this.state.points);

            if(this.state.buzzingPlayer!==0) {

                points[this.state.buzzingPlayer - 1] = points[this.state.buzzingPlayer - 1] + 1
            }


            this.setState({
                buttonLabel: 'START',
                displayButton: 'hidden',
                rightButtonColor: 'grey',
                buzzingPlayer: 0,
                showPoints: true,
                pointsOld: oldPoints,
                points: points
            })




        }
    }

    wrongAnswer(){
        var points = Object.assign([], this.state.points);
        var oldPoints = Object.assign([], this.state.points);

        if(this.state.buzzingPlayer !== 0) {

            points[0] = points [0] + 1;
            points[1] = points [1] + 1;
            points[2] = points [2] + 1;
            points[3] = points [3] + 1;
            points[this.state.buzzingPlayer - 1] = points[this.state.buzzingPlayer - 1] - 1
        }

        this.setState({
            buttonLabel: 'START',
            displayButton: 'hidden',
            rightButtonColor: 'grey',
            buzzingPlayer: 0,
            showPoints: true,
            pointsOld: oldPoints,
            points: points

        })


    }




    render(){

        var size;
        if(this.state.testWord.length <30){
            size=75
        }else {
            size = 150/Math.log(this.state.testWord.length)
        }

        const style = {
            fontSize: size
        }
        return (
            <div style={{width: "99%"}}>

                <div>
                    <audio ref={(beep) => { this.beep = beep }} src={timer}/>
                    <audio ref={(endSound) => { this.endSound = endSound}} src={endSound}/>
                    <audio ref={(buzzer) => { this.buzzer = buzzer}} src={buzzer}/>
                    <Sound
                        url={backgroundMusic2}
                        playStatus={this.state.playStatus}
                        volume={30}
                        onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}

                    />
                    <Sound
                        url={newpic}
                        playStatus={this.state.playStatus2}
                        volume={30}
                        onFinishedPlaying={() => this.setState({ playStatus2: Sound.status.STOPPED })}

                    />


                    <Row style={{marginBottom:20, marginTop:20}}>
                        <Col sm="2">
                            <div className="timer" style={{visibility: `${this.state.showTimer}`, color: this.state.buzzerColor, textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'}}>
                                {this.state.time.s}
                            </div>
                        </Col>
                        <Col sm="8">
                            {this.renderImage()}
                        </Col>
                        <Col sm="2">
                            <div className="timer" style={{visibility: `${this.state.showTimer}` , color: this.state.buzzerColor, textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'}}>
                                {this.state.time.s}
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ position: 'absolute', bottom: 40, left: 45}}>
                        <Col sm="2">
                            <Button style={{height: 100, width: 250, fontSize: 40, marginLeft: 20, backgroundColor: 'red', visibility: `${this.state.displayButton}`}} onClick={() => this.wrongAnswer()}>FALSCH</Button>
                        </Col>

                        <Col sm="8">

                            <div className="progress-bar1">

                                <div className="filler1" style={{ width: `${this.state.percentage}%`, transition: `${this.state.transition}`, background: `${this.state.buzzerColor}` }}/>
                                <div style={{position: 'absolute', top: '0px', height: '100%', width: '100%', border: '1px solid #333'}}>

                                    <div className="hintText" style={style}>{this.state.testWord}</div>
                                </div>



                            </div>
                        </Col>
                        <Col sm="2">
                            <Button style={{height: 100, width: 250, fontSize: 40, marginLeft: 20, backgroundColor: `${this.state.rightButtonColor}`}} onClick={() => this.nextRound()}>{this.state.buttonLabel}</Button>
                        </Col>
                    </Row>










                </div>


            </div>
        );
    };
}

export default WasFehlt;
