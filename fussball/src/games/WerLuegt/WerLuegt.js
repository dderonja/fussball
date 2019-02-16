import React, { Component } from 'react';
import start from "./start.jpg"
import backgroundMusic from "./backgroundMusic3.mp3"
import buzzer from "./buzzer.mp3"

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

class WerLuegt extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roundList: [
                {statement: "Ich gehöre zu den antiken oder modernen Weltwundern",
                    options: [
                        {name: "Der Koloss von Rhodos", boolean: true},
                        {name: "Die Hängenden Gärten von Babylon", boolean: true},
                        {name: "Das Kolosseum in Rom", boolean: true},
                        {name: "Die Chinesische Mauer", boolean: true},
                        {name: "Der Eiffelturm in Paris", boolean: false},
                        {name: "Die Pyramiden von Gizeh", boolean: true},
                        {name: "Das Brandenburger Tor in Berlin", boolean: false},
                        {name: "Allianz Arena in München", boolean: false}
                    ]
                },
                {statement: "Ich bin eine Erweiterung von World of Warcraft",
                    options: [
                        {name: "Cataclysm", boolean: true},
                        {name: "Wrath of the Lich King", boolean: true},
                        {name: "Legion", boolean: true},
                        {name: "Frozen Throne", boolean: false},
                        {name: "The Burning Crusade", boolean: true},
                        {name: "Brood War", boolean: false},
                        {name: "Wings of Liberty", boolean: false},
                        {name: "The Nightelfs", boolean: false}
                    ]
                },
                {statement: "Ich bin/war Spiel des Jahres",
                    options: [
                        {name: "Scotland Yard", boolean: true},
                        {name: "Die Siedler von Catan", boolean: true},
                        {name: "Cafe International", boolean: true},
                        {name: "Trivial Pursuit", boolean: false},
                        {name: "Rummikub", boolean: true},
                        {name: "Uno", boolean: false},
                        {name: "Elfenland", boolean: true},
                        {name: "Nobody is perfect", boolean: false}
                    ]
                },
                {statement: "Ich habe über 500 Kalorien",
                    options: [
                        {name: "1 Big Tasty Bacon (McDonalds)", boolean: true},
                        {name: "3 Coleslaw Salate (KFC)", boolean: true},
                        {name: "1 Double Steakhouse", boolean: true},
                        {name: "1 Mc Flurry mit LION-Karamell (McDonalds)", boolean: false},
                        {name: "2 Apfeltaschen (McDonalds)", boolean: false},
                        {name: "1 Crispy Chicken (Burger King)", boolean: true},
                        {name: "9 Hot Wings (KFC)", boolean: true},
                        {name: "1 Chili Cheese Burger", boolean: false}
                    ]
                },
                {statement: "Ich bin eine Ex von Ryan Gosling",
                    options: [
                        {name: "Sandra Bullock", boolean: true},
                        {name: "Emma Stone ", boolean: false},
                        {name: "Rachel McAdams", boolean: true},
                        {name: "Olivia Wilde", boolean: true},
                        {name: "Eva Mendes", boolean: false},
                        {name: "Uma Thurman", boolean: false},
                        {name: "Cameron Diaz", boolean: false},
                        {name: "Megan Fox", boolean: false}
                    ]
                },
                {statement: "Ich war eine Disziplin bei den Olympischen Sommerspielen 2016",
                    options: [
                        {name: "Rugby", boolean: true},
                        {name: "Golf", boolean: true},
                        {name: "Karate", boolean: false},
                        {name: "Taekwondo", boolean: true},
                        {name: "Squash", boolean: false},
                        {name: "Inlineskating", boolean: false},
                        {name: "Judo", boolean: true},
                        {name: "Schach", boolean: false}
                    ]
                },
                {statement: "Ich habe rote Haare",
                    options: [
                        {name: "Pipi Langstrumpf", boolean: true},
                        {name: "Pumuckl", boolean: true},
                        {name: "Arielle", boolean: true},
                        {name: "Obelix", boolean: true},
                        {name: "Bibi Blocksberg", boolean: false},
                        {name: "Misty", boolean: true},
                        {name: "Mulan", boolean: false},
                        {name: "Son Goku", boolean: false}
                    ]
                },
                {statement: "Ich bin/war Jugendwort des Jahres",
                    options: [
                        {name: "I bims", boolean: true},
                        {name: "YOLO", boolean: true},
                        {name: "Babo", boolean: true},
                        {name: "Hayvan", boolean: false},
                        {name: "Smombie", boolean: true},
                        {name: "Swag", boolean: true},
                        {name: "Fail", boolean: false},
                        {name: "napflixen", boolean: false}
                    ]
                }],
            time: {},
            seconds: 60,
            buzzingPlayer: 0,
            playerList: this.props.playerList1,
            testWord: '',
            buzzingActive: false,
            transition: "width 6s linear",
            points: [0,0,0,0],
            pointsOld: [0,0,0,0],
            showPoints: false,
            buzzerColor: '',
            percentage: 0,
            currentRound: 0,
            buttonLabel: 'CONTINUE',
            currentOption: 0,
            playstatus: Sound.status.STOPPED

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


            var currRound = (this.state.currentRound) + 1;
            if(currRound===1){

            }

            this.setState({
                currentRound: currRound,
                testWord: '',
                buzzingActive: false,
                buttonLabel: "START",
                showPoints: false,
                percentage: 0




            })
        }else if(this.state.buttonLabel==='START'){
            var currentOption = 0;
            this.startTimer()

            this.setState({
                testWord: this.state.roundList[this.state.currentRound-1].options[currentOption].name,
                buttonLabel: '',
                buzzingActive: true,
                currentOption: currentOption,
                buzzerColor: 'aqua',
                playStatus: Sound.status.PLAYING


            })
        }else if(this.state.buttonLabel==='SHOW POINTS'){




            this.setState({
                buttonLabel: 'CONTINUE',
                buzzingPlayer: 0,
                showPoints: true,

            })




        }else if(this.state.buttonLabel === 'CHECK'){

            if(this.state.roundList[this.state.currentRound-1].options[this.state.currentOption].boolean === true){



            this.setState({
                buttonLabel: 'SHOW POINTS',
                testWord: 'FALSCH'

            })
            }else {
                this.setState({
                    buttonLabel: 'SHOW POINTS',
                    testWord: 'RICHTIG'
                })
            }
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


    handleKey = e => {
        console.log(this.state.transition);
        console.log(e.keyCode);

        if(e.keyCode===49 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.buzzer.play();
            clearInterval(this.timer);
            this.timer=0;
            if(this.state.roundList[this.state.currentRound-1].options[this.state.currentOption].boolean === false) {

                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);



                points[0] = points [0] + 1;




                this.setState({
                    buzzingPlayer: 1,
                    percentage: 100,
                    buzzingActive: false,
                    transition: 'none',
                    buzzerColor: 'red',
                    time: {},
                    seconds: 60,
                    pointsOld: oldPoints,
                    points: points,
                    buttonLabel: "CHECK",
                    playStatus: Sound.status.STOPPED

                });
            }else {
                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);



                    points[1] = points [1] + 1;
                    points[2] = points [2] + 1;
                    points[3] = points [3] + 1;

                this.setState({
                    buzzingPlayer: 1,
                    percentage: 100,
                    buzzingActive: false,
                    transition: 'none',
                    buzzerColor: 'red',
                    time: {},
                    seconds: 60,
                    pointsOld: oldPoints,
                    points: points,
                    buttonLabel: "CHECK",
                    playStatus: Sound.status.STOPPED

                });


            }



        }else if(e.keyCode === 50 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.buzzer.play();
            clearInterval(this.timer);
            this.timer=0;
            if(this.state.roundList[this.state.currentRound-1].options[this.state.currentOption].boolean === false) {

                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);



                points[1] = points [1] + 1;




                this.setState({
                    buzzingPlayer: 1,
                    percentage: 100,
                    buzzingActive: false,
                    transition: 'none',
                    buzzerColor: 'blue',
                    time: {},
                    seconds: 60,
                    pointsOld: oldPoints,
                    points: points,
                    buttonLabel: "CHECK",
                    playStatus: Sound.status.STOPPED

                });
            }else {
                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);



                points[0] = points [0] + 1;
                points[2] = points [2] + 1;
                points[3] = points [3] + 1;

                this.setState({
                    buzzingPlayer: 1,
                    percentage: 100,
                    buzzingActive: false,
                    transition: 'none',
                    buzzerColor: 'blue',
                    time: {},
                    seconds: 60,
                    pointsOld: oldPoints,
                    points: points,
                    buttonLabel: "CHECK",
                    playStatus: Sound.status.STOPPED

                });


            }

        }else if(e.keyCode === 51 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.buzzer.play();
            clearInterval(this.timer);
            this.timer=0;
            if(this.state.roundList[this.state.currentRound-1].options[this.state.currentOption].boolean === false) {

                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);



                points[2] = points [2] + 1;




                this.setState({
                    buzzingPlayer: 1,
                    percentage: 100,
                    buzzingActive: false,
                    transition: 'none',
                    buzzerColor: 'green',
                    time: {},
                    seconds: 60,
                    pointsOld: oldPoints,
                    points: points,
                    buttonLabel: "CHECK",
                    playStatus: Sound.status.STOPPED

                });
            }else {
                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);



                points[0] = points [0] + 1;
                points[1] = points [1] + 1;
                points[3] = points [3] + 1;

                this.setState({
                    buzzingPlayer: 1,
                    percentage: 100,
                    buzzingActive: false,
                    transition: 'none',
                    buzzerColor: 'green',
                    time: {},
                    seconds: 60,
                    pointsOld: oldPoints,
                    points: points,
                    buttonLabel: "CHECK",
                    playStatus: Sound.status.STOPPED

                });


            }

        }else if(e.keyCode === 52 && this.state.buzzingPlayer ===0 && this.state.buzzingActive){
            this.buzzer.play();
            clearInterval(this.timer);
            this.timer=0;
            if(this.state.roundList[this.state.currentRound-1].options[this.state.currentOption].boolean === false) {

                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);



                points[3] = points [3] + 1;




                this.setState({
                    buzzingPlayer: 1,
                    percentage: 100,
                    buzzingActive: false,
                    transition: 'none',
                    buzzerColor: 'yellow',
                    time: {},
                    seconds: 60,
                    pointsOld: oldPoints,
                    points: points,
                    buttonLabel: "CHECK",
                    playStatus: Sound.status.STOPPED

                });
            }else {
                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);



                points[0] = points [0] + 1;
                points[1] = points [1] + 1;
                points[2] = points [2] + 1;

                this.setState({
                    buzzingPlayer: 1,
                    percentage: 100,
                    buzzingActive: false,
                    transition: 'none',
                    buzzerColor: 'yellow',
                    time: {},
                    seconds: 60,
                    pointsOld: oldPoints,
                    points: points,
                    buttonLabel: "CHECK",
                    playStatus: Sound.status.STOPPED

                });


            }

        }
    };

    startTimer() {


        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 100);

        }



    }

    countDown() {
        // Remove one second, set state so a re-render happens.

        if(this.state.seconds===60){
            this.setState({
                transition: "width 6s linear",
                percentage: 100
            })
        }
        let seconds = this.state.seconds - 1;




        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.timer=0;

            if(this.state.currentOption +1 < this.state.roundList[this.state.currentRound-1].options.length) {


                var currOpt = this.state.currentOption + 1;
                this.setState({
                    time: {},
                    seconds: 60,
                    currentOption: currOpt,
                    testWord: this.state.roundList[this.state.currentRound - 1].options[currOpt].name,
                    percentage: 0,
                    transition: 'none'
                })

                this.startTimer()

            }else{
                var points = Object.assign([], this.state.points);
                var oldPoints = Object.assign([], this.state.points);

                this.setState({
                    time: {},
                    seconds: 60,
                    currentOption: 0,
                    testWord: "Ende",
                    transition: 'none',
                    buttonLabel: "SHOW POINTS",
                    percentage: 100,
                    points: points,
                    pointsOld: oldPoints,
                    playStatus: Sound.status.STOPPED

                })
            }





        }else {

        }








    }



    renderImage(){

        if(this.state.currentRound===0){

            return(
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionLeave={false}
                transitionAppearTimeout={2000}
                transitionEnterTimeout={2000}
                transitionLeaveTimeout={1}>


                <img key={this.state.currentRound} src={start}
                     style={{border: '10px solid #222'}}></img>


            </ReactCSSTransitionGroup>
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
                             style={{border: '10px solid #222', height: 720, fontSize: 80, lineHeight: '720px'}}>

                            <p style={{lineHeight: 1.5,
                                display: "inline-block",
                                verticalAlign: "middle"}}>{this.state.roundList[this.state.currentRound - 1].statement}</p>

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

        var size;
        if(this.state.testWord.length <30){
            size=75
        }else {
            size = 150/Math.log(this.state.testWord.length)
        }

        const style = {
            fontSize: size
        };
        return (
            <div style={{width: "99%"}}>
                <Sound
                    url={backgroundMusic}
                    playStatus={this.state.playStatus}
                    volume={30}
                    onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}

                />
                <audio ref={(buzzer) => { this.buzzer = buzzer}} src={buzzer}/>

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
                            <Button style={{height: 100, width: 250, fontSize: 40, marginLeft: 20, backgroundColor: 'red', visibility: 'hidden'}}>FALSCH</Button>
                        </Col>


                        <Col sm="8">

                            <div className="progress-bar1">

                                <div className="filler1" style={{ width: `${this.state.percentage}%`, transition: `${this.state.transition}`, background: `${this.state.buzzerColor}` }}/>
                                <div style={{position: 'absolute', top: '0px', height: '100%', width: '100%', border: '1px solid #333'}}>

                                    <ReactCSSTransitionGroup
                                        transitionName="example"
                                        transitionAppear={true}
                                        transitionLeave={false}
                                        transitionAppearTimeout={1000}
                                        transitionEnterTimeout={1000}
                                        transitionLeaveTimeout={1}>


                                        <div key={this.state.currentOption} className="hintText" style={style}>{this.state.testWord}</div>


                                    </ReactCSSTransitionGroup>

                                </div>



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

export default WerLuegt;
