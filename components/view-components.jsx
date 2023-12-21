import React from "react";
import Styles from "../Styles";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const ActionTitle = (props) => (<Text style={Styles.heading}>{props.title}</Text>);
const Fields = (props) => {
    const { fields, fieldValues, setFieldValues } = props;

    return fields.map((field) => {
        return <TextInput style={Styles.input}
                          secureTextEntry={field.name === "password"}
                          placeholder={field.label.literal}
                          onChangeText={newText => {
                              let fieldValuesClone = { ...fieldValues };
                              fieldValuesClone[field.name] = newText;
                              setFieldValues(fieldValuesClone);
                          }}
                          key={field.name}
        />;
    });
};
const InputProblem = (props) => (<Text style={Styles.inputProblem}>{props.problem}</Text>);
const SubmitButton = (props) => {
    return <TouchableOpacity
        style={props.style}
        onPress={props.onPress}>
        <Text style={props.textStyle ? props.textStyle : Styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>;
};

const Links = (props) => {
    const { links, onFollowLink } = props;
    return links.map((link, i) => {
        if (link.type === "image/png") {
            return <View style={Styles.centerContainer} key={`link-${i}`}>
                <Image source={{ uri: link.href }}
                       style={Styles.imageLink}
                       key={`ìmage-${i}`} />
                <Text style={Styles.message}
                      key={`link-${i}`}> {link.title.literal}</Text>
            </View>;
        }
        return <Text style={Styles.link}
                     title={link.title.literal}
                     onPress={() => onFollowLink(link.model, {})}
                     key={`link-${i}`}
        />;
    });
};
const Messages = (props) => {
    const classListToStyle = (classListString) => {
        const classArray = classListString.slice(1, classListString.length - 1).split(",").map(it => it.trim());
        let styles = [Styles.message];
        classArray.forEach(className => {
            const style = Styles[className.trim()];
            if (style) {
                styles.push(style);
            }
        });
        return styles;
    };

    return props.messages.map((message, i) => {
        const styles = classListToStyle(message.classList);
        return <Text style={styles}
                     title={message.text.literal}
                     key={`message-${i}`}
        >{message.classList.includes("json") ?
            JSON.stringify(JSON.parse(message.text.literal), null, 2) :
            message.text.literal}</Text>;
    });
};
const Options = (props) => {
    return props.options.map((option, i) => {
        return <SubmitButton style={[Styles.selectorButton, Styles.button]}
                             key={`option-${i}`}
                             title={option.title.literal}
                             onPress={() => props.onFollowLink(option.model)} />;
    });
};

export {
    Options, Fields, Messages, Links, SubmitButton, InputProblem, ActionTitle,
};
