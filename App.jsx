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
import HaapiProcessor from "./components/HaapiProcessor";
import AuthenticatedView from "./components/AuthenticatedView";
import Styles from "./Styles";
import {Alert, SafeAreaView, ScrollView, View} from "react-native";
import {addEventListener, removeEventListener} from "./components/EventManager";
import {Header, Info, Problem, Spinner} from "./components/view-components";
import WelcomeView from "./components/WelcomeView";

export const HaapiContext = React.createContext(null);

const App = () => {
    const [tokens, setTokens] = useState(null);
    const [error, setError] = useState(null);
    const [infoText, setInfoText] = useState(null);
    const [isLoading, setLoading] = useState(false)
    const [isWelcome, setWelcome] = useState(true)
    const [stepComponent, setStepComponent] = useState(null);

    useEffect(() => {
        const listeners = [
            addEventListener("HaapiError", event => Alert.alert(event.error, event.error_description)),
            addEventListener("HaapiLoading", () => setLoading(true)),
            addEventListener("HaapiFinishedLoading", () => setLoading(false))
        ];
        return () => listeners.forEach(listener => removeEventListener(listener));
    }, []);

    const clearState = () => {
        setWelcome(true);
        setError(false);
        setTokens(null);
        setStepComponent(null);
    }

    return (
            <SafeAreaView style={Styles.layoutContainer}>
                <View style={Styles.innerLayoutContainer}>
                    <Header style={Styles.header} onPress={() => clearState()} />
                    {isWelcome &&
                            <WelcomeView onLogin={() => setWelcome(false)} />
                    }
                    <HaapiContext.Provider value={{
                        tokens: tokens,
                        setTokens: setTokens,
                        error: error,
                        infoText: infoText,
                        setInfoText: setInfoText,
                        setError: setError,
                        isLoading: isLoading,
                        setLoading: setLoading,
                        setStepComponent: setStepComponent,
                        stepComponent: stepComponent,
                        clearState: clearState,
                    }}>
                        <Problem problem={error} styles={Styles.inputProblem} />
                        <Info info={infoText} />
                        <ScrollView contentContainerStyle={Styles.mainContent}>
                            {tokens ? <AuthenticatedView /> : <HaapiProcessor />}
                        </ScrollView>
                    </HaapiContext.Provider>
                </View>
                {isLoading &&
                        <Spinner style={Styles.spinner} />
                }
            </SafeAreaView>
    );
};

export default App;