import { View } from "react-native";
import { ActionTitle, Messages, SubmitButton } from "./view-components";
import Styles from "../Styles";

const ContinueView = (props) => {
    const { action, onSubmit, messages } = props;
    return <View key={"continue-view"} style={Styles.centerContainer}>
        <ActionTitle title={action.model.actionTitle.literal} />
        <Messages messages={messages} />
        <SubmitButton style={Styles.button}
                      title={action.model.actionTitle.literal}
                      onPress={() => onSubmit(action, {})} />
    </View>;
};
export default ContinueView;
