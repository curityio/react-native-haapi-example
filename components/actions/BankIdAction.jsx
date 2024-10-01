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

import React, {useCallback, useEffect, useState} from 'react';
import {Divider, Links, Messages, SubmitButton, Title} from '../view-components';
import {Linking, View} from 'react-native';
import Styles from '../../Styles';
import {addEventListener, removeEventListener} from '../EventManager';

const BankIdAction = props => {
    const {action} = props;
    const [bankIdMessages, setBankIdMessages] = useState(props.messages);
    const [bankIdLinks, setBankIdLinks] = useState(props.links);

    useEffect(() => {
        let pollResultListener = addEventListener('PollingStepResult', haapiResponse => {
            setBankIdMessages(haapiResponse.messages);
            setBankIdLinks(haapiResponse.links);
        });

        return () => {
            removeEventListener(pollResultListener);
        };
    }, []);
    const LaunchBankIdButton = props => {
        const handlePress = useCallback(async urlToOpen => {
            await Linking.openURL(urlToOpen);
        }, []);

        return <SubmitButton style={Styles.button} title={props.title} onPress={() => handlePress(props.url)} />;
    };
    return (
            <>
                <Title title={action.title.literal} style={Styles.heading} />
                <View style={Styles.centerContainer}>
                    <Messages messages={bankIdMessages} />
                    <Links onPress={() => false} links={bankIdLinks} />
                </View>
                <Divider text={"OR"} color={"white"} />
                <LaunchBankIdButton title={'Launch BankID on this device'} url={action.model.href} />
            </>
    );
};

export default BankIdAction;
