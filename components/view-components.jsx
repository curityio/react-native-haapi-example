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

const Title = (props) => (<Text style={Styles.heading}>{props.title}</Text>);
const Fields = (props) => {
    const {fields, fieldValues, setFieldValues} = props;

    return fields.map((field) => (
            <TextInput style={Styles.input}
                       secureTextEntry={field.name === "password"}
                       placeholder={field.label.literal}
                       onChangeText={newText => {
                           let fieldValuesClone = {...fieldValues};
                           fieldValuesClone[field.name] = newText;
                           setFieldValues(fieldValuesClone);
                       }}
                       key={field.name}
            />
    ));
};
const Problem = (props) => (<Text style={Styles.inputProblem}>{props.problem}</Text>);
const SubmitButton = (props) => (
        <TouchableOpacity
                style={props.style}
                onPress={props.onPress}>
            <Text style={props.textStyle ? props.textStyle : Styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
);

const Links = (props) => {
    const {links, onFollowLink} = props;
    return links.map((link, i) => {
        if (link.type === "image/png") {
            return <View style={Styles.centerContainer} key={`link-${i}`}>
                <Image source={{uri: link.href}}
                       style={Styles.imageLink}
                       key={`ìmage-${i}`} />
                <Text style={Styles.message}
                      key={`link-${i}`}> {link.title.literal}</Text>
            </View>;
        }
        return <SubmitButton key={`link-${i}`}
                             onPress={() => onFollowLink(link, {})}
                             title={link.title.literal}
                             style={Styles.link} />
    });
};

const Messages = (props) => {
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
        const text = message.text.literal ? message.text.literal : message.text
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
const Options = (props) => (props.options.map((option, i) => (
                <SubmitButton style={[Styles.selectorButton, Styles.button]}
                              key={`option-${i}`}
                              title={option.title.literal ? option.title.literal : option.title}
                              onPress={() => props.onFollowLink(option.model)} />
        ))
);

const Divider = (props) => (
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

export {Options, Fields, Messages, Links, SubmitButton, Problem, Title, Divider};
