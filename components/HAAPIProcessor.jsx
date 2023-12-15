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
import {NativeModules, Text, View} from "react-native";
import {Layout} from "./example";
import HaapiForm from "./HaapiForm";
import HaapiConfiguration from "../configuration";

export default function HAAPIProcessor(props) {
    const {setTokens} = props
    const [step, setStep] = useState({name: null, haapiResponse: null, inputProblem: null})
    const [missingResponseType, setMissingResponseType] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [links, setLinks] = useState([])

    useEffect(() => {
        if (step.name === 'authorization-complete') {
            const {HaapiModule} = NativeModules;
            HaapiModule.tokenRequest(step.haapiResponse.properties.code)
                .then(data => JSON.parse(data))
                .then(data => setTokens(data))
                .catch(e => {
                    throw new Error(`Failed to parse token response: ${e}`)
                })
        }
    }, [step])

    const submitForm = (model, parameters) => {
        const {HaapiModule} = NativeModules;
        HaapiModule.submitForm(model, parameters)
            .then((data) => JSON.parse(data))
            .then((haapiResponse) => {
                setStep({name: 'process-result', haapiResponse: haapiResponse})
            });
    }
    const processAuthenticationStep = () => {
        const {haapiResponse} = step
        const view = haapiResponse.metadata.viewName

        const onFollowLink = (model) => {
            const {HaapiModule} = NativeModules;
            HaapiModule.navigate(model)
                .then((data) => JSON.parse(data))
                .then((haapiResponse) => {
                    setStep({name: 'process-result', haapiResponse: haapiResponse})
                });
        }

        switch (view) {
            case 'authenticator/external-browser/launch':
                setStep({name: 'external-browser-launch', haapiResponse: step.haapiResponse})
                return
            default:
                return <HaapiForm actions={haapiResponse.actions}
                                  onSubmit={submitForm}
                                  inputProblem={step.inputProblem}
                                  onFollowLink={onFollowLink}
                                  messages={haapiResponse.messages}
                                  links={haapiResponse.links}/>
        }
    }

    const startAuthorization = async () => {
        console.log("Starting authorization")
        setStep({name: 'loading', haapiResponse: null, inputProblem: null})
        setIsLoading(true)

        const {HaapiModule} = NativeModules;
        HaapiModule.start(HaapiConfiguration)
            .then((data) => JSON.parse(data))
            .then((haapiResponse) => {
                setStep({name: 'process-result', haapiResponse: haapiResponse})
            });
    }


    const processHaapiResult = async () => {
        const {haapiResponse} = step
        console.log(haapiResponse.type)
        setIsLoading(false)
        switch (haapiResponse.type.toLowerCase()) {
            case 'polling_step':
                processPollingStep()
                break;
            case 'authentication_step':
                setStep({name: 'authentication-step', haapiResponse})
                break
            case 'registration_step':
                setStep({name: 'registration-step', haapiResponse})
                break
            case 'https://curity.se/problems/incorrect-credentials':
                setStep({name: 'authentication-step', inputProblem: haapiResponse, haapiResponse})
                break
            case 'oauth_authorization_response':
                setStep({name: 'authorization-complete', haapiResponse})
                break
            case 'https://curity.se/problems/invalid-input':
                setStep({name: step.name, haapiResponse: step.haapiResponse, inputProblem: haapiResponse})
                break
            default:
                console.error(`Unknown type: ${haapiResponse.type}`)
                setStep({name: 'unknown-step', haapiResponse})
                setMissingResponseType('step type')
        }
    }

    useEffect(() => {
        switch (step.name) {
            case 'process-result':
                processHaapiResult()
                break
            default:
                break
        }
    }, [step])

    const processPollingStep = () => {
        const haapiResponse = step.haapiResponse
        switch (haapiResponse.properties.status) {
            case "DONE":
            case "FAILED":
                submitForm(haapiResponse.mainAction, {})
                break;
            default:
                if(step.haapiResponse.type === "POLLING_STEP") {
                    // already in polling, just update any links
                }
                setStep({name: 'authentication-step', haapiResponse})
        }
    }

    let stepComponent

    switch (step.name) {
        case 'loading':
        case 'authorization-complete':
        case 'process-result':
            stepComponent = <Text>Loading..</Text>
            break
        case 'authentication-step':
            stepComponent = processAuthenticationStep()
            break
        case 'unknown-step':
            stepComponent = <Layout>
                <Text message={`Unknown ${missingResponseType}`}/>
            </Layout>
            break
        default:
            stepComponent =
                <Layout>
                    <View>
                        {step.problem && <Text message={step.problem.title}/>}
                        <View className="area">
                            <Text title="This is a demo app showing HAAPI capabilities"/>
                            <Text>Click the button below to start the login flow without leaving this SPA</Text>
                        </View>
                        <StartAuthorization startAuthorization={() => startAuthorization()}/>
                    </View>
                </Layout>
    }

    return (<>
        {/* {step.problem && <Error message={step.problem.title} />} */}
        <View className="example-app-settings active">
            <Text>HAAPI demo application with React</Text>
        </View>

        {stepComponent}
    </>)
}
