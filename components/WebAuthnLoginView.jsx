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

import {Messages, RegistrationLinks, SubmitButton, Title} from "./view-components";
import React, {useContext, useEffect} from "react";
import Styles from "../Styles";
import {addEventListener, removeEventListener} from "./EventManager";
import {HaapiContext} from "../App";

const WebAuthnLoginView = (props) => {
    const response = props.response;
    const {setError} = useContext(HaapiContext);


    useEffect(() => {
        console.log(JSON.stringify(response));
        const listeners = [
            addEventListener("WebAuthnUserCancelled", () => setError("User cancelled Webauthn dialog")),
            addEventListener("WebAuthnRegistrationFailed", () => setError("Registration failed. Please try again")),
            addEventListener("WebAuthnRegistrationFailedKeyRegistered", () => setError("Registration failed. Key is possibly already registered"))
        ];

        // Removes the listener once unmounted
        return () => {
            listeners.forEach(listener => removeEventListener(listener));
        };
    }, []);

    const RetryActions = ({actions}) => {
        const buttons = actions.map((action, index) => {
            return <SubmitButton title={action.title.literal}
                                 key={`action-${index}`}
                                 onPress={() => console.debug("Retry pushed")} />
        });
        return <>{buttons}</>
    }

    return <>
        <Title title="WebAuthn" Styles={Styles.heading} />
        <Messages messages={response.messages} />
        <RegistrationLinks links={response.links} />
    </>;

};

export default WebAuthnLoginView;
