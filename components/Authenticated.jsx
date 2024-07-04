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

import React, {Text, View} from "react-native";
import base64 from "base-64";
import Styles from "../Styles";
import * as Haapi from "./Haapi";
import {JsonView, SubmitButton} from "./view-components";

export default function Authenticated(props) {

    const getSubject = (idToken) => {
        if (!idToken) {
            return "";
        }

        let decoded = JSON.parse(decode(idToken));
        return decoded.sub;
    };
    const decode = (idToken) => {
        if (!idToken) {
            return "";
        }
        return base64.decode(idToken.split(".")[1]);
    };

    const {idToken, accessToken, refreshToken, scope, expiresIn} = props.tokens;
    const setTokens = props.setTokens
    const subject = getSubject(idToken);

    const logout = () => {
        Haapi.logout().then(setTokens(null));
    };

    const refresh = () => {
        Haapi.refreshAccessToken(refreshToken).then(tokenResponse => setTokens(tokenResponse));
    };

    return (
            <View>
                <Text style={Styles.heading}>Hello {subject}!</Text>
                <SubmitButton style={Styles.button} title="Logout" onPress={() => logout()} />
                <Text style={Styles.heading}>Access Token</Text>
                <Text style={Styles.json}>{accessToken}</Text>
                <Text style={Styles.heading}>Scope</Text>
                <Text style={Styles.json}>{scope}</Text>
                <Text style={Styles.heading}>Expires In</Text>
                <Text style={Styles.json}>{expiresIn}</Text>
                {refreshToken ?
                        <View>
                            <Text style={Styles.heading}>Refresh Token</Text>
                            <Text style={Styles.json}>{refreshToken}</Text>
                            <SubmitButton style={Styles.button} title="Refresh" onPress={() => refresh()} />
                        </View>
                        : ""}
                <Text style={Styles.heading}>ID Token claims</Text>
                <JsonView json={decode(idToken)} />
            </View>
    );
}
