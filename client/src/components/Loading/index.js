import React from "react";
import { useObserver } from "mobx-react-lite";
import { useStore } from "../../hooks";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";

const Loading = () => {

    const { coreStore } = useStore();

    return useObserver(() => (
        <div>
            <p>LOADING</p>
            <button
                value="core"
                onClick={e => coreStore.setState("core")}>
                <TheePotFlow text="Start storytelling" />
            </button>
        </div>
    ));
};

export default Loading;