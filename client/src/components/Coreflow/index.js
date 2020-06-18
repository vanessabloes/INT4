import React from "react";
import { useObserver } from "mobx-react-lite";

import { useStore } from "../../hooks";

import Core from "../Core";
import Challenge from "../Challenge";

const Coreflow = () => {

    const { coreStore } = useStore();
    console.log(coreStore.state);

    return useObserver(() => (
        <>
            {coreStore.state === "core" ?
                <div>
                    <Core />
                </div>
                :
                <div>
                    <Challenge />
                </div>}
        </>
    ));
};

export default Coreflow;