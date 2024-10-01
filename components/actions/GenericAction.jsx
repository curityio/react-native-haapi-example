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

import {Fields, SubmitButton, Title} from "../view-components";
import React, {useContext, useEffect, useState} from "react";
import Styles from "../../Styles";
import {addEventListener, removeEventListener} from "../EventManager";
import {HaapiContext} from "../../App";

const GenericAction = (props) => {
    const {action, onSubmit} = props;
    const [fieldValues, setFieldValues] = useState({});
    const {setError} = useContext(HaapiContext);

    useEffect(() => {
        const listeners = [
            addEventListener("IncorrectCredentials", event => {
                setError(event.title.literal ? event.title.literal : event.title)
            }),
            addEventListener("ProblemRepresentation", event => setError(event.title.literal ? event.title.literal : event.title)),
        ];

        // Removes the listener once unmounted
        return () => {
            listeners.forEach(listener => removeEventListener(listener));
        };
    }, []);
    return <>
        <Title title={action.title.literal} Styles={Styles.heading} />
        <Fields fields={action.model.fields} setFieldValues={setFieldValues} fieldValues={fieldValues} />
        <SubmitButton title={action.model.actionTitle} style={Styles.button}
                      onPress={() => {
                          setError(null)
                          onSubmit(action, fieldValues)
                      }} />
    </>;

};
export default GenericAction;
