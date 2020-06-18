import React from "react";
import { useObserver } from "mobx-react-lite";

import Pitstops from "../Pitstops";
import Power from "../Power";
import Wordwheel from "../Wordwheel";

const Core = () => {

    return useObserver(() => (
        <>
            <p>CORE</p>
            <Pitstops />
            <Power />
            <Wordwheel />
        </>
    ));
};

export default Core;