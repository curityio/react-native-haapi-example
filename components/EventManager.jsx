import {NativeEventEmitter} from "react-native";
import HaapiModule from "./HaapiModule";

const eventEmitter = new NativeEventEmitter(HaapiModule);
const addEventListener = (name, callback) => {
    return eventEmitter.addListener(name, callback);
};

const removeEventListener = (listener) => {
    listener.remove();
};

export {addEventListener, removeEventListener}

