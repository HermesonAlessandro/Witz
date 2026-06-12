import { StyleSheet } from "react-native";

export const style = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor:'white',
    },

    header:{
        width: '100%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 20,
    },

    headerText:{
        marginLeft:25,
        color: '#7A7EEA',
        fontSize: 32,
        fontWeight: 'bold',
    },

    headerSubText:{
        marginLeft:25,
        color: '#6e6e6eb0',
        fontSize: 15,
        fontWeight: 'bold',
    },

    finalbotao:{
        position:'absolute',
        bottom:40,
        right:30,
        zIndex:999
    },

    // ✅ bottom corrigido de 150 para 30 — compatível com Stack sem tab bar
    botaodecriar:{
        position:'absolute',
        bottom: 30,
        right: 25,
        zIndex: 999,

        width:75,
        height:75,
        backgroundColor:'#999DF7',
        borderRadius:50,

        justifyContent:'center',
        alignItems:'center',

        elevation:8
    },

    textoBotao:{
        color:'white',
        fontSize:45,
        marginTop:-4
    },

    logo:{
        width:75,
        height:75,
        position:'absolute',
        top:40,
        right:50
    },

    listaMetas:{
        padding:20,
        paddingBottom:120
    },

    cardMeta:{
        backgroundColor:'#f4f4f4',
        padding:15,
        borderRadius:10,
        marginBottom:10,
        borderWidth:1,
        borderColor:'#dcdcdc'
    },

    tituloMeta:{
        fontSize:22,
        fontWeight:'bold',
        color:'#222'
    },

    valorMeta:{
        marginTop:5,
        fontSize:16,
        color:'#555'
    },

    botaoRemover:{
        position:'absolute',
        top:10,
        right:10,
        width:25,
        height:25,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#dcdcdc'
    },

    textoRemover:{
        color:'gray',
        fontWeight:'bold',
        fontSize:14
    },

    barraFundo:{
        width:'100%',
        height:12,
        backgroundColor:'#dcdcdc',
        borderRadius:10,
        marginTop:10,
        overflow:'hidden'
    },

    barraProgresso:{
        height:'100%',
        backgroundColor:'#2ecc71',
        borderRadius:10
    },

    textoProgresso:{
        marginTop:5,
        fontSize:13,
        color:'#555',
        fontWeight:'bold'
    },

    scrollLista: {
        flex: 1,
    },
});