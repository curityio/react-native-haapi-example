import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";

export default function AuthenticatorSelector(props) {
    const {actions, onSubmit, inputProblem} = props
    const [parameters, setParameters] = useState({});
    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
        button: {},
        actionTitle: {
            fontWeight: 'bold',
            marginTop: 12,
            marginBottom: 18,
        },
        inputProblem: {
            color: "red"
        }
    })

    const ActionTitle = (props) => (<Text style={styles.actionTitle}>{props.title}</Text>)
    const Fields = (props) => {
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
    const InputProblem = (props) => {
        return <Text style={styles.inputProblem}>{inputProblem}</Text>
    }
    const SubmitButton = (props) => {
        return <Button
            title={props.title}
            style={styles.button}
            onPress={props.onPress}
        />
    }

    const createForm = () => {
        return actions.map((action) => {
            return <View>
                <ActionTitle title={action.model.actionTitle.literal} styles={styles.actionTitle}/>
                <InputProblem/>
                <Fields fields={action.model.fields}/>
                <SubmitButton title={action.title.literal} onPress={() => onSubmit(action.model, parameters)}/>
            </View>
        })
    }

    return (
        <SafeAreaView>
            {createForm()}
        </SafeAreaView>
    )
}
