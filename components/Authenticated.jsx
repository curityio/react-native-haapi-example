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

import React, {StyleSheet, Text, View} from "react-native";
import {Header, Layout} from "./example";
import base64 from 'base-64'

export default function Authenticated(props) {

    const getSubject = (idToken) => {
        if (!idToken) {
            return ""
        }

        let decoded = JSON.parse(decode(idToken))
        return decoded.sub;
    };
    const decode = (idToken) => {
        return base64.decode(idToken.split('.')[1])
    }

    const prettyPrintPayload = (idToken) => {
        return JSON.stringify(decode(idToken), null, 2)
    }

    const {idToken} = props.tokens
    const subject = getSubject(idToken)

    const styles = StyleSheet.create({
        jsonData: {},
        heading: {
            fontWeight: 'bold',
            marginTop: 12,
            marginBottom: 18,
        }
    })

    return (
        <Layout>
            <Header/>
            <Text style={styles.heading}>Hello {subject}!</Text>

            <View className="example-app-settings active">
                <Text>ID Token claims</Text>
                <Text style={styles.jsonData}>{prettyPrintPayload(idToken)}</Text>
            </View>
        </Layout>
    );
}
