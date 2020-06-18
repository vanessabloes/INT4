import React from "react";
import { useObserver } from "mobx-react-lite";

const Wordwheel = () => {

    return useObserver(() => (
        <p>Woorden wiel</p>
    ));
};

export default Wordwheel;