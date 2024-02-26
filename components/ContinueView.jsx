import {Messages, SubmitButton, Title} from "./view-components";
import Styles from "../Styles";

const ContinueView = (props) => {
    const {action, onSubmit, messages} = props;
    const title = action.model.actionTitle.literal ? action.model.actionTitle.literal : action.model.actionTitle
    return <>
        <Title title={title} />
        <Messages messages={messages} />
        <SubmitButton style={Styles.button}
                      title={title}
                      onPress={() => onSubmit(action, {})} />
    </>;
};
export default ContinueView;
