import React from "react";
import { useObserver } from "mobx-react-lite";

const Power = () => {

    return useObserver(() => (
        <p>power/role</p>
    ));
};

export default Power;