import {Messages, SubmitButton, Title} from "./view-components";
import Styles from "../Styles";

const ContinueView = (props) => {
    const {action, onSubmit, messages} = props;
    return <>
        <Title title={action.model.actionTitle.literal} />
        <Messages messages={messages} />
        <SubmitButton style={Styles.button}
                      title={action.model.actionTitle.literal}
                      onPress={() => onSubmit(action, {})} />
    </>;
};
export default ContinueView;
