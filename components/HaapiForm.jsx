import React from "react";
import Styles from "../Styles";
import { Options, SubmitButton } from "./view-components";
import BankIdView from "./BankIdView";
import GenericLoginView from "./GenericLoginView";
import ContinueView from "./ContinueView";
import Polling from "./Polling";

export default function HaapiForm(props) {


    const createForm = (props) => {
        const { actions, onSubmit, onFollowLink, inputProblem, links, messages } = props;
        return actions.map((action) => {
            switch (action.kind) {
                case  "poll":
                    return <Polling poll={() => onSubmit(action, {})} />;
                case  "authenticator-selector":
                    return <Options options={action.model.options} onFollowLink={onFollowLink} key={"options"} />;
                case "continue":
                    return <ContinueView action={action} onSubmit={onSubmit} messages={messages} />;
                case "login":
                    if (action.model.name === "bankid") {
                        return <BankIdView action={action} links={links} messages={messages} onFollowLink={onFollowLink}
                                           key={"bankid-view"} />;
                    } else {
                        return <GenericLoginView action={action} links={links} messages={messages}
                                                 onFollowLink={onFollowLink}
                                                 onSubmit={onSubmit}
                                                 key={"generic-view"} />;
                    }
                case "cancel":
                    return <SubmitButton title={action.title.literal}
                                         style={[Styles.cancelButton, Styles.button]}
                                         onPress={() => onSubmit(action, {})}
                                         key={"cancel-button"} />;
            }
        });
    };

    return (createForm(props));
}
