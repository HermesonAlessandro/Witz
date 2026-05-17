import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

const { height } = Dimensions.get('window');

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    boxTop: {
        height: height / 3.8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    boxMid: {
        width: '100%',
        paddingHorizontal: 37,
        marginTop: -10
    },
    boxBottom: {
        height: height / 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 35
    },
    logo: {
        width: 400,
        height: 300,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#000',
        marginTop: -60,
        textAlign: 'center'
    },
    titleInput: {
        marginLeft: 5,
        color: themas.colors.gray,
        marginTop: 14,
        fontSize: 13
    },
    boxInput: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: themas.colors.ligthGray,
        borderColor: themas.colors.ligthGray,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingLeft: 5
    },
    button: {
        width: 250,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.primary,
        borderRadius: 40,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    textButton: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: 'bold'
    },
    boxBottomText: {
        flexDirection: 'row',
        marginTop: 25,
        alignItems: 'center'
    },
    textBottom: {
        fontSize: 16,
        color: themas.colors.gray,
    },
    textLoginNow: {
        fontSize: 16,
        color: themas.colors.primary,
        fontWeight: 'bold'
    }
});