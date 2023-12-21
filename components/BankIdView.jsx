import React, { useCallback, useEffect, useState } from "react";
import { ActionTitle, Links, Messages, SubmitButton } from "./view-components";
import { Button, Linking, Text, View } from "react-native";
import Styles from "../Styles";
import { addEventListener, removeEventListener } from "./EventManager";

const BankIdView = (props) => {
    const { action } = props;
    const [bankIdMessages, setBankIdMessages] = useState(props.messages);
    const [bankIdLinks, setBankIdLinks] = useState(props.links);

    useEffect(() => {
        let pollResultListener = addEventListener("PollingStepResult", haapiResponse => {
            setBankIdMessages(haapiResponse.messages);
            setBankIdLinks(haapiResponse.links);
        });

        return () => {
            removeEventListener(pollResultListener);
        };
    }, []);
    const LaunchBankIdButton = (props) => {
        const { url, title } = props;

        const handlePress = useCallback(async (url) => {
            await Linking.openURL(url);
        }, []);

        return <SubmitButton style={Styles.button}
                       title={title}
                       onPress={() => handlePress(url)} />;

    };
    return <View style={Styles.centerContainer}>
        <ActionTitle title={action.title.literal} Styles={Styles.heading} />
        <Messages messages={bankIdMessages} />
        <Links onPress={() => false} links={bankIdLinks} />
        <Text>OR</Text>
        <LaunchBankIdButton title={"Launch BankID on this device"}
                            url={action.model.href} />
    </View>;

};

export default BankIdView;
