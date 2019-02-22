import React, { Component } from 'react';
import start from "./start.jpg"
import backgroundMusic from "./backgroundMusic2.mp3"
import buzzer from "./buzzer.mp3"
import timer from "./timer.mp3"
import endSound from "./end-sound.mp3"
import intro from "./intro7.mp4"
import ReactPlayer from 'react-player'

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
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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

class WannWarDas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roundList: [{question: "Das erste iPhone kommt auf den Markt.", year: "2005"}, {question: "Geiselnahme bei den Olympischen Sommerspielen in München ", year: "1972"},
                {question: "Usain Bolt verbessert seinen eigenen 100m-Weltrekord auf 9,58 Sekunden", year: "2009"},{question: "Die Videoplattform YouTube erblickt das Licht der Welt ", year: "2005"},
                {question: "Der Drogenhändler Pablo Escobar wird verhaftet und stirbt", year: "1993"},{question: "Osama Bin Laden wird von amerikanischen Spezialeinheiten erschossen", year: "2011"},
                {question: "Hurrikan Katrina trifft auf die Golfküste der USA", year: "2005"},{question: "Felix Baumgartner springt aus der Stratosphäre", year: "2012"},
                {question: "Bei dem Amoklauf an der Columbine High School sterben insgesamt 15 Menschen", year: "1999"},{question: "Richard von Weizsäcker wird Bundespräsident", year: "1984"},
                {question: "Die Apollo 11 landet auf dem Mond", year: "1969"}],
            time: {},
            seconds: 48,
            buzzingPlayer: 0,
            playerList: this.props.playerList1,
            buzzingActive: false,
            transition: "width 48s linear",
            points: [0,0,0,0],
            pointsOld: [0,0,0,0],
            showPoints: false,
            buzzerColor: '',
            percentage: 0,
            currentRound: -1,
            buttonLabel: 'CONTINUE',
            playstatus: Sound.status.STOPPED,
            bg0: 'white',
            bg1: 'white',
            bg2: 'white',
            bg3: 'white',
            bg4: 'white',
            bg5: 'white',
            buzzerSeconds: 5,
            buzzerTime: {},
            buzzerName: '',
            displayButton: 'hidden',
            question: ''


        };
        this.buzzerTimer = 0;
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.startBuzzer = this.startBuzzer.bind(this);
        this.countDownBuzzer = this.countDownBuzzer.bind(this);
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


    startGame(){
        var list = [];


        this.setState({
            playerList: list
        });


        this.props.handleNextPage(list);

    }

    nextStep() {
        console.log(this.state.percentage)
        if(this.state.percentage === 100) this.setState({percentage: 0})
        this.setState({ percentage: this.state.percentage + 100 })
    }

    nextRound(){

        if(this.state.buttonLabel === 'CONTINUE') {



            let currRound = this.state.currentRound +1;

            if(currRound ===11) {
                this.props.handleEnd(this.state.points)
            }else {


                this.setState({
                    currentRound: currRound,
                    bg0: 'white',
                    bg1: 'white',
                    bg2: 'white',
                    bg3: 'white',
                    bg4: 'white',
                    bg5: 'white',
                    buzzingActive: false,
                    buttonLabel: "START",
                    showPoints: false,
                    percentage: 0,
                    seconds: 48,
                    question: ''


                })
            }
        }else if(this.state.buttonLabel==='START'){



            this.startTimer();

            this.setState({
                buttonLabel: 'CHECK',
                buzzingActive: true,
                bg0: 'aqua',
                buzzerColor: '',
                playStatus: Sound.status.PLAYING,
                transition: "width 48s linear",
                percentage: 100,
                showPoints: false,
                question: this.state.roundList[this.state.currentRound].question


            })
        }else if(this.state.buttonLabel==='SHOW POINTS'){




            this.setState({
                buttonLabel: 'CONTINUE',
                buzzingPlayer: 0,
                showPoints: true,
                percentage: 0,

            })




        }else if(this.state.buttonLabel==='CHECK') {
            this.setState({
                buzzerName: this.state.roundList[this.state.currentRound].year,
                buttonLabel: 'RICHTIG',
                rightButtonColor: 'green',
                displayButton: '',
                buzzingActive: false,
                transition: 'none'

            })
        }else if(this.state.buttonLabel==='RICHTIG'){

            var points = Object.assign([], this.state.points);
            var oldPoints = Object.assign([], this.state.points);

            if(this.state.buzzingPlayer!==0) {

                points[this.state.buzzingPlayer - 1] = points[this.state.buzzingPlayer - 1] + 1
            }


            this.setState({
                buzzerName: '',
                buttonLabel: 'CONTINUE',
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
            buzzerName: '',
            buttonLabel: 'CONTINUE',
            displayButton: 'hidden',
            rightButtonColor: 'grey',
            buzzingPlayer: 0,
            showPoints: true,
            pointsOld: oldPoints,
            points: points
        })


    }


    handleKey = e => {
        console.log(e.keyCode);

        if(e.keyCode===49 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.startBuzzer();
            clearInterval(this.timer);
            this.timer = 0;
            this.setState({
                buzzingPlayer: 1,
                showTimer: '',
                percentage: (48-this.state.seconds+1)/48*100,
                buzzerName: this.state.playerList[0].name,
                buzzingActive: false,
                transition: "none",
                buzzerColor: 'rgb(255,0,0,0.5)',
                buttonLabel: 'CHECK'

            });



        }else if(e.keyCode === 50 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.startBuzzer();
            clearInterval(this.timer);
            this.timer = 0;
            this.setState({
                buzzingPlayer: 2,
                percentage: (48-this.state.seconds+1)/48*100,
                showTimer: '',
                buzzerName: this.state.playerList[1].name,
                buzzingActive: false,
                transition: "none",
                buzzerColor: 'rgba(0,0,255,0.5',
                buttonLabel: 'CHECK'

            });

        }else if(e.keyCode === 51 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.startBuzzer();
            clearInterval(this.timer);
            this.timer = 0;
            this.setState({
                buzzingPlayer: 3,
                percentage: (48-this.state.seconds+1)/48*100,
                showTimer: '',
                buzzerName: this.state.playerList[2].name,
                buzzingActive: false,
                transition: "none",
                buzzerColor: 'rgba(0, 255, 0, 0.5',
                buttonLabel: 'CHECK'

            });

        }else if(e.keyCode === 52 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.startBuzzer();
            clearInterval(this.timer);
            this.timer = 0;
            this.setState({
                buzzingPlayer: 4,
                percentage: (48-this.state.seconds+1)/48*100,
                showTimer: '',
                buzzerName: this.state.playerList[3].name,
                buzzingActive: false,
                transition: "none",
                buzzerColor: 'rgba(255, 255, 0, 0.5)',
                buttonLabel: 'CHECK'

            });

        }
    };

    startBuzzer() {

        this.buzzer.play();
        if (this.buzzerTimer == 0) {
            this.buzzerTimer = setInterval(this.countDownBuzzer, 1000);
        }
    }

    countDownBuzzer() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.buzzerSeconds - 1;



        this.setState({
            buzzerTime: this.secondsToTime(seconds),
            buzzerSeconds: seconds,
        });

        // Check if we're at zero.
        if (seconds == 0) {
            clearInterval(this.buzzerTimer);
            this.buzzerTimer=0;
            this.setState({buzzerTime: {},
                buzzerSeconds: 5})
            this.endSound.play();

        }else {
            this.beep.play();
        }








    }

    startTimer() {


        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);

        }



    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;



        if(seconds===40){
            this.setState({
                bg1: 'aqua'
            })
        }
        if(seconds===32){
            this.setState({
                bg2: 'aqua'
            })
        }
        if(seconds===24){
            this.setState({
                bg3: 'aqua'
            })
        }
        if(seconds===16){
            this.setState({
                bg4: 'aqua'
            })
        }
        if(seconds===8){
            this.setState({
                bg5: 'aqua'
            })
        }




        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.timer=0;





                this.setState({
                    buttonLabel: 'CHECK',
                    time: {},
                    seconds: 48,
                    transition: 'none'
                })









        }else {

        }

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


                        <div key={this.state.currentRound}
                             style={{border: '10px solid #222', height: 500, fontSize: 80, lineHeight: '500px'}}>

                            <p style={{lineHeight: 1.5,
                                display: "inline-block",
                                verticalAlign: "middle"}}>{this.state.question}</p>

                        </div>

                        <div style={{marginTop: '15px', fontSize: "80px", fontWeight: 'bold', border: "10px solid black", background: `${this.state.buzzerColor}`}}>
                            {this.state.buzzerName}
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
                <audio ref={(buzzer) => { this.buzzer = buzzer}} src={buzzer}/>
                <audio ref={(beep) => { this.beep = beep }} src={timer}/>
                <audio ref={(endSound) => { this.endSound = endSound}} src={endSound}/>

                <div>



                    <Row style={{marginBottom:20, marginTop:20}}>

                        <Col sm="2">

                        </Col>
                        <Col sm="8">
                            {this.renderImage()}
                        </Col>
                        <Col sm="2">

                        </Col>

                    </Row>
                    <Row style={{ position: 'absolute', bottom: 40, left: 45}}>

                        <Col sm="2">
                            <Button style={{height: 100, width: 250, fontSize: 40, marginLeft: 20, backgroundColor: 'red', visibility: `${this.state.displayButton}`}} onClick={() => this.wrongAnswer()}>FALSCH</Button>
                        </Col>


                        <Col sm="4" style={{padding: "0 0 0 0"}}>

                            <div className="progress-bar2" style={{borderRightWidth: '0px'}}>

                                <div className="filler2" style={{ width: `${this.state.percentage}%`, transition: `${this.state.transition}`}}/>

                            </div>

                            <div className="help-block">
                                <span className="helpText1" style={{background: this.state.bg5}} >-5</span>
                                <span className="helpText1" style={{background: this.state.bg4}} >-4</span>
                                <span className="helpText1" style={{background: this.state.bg3}} >-3</span>
                                <span className="helpText1" style={{background: this.state.bg2}} >-2</span>
                                <span className="helpText1" style={{background: this.state.bg1}}>-1</span>
                                <span className="helpText1" style={{background: this.state.bg0}}>&nbsp;</span>
                            </div>
                        </Col>
                        <Col sm="4" style={{padding: "0 0 0 0"}}>

                            <div className="progress-bar1" style={{width: '600px', height: '20px', borderLeftWidth: '0px'}}>

                                <div className="filler1" style={{ width: `${this.state.percentage}%`, transition: `${this.state.transition}` }}/>




                            </div>
                            <div className="help-block">
                                <span style={{background: this.state.bg0}} className="helpText2">&nbsp;</span>
                                <span style={{background: this.state.bg1}} className="helpText2">+1</span>
                                <span style={{background: this.state.bg2}} className="helpText2">+2</span>
                                <span style={{background: this.state.bg3}} className="helpText2">+3</span>
                                <span style={{background: this.state.bg4}} className="helpText2">+4</span>
                                <span style={{background: this.state.bg5}} className="helpText2">+5</span>
                            </div>
                        </Col>
                        <Col sm="2">
                            <Button style={{height: 100, width: 250, fontSize: 35, marginLeft: 20, backgroundColor: `${this.state.rightButtonColor}`}} onClick={() => this.nextRound()}>{this.state.buttonLabel}</Button>
                        </Col>
                    </Row>


                </div>


            </div>
        );
    };
}

export default WannWarDas;
