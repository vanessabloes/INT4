import React from "react";
import { useObserver } from "mobx-react-lite";

const Wordwheel = () => {

    return useObserver(() => (
        <>
        <p>Woorden wiel:</p>
        <p>Counter</p>
        <button>Play/pause</button>
        <button>Back to Journey</button>
        <button>Take Challenge</button>
        </>
    ));
};

export default Wordwheel;