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
import BlockElement from "./BlockElement";

class Inline extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentRound: this.props.currentRound,
            position: this.props.currentRound,
            playerList: this.props.playerList,
            roundList: [
                {
                    listLeft: [
                        {label: "Amsterdam", value: 1, pair: "Schiphol"},
                        {label: "Atlanta", value: 2, pair: "Hartsfield Jackson"},
                        {label: "Barcelona", value: 3, pair: "El Prat"},
                        {label: "Jakarta", value: 4, pair: "Soekarno-Hatta"},
                        {label: "London", value: 5, pair: "Heathrow"},
                        {label: "New York City", value: 6, pair: "La Guardia"},
                        {label: "Sao Paulo", value: 7, pair: "Guarulhos"},
                        {label: "Tokio", value: 8, pair: "Haneda"}
                        ],
                    listBot: [
                        {label: "El Prat", value: 3},
                        {label: "Schiphol", value: 1},
                        {label: "La Guardia", value: 6},
                        {label: "Guarulhos", value: 7},
                        {label: "Soekarno-Hatta", value: 4},
                        {label: "Chek Lap Kok", value: 9},
                        {label: "Heathrow", value: 5},
                        {label: "Hartsfield Jackson", value: 2},
                        {label: "Haneda", value: 8}

                    ]
                },
                {
                    listLeft: [
                        {label: "Bär", value: 1, pair: "Ursidae"},
                        {label: "Fliege", value: 2, pair: "Brachycera"},
                        {label: "Katze", value: 3, pair: "Felidae"},
                        {label: "Mücke", value: 4, pair: "Nematocera"},
                        {label: "Orang-Utan", value: 5, pair: "Pongo"},
                        {label: "Spinne", value: 6, pair: "Arachnida"},
                        {label: "Taube", value: 7, pair: "Columbidae"},
                        {label: "Wolf", value: 8, pair: "Canis lupus"}
                    ],
                    listBot: [
                        {label: "Felidae", value: 3},
                        {label: "Ursidae", value: 1},
                        {label: "Arachnida", value: 6},
                        {label: "Columbidae", value: 7},
                        {label: "Nematocera", value: 4},
                        {label: "Myriapoda", value: 9},
                        {label: "Pongo", value: 5},
                        {label: "Brachycera", value: 2},
                        {label: "Canis lupus", value: 8}

                    ]
                },
                {
                    listLeft: [
                        {label: "Chromecast", value: 1, pair: "Google"},
                        {label: "Dreamcast", value: 2, pair: "Sega"},
                        {label: "Echo", value: 3, pair: "Amazon"},
                        {label: "Gameboy", value: 4, pair: "Nintendo"},
                        {label: "Thinkpad", value: 5, pair: "IBM"},
                        {label: "Tungsten", value: 6, pair: "Palm"},
                        {label: "Walkman", value: 7, pair: "Sony"},
                        {label: "Zune", value: 8, pair: "Microsoft"}
                    ],
                    listBot: [
                        {label: "Amazon", value: 3},
                        {label: "Google", value: 1},
                        {label: "Palm", value: 6},
                        {label: "Sony", value: 7},
                        {label: "Nintendo", value: 4},
                        {label: "Apple", value: 9},
                        {label: "IBM", value: 5},
                        {label: "Sega", value: 2},
                        {label: "Microsoft", value: 8}
                    ]
                },
                {
                    listLeft: [
                        {label: "Bulgarien", value: 1, pair: "Sonnenstrand"},
                        {label: "Italien", value: 2, pair: "Costa Smeralda"},
                        {label: "Spanien", value: 3, pair: "Playa den Bossa"},
                        {label: "Kroatien", value: 4, pair: "Zrce Beach"},
                        {label: "Griechenland", value: 5, pair: "Malia"},
                        {label: "Malta", value: 6, pair: "Paceville"},
                        {label: "Portugal", value: 7, pair: "Albufeira"},
                        {label: "Rumänien", value: 8, pair: "Mamaia"}
                    ],
                    listBot: [
                        {label: "Playa den Bossa", value: 3},
                        {label: "Sonnenstrand", value: 1},
                        {label: "Paceville", value: 6},
                        {label: "Albufeira", value: 7},
                        {label: "Zrce Beach", value: 4},
                        {label: "Balaton", value: 9},
                        {label: "Malia", value: 5},
                        {label: "Costa Smeralda", value: 2},
                        {label: "Mamaia", value: 8}

                    ]
                },
                {
                    listLeft: [
                        {label: "Wimbledon", value: 1, pair: "Serena Williams"},
                        {label: "Super Bowl", value: 2, pair: "Joe Montana"},
                        {label: "Stanley Cup", value: 3, pair: "Wayne Gretzky"},
                        {label: "PGA Championship", value: 4, pair: "Tiger Woods"},
                        {label: "Hong Kong Sevens", value: 5, pair: "Jonah Lomu"},
                        {label: "ESL", value: 6, pair: "Mike Grzesiek"},
                        {label: "ITTF World Tour", value: 7, pair: "Ma Long"},
                        {label: "Winter X-Games", value: 8, pair: "Shaun White"}
                    ],
                    listBot: [
                        {label: "Wayne Gretzky", value: 3},
                        {label: "Serena Williams", value: 1},
                        {label: "Mike Grzesiek", value: 6},
                        {label: "Ma Long", value: 7},
                        {label: "Tiger Woods", value: 4},
                        {label: "Michael Jordan", value: 9},
                        {label: "Jonah Lomu", value: 5},
                        {label: "Joe Montana", value: 2},
                        {label: "Shaun White", value: 8}

                    ]
                },
                {
                    listLeft: [
                        {label: "Eminem", value: 1, pair: "Machine Gun Kelly"},
                        {label: "Snoop Dogg", value: 2, pair: "Suge Knight"},
                        {label: "Eazy E", value: 3, pair: "Dr. Dre"},
                        {label: "Kollegah", value: 4, pair: "Fler"},
                        {label: "Bushido", value: 5, pair: "Kay One"},
                        {label: "Kool Savas", value: 6, pair: "Eko Fresh"},
                        {label: "Tupac", value: 7, pair: "Notorious B.I.G"},
                        {label: "Jay-Z", value: 8, pair: "Nas"}
                    ],
                    listBot: [
                        {label: "Dr. Dre", value: 3},
                        {label: "Machine Gun Kelly", value: 1},
                        {label: "Eko Fresh", value: 6},
                        {label: "Notorious B.I.G", value: 7},
                        {label: "Fler", value: 4},
                        {label: "Chris Brown", value: 9},
                        {label: "Kay One", value: 5},
                        {label: "Suge Knight", value: 2},
                        {label: "Nas", value: 8}

                    ]
                },
                {
                    listLeft: [
                        {label: "Natascha Ochsenknecht", value: 1, pair: "Cheyenne Savannah"},
                        {label: "Kim Kardashian", value: 2, pair: "North"},
                        {label: "Christina Aguilera", value: 3, pair: "Summer Rain"},
                        {label: "Victoria Beckham", value: 4, pair: "Harper Seven"},
                        {label: "Sarah Connor", value: 5, pair: "Delphine Malou"},
                        {label: "Angelina Jolie", value: 6, pair: "Maddox Chivan"},
                        {label: "Franziska von Almsick", value: 7, pair: "Mo Vito"},
                        {label: "Verona Pooth", value: 8, pair: "San Diego"}
                    ],
                    listBot: [
                        {label: "Summer Rain", value: 3},
                        {label: "Cheyenne Savannah", value: 1},
                        {label: "Maddox Chivan", value: 6},
                        {label: "Mo Vito", value: 7},
                        {label: "Harper Seven", value: 4},
                        {label: "Fifi Trixibelle", value: 9},
                        {label: "Delphine Malou", value: 5},
                        {label: "North", value: 2},
                        {label: "San Diego", value: 8}

                    ]
                },
                {
                    listLeft: [
                        {label: "1", value: 1, pair: "Wer ist das?"},
                        {label: "2", value: 2, pair: "Wer lügt?"},
                        {label: "4", value: 3, pair: "Click Duell"},
                        {label: "6", value: 4, pair: "Stick Fight"},
                        {label: "7", value: 5, pair: "Was fehlt?"},
                        {label: "8", value: 6, pair: "Zeitgefühl"},
                        {label: "9", value: 7, pair: "Tricky Towers"},
                        {label: "10", value: 8, pair: "Wann war das?"}
                    ],
                    listBot: [
                        {label: "Click Duell", value: 3},
                        {label: "Wer ist das?", value: 1},
                        {label: "Zeitgefühl", value: 6},
                        {label: "Tricky Towers", value: 7},
                        {label: "Stick Fight", value: 4},
                        {label: "Intros Raten", value: 9},
                        {label: "Was fehlt?", value: 5},
                        {label: "Wer lügt?", value: 2},
                        {label: "Wann war das?", value: 8}

                    ]
                }
                ]

        };

    }


    rightAnswer(e){
        document.getElementById(e).hidden = true;
        let position = this.state.position + 1;
        this.props.incPlayer(position%4);
        this.setState({
            position: position
        })
    }


    render(){
        return (
            <div style={{width: "99%"}}>

                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionLeave={false}
                    transitionAppearTimeout={2000}
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={1}>

                    <Row>
                        <Col sm="5">
                            {this.state.roundList[this.state.currentRound].listLeft.map((item)=>{

                                return(

                                    <BlockElement itemInfo={item} key={item.value} rightAnswer={(e)=> this.rightAnswer(e)}/>
                                )

                            })}
                        </Col>
                        <Col sm="7">
                            <Row>
                                <Col>
                                    <div style={{textAlign: "center", fontSize: "40px"}}>
                                        {this.state.playerList[this.state.position %4].name} ist am Zug
                                    </div>
                                </Col>
                            </Row>
                            <Row style={{ position: 'absolute', bottom: 0, right: 0}}>
                                {this.state.roundList[this.state.currentRound].listBot.map((item)=>{

                                    return(
                                        <Col sm="4">
                                            <div className="bot-block-upper" id={item.label}>
                                                {item.label}
                                            </div>
                                        </Col>

                                    )

                                })}
                            </Row>
                        </Col>
                    </Row>

                </ReactCSSTransitionGroup>

            </div>
        );
    };
}

export default Inline;
