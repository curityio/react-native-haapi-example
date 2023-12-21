import { NativeModules } from "react-native";

const Haapi = () => {

    const submitAction = (action, parameters) => {
        const { HaapiModule } = NativeModules;
        HaapiModule.submitForm(action, parameters)
            .then((data) => JSON.parse(data))
            .then((haapiResponse) => {
                setStep({ name: "process-result", haapiResponse: haapiResponse });
            });
    };

    const followLink = (linkModel) => {
        console.log("Following link: " + JSON.stringify(linkModel));

        const { HaapiModule } = NativeModules;
        HaapiModule.navigate(linkModel)
            .then((data) => JSON.parse(data))
            .then((haapiResponse) => {
                setStep({ name: "process-result", haapiResponse: haapiResponse });
            });
    };

};
export default Haapi;
