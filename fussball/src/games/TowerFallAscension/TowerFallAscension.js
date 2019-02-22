import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import '../../App.css';
import intro from "./intro3.mp4";
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

class TowerFallAscension extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerList: this.props.playerList1,
            points: [],
            showPoints: false

        };

    }


    onChange1(e){
        let list = this.state.points;
        list[0] = e.target.value;
        this.setState({
            points: list
        })
    }

    onChange2(e){
        let list = this.state.points;
        list[1] = e.target.value;
        this.setState({
            points: list
        })
    }

    onChange3(e){
        let list = this.state.points;
        list[2] = e.target.value;
        this.setState({
            points: list
        })
    }

    onChange4(e){
        let list = this.state.points;
        list[3] = e.target.value;
        this.setState({
            points: list
        })
    }




    renderScreen(){

        if(this.state.showPoints){

            return(

                <div>
                <div style={{fontSize: 50, marginTop: 50}}>
                    <label>Punkte {this.state.playerList[0].name}:</label>
                    <input onChange={(e)=> this.onChange1(e)}></input>
                </div>
                    <div style={{fontSize: 50, marginTop: 50}}>
                        <label>Punkte {this.state.playerList[1].name}:</label>
                        <input onChange={(e)=> this.onChange2(e)}></input>
                    </div>
                    <div style={{fontSize: 50, marginTop: 50}}>
                        <label>Punkte {this.state.playerList[2].name}:</label>
                        <input onChange={(e)=> this.onChange3(e)}></input>
                    </div>
                    <div style={{fontSize: 50, marginTop: 50}}>
                        <label>Punkte {this.state.playerList[3].name}:</label>
                        <input onChange={(e)=> this.onChange4(e)}></input>
                    </div>

                    <Button style={{height: 100, width: 300, fontSize: 40}} onClick={() => this.props.handleEnd(this.state.points)}>Beenden</Button>
                </div>

            )

        }else{
            return(
                <div>
                    <ReactPlayer height="720px" width="1080" style={{marginTop: 50}} url={intro} playing />
                    <Button style={{height: 100, width: 300, fontSize: 40, marginTop: 50}} onClick={() => this.setState({showPoints: true})}>Weiter</Button>
                </div>
                    )
        }

    }


    render(){
        return (
            <div style={{width: "99%"}}>

                {this.renderScreen()}

            </div>
        );
    };
}

export default TowerFallAscension;
