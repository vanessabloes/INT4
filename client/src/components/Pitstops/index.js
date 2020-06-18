import React from "react";
import { useObserver } from "mobx-react-lite";

const Pitstops = () => {

    return useObserver(() => (
        <p>Progressbar van de pitstops</p>
    ));
};

export default Pitstops;