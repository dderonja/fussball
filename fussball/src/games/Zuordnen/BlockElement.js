import React, { Component } from 'react';
import backgroundMusic from "./backgroundMusic.mp3"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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

class BlockElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            correctAnswer: false


        };

    }


    onChange(e){

        if(e.target.value === this.props.itemInfo.pair){
            this.setState({
                correctAnswer: true
            });

            this.props.rightAnswer(this.props.itemInfo.pair)
        }else{

        }

    }


    renderBottom(){

        if(this.state.correctAnswer){
            return(
                <div className="left-block-bottom">{this.props.itemInfo.pair}</div>
            )

        }else{
            return(
                <input style={{fontSize: "20px", textAlign: "center"}} onChange={(e)=>this.onChange(e)}/>
            )
        }


    }


    render(){
        return (
                    <div style={{marginLeft: "10px", marginTop: "10px"}}>
                    <div className="left-block-top">
                        {this.props.itemInfo.label}
                    </div>
                        {this.renderBottom()}
                </div>


        );
    };
}

export default BlockElement;
