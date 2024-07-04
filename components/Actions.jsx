/*
 *   Copyright 2024 Curity AB
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import Polling from "./Polling";
import * as Haapi from "./Haapi";
import {Options, SubmitButton} from "./view-components";
import ContinueView from "./ContinueView";
import BankIdView from "./BankIdView";
import GenericLoginView from "./GenericLoginView";
import Styles from "../Styles";
import React from "react";

const Actions = (props) => {
    const {actions, haapiResponse} = props;
    const actionComponents = actions.map(action => {
        switch (action.kind) {
            case 'poll':
                return <Polling poll={() => Haapi.submitAction(action)} key={'polling'} />;
            case 'authenticator-selector':
                return <Options options={action.model.options} onFollowLink={Haapi.followLink}
                                key={'options'} />;
            case 'continue':
                return (
                        <ContinueView
                                action={action}
                                onSubmit={Haapi.submitAction}
                                messages={haapiResponse.messages}
                                key={'continue'}
                        />
                );
            case 'device-register':
            case 'login':
                console.log(JSON.stringify(action));
                if (action.model.name === 'bankid') {
                    return (
                            <BankIdView
                                    action={action}
                                    links={haapiResponse.links}
                                    messages={haapiResponse.messages}
                                    onFollowLink={Haapi.followLink}
                                    key={'bankid-view'}
                            />
                    );
                } else {
                    return (
                            <GenericLoginView
                                    action={action}
                                    links={haapiResponse.links}
                                    messages={haapiResponse.messages}
                                    onFollowLink={Haapi.followLink}
                                    onSubmit={Haapi.submitAction}
                                    key={'generic-view'}
                            />
                    );
                }
            case 'cancel':
                return (
                        <SubmitButton
                                title={action.title.literal}
                                style={[Styles.cancelButton, Styles.button]}
                                onPress={() => Haapi.submitAction(action)}
                                key={'cancel-button'}
                        />
                );
        }
    });
    return <>{actionComponents}</>

}
export default Actions