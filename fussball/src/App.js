import React, { Component } from 'react';

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
import SerienRaten from "./games/SerienRaten/SerienRaten";
import Songtexte from "./games/Songtexte/Songtexte";
import StickFight from "./games/StickFight/StickFight";
import TrickyTowers from "./games/TrickyTowers/TrickyTowers";
import WannWarDas from "./games/WannWarDas/WannWarDas";
import WasFehlt from "./games/WasFehlt/WasFehlt";
import WerLuegt from "./games/WerLuegt/WerLuegt";
import TowerFallAscension from "./games/TowerFallAscension/TowerFallAscension";
import Zuordnen from "./games/Zuordnen/Zuordnen";
import MarioKart from "./games/MarioKart/MarioKart";
import IntrosRaten from "./games/IntrosRaten/IntrosRaten";



class App extends Component {

    constructor(props) {
        super(props);


        this.state = {
            playerList: [],
            gameList: [],
            currentPage: -1

        };



        document.body.style = 'background: #D9D9D9;';






    }

    componentDidMount(){
        var list = [{name: "Wer ist das?", points:1, page: <WerIstDas playerList1={this.state.playerList}/>},
            {name: "Filmmusik", points:1, page: <Filmmusik/>},
        {name: "Serien raten", points:1, page: <SerienRaten/>},
        {name: "Wer lügt?", points:1, page: <WerLuegt/>},
        {name: "Towerfall Ascension", points:1, page: <TowerFallAscension/>},
        {name: "Stick Fight", points:1, page: <StickFight/>},
        {name: "Tricky Towers", points:1, page: <TrickyTowers/>},
        {name: "Mount your friends", points:1, page: <MountYourFriends/>},
        {name: "Click Duell", points:1, page: <ClickDuell/>},
        {name: "Wann war das?", points:1, page: <WannWarDas/>},
        {name: "Was fehlt?", points:1, page: <WasFehlt/>},
        {name: "Songtexte", points:1, page: <Songtexte/>},
        {name: "Mario Kart", points:1, page: <MarioKart/>},
        {name: "Intros raten", points:1, page: <IntrosRaten/>},
        {name: "Zuordnen", points:1, page: <Zuordnen/>}];

        this.setState({
            gameList: list
        })
       //this.generateGamelist();
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
            {name: "Filmmusik", points:1, page: <Filmmusik playerList1={someArg}/>},
            {name: "Intros raten", points:1, page: <IntrosRaten playerList1={someArg}/>},
            {name: "Wer ist das?", points:1, page: <WerIstDas playerList1={someArg}/>},
            {name: "Click Duell", points:1, page: <ClickDuell playerList1={someArg}/>},
            {name: "Wer lügt?", points:1, page: <WerLuegt playerList1={someArg}/>},
            {name: "Serien raten", points:1, page: <SerienRaten playerList1={someArg}/>},
            {name: "Towerfall Ascension", points:1, page: <TowerFallAscension playerList1={someArg}/>},
            {name: "Stick Fight", points:1, page: <StickFight playerList1={someArg}/>},
            {name: "Tricky Towers", points:1, page: <TrickyTowers playerList1={someArg}/>},
            {name: "Mount your friends", points:1, page: <MountYourFriends playerList1={someArg}/>},
            {name: "Wann war das?", points:1, page: <WannWarDas playerList1={someArg}/>},
            {name: "Was fehlt?", points:1, page: <WasFehlt playerList1={someArg}/>},
            {name: "Songtexte", points:1, page: <Songtexte playerList1={someArg}/>},
            {name: "Mario Kart", points:1, page: <MarioKart playerList1={someArg}/>},
            {name: "Zuordnen", points:1, page: <Zuordnen playerList1={someArg}/>}
            ];

        this.setState({
            gameList: list
        })


        this.setState({
            playerList: someArg
        })
    };

    handleNextPage = (someArg) =>{

        var currPage = this.state.currentPage;
        currPage = currPage +1;

        this.setState({
            currentPage: currPage,
            playerList: someArg
        })
    }




    renderScoreBoard(){





       let list = this.state.playerList.sort(function(a,b){
                   return parseInt(b.points)  - parseInt(a.points);
               });


       return (
           <div>
               <b>Punktestand</b>
           {list.map((player)=>{

               console.log(player.name)



               return(
                   <div>
                       {player.name}: {player.points}
                   </div>
               )


           })}
           </div>
       )








    }

    renderPage(){
        if(this.state.currentPage === -1){
            return <Startscreen handleToUpdate = {this.handleToUpdate} handleNextPage={this.handleNextPage} playerList1={this.state.playerList} />
        }else {
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
