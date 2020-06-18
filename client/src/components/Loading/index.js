import React from "react";
import { useObserver } from "mobx-react-lite";

const Loading = () => {

    return useObserver(() => (
        <p>LOADING</p>
    ));
};

export default Loading;