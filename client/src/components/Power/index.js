import React from "react";
import { useObserver } from "mobx-react-lite";

const Power = () => {

    return useObserver(() => (
        <>
            <p>Name of player</p>
            <button>Powerbutton</button>
            <p>Role</p>
        </>
    ));
};

export default Power;