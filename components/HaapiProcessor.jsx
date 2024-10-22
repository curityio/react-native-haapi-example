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

import React, {useEffect, useState} from 'react';
import WelcomeView from './WelcomeView';
import Styles from '../Styles';
import {addEventListener, removeEventListener} from './EventManager';
import ErrorView from './ErrorView';
import HaapiModule from './HaapiModule';
import Polling from './Polling';
import {Options, SubmitButton} from './view-components';
import ContinueView from './ContinueView';
import BankIdView from './BankIdView';
import GenericLoginView from './GenericLoginView';

const HaapiProcessor = props => {
    const {setTokens} = props;
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
                addEventListener('SessionTimedOut', event => {
                    console.log('Session timed out during authentication. User will have to start over.');
                    setStepComponent(<ErrorView error={'Session timed out'} errorDescription={event.title.literal} />);
                }),
        );

        return () => {
            console.debug('Removing all listeners in HaapiProcessor');
            listeners.forEach(listener => removeEventListener(listener));
        };
    }, []);

    const submitAction = async (action, parameters = {}) => {
        console.debug('Submitting action: ' + JSON.stringify(action));
        try {
            await HaapiModule.submitForm(action, parameters);
        } catch (e) {
            console.debug('Error in submitting' + JSON.stringify(action));
            console.error(e);
        }
    };

    const followLink = async model => {
        console.debug('Following link: ' + JSON.stringify(model));
        try {
            await HaapiModule.navigate(model);
        } catch (e) {
            console.debug('Error in following link' + JSON.stringify(model));
            console.error(e);
        }
    };

    const processAuthenticationStep = haapiResponse => {
        console.debug("Received an authentication step: " + JSON.stringify(haapiResponse));
        const actionComponents = haapiResponse.actions.map(action => {
            switch (action.kind) {
                case 'poll':
                    return <Polling poll={() => submitAction(action)} key={'polling'} />;
                case 'authenticator-selector':
                    return <Options options={action.model.options} onFollowLink={followLink} key={'options'} />;
                case 'continue':
                    return (
                            <ContinueView
                                    action={action}
                                    onSubmit={submitAction}
                                    messages={haapiResponse.messages}
                                    key={'continue'}
                            />
                    );
                case 'login':
                    if (action.model.name === 'bankid') {
                        return (
                                <BankIdView
                                        action={action}
                                        links={haapiResponse.links}
                                        messages={haapiResponse.messages}
                                        onFollowLink={followLink}
                                        key={'bankid-view'}
                                />
                        );
                    } else {
                        return (
                                <GenericLoginView
                                        action={action}
                                        links={haapiResponse.links}
                                        messages={haapiResponse.messages}
                                        onFollowLink={followLink}
                                        onSubmit={submitAction}
                                        key={'generic-view'}
                                />
                        );
                    }
                case 'cancel':
                    return (
                            <SubmitButton
                                    title={action.title.literal}
                                    style={[Styles.cancelButton, Styles.button]}
                                    onPress={() => submitAction(action)}
                                    key={'cancel-button'}
                            />
                    );
            }
        });
        setStepComponent(<>{actionComponents}</>);
    };

    return stepComponent;
};
export default HaapiProcessor;
