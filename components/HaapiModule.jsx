import {NativeModules} from "react-native";
import HaapiConfiguration from "../configuration.android";

const {HaapiModule} = NativeModules;
HaapiModule.load(HaapiConfiguration)

export default HaapiModule;
