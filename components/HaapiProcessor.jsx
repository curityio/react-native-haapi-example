/*
 *  Copyright 2023 Curity AB
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React, {useContext, useEffect, useState} from 'react';
import WelcomeView from './WelcomeView';
import {addEventListener, removeEventListener} from './EventManager';
import ErrorView from './ErrorView';
import WebAuthnLoginView from "./WebAuthnLoginView";
import Actions from "./Actions";
import {HaapiContext} from "../App";

const HaapiProcessor = props => {
    const {setTokens, setError} = useContext(HaapiContext);
    const [stepComponent, setStepComponent] = useState(<WelcomeView />);

    useEffect(() => {
        const listeners = [];
        listeners.push(
                addEventListener('AuthenticationStep', event => processAuthenticationStep(event)),
                addEventListener('AuthenticationSelectorStep', event => processAuthenticationStep(event)),
                addEventListener('PollingStep', event => processAuthenticationStep(event)),
                addEventListener('ContinueSameStep', event => processAuthenticationStep(event)),
                addEventListener('TokenResponse', event => setTokens(event)),
                addEventListener('TokenResponseError', event => {
                    console.warn(
                            `Failed to get token(s) after successful authentication. ${event.error}: ${event.error_description}`,
                    );
                    setStepComponent(
                            <ErrorView error={'Failed to request token'} errorDescription={event.error_description} />,
                    );
                }),
                addEventListener('UnknownResponse', event => {
                    console.warn(`Unknown HAAPI response: ${JSON.stringify(event)}`)
                    setStepComponent(
                            <ErrorView error={'Unknown HAAPI response'} response={event} />,
                    );
                }),
                addEventListener('SessionTimedOut', event => {
                    console.info('Session timed out during authentication. User will have to start over.');
                    setStepComponent(<ErrorView error={'Session timed out'} errorDescription={event.title.literal} />);
                }),
                addEventListener('ProblemRepresentation', event => {
                    console.warn('Received a problem');
                    setStepComponent(<ErrorView response={event} />);
                }),
                addEventListener('WebAuthnAuthenticationStep', event => setWebauthnStep(event)),
                addEventListener("WebAuthnUserCancelled", event => setWebauthnStep(event,
                        "User cancelled Webauthn dialog")),
                addEventListener("WebAuthnRegistrationFailed", event => setWebauthnStep(event,
                        "Registration failed. Please try again")),
                addEventListener("WebAuthnRegistrationFailedKeyRegistered", event => setWebauthnStep(event,
                        "Registration failed. Key is possibly already registered"))
        );

        return () => {
            console.debug('Removing all listeners in HaapiProcessor');
            listeners.forEach(listener => removeEventListener(listener));
        };
    }, []);

    const setWebauthnStep = (event, error) => {
        setError(error);
        setStepComponent(<WebAuthnLoginView response={event} />)
    }

    const processAuthenticationStep = haapiResponse => {
        console.debug("Received an authentication step: " + JSON.stringify(haapiResponse));
        setStepComponent(<Actions actions={haapiResponse.actions} haapiResponse={haapiResponse} />);
    };

    return stepComponent;
};
export default HaapiProcessor;
