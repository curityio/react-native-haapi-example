import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
    layoutContainer: {
        flex: 1,
        flexDirection: "column",
        color: "white",
        backgroundColor: "#2a2f3a",
        overflow: "scroll",
        padding: 20
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    centerHorizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    logo: {
        resizeMode: "contain"
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: "#cfd9e0",
        backgroundColor: "white",
    },
    jsonData: {
        backgroundColor: "gray",
        fontFamily: "Roboto-Mono",
    },
    button: {
        marginVertical: 10,
        alignItems: "center",
        backgroundColor: "blue",
        padding: 10
    },
    selectorButton: {},
    cancelButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "white"
    },
    heading: {
        fontWeight: "bold",
        color: "white",
        marginTop: 12,
        marginBottom: 10,
        fontFamily: "Roboto-Regular",
        alignItems: "center"
    },
    link: {
        color: "blue",
    },
    imageLink: {
        height: 200,
        width: 200,
    },
    inputProblem: {
        color: "red",
    },
    message: {
        marginVertical: 5,
    },
    info: {
        color: "white",
    },
    error: {
        color: "red",
    },
    json: {
        backgroundColor: "black",
        fontFamily: "Roboto-Mono",
        color: "white",
        padding: 10,
    },
});
export default Styles;
