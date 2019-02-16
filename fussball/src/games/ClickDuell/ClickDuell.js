import React, { Component } from 'react';
import charlie from "./charlie.JPG"
import evolution from "./evolution.JPG"
import gronkh from "./gronkh.jpg"
import bibi from "./bibi.jpg"
import rihanna from "./rihanna.jpg"
import cristiano from "./cristiano.jpg"
import obama from "./obama.JPG"
import oscar from "./oscar.JPG"
import samsung from "./samsung.jpg"
import cola from "./cola.jpg"
import jenner from "./jenner.JPG"
import bieber from "./bieber.JPG"
import backgroundMusic from "./backgroundMusic.mp3"
import newpic from "./newpic.mp3"
import fsk18 from "./fsk18.png"
import weather from "./weather.png"
import '../../App.css';
import start from "./start.jpg"
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

class ClickDuell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,
            roundList: [

                {question: "Welches Video hat mehr YouTube Klicks?", headline1: "Charlie bit my finger", headline2: 'Evolution of dance', picture1: charlie, picture2: evolution, correct: 1},
                {question: "Welcher Youtube-Kanal hat mehr Abonnenten?", headline1: "Gronkh", headline2: 'BibisBeautyPalace', picture1: gronkh, picture2: bibi, correct: 2},
                {question: "Welcher Promi hat mehr Twitter Follower?", headline1: "Rihanna", headline2: 'Cristiano Ronaldo', picture1: rihanna, picture2: cristiano, correct: 1},
                {question: "Welcher Tweet hat mehr Twitter Likes?", headline1: "Foto von Barack Obama mit Kindern", headline2: 'Foto von der Oskar Verleihung', picture1: obama, picture2: oscar, correct: 1},
                {question: "Welches Unternehmen hat mehr Facebook Likes?", headline1: "Coca Cola", headline2: 'Samsung', picture1: cola, picture2: samsung, correct: 2},
                {question: "Welches Bild hat mehr Instagram Likes?", headline1: "Verlobungsfoto Justin Bieber", headline2: 'Geburtsfoto von Kylie Jenner', picture1: bieber, picture2: jenner, correct: 2},
                {question: "Welches Wort wurde in den letzten 6 Monaten öfter gegoogelt?", headline1: "porn", headline2: 'weather', picture1: fsk18, picture2: weather, correct: 1}

            ],
            buttonLabel: 'START',
            points: [0,0,0,0],
            pointsOld: [0,0,0,0],
            showPoints: false,
            currentRound: 0,
            testWord: 'Click Duell',
            border1: '0px',
            border2: '0px',
            border3: '0px',
            border4: '0px',
            answer1: 0,
            answer2: 0,
            answer3: 0,
            answer4: 0,
            answerValue1: '',
            answerValue2: '',
            answerValue3: '',
            answerValue4: '',
            buzzingActive: false,
            showAnswer: 'hidden'

        };




    }


    componentDidMount() {
        window.addEventListener('keydown', this.handleKey);

    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKey);
    }


    /*player 1: 97 (1) = left,  98(2) = right
      player 2: 99 (3) = left, 100 (4) = right
      player 3: 101 (5) = left, 102 (6) = right
      player 4: 103 (7) = left, 104 (8) = right
     */
    handleKey = e => {
        console.log(e.keyCode);

        if(e.keyCode===97 && this.state.buzzingActive && this.state.answer1 === 0){
            this.setState({
                answer1: 1,
                border1: '10px',
                answerValue1: 'Links'
            });



        }else if(e.keyCode===98 && this.state.buzzingActive && this.state.answer1 === 0){
            this.setState({
                answer1: 2,
                border1: '10px',
                answerValue1: 'Rechts'
            });

        }else if(e.keyCode===99 && this.state.buzzingActive && this.state.answer2 === 0){
            this.setState({
                answer2: 1,
                border2: '10px',
                answerValue2: 'Links'
            });

        }else if(e.keyCode===100 && this.state.buzzingActive && this.state.answer2 === 0){
            this.setState({
                answer2: 2,
                border2: '10px',
                answerValue2: 'Rechts'
            });

        }else if(e.keyCode===101 && this.state.buzzingActive && this.state.answer3 === 0) {
            this.setState({
                answer3: 1,
                border3: '10px',
                answerValue3: 'Links'
            });
        }else if(e.keyCode===102 && this.state.buzzingActive && this.state.answer3 === 0) {
            this.setState({
                answer3: 2,
                border3: '10px',
                answerValue3: 'Rechts'
            });
        }else if(e.keyCode===103 && this.state.buzzingActive && this.state.answer4 === 0) {
            this.setState({
                answer4: 1,
                border4: '10px',
                answerValue4: 'Links'
            });
        }else if(e.keyCode===104 && this.state.buzzingActive && this.state.answer4 === 0) {
            this.setState({
                answer4: 2,
                border4: '10px',
                answerValue4: 'Rechts'
            });
        }
    };

    startGame(){
        var list = [];


        this.setState({
            playerList: list
        });


        this.props.handleNextPage(list);

    }


    nextRound(){

        if(this.state.buttonLabel === 'START') {
            this.newpic.play();
            var currRound = (this.state.currentRound) + 1;
            if(currRound===1){
                this.backgroundMusic.play();
            }

            this.setState({
                currentRound: currRound,
                testWord: this.state.roundList[this.state.currentRound].question,
                buttonLabel: "CHECK",
                showPoints: false,
                buzzingActive: true

            })
        }else if(this.state.buttonLabel==='CHECK'){
            this.setState({
                buttonLabel: 'SHOW ANSWER',
                buzzingActive: false,
                showAnswer: '',
                border1: '0px',
                border2: '0px',
                border3: '0px',
                border4: '0px',


            })
        }else if(this.state.buttonLabel==='SHOW ANSWER'){
            var label;
            if(this.state.roundList[this.state.currentRound-1].correct===1){
                label = this.state.roundList[this.state.currentRound-1].headline1
            }else label = this.state.roundList[this.state.currentRound-1].headline2
            this.setState({
                testWord: label,
                buttonLabel: 'SHOW POINTS'
            })
            }
        else if(this.state.buttonLabel==='SHOW POINTS'){

            var points = Object.assign([], this.state.points);
            var oldPoints = Object.assign([], this.state.points);
            if(this.state.roundList[this.state.currentRound-1].correct===this.state.answer1){
                points[0] = points[0] + 1;
            }
            if(this.state.roundList[this.state.currentRound-1].correct===this.state.answer2){
                points[1] = points[1] + 1;
            }
            if(this.state.roundList[this.state.currentRound-1].correct===this.state.answer3){
                points[2] = points[2] + 1;
            }
            if(this.state.roundList[this.state.currentRound-1].correct===this.state.answer4){
                points[3] = points[3] + 1;
            }


            this.setState({
                buttonLabel: 'START',
                showPoints: true,
                pointsOld: oldPoints,
                points: points,
                showAnswer: 'hidden',
                answerValue1: '',
                answerValue2: '',
                answerValue3: '',
                answerValue4: '',
                answer1: 0,
                answer2: 0,
                answer3: 0,
                answer4: 0,



            })




        }
    }



    renderImage() {
        if (this.state.currentRound === 0) {
            return (
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionLeave={false}
                    transitionAppearTimeout={2000}
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1}>
                    <div key={this.state.currentRound}>

                        <img src={start} style={{border: '3px solid #222'}}></img>
                    </div>


                </ReactCSSTransitionGroup>
            )
        } else {

            if (this.state.showPoints === false) {

                return (

                    <Row>
                        <Col sm="6">

                            <ReactCSSTransitionGroup
                                transitionName="example"
                                transitionAppear={true}
                                transitionLeave={false}
                                transitionAppearTimeout={2000}
                                transitionEnterTimeout={2000}
                                transitionLeaveTimeout={1}>
                                <div>

                                    <p style={{fontSize: 30}} key={this.state.currentRound * 2}>
                                        <b>{this.state.roundList[this.state.currentRound-1].headline1}</b>
                                    </p>


                                    <img key={this.state.currentRound * 3}
                                         src={this.state.roundList[this.state.currentRound-1].picture1}
                                         style={{border: '3px solid #222'}}></img>
                                </div>


                            </ReactCSSTransitionGroup>

                        </Col>


                        <Col sm="6">
                            <ReactCSSTransitionGroup
                                transitionName="example"
                                transitionAppear={true}
                                transitionLeave={false}
                                transitionAppearTimeout={2000}
                                transitionEnterTimeout={2000}
                                transitionLeaveTimeout={1}>
                                <div>

                                    <p style={{fontSize: 30}} key={this.state.currentRound * 4}>
                                        <b>{this.state.roundList[this.state.currentRound-1].headline2}</b>
                                    </p>
                                    <img key={this.state.currentRound * 3}
                                         src={this.state.roundList[this.state.currentRound-1].picture2}
                                         style={{border: '3px solid #222'}}></img>
                                </div>


                            </ReactCSSTransitionGroup>
                        </Col>
                    </Row>


                )
            } else
                return (
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionLeave={false}
                        transitionAppearTimeout={2000}
                        transitionEnterTimeout={2000}
                        transitionLeaveTimeout={1}>


                        <div key={this.state.currentRound + 10000}
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
                    <audio ref={(backgroundMusic) => { this.backgroundMusic = backgroundMusic}} src={backgroundMusic}/>
                    <audio ref={(newpic) => { this.newpic = newpic}} src={newpic}/>

                    <Row style={{marginBottom:20, marginTop:20}}>
                        <Col sm="2">
                            <div style={{marginTop: 200, fontSize: 60, marginLeft: 20, fontWeight: 'bold', borderColor: 'red', borderStyle: 'solid', borderWidth: `${this.state.border1}`, borderRadius: 20}}>
                                {this.state.playerList[0].name}
                            </div>
                            <div style={{fontSize: 60, visibility: `${this.state.showAnswer}`}}>{this.state.answerValue1}</div>
                            <div style={{marginTop: 200, fontSize: 60, marginLeft: 20, fontWeight: 'bold', borderColor: 'blue', borderStyle: 'solid', borderWidth: `${this.state.border2}`, borderRadius: 20}}>
                                {this.state.playerList[1].name}
                            </div>
                            <div style={{fontSize: 60, visibility: `${this.state.showAnswer}`}}>{this.state.answerValue2}</div>
                        </Col>
                        <Col sm="8">
                            {this.renderImage()}
                        </Col>
                        <Col sm="2">
                            <div style={{marginTop: 200, fontSize: 60, marginLeft: 20, fontWeight: 'bold', borderColor: 'green', borderStyle: 'solid', borderWidth: `${this.state.border3}`, borderRadius: 20}}>
                                {this.state.playerList[2].name}
                            </div>
                            <div style={{fontSize: 60, visibility: `${this.state.showAnswer}`}}>{this.state.answerValue3}</div>

                            <div style={{marginTop: 200, fontSize: 60, marginLeft: 20, fontWeight: 'bold', borderColor: 'yellow', borderStyle: 'solid', borderWidth: `${this.state.border4}`, borderRadius: 20}}>
                                {this.state.playerList[3].name}
                            </div>
                            <div style={{fontSize: 60, visibility: `${this.state.showAnswer}`}}>{this.state.answerValue4}</div>
                        </Col>
                    </Row>
                    <Row style={{ position: 'absolute', bottom: 40, left: 45}}>
                        <Col sm="2">
                            <Button style={{height: 100, width: 250, fontSize: 40, marginLeft: 20, backgroundColor: 'red', visibility: 'hidden'}} >FALSCH</Button>
                        </Col>

                        <Col sm="8">

                            <div className="progress-bar1">

                                <div className="filler1" style={{ width: `${this.state.percentage}%`, transition: `${this.state.transition}`, background: `${this.state.buzzerColor}` }}/>
                                <div style={{position: 'absolute', top: '0px', height: '100%', width: '100%', border: '1px solid #333'}}>

                                    <div style={style} className="hintText">{this.state.testWord}</div>
                                </div>



                            </div>
                        </Col>
                        <Col sm="2">
                            <Button style={{height: 100, width: 250, fontSize: 30, marginLeft: 20, backgroundColor: `${this.state.rightButtonColor}`}} onClick={() => this.nextRound()}>{this.state.buttonLabel}</Button>
                        </Col>
                    </Row>










                </div>


            </div>
        );
    };
}

export default ClickDuell;
