import React from "react";
import { useObserver } from "mobx-react-lite";

const Challenge = () => {

    return useObserver(() => (
        <p>CHALLENGE</p>
    ));
};

export default Challenge;
