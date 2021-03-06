import React, {Component} from 'react';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import FAQs from './FAQsComponent'
import About from './AboutComponent'
import { withAuth0 } from '@auth0/auth0-react';
import { setContext } from 'apollo-link-context';
import { ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const httpLink = createHttpLink({
    uri: 'https://covid-plasma.herokuapp.com/v1/graphql'
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('accessToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
  const authdClient = new ApolloClient({
    link:  authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  const unauthdClient = new ApolloClient({
      uri :'https://covid-plasma.herokuapp.com/v1/graphql',
      cache: new InMemoryCache()
  })

class Main extends Component{
    
      
    constructor(props){
        super(props);
        this.state={
            user:null,
            initInputTaken:true,
        }
    }
    componentDidMount(){
      if(localStorage.getItem('initInputTaken') === null){
        this.setState({initInputTaken:false});
      }
    }

    setInitInputTaken = (value,bloodSelected,stateSelected) => {
      this.setState({initInputTaken:true});
      localStorage.setItem('initInputTaken',true);
      localStorage.setItem('bloodSelected',JSON.stringify(bloodSelected));
      localStorage.setItem('stateSelected',stateSelected);
    }

    setUserInfo = (userInfo) => this.setState({user:userInfo});
    render(){
        const {isAuthenticated,user} = this.props.auth0;
        if(isAuthenticated){
          localStorage.setItem('user-id',user.sub);
        }

        return(
            <React.Fragment>
                <ApolloProvider client={isAuthenticated?authdClient:unauthdClient}>
                <Header setUserInfo={this.setUserInfo} />
                <Switch location={this.props.location}>
                 
                    <Route path="/about" exact component={(props)=><About {...props} />} />
                    <Route path="/faq" exact component={(props)=><FAQs {...props} />} />
                    <Route path="/" component={(props)=><Home initInputTaken={this.state.initInputTaken} setInitInputTaken={this.setInitInputTaken} />} />
                    <Redirect to="/" />
                    
                </Switch>
                </ApolloProvider>
            </React.Fragment>
        )
    }
}

export default withAuth0(withRouter(Main));