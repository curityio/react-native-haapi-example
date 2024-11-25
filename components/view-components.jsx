/*
 *   Copyright 2024 Curity AB
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import React from "react";
import Styles from "../Styles";
import {ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as Haapi from "./Haapi";

export const Header = (props) => (
        <TouchableOpacity onPress={props.onPress}>
            <Image style={Styles.logo} source={require("../images/curity-logo.png")} />
        </TouchableOpacity>);

export const Title = (props) => (<Text style={Styles.heading}>{props.title}</Text>);

export const Fields = (props) => {
    const {fields, fieldValues, setFieldValues} = props;

    const getFieldPlaceHolder = (field) => {
        if (field.placeholder) {
            return field.placeholder;
        } else if (field.label && field.label.literal) {
            return field.label.literal;
        } else if (field.label) {
            return field.label;
        } else {
            return null;
        }
    }

    return fields
            .filter(field => field.type !== 'hidden')
            .map(field => (
                    <TextInput style={Styles.input}
                               secureTextEntry={field.name === "password"}
                               placeholder={getFieldPlaceHolder(field)}
                               defaultValue={field.value}
                               onChangeText={newText => {
                                   let fieldValuesClone = {...fieldValues};
                                   fieldValuesClone[field.name] = newText;
                                   setFieldValues(fieldValuesClone);
                               }}
                               key={field.name}
                    />
            ));
};
export const Problem = (props) => (<Text style={Styles.inputProblem}>{props.problem}</Text>);

export const Info = (props) => (<Text style={Styles.info}>{props.info}</Text>);

export const SubmitButton = (props) => (
        <TouchableOpacity
                style={props.style}
                onPress={props.onPress}>
            <Text style={props.textStyle ? props.textStyle : Styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
);

export const Links = (props) => {
    const {links, style, textStyle} = props;
    const onFollowLink = props.onFollowLink ? props.onFollowLink : Haapi.followLink
    return links.map((link, i) => {
        const title = link.title.literal || link.title;

        if (link.type === "image/png") {
            return <View style={Styles.centerContainer} key={`link-${i}`}>
                <Image source={{uri: link.href}}
                       style={Styles.imageLink}
                       key={`ìmage-${i}`} />
                <Text style={Styles.message}
                      key={`message-${i}`}> {title}</Text>
            </View>;
        }

        const linkModel = link.model || link;

        return <SubmitButton key={`link-${i}`}
                             onPress={() => onFollowLink(linkModel)}
                             title={title}
                             textStyle={textStyle ? textStyle : Styles.link}
                             style={style ? style : Styles.link} />
    });
};

export const Messages = (props) => {
    const classListToStyle = (classList) => {
        let classArray;
        // On android its a string, on ios an array
        if (typeof classList === 'string') {
            classArray = classList.slice(1, classList.length - 1).split(",").map(it => it.trim());
        } else {
            classArray = classList;
        }
        let styles = [Styles.message];
        classArray.forEach(className => {
            const style = Styles[className.trim()];
            if (style) {
                styles.push(style);
            }
        });
        return styles;
    };

    const getMessageText = (message) => {
        const text = message.text.literal || message.text;
        if (message.classList.includes("json")) {
            return JSON.stringify(JSON.parse(text), null, 2)
        } else {
            return text;
        }
    }

    return props.messages.map((message, i) => {
        const styles = classListToStyle(message.classList);
        return <Text style={styles}
                     key={`message-${i}`}>{getMessageText(message)}</Text>;
    });
};
export const Options = (props) => (props.options.map((option, i) => (
                <SubmitButton style={[Styles.selectorButton, Styles.button]}
                              key={`option-${i}`}
                              title={option.title.literal ? option.title.literal : option.title}
                              onPress={() => props.onFollowLink(option.model)} />
        ))
);

export const Divider = (props) => (
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 20}}>
            <View style={{flex: 1, height: 1, backgroundColor: props.color}} />
            {props.text &&
                    <View>
                        <Text style={{color: props.color, width: 50, textAlign: 'center'}}>{props.text}</Text>
                    </View>
            }
            <View style={{flex: 1, height: 1, backgroundColor: props.color}} />
        </View>
)

export const JsonView = (props) => {
    const {json} = props;

    const prettyPrintPayload = (jsonString) => {
        if (!jsonString) {
            return "";
        }
        return JSON.stringify(JSON.parse(jsonString), null, 2);
    };

    return <Text style={Styles.json}>{prettyPrintPayload(json)}</Text>
}

export const Spinner = (props) => {
    return <ActivityIndicator size="large" style={props.style} />
}