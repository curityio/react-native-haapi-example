import {Fields, Links, Messages, Problem, SubmitButton, Title} from "./view-components";
import {useEffect, useState} from "react";
import Styles from "../Styles";
import {addEventListener, removeEventListener} from "./EventManager";

const GenericLoginView = (props) => {
    const {action, links, onFollowLink, messages, onSubmit} = props;
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
        <Title title={action.title.literal} Styles={Styles.heading}/>
        <Problem problem={error} styles={Styles.inputProblem}/>
        <Messages messages={messages}/>
        <Fields fields={action.model.fields} setFieldValues={setFieldValues} fieldValues={fieldValues}/>
        <SubmitButton title={action.title.literal} style={Styles.button} onPress={() => onSubmit(action, fieldValues)}/>
        <Links onPress={onFollowLink} links={links}/>
    </>;

};
export default GenericLoginView;
