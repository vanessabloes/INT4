import React from "react";
import { useObserver } from "mobx-react-lite";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";

const Challenge = () => {

    return useObserver(() => (
        <div>
            <p>CHALLENGE</p>
            <TheePotLink text="We're back on track" linkTo={ROUTES.path} />
        </div>
    ));
};

export default Challenge;
