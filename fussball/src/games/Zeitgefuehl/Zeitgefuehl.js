import React, { Component } from 'react';
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
import vid1 from "./kazoo.mp4"
import vid2 from "./pumped.mp4"
import vid3 from "./aerobic.mp4"
import vid4 from "./tavaris.mp4"
import vid5 from "./bolt.mp4"
import intro from "./intro12.mp4"
import Sound from "react-sound";


class SerienRaten extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,
            points: [0,0,0,0],
            pointsOld: [0,0,0,0],
            timeStamp: 0,
            time1: 0,
            time2: 0,
            time3: 0,
            time4: 0,
            roundList: [
                {advice: "Buzzer wenn Usain Bolt ins Ziel läuft", file: vid5, timespan: 60500, start: 0, position: 187000, ignore: false},
                {advice: "Buzzer wenn das Video stoppt", file: vid2, timespan: 65000, start: 0, position: 0, ignore: false},
                {advice: "Buzzer wenn das Video stoppt", file: vid3, timespan: 25000, start: 0, position: 0, ignore: false},
                {advice: "Buzzer wenn das Video stoppt", file: vid4, timespan: 22000, start: 0, position: 215000, ignore: false},
                {advice: "Buzzer nach exakt 1 Minute", file: vid1, timespan: 60000, start: 10000, position: 0, ignore: true},


            ],
            currentRound: -1,
            showPoints: false,
            buttonLabel: "START",
            time: {},
            seconds: 6,
            showTimer: false,
            playing: false,
            height: '0px',
            label: ''

        };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

    }

    componentDidMount(){
        window.addEventListener('keydown', this.handleKey);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKey);
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

    startTimer() {

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

            const dateTime = Date.now();



            this.setState({
                timeStamp: dateTime + this.state.roundList[this.state.currentRound].timespan
            });



            setTimeout(() => {
                this.startVid();
            }, this.state.roundList[this.state.currentRound].start);



        }


    }

    startVid(){
        this.player.seekTo(parseFloat(this.state.roundList[this.state.currentRound].position/1000))
        this.setState({
            playing: true,
            height: '720px'
        });

        if(!this.state.roundList[this.state.currentRound].ignore) {


            setTimeout(() => {
                var time = Date.now()
                if(this.state.currentRound ===0){
                    time += 9580
                }
                this.setState({
                    playing: false,
                    height: '0px',
                    timeStamp: time
                })
            }, this.state.roundList[this.state.currentRound].timespan);
        }
    }

    ref = player => {
        this.player = player
    }


    handleKey = e => {

        if(e.keyCode===49 && this.state.time1 === 0){
            const time = Date.now();
            console.log(Math.abs(time-this.state.timeStamp))
            this.setState({
                time1: time


            });



        }else if(e.keyCode === 50 && this.state.time2 === 0){
            const time = Date.now();
            console.log(Math.abs(time-this.state.timeStamp))
            this.setState({
                time2: time


            });

        }else if(e.keyCode === 51 && this.state.time3 === 0){
            const time = Date.now();
            console.log(Math.abs(time-this.state.timeStamp))
            this.setState({
                time3: time


            });

        }else if(e.keyCode === 52 && this.state.time4 === 0){
            const time = Date.now();
            console.log(Math.abs(time-this.state.timeStamp))
            this.setState({
                time4: time


            });

        }
    };


    calcPoints(){

        let diff1 = Math.abs(this.state.time1-this.state.timeStamp);
        let diff2 = Math.abs(this.state.time2-this.state.timeStamp);
        let diff3 = Math.abs(this.state.time3-this.state.timeStamp);
        let diff4 = Math.abs(this.state.time4-this.state.timeStamp);

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

        if(this.state.currentRound===-1){

            return(
                <ReactPlayer height="720px" width="1080" style={{marginTop: 50}} url={intro} playing />
            )
        }else if(this.state.showTimes) {

            return(

            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionLeave={false}
                transitionAppearTimeout={2000}
                transitionEnterTimeout={2000}
                transitionLeaveTimeout={1}>


                <div key={this.state.currentRound + 100}
                     style={{border: '10px solid #222', height: 720, fontSize: 80}}>
                    <b>Zeiten</b>
                    <div>
                        {this.state.playerList[0].name}: {Math.abs(this.state.timeStamp-this.state.time1)/1000} Sekunden Differenz
                    </div>
                    <div>
                        {this.state.playerList[1].name}: {Math.abs(this.state.timeStamp-this.state.time2)/1000} Sekunden Differenz
                    </div>
                    <div>
                        {this.state.playerList[2].name}: {Math.abs(this.state.timeStamp-this.state.time3)/1000} Sekunden Differenz
                    </div>
                    <div>
                        {this.state.playerList[3].name}: {Math.abs(this.state.timeStamp-this.state.time4)/1000} Sekunden Differenz
                    </div>
                </div>


            </ReactCSSTransitionGroup>
            )

        }else if(this.state.showPoints){

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
            )}
            else {
                return (
                    <div>
                        <div style={{fontSize: 40}}>{this.state.label}</div>
                        <ReactPlayer ref={this.ref} height={this.state.height} width="1080" style={{marginTop: 50}} url={this.state.roundList[this.state.currentRound].file} playing={this.state.playing} />

                    </div>

                )
            }





    }


    nextRound(){
        if(this.state.buttonLabel === 'START'){

            var curr = this.state.currentRound +1;
            if(curr === 5) {
                clearInterval(this.timer);
                this.props.handleEnd(this.state.points)
            }else {


                this.startTimer();
                this.setState({
                    currentRound: curr,
                    showTimer: true,
                    time1: 0,
                    time2: 0,
                    time3: 0,
                    time4: 0,
                    showPoints: false,
                    buttonLabel: "ZEITEN",
                    label: this.state.roundList[curr].advice
                })
            }
        }else if(this.state.buttonLabel === 'ZEITEN'){
            this.setState({
                showTimes: true,
                buttonLabel: "PUNKTE",
                label: ''
            })
        }else if(this.state.buttonLabel === 'PUNKTE'){
            this.calcPoints();
            this.timer = 0;
            this.setState({
                showPoints: true,
                showTimes: false,
                buttonLabel: "START",
                seconds: 6,
                time: {},
                label: ''
            })
        }

    }


    render(){
        return (


                <div style={{width: "99%"}}>

                    <div>



                        <Row style={{marginBottom:20, marginTop:20}}>
                            <Col sm="2">
                                <div className="timer" style={{visibility: `${this.state.showTimer}`, textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'}}>
                                    {this.state.time.s}
                                </div>
                            </Col>
                            <Col sm="8">
                                {this.renderImage()}
                            </Col>
                            <Col sm="2">
                                <div className="timer" style={{visibility: `${this.state.showTimer}` , textShadow: '1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000'}}>
                                    {this.state.time.s}
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ position: 'absolute', bottom: 40, left: 45}}>

                            <Col sm="2">
                                <Button style={{height: 100, width: 250, fontSize: 35, marginLeft: 20, backgroundColor: `${this.state.rightButtonColor}`}} onClick={() => this.nextRound()}>{this.state.buttonLabel}</Button>
                            </Col>
                        </Row>










                    </div>


                </div>


        );
    };
}

export default SerienRaten;
