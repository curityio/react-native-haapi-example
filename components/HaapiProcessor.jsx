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

import React, {useEffect, useState} from "react";
import StartAuthorization from "./StartAuthorization";
import {Alert, NativeModules, Text, View} from "react-native";
import HaapiForm from "./HaapiForm";
import HaapiConfiguration from "../configuration";
import Styles from "../Styles";
import {addEventListener, removeEventListener} from "./EventManager";
import ErrorView from "./ErrorView";

export default function HaapiProcessor(props) {
    const welcome = <StartAuthorization startAuthorization={() => startAuthorization()}/>;
    const {setTokens} = props;
    const [stepComponent, setStepComponent] = useState(welcome);
    const {HaapiModule} = NativeModules;

    useEffect(() => {
        const listeners = [];
        listeners.push(
            addEventListener("AuthenticationStep", event => processAuthenticationStep(event)),
            addEventListener("AuthenticationSelectorStep", event => processAuthenticationStep(event)),
            addEventListener("PollingStep", event => processAuthenticationStep(event)),
            addEventListener("ContinueSameStep", event => processAuthenticationStep(event)),
            addEventListener("TokenResponse", event => setTokens(event)),
            addEventListener("HaapiError", event => Alert.alert(event.error, event.error_description)),
            addEventListener("SessionTimedOut", event => {
                setStepComponent(<ErrorView error={"Session timed out"} errorDescription={event.title.literal}
                                            startOver={() => startAuthorization}/>)
            })
        );

        return () => {
            console.log("Removing all listeners in HaapiProcessor");
            listeners.forEach((listener => removeEventListener(listener)));
        };
    }, []);


    const submitAction = (action, parameters) => {
        console.log("Submitting action: " + JSON.stringify(action));
        HaapiModule.submitForm(action, parameters);
    };

    const followLink = (model) => {
        console.log("Following link: " + JSON.stringify(model));

        HaapiModule.navigate(model);
    };
    const processAuthenticationStep = (haapiResponse) => {
        console.log(JSON.stringify(haapiResponse));
        const component = <HaapiForm actions={haapiResponse.actions}
                                     onSubmit={submitAction}
                                     onFollowLink={followLink}
                                     messages={haapiResponse.messages}
                                     links={haapiResponse.links}/>;
        setStepComponent(component);
    };

    const startAuthorization = async () => {
        console.log("Starting authorization");

        HaapiModule.start(HaapiConfiguration);
    };

    return (
        <View style={Styles.centerContainer}>
            <Text style={Styles.heading}> This is a demo app showing HAAPI capabilities </Text>
            {stepComponent}
        </View>
    );
}
