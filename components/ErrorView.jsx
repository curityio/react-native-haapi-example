/*
 *   Copyright 2023 Curity AB
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

import Styles from "../Styles";
import {JsonView, Messages, Problem, SubmitButton, Title} from "./view-components";
import * as Haapi from './Haapi';
import {useContext} from "react";
import {HaapiContext} from "../App";

const ErrorView = (props) => {
    const {error, errorDescription, response} = props;
    const {setError} = useContext(HaapiContext);

    let messages, jsonView = <></>;
    let title;
    if (response) {
       messages = <Messages messages={response.messages} />;
       jsonView = <JsonView json={JSON.stringify(response)} />;
       title = response.title.literal || response.title;
    }
    else {
        title = error;
    }

    return <>
        <Title title={title} />
        <Problem problem={errorDescription} />
        {messages}
        {jsonView}
        <SubmitButton style={Styles.button}
                      title={"Retry"}
                      onPress={() => {
                          setError(null)
                          Haapi.startLogin()
                      }} />
    </>;
}

export default ErrorView