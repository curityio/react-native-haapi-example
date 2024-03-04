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

import React, {useState} from 'react';
import WelcomeView from './WelcomeView';
import Styles from '../Styles';
import HaapiModule from './HaapiModule';
import Polling from './Polling';
import {Options, SubmitButton} from './view-components';
import ContinueView from './ContinueView';
import BankIdView from './BankIdView';
import GenericLoginView from './GenericLoginView';
import ErrorView from "./ErrorView";

const HaapiProcessor = props => {

    const startHaapiLogin = () => {
        console.log('Starting login');
        HaapiModule.start()
                .then(processResponse)
                .catch((e) => console.error(e))
    };

    const {setTokens} = props;
    const [stepComponent, setStepComponent] = useState(<WelcomeView onLogin={startHaapiLogin} />);
    const submitAction = (action, parameters = {}) => {
        console.debug('Submitting action: ' + JSON.stringify(action));
        HaapiModule.submitForm(action, parameters).then(haapiResponse => {
            processResponse(haapiResponse);
        }).catch(error => {
            console.error(error);
        });
    };

    const followLink = model => {
        console.debug('Following link: ' + JSON.stringify(model));
        HaapiModule.navigate(model)
                .then(processResponse)
                .catch(error => {
                    console.error(error);
                });
    };

    const processResponse = (haapiResponse) => {
        // Not exhaustive, just testing the promises
        switch (haapiResponse.type) {
            case 'POLLING_STEP':
            case 'AUTHENTICATION_STEP':
                processAuthenticationStep(haapiResponse);
                break;
            case 'https://curity.se/problems/incorrect-credentials':
                // Should show error in same view. Showing error view allowing the user to restart for now
                setStepComponent(<ErrorView error="Invalid Credentials" errorDescription={"Invalid credentials"}
                                            retry={() => startHaapiLogin()} />)
                break;
            case undefined:
                // likely, token response. Needs more validating
                setTokens(haapiResponse)
                break;
            default:
                console.log(haapiResponse);
                setStepComponent(<ErrorView error="Unknown step" errorDescription={haapiResponse.type}
                                            retry={() => startHaapiLogin()} />)
        }
    }

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
