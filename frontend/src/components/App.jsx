import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import diagram from '../img/pi.png';
import config from '../config.js';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: config.api.URL,
        region: config.api.REGION,
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
        }
      },
    ],
  },
});

const AppWithAuth = () => {
  const [pi, setPi] = useState([]);
  const noOfPoints = 1000000;

  useEffect(() => {
    getPi()
  }, []);

  async function getPi() {
    try {
      const piData = await Amplify.API
        .get('api', `pi?count=${noOfPoints}`, {});
      const p = JSON.stringify(piData);
      setPi(p);
    } catch (err) { console.log('error fetching PI') }
  }

	return(
	  <div>
    <div style={{ 'textAlign': "center" }}>
      <img width="200" alt="logo" src={diagram} />
    </div>
	  <div>
      <h1>Estimation of PI based on Monte Carlo method with {noOfPoints} points</h1>
      <h2>And the answer is...</h2>
      <h1>{pi}</h1>
	  </div>
    </div>);

};

export default withAuthenticator(AppWithAuth, true);

