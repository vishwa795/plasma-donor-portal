import React, {Component} from 'react';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import FAQs from './FAQsComponent'
import About from './AboutComponent'
import { useQuery } from '@apollo/client';
import {GET_USER_DETAILS} from '../Graphql/queries';

import {} from '@auth0/auth0-react';

class Main extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        
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