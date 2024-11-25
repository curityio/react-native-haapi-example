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

import Styles from '../Styles';
import {SubmitButton} from './view-components';
import {Image, Text, View} from 'react-native';
import * as Haapi from './Haapi';
import React from 'react';

const WelcomeView = props => {
    const onLogin = () => {
        props.onLogin();
        Haapi.startLogin();
    }
    return (<>
                <View style={Styles.loginImageContainer}>
                    <Image style={Styles.loginImage} source={require("../images/login-symbol-computer.png")} />
                    <Text style={Styles.heading}> This is a demo app showing HAAPI capabilities </Text>
                </View>
                <SubmitButton onPress={onLogin} style={Styles.button} title="Login" />
            </>
    );
};

export default WelcomeView;
