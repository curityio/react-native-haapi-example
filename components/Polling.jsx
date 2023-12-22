import {useEffect} from "react";
import {addEventListener, removeEventListener} from "./EventManager";

const Polling = (props) => {
    useEffect(() => {
        const intervalId = setInterval(props.poll, 2000);
        const stopListener = addEventListener("StopPolling", event => clearInterval(intervalId))
        return () => {
            clearInterval(intervalId);
            removeEventListener(stopListener)
        }
    });
};

export default Polling;
