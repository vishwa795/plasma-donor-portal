import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './Components/MainComponent';
import { Auth0Provider } from '@auth0/auth0-react';
import pincodeVerification from './utils/pincodeVerification'
import { useState } from 'react'

function App() {

  const [result, setResult] = useState(null)

  //pincodeVerification(73510, setResult)
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
  return (
    <BrowserRouter>
      <Auth0Provider
      domain={domain}
      clientId={clientID}
      audience={`https://${domain}/api/v2/`}
      scope="read:current_user update:current_user_metadata"
      redirectUri={window.location.origin}
      >
        <div className="App">
          <Main />
        </div>
      </Auth0Provider>
    </BrowserRouter>
  );
}

export default App;
