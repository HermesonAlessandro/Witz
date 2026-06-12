import { StyleSheet } from "react-native";

export const style = StyleSheet.create({

    tela:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.4)',
        justifyContent:'center',
        alignItems:'center'
    },

    modal:{
        width:'85%',
        height:300,
        backgroundColor:'white',
        borderRadius:20,
        padding:20,
        borderWidth:1,
        borderColor:'#111111'
    },

    cabeçalhomini:{
        width:'100%',
        height:50,
        backgroundColor:'#7A7EEA',
        borderRadius:10,

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

        paddingHorizontal:15,

        borderWidth:1,
        borderColor:'##484a83'
    },

    botaoFechar:{
        padding:5
    },

    titulo:{
        fontSize:20,
        color:'white',
        fontWeight:'bold'
    },

    textoFechar:{
        fontSize:26,
        color:'white',
        fontWeight:'bold'
    },

    linhaInput:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15
    },

    input:{
        width:'75%',
        height:50,
        borderWidth:1,
        borderColor:'#dfdfdf',
        borderRadius:8,
        paddingHorizontal:10,
        fontSize:16,
        backgroundColor:'#f7f7f7',
    },

    inputEmoji:{
        width:'20%',
        height:50,
        borderWidth:1,
        borderColor:'#dfdfdf',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontSize:24,
        backgroundColor:'#f7f7f7'
    },

    inputValor:{
        width:'100%',
        height:50,
        borderWidth:1,
        borderColor:'#dfdfdf',
        borderRadius:8,
        marginTop:15,
        paddingHorizontal:10,
        fontSize:16,
        backgroundColor:'#f7f7f7',
    },

    botaoSalvar:{
        width:'100%',
        height:50,
        backgroundColor:'#7A7EEA',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },

    textoSalvar:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    }
    
})