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
        height: height / 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    boxMid: {
        width: '100%',
        paddingHorizontal: 37,
    },
    boxBottom: {
        height: height / 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 25
    },
    logo: {
        width: 200,
        height: 200,
        transform: [{ translateY: 30 }] 
    },
    text: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#000',
        marginTop: 5,
        transform: [{ translateY: -30 }]
    },
    titleInput: {
        marginLeft: 5,
        color: themas.colors.gray,
        marginTop: 15,
        fontSize: 13
    },
    boxInput: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 8,
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
        elevation: 5
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