import { View } from "react-native";
import { ActionTitle, Fields, InputProblem, Links, Messages, SubmitButton } from "./view-components";
import { useEffect, useState } from "react";
import Styles from "../Styles";
import { removeEventListener, addEventListener } from "./EventManager";

const GenericLoginView = (props) => {
    const { action, links, onFollowLink, messages, onSubmit } = props;
    const [fieldValues, setFieldValues] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const listener = addEventListener("IncorrectCredentials", event => {
            setError(event.title.literal);
        });

        // Removes the listener once unmounted
        return () => {
            removeEventListener(listener);
        };
    }, []);

    return <>
        <ActionTitle title={action.title.literal} Styles={Styles.heading} />
        <InputProblem problem={error} styles={Styles.inputProblem} />
        <Messages messages={messages} />
        <Fields fields={action.model.fields} setFieldValues={setFieldValues} fieldValues={fieldValues} />
        <SubmitButton title={action.title.literal} style={Styles.button} onPress={() => onSubmit(action, fieldValues)} />
        <Links onPress={onFollowLink} links={links} />
    </>;

};
export default GenericLoginView;
