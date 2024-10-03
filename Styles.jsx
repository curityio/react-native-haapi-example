import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
    header: {
        marginBottom: 10,
    },
    layoutContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        color: "rgb(38, 44, 61)",
        backgroundColor: "white",
    },
    innerLayoutContainer: {
        margin: 20,
        height: "100%",
    },
    mainContent: {
        backgroundColor: "white",
        justifyContent: "center",
    },
    centerContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    centerHorizontal: {
        justifyContent: "space-around",
    },
    loginImageContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    loginImage: {},
    logo: {
        resizeMode: "center"
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: "#cfd9e0",
        backgroundColor: "white",
    },
    button: {
        marginVertical: 10,
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "rgb(87, 100, 135)",
        padding: 10
    },
    selectorButton: {
        marginVertical: 10,
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "rgb(87, 100, 135)",
        padding: 10
    },
    cancelButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "white"
    },
    heading: {
        fontWeight: "bold",
        color: "rgb(38, 44, 61)",
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
        color: "white",
    },
    info: {
        color: "white",
    },
    error: {
        color: "red",
    },
    json: {
        backgroundColor: "rgb(87, 100, 135)",
        borderRadius: 5,
        fontFamily: "Roboto-Mono",
        color: "white",
        padding: 10,
    },
    spinnerContainer: {
        height: 30
    },
});
export default Styles;
