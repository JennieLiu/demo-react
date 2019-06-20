import React, {Component} from 'react';
import appConfig from "./appConfig.js"
import Mytable from "./Mytable/Mytable"



export default class Application extends Component {
    constructor(props) {
        super(props);
        //this.createApplicationPage = this.createApplicationPage.bind(this);
        this.state = appConfig;
        this.setAppState = this.setAppState.bind(this);

    }

    render() {
        return (
            <div>
                <Mytable TableData = {this.state.TableData}
                         setAppState={this.setAppState.bind(this)}/>
            </div>
        );
    }

    setAppState(key, value){
        this.setState({[key]:value});
    }

}