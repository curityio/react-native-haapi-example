import { useEffect } from "react";

const Polling = (props) => {
    useEffect(() => {
        const intervalId = setInterval(props.poll, 2000);
        return () => clearInterval(intervalId);
    });
};

export default Polling;
