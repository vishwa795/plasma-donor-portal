import React, {Component} from 'react';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import FAQs from './FAQsComponent'
import About from './AboutComponent'

class Main extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <React.Fragment>
                <Header />
                <Switch location={this.props.location}>
                    <Route path="/about" exact component={(props)=><About {...props} />} />
                    <Route path="/faq" exact component={(props)=><FAQs {...props} />} />
                    <Route path="/:page?" component={(props)=><Home {...props} />} />
                    <Redirect to="/" />
                </Switch>
            </React.Fragment>
        )
    }
}

export default withRouter(Main);