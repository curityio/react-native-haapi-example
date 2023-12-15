import React, {useState} from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";

export default function HaapiForm(props) {
    const {actions, onSubmit, onFollowLink, inputProblem, links, messages} = props
    const [parameters, setParameters] = useState({});
    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        button: {},
        selectorButton: {},
        actionTitle: {
            fontWeight: "bold",
            marginTop: 12,
            marginBottom: 18,
        },
        link: {
            color: "blue"
        },
        imageLink: {
            height: 200,
            width: 200
        },
        inputProblem: {
            color: "red"
        },
        centerContainer: {
            justifyContent: "center",
            alignItems: "center"
        }
    })

    const ActionTitle = (props) => (<Text style={styles.actionTitle}>{props.title}</Text>)
    const Fields = (props) => {
        if (!props.fields) {
            return
        }
        return props.fields.map((field) => {
            return <TextInput style={styles.input}
                              secureTextEntry={field.name === "password"}
                              placeholder={field.label.literal}
                              onChangeText={text => {
                                  let newParameters = parameters
                                  newParameters[field.name] = text
                                  setParameters(newParameters)
                              }}
                              key={field.name}
            />
        })
    }
    const InputProblem = () => {
        return <Text style={styles.inputProblem}>{inputProblem}</Text>
    }
    const SubmitButton = (props) => {
        return <Button
            title={props.title}
            style={styles.button}
            onPress={props.onPress}
        />
    }

    const Links = (props) => {
        return props.links.map((link, i) => {
            if (link.type === "image/png") {
                return <View style={styles.centerContainer}>
                    <Text style={styles.message}
                          key={`link-${i}`}> {link.title.literal}</Text>
                    <Image source={{uri: link.href}}
                           style={styles.imageLink}
                           key={`ìmage-${i}`}/>
                </View>
            }
            return <Text style={styles.link}
                         title={link.title.literal}
                         key={`link-${i}`}
            />
        })
    }
    const Messages = (props) => {
        return props.messages.map((message, i) => {
            return <Text style={styles.message}
                         title={message.text.literal}
                         key={`message-${i}`}
                         onPress={() => onFollowLink(message.model, {})}
            />
        })
    }
    const Options = (props) => {
        return props.options.map((option) => {
            return <Button style={styles.selectorButton}
                           title={option.title.literal}
                           key={option.properties}
                           onPress={() => onFollowLink(option.model, {})}
            />
        })
    }

    const BankIdView = (props) => {
        const {action, links, onFollowLink, messages} = props
        return <View>
            <ActionTitle title={action.title.literal} styles={styles.actionTitle}/>
            <Messages messages={messages}/>
            <Links onPress={onFollowLink} links={links}/>
            <SubmitButton title={action.title.literal}
                          onPress={() => onSubmit(action.model, parameters)}/>
        </View>

    }
    const GenericLoginView = (props) => {
        const {action, links, onFollowLink, messages} = props
        return <View>
            <ActionTitle title={action.title.literal} styles={styles.actionTitle}/>
            <InputProblem/>
            <Messages messages={messages}/>
            <Fields fields={action.model.fields}/>
            <SubmitButton title={action.title.literal} onPress={() => onSubmit(action.model, parameters)}/>
            <Links onPress={onFollowLink} links={links}/>
        </View>

    }

    const createForm = () => {
        return actions.map((action) => {
            switch (action.kind) {
                case "poll":
                    setTimeout(() => onSubmit(action.model, {}), 2000);
                    break;
                case  "authenticator-selector":
                    return <Options options={action.model.options}/>
                case "continue":
                    return <View>
                        <ActionTitle title={action.title.literal}/>
                        <Messages messages={messages}/>
                        <Button style={styles.button}
                                title={action.model.actionTitle.literal}
                                onPress={() => onFollowLink(action.model)}/>
                    </View>
                case "login":
                    if (action.model.name === "bankid") {
                        return <BankIdView action={action} links={links} messages={messages} onFollowLink={onFollowLink}/>
                    } else {
                        return <GenericLoginView action={action} />
                    }
                case "cancel":
                    return <SubmitButton title={action.title.literal} onPress={() => onSubmit(action.model, {})}/>
            }
        })
    }

    return (
        <SafeAreaView>
            {createForm()}
        </SafeAreaView>
    )
}

