import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button

} from 'reactstrap';
import Startscreen from "./Startscreen";
import WerIstDas from "./games/WerIstDas/WerIstDas";
import Filmmusik from "./games/Filmmusik/Filmmusik";
import ClickDuell from "./games/ClickDuell/ClickDuell";
import MountYourFriends from "./games/MountYourFriends/MountYourFriends";
import Zeitgefuehl from "./games/Zeitgefuehl/Zeitgefuehl";
import Einordnen from "./games/Einordnen/Einordnen";
import StickFight from "./games/StickFight/StickFight";
import TrickyTowers from "./games/TrickyTowers/TrickyTowers";
import WannWarDas from "./games/WannWarDas/WannWarDas";
import WasFehlt from "./games/WasFehlt/WasFehlt";
import WerLuegt from "./games/WerLuegt/WerLuegt";
import TowerFallAscension from "./games/TowerFallAscension/TowerFallAscension";
import Zuordnen from "./games/Zuordnen/Zuordnen";
import Schaetzen from "./games/Schaetzen/Schaetzen";
import IntrosRaten from "./games/IntrosRaten/IntrosRaten";



class App extends Component {

    constructor(props) {
        super(props);


        this.state = {
            playerList: [],
            gameList: [],
            currentPage: -1,
            showPoints: false,
            pointsGame: [],
            oldPlayerList: [],
            multiplier: 1

        };



        document.body.style = 'background: #D9D9D9;';






    }


    shuffle(arr) {
        var i,
            j,
            temp;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[i].points = i+1;
            arr[j] = temp;
        }
        return arr;
    };

    generateGamelist(){

        var list = this.shuffle(this.state.gameList);
        console.log(list);
        this.setState({
            gameList: list
        })


    }



    handleToUpdate = (someArg) => {


        var list = [
            {name: "Einordnen", points:5, page: <Einordnen playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Was fehlt?", points:5, page: <WasFehlt playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Filmmusik", points:5, page: <Filmmusik playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Schaetzen", points:4, page: <Schaetzen playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Zeitgefühl", points: 4, page: <Zeitgefuehl playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Wer ist das?", points:1, page: <WerIstDas playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Wer lügt?", points:1, page: <WerLuegt playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Towerfall Ascension", points:1, page: <TowerFallAscension playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Click Duell", points:2, page: <ClickDuell playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Intros raten", points:2, page: <IntrosRaten playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Stick Fight", points:2, page: <StickFight playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Wann war das?", points:3, page: <WannWarDas playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            {name: "Tricky Towers", points:3, page: <TrickyTowers playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},

            {name: "Mount your friends", points:5, page: <MountYourFriends playerList1={someArg} handleEnd={(e)=> this.handleGameEnd(e)}/>},
            ];

        this.setState({
            gameList: list
        });


        this.setState({
            playerList: someArg
        })
    };

    handleNextPage = (someArg) =>{

        let currPage = this.state.currentPage;
        currPage = currPage +1;

        this.setState({
            currentPage: currPage,
            playerList: someArg
        })
    };


    handleGameEnd(points){

        var list = Object.assign([], this.state.playerList);
        var oldList = JSON.parse(JSON.stringify(this.state.playerList));
        var multiplier = this.state.gameList[this.state.currentPage].points;



        list[0].points = list[0].points + points[0] * multiplier;
        list[1].points = list[1].points + points[1] * multiplier;
        list[2].points = list[2].points + points[2] * multiplier;
        list[3].points = list[3].points + points[3] * multiplier;



        this.setState({
            showPoints: true,
            multiplier: multiplier,
            pointsGame: points,
            playerList: list,
            oldPlayerList: oldList
        })


    }

    renderScoreBoard(){

        let list = JSON.parse(JSON.stringify(this.state.playerList));
       list = list.sort(function(a,b){
                   return parseInt(b.points)  - parseInt(a.points);
               });
       return (
           <div>
               <b>Gesamt-Punktestand</b>
           {list.map((player)=>{

               return(
                   <div>
                       {player.name}: {player.points}
                   </div>
               )


           })}
           </div>
       )
    }

    startNextGame(){
        let curr = this.state.currentPage +1;
        this.setState({
            currentPage: curr,
            showPoints: false
        })
    }

    renderPage(){
        if(this.state.currentPage === -1){
            return <Startscreen handleToUpdate = {this.handleToUpdate} handleNextPage={this.handleNextPage} playerList1={this.state.playerList} />
        }else if(this.state.showPoints) {
            return (

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionLeave={false}
                    transitionAppearTimeout={2000}
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1}
                    >


                    <div key={this.state.currentRound + 100}
                         style={{height: 720, fontSize: 80, width: "70%", margin:"0 auto"}}>
                        <b>Gesamt-Punktestand</b>
                        <div>
                            {this.state.playerList[0].name}: {this.state.playerList[0].points} = {this.state.oldPlayerList[0].points} + {this.state.pointsGame[0]} * {this.state.multiplier}
                        </div>
                        <div>
                            {this.state.playerList[1].name}: {this.state.playerList[1].points} = {this.state.oldPlayerList[1].points} + {this.state.pointsGame[1]} * {this.state.multiplier}
                        </div>
                        <div>
                            {this.state.playerList[2].name}: {this.state.playerList[2].points} = {this.state.oldPlayerList[2].points} + {this.state.pointsGame[2]} * {this.state.multiplier}
                        </div>
                        <div>
                            {this.state.playerList[3].name}: {this.state.playerList[3].points} = {this.state.oldPlayerList[3].points} + {this.state.pointsGame[3]} * {this.state.multiplier}
                        </div>
                    </div>

                    <Button style={{height: 100, width: 300, fontSize: 40}} onClick={() => this.startNextGame()}>Nächstes Spiel</Button>


                </ReactCSSTransitionGroup>

            )
        }else{
            return this.state.gameList[this.state.currentPage].page
        }
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">

                <Row>
                    <Col sm="4">

                        {this.renderScoreBoard()}
                    </Col>
                    <Col sm="4" style={{fontSize: 30}}>
                        <h1 className="App-title">Game
                        <br/> Night
                        </h1>


                    </Col>


                </Row>

        </header>
         <div>

             {this.renderPage()}

         </div>
      </div>
    );
  }
}

export default App;
