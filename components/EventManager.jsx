import { NativeEventEmitter, NativeModules } from "react-native";

const eventEmitter = new NativeEventEmitter(NativeModules.HaapiModule);
const addEventListener = (name, callback) => {
    return eventEmitter.addListener(name, callback);
};

const removeEventListener = (listener) => {
    listener.remove();
};

export {addEventListener, removeEventListener}

