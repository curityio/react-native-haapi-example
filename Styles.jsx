import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
    header: {
        marginBottom: 10,
    },
    layoutContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
        backgroundColor: "#2a2f3a",
        padding: 20,
    },
    mainContent: {
        backgroundColor: "#2a2f3a",
        justifyContent: "center",
    },
    centerContainer: {
        justifyContent: "center",
    },
    centerHorizontal: {
        justifyContent: "space-around",
    },
    logo: {
        resizeMode: "cover"
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
        borderRadius: 5,
        backgroundColor: "rgb(87, 100, 135)",
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
