import {NativeModules} from "react-native";
import HaapiConfiguration from "../configuration";

const {HaapiModule} = NativeModules;
HaapiModule.load(HaapiConfiguration)

export default HaapiModule;