const debugAction = {
    "metadata": {"viewName": "authentication-action\/debug-attribute\/index"},
    "type": "AUTHENTICATION_STEP",
    "actions": [{
        "kind": "continue",
        "model": {
            "actionTitle": {"literal": "Continue"},
            "continueActions": [],
            "errorActions": [],
            "fields": [],
            "type": "application\/x-www-form-urlencoded",
            "method": "POST",
            "href": "\/dev\/authn\/authenticate\/_action\/d"
        }
    }],
    "links": [],
    "messages": [{
        "text": {"literal": "Subject: d"},
        "classList": "[heading]"
    }, {
        "text": {"literal": "Subject Attributes"},
        "classList": "[info]"
    }, {
        "text": {"literal": "{\"username\":\"d\",\"subject\":\"d\"}"},
        "classList": "[info, json]"
    }, {
        "text": {"literal": "Context Attributes"},
        "classList": "[info]"
    }, {
        "text": {"literal": "{\"iat\":1702632646503,\"auth_time\":1702632646,\"cal\":\"by-policy\",\"acr\":\"urn:se:curity:authentication:username:username\"}"},
        "classList": "[info, json]"
    }, {"text": {"literal": "Action Attributes"}, "classList": "[info]"}, {
        "text": {"literal": "{}"},
        "classList": "[info, json]"
    }]
}

const failed = {
    "metadata": {"viewName": "authenticator\/bankid\/failed\/index"},
    "type": "AUTHENTICATION_STEP",
    "actions": [{
        "kind": "continue",
        "title": {"literal": "Login failed"},
        "model": {
            "actionTitle": {"literal": "Try again"},
            "continueActions": [],
            "errorActions": [],
            "fields": [],
            "type": "application\/x-www-form-urlencoded",
            "method": "GET",
            "href": "\/dev\/authn\/authenticate"
        }
    }],
    "links": [],
    "messages": [{"text": {"literal": "Action cancelled"}, "classList": "[error]"}]
}


const bankid = {
    "metadata": {"viewName": "authenticator\/bankid\/wait\/index"},
    "type": "POLLING_STEP",
    "properties": {"status": "PENDING"},
    "actions": [{
        "kind": "poll",
        "model": {
            "continueActions": [],
            "errorActions": [],
            "fields": [],
            "type": "application\/x-www-form-urlencoded",
            "method": "GET",
            "href": "https:\/\/dlindau.ngrok.io\/dev\/authn\/authenticate\/bankid1\/poller"
        }
    }, {
        "kind": "login",
        "title": {"literal": "Login with BankID"},
        "model": {
            "name": "bankid",
            "continueActions": [{
                "kind": "redirect",
                "title": {"literal": "If you are not redirected automatically, click here to continue authenticating"},
                "model": {
                    "continueActions": [],
                    "errorActions": [],
                    "fields": [],
                    "type": "application\/x-www-form-urlencoded",
                    "method": "GET",
                    "href": "https:\/\/dlindau.ngrok.io\/dev\/authn\/authenticate\/bankid1\/poller"
                }
            }],
            "errorActions": [],
            "autoStartToken": "d706956c-eb08-4944-8975-0d818b39db45",
            "redirect": "https:\/\/dlindau.ngrok.io\/dev\/authn\/authenticate\/bankid1\/poller",
            "href": "bankid:\/\/\/?autostarttoken=d706956c-eb08-4944-8975-0d818b39db45&redirect=null"
        }
    }, {
        "kind": "cancel",
        "title": {"literal": "Cancel this operation"},
        "model": {
            "actionTitle": {"literal": "Cancel"},
            "continueActions": [],
            "errorActions": [],
            "fields": [],
            "type": "application\/x-www-form-urlencoded",
            "method": "POST",
            "href": "https:\/\/dlindau.ngrok.io\/dev\/authn\/authenticate\/bankid1\/cancel"
        }
    }],
    "links": [{
        "href": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAACk0lEQVR4Xu2YTa6rMAxGXTFgyBKyE9gYUiuxMdhJltBhBhV533GqW9or3SnWUzOgNByk2vXnn1j9e632ufOxvkBbX6CtKMDDtK7ZLvWRyqj7vtalspkCAfq8z7pou1\/tWstF9317EAewy\/1aG7XbnMqkr0J5KRQwW7\/h4El32u1CAsTDXQEA1e\/DLYUD8LLZONRcxuFhRUalXwFzMoCItLOx\/XP5lN7JwHOVCaebvKyg5ZmvKICsUCiYROVBcc11xd\/jsAQClI\/WwUPVtxWv+7uyggAygPTe5apQMHJUVuR2NQ4gAe0SlS5LNreCl4q9\/osAAOXH9a6LrFBQSGja9woQBsjVTfnJodWL+6VyFwbgw\/D3jWo0I7TZ3e9PwgB88brZwpdspRwQCyAAEqZQ4QnfFg8v6Z0PKDNNMkAX6WnE6ZueNX\/HAfR5914Y5ZOebNAe2TQOoL5DVpBDOzKT+nc18XaMhwCATxUkekRPolc16vTSIdufD\/hasrysUFjJASQq1dJbCgTwi81bY7fiKf\/NX4wDSPRq4zRapEIiIAe8l4MAgHIo8TrSy01kg5GZcnwpKwaAihAVz9TGeXhs3hqHAbK2Z9pM45uaZJz+nh8iAJoqTBdFxu4dHBSTRiCgFsbdJn\/qpnEs89bsnQ+41PXbnx0IUSBRHZQVBXhaYYRv5mzL6I9rLKBR0juHRX53yPYxAESveG3Fk3gYfA6eAwG+Wt+RzHs5H4cOdTMAgNTdwd7LYQVl1OtSICAh9ex6Lz7pguL0UID\/9733cn72Zm1c68IBummJ1P2tcYNzhHBA4TALKxiHVNxfdTMG4FLyNpPi6Q0nM9ESCWjKMqolM2WuHKoXGro4wJ\/rC7T1Bdr6T4B\/FHQjQYe\/+20AAAAASUVORK5CYII=",
        "rel": "activation",
        "title": {"literal": "Scan the code in BankID security app"},
        "type": "image\/png"
    }],
    "messages": [{"text": {"literal": "Trying to start your BankID app"}, "classList": "[info]"}],
    "mainAction": {
        "kind": "poll",
        "model": {
            "continueActions": [],
            "errorActions": [],
            "fields": [],
            "type": "application\/x-www-form-urlencoded",
            "method": "GET",
            "href": "https:\/\/dlindau.ngrok.io\/dev\/authn\/authenticate\/bankid1\/poller"
        }
    },
    "cancelAction": {
        "kind": "cancel",
        "title": {"literal": "Cancel this operation"},
        "model": {
            "actionTitle": {"literal": "Cancel"},
            "continueActions": [],
            "errorActions": [],
            "fields": [],
            "type": "application\/x-www-form-urlencoded",
            "method": "POST",
            "href": "https:\/\/dlindau.ngrok.io\/dev\/authn\/authenticate\/bankid1\/cancel"
        }
    }
}

