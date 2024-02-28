import {NativeModules} from "react-native";
import HaapiConfiguration from "../configuration";

const {HaapiModule} = NativeModules;
HaapiModule.load(HaapiConfiguration).catch(e => {
    console.error('Error in loading configuration', e);
});

export default HaapiModule;
