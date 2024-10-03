import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
    header: {},
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
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "rgb(38, 44, 61)",
        backgroundColor: "white",
    },
    button: {
        marginVertical: 10,
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "rgb(87, 100, 135)",
        padding: 10,
        color: "white",
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
        color: "rgb(38, 44, 61)",
        textDecorationLine: "underline"
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
        color: "rgb(38, 44, 61)",
    },
    info: {
        color: "rgb(38, 44, 61)",
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
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fieldSet: {
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "rgb(38, 44, 61)",
    },
    legend: {
        position: 'absolute',
        top: -10,
        left: 10,
        fontWeight: 'bold',
        backgroundColor: "white"
    }
});
export default Styles;