const response = {
    "metadata": {"viewName": "views\/select-authenticator\/index"},
    "type": "AUTHENTICATION_STEP",
    "actions": [{
        "kind": "authenticator-selector",
        "title": {"literal": "Login"},
        "model": {
            "options": [{
                "kind": "select-authenticator",
                "title": {"literal": "bankid1"},
                "properties": "bankid",
                "model": {
                    "continueActions": [],
                    "errorActions": [],
                    "fields": [],
                    "type": "application\/x-www-form-urlencoded",
                    "method": "GET",
                    "href": "\/dev\/authn\/authenticate\/bankid1"
                }
            }, {
                "kind": "select-authenticator",
                "title": {"literal": "username"},
                "properties": "username",
                "model": {
                    "continueActions": [],
                    "errorActions": [],
                    "fields": [],
                    "type": "application\/x-www-form-urlencoded",
                    "method": "GET",
                    "href": "\/dev\/authn\/authenticate\/username"
                }
            }]
        }
    }],
    "links": [],
    "messages": [],
    "title": {"literal": "Login"},
    "authenticators": [{
        "title": {"literal": "bankid1"},
        "type": "bankid",
        "action": {
            "kind": "select-authenticator",
            "title": {"literal": "bankid1"},
            "properties": "bankid",
            "model": {
                "continueActions": [],
                "errorActions": [],
                "fields": [],
                "type": "application\/x-www-form-urlencoded",
                "method": "GET",
                "href": "\/dev\/authn\/authenticate\/bankid1"
            }
        }
    }, {
        "title": {"literal": "username"},
        "type": "username",
        "action": {
            "kind": "select-authenticator",
            "title": {"literal": "username"},
            "properties": "username",
            "model": {
                "continueActions": [],
                "errorActions": [],
                "fields": [],
                "type": "application\/x-www-form-urlencoded",
                "method": "GET",
                "href": "\/dev\/authn\/authenticate\/username"
            }
        }
    }]
}
