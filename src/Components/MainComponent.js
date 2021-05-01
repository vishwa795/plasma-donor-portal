import React, {Component} from 'react';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';

class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <Header />
                <Switch location={this.props.location}>
                    <Route path="/" component={Home} /> {/* Add Modals on /signup endpoint */}
                    <Redirect to="/" />
                </Switch>
            </React.Fragment>
        )
    }
}

export default withRouter(Main);