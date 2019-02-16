import React, { Component } from 'react';
import avatar from "./avatar.mp3"
import start from "./start.jpg"
import batman from "./batman.mp3"
import beste_freunde from "./beste_freunde.mp3"
import timer from "./timer.mp3"
import drive from "./drive.mp3"
import forrest_gump from "./forrest_gump.mp3"
import harry_potter from "./harry_potter.mp3"
import inception from "./inception.mp3"
import jurassic_park from "./jurassic_park.mp3"
import kill_bill from "./kill_bill.mp3"
import endSound from "./end-sound.mp3"
import buzzer from "./buzzer.mp3"
import lion_king from "./lion_king.mp3"
import newpic from "./newpic.mp3"
import mamma_mia from "./mamma_mia.mp3"
import mulan from "./mulan.mp3"
import saturday_night from "./saturday_night.mp3"
import transformers from "./transformers.mp3"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Sound from 'react-sound';

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

const ProgressBar = (props) => {
    return (
        <div className="progress-bar1">

            <Filler percentage={props.percentage} buzzerColor={props.buzzerColor} />
        </div>
    )
};

const Filler = (props) => {
    return <div className="filler1" style={{ width: `${props.percentage}%`, background: `${props.buzzerColor}`}}/>
};



class Filmmusik extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,
            roundList: [{name: "Kill Bill", file: kill_bill, position: 0, volume1: 70}, {name: "Batman", file: batman, position: 300000, volume1: 70}, {name: "Mulan", file: mulan, position: 0, volume1: 100},
                {name: "Saturday Night Fever", file: saturday_night, position: 0, volume1: 100}, {name: "Inception", file: inception, position: 120000, volume1: 100},
                {name: "Ziemlich beste Freunde", file: beste_freunde, position: 110000, volume1: 90}, {name: "Jurassic Park", file: jurassic_park, position: 195000, volume1: 80},
                {name: "Harry Potter", file: harry_potter, position: 95000, volume1: 100}, {name: "König der Löwen", file: lion_king, position: 154000, volume1: 60},
                {name: "Mamma Mia", file: mamma_mia, position: 7000, volume1: 90}, {name: "Drive", file: drive, position: 0, volume1: 50}, {name: "Forrest Gump", file: forrest_gump, position: 42000, volume1: 90},
                {name: "Avatar", file: avatar, position: 40000, volume1: 100}, {name: "Transformers", file: transformers, position: 248000, volume1: 70}],
            time: {},
            seconds: 5,
            buzzingPlayer: 0,
            percentage: 0,
            testWord: '',
            currentRound: -1,
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
            playStatus: Sound.status.PAUSED,
            mp3File: '',
            position: '',
            volume1: ''



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

        console.log(this.state.volume1)

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
                playStatus: Sound.status.PAUSED,

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
                playStatus: Sound.status.PAUSED,

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
                playStatus: Sound.status.PAUSED,

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
                playStatus: Sound.status.PAUSED,

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

        //<img key={this.state.currentRound} src={this.state.roundList[this.state.currentRound].image}></img>

        if(!this.state.showPoints) {
            return (

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionLeave={false}
                    transitionAppearTimeout={2000}
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1}>


                    <img src={start} style={{border: '10px solid #222'}}/>


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

            var currRound = (this.state.currentRound) + 1;


            this.setState({
                currentRound: currRound,
                testWord: "JETZT BUZZERN",
                buzzingActive: true,
                buttonLabel: "CHECK",
                showPoints: false,
                playStatus: Sound.status.PLAYING,
                mp3File: this.state.roundList[currRound].file,
                position: this.state.roundList[currRound].position,
                volume1: this.state.roundList[currRound].volume1






            })
        }else if(this.state.buttonLabel==='CHECK'){
            this.setState({
                testWord: this.state.roundList[this.state.currentRound].name,
                buttonLabel: 'RICHTIG',
                rightButtonColor: 'green',
                displayButton: '',
                showTimer: 'hidden',
                percentage: 0,
                transition: "",
                buzzingActive: false,
                playStatus: Sound.status.PAUSED,

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
                points: points,
                playStatus: Sound.status.PAUSED,
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
            points: points,
            playStatus: Sound.status.PAUSED,

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

                <Sound
                    url={this.state.mp3File}
                    playStatus={this.state.playStatus}
                    playFromPosition={this.state.position}
                    volume={this.state.volume1}
                    onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
                />

                <div>
                    <audio ref={(beep) => { this.beep = beep }} src={timer}/>
                    <audio ref={(endSound) => { this.endSound = endSound}} src={endSound}/>
                    <audio ref={(buzzer) => { this.buzzer = buzzer}} src={buzzer}/>



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

export default Filmmusik;













