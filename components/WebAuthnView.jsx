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

import {Links, Messages, Title} from "./view-components";
import React, {useContext, useEffect} from "react";
import Styles from "../Styles";
import {addEventListener, removeEventListener} from "./EventManager";
import {HaapiContext} from "../App";

const WebAuthnView = (props) => {
    const response = props.response;
    const {setError} = useContext(HaapiContext);
    const action = response.actions[0];


    useEffect(() => {
        const listeners = [
            addEventListener("WebAuthnUserCancelled", () => setError("User cancelled Webauthn dialog")),
            addEventListener("WebAuthnRegistrationFailed", () => setError("Registration failed. Please try again")),
            addEventListener("WebAuthnRegistrationFailedKeyRegistered", () => setError("Registration failed. Key is possibly already registered")),
        ];

        // Removes the listener once unmounted
        return () => {
            listeners.forEach(listener => removeEventListener(listener));
        };
    }, []);


    const title = action.title.literal || action.title;
    const continueActions = response.actionModel.continueActions ?  <Links links={response.actionModel.continueActions} style={Styles.button} textStyle={Styles.buttonText}/> : <></>;
    return <>
        <Title title={title} Styles={Styles.heading} />
        <Messages messages={response.messages} />
        {continueActions}
        <Links links={response.links} />
    </>;

};

export default WebAuthnView;