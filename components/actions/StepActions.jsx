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

import PollingAction from "../Polling";
import * as Haapi from "../Haapi";
import {Links, Messages, SubmitButton} from "../view-components";
import ContinueAction from "./ContinueAction";
import BankIdAction from "./BankIdAction";
import GenericAction from "./GenericAction";
import Styles from "../../Styles";
import React from "react";
import AuthenticatorSelectorAction from "./AuthenticatorSelectorAction";

const StepActions = (props) => {
    const {actions, haapiResponse} = props;
    let actionShowMessages = false;
    let actionShowLinks = false;

    const actionComponents = actions.map(action => {
        switch (action.kind) {
            case 'poll':
                return <PollingAction poll={() => Haapi.submitAction(action)} key={'polling'} />;
            case 'redirect':
                Haapi.followLink(action.model);
                return null
            case 'authenticator-selector':
                return <AuthenticatorSelectorAction action={action}
                                                    key={'authenticator-selector'} />
            case 'continue':
                actionShowMessages = true;
                return (
                        <ContinueAction
                                action={action}
                                onSubmit={Haapi.submitAction}
                                messages={haapiResponse.messages}
                                key={'continue'}
                        />
                );
            case 'cancel':
                const title = action.model.actionTitle.literal || action.model.actionTitle;
                return (
                        <SubmitButton
                                title={title}
                                style={[Styles.cancelButton, Styles.button]}
                                onPress={() => Haapi.submitAction(action)}
                                key={'cancel-button'}
                        />
                );
            default:
                if (action.model.name === 'bankid') {
                    actionShowMessages = true;
                    actionShowLinks = true;
                    return (
                            <BankIdAction
                                    action={action}
                                    links={haapiResponse.links}
                                    messages={haapiResponse.messages}
                                    onFollowLink={Haapi.followLink}
                                    key={'bankid-view'}
                            />
                    );
                } else {
                    return (
                            <GenericAction
                                    action={action}
                                    onSubmit={Haapi.submitAction}
                                    key={'generic-view'}
                            />
                    );
                }
        }
    });
    const messages = actionShowMessages ? <></> : <Messages messages={haapiResponse.messages} />;
    const links = actionShowLinks ? <></> : <Links links={haapiResponse.links} />;
    console.debug(`An action will show the messages: ${actionShowMessages}`);
    console.debug(`An action will show the links: ${actionShowLinks}`);
    console.debug(`Creating view with messages: ${JSON.stringify(haapiResponse.messages)} and links: ${JSON.stringify(haapiResponse.links)}`);
    return (<>
        {messages}
        {actionComponents}
        {links}
    </>)

}
export default StepActions