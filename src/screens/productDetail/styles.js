import vars from '../../utils/vars';

export default {
    container: {
        flex: 1,

    },
    card: {
        flexDirection: 'row',
        //marginTop: 0,
        marginBottom: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        justifyContent:'center',
       alignItems: 'center',
       position: 'absolute',
       width:'100%',
        marginVertical: 20,
    },

    header:
    
    {  
        justifyContent: 'flex-end',
        alignItems: 'center',
         flexDirection: 'row',
        
         width:'85%',
        padding: 15,
        // margin:15,
        borderRadius: 20,
        backgroundColor: 'white',
        overlayColor: 'transparent'
    },
    productName:
    {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 6,
        borderColor: vars.bgColor,
        marginLeft: 7
    },
    titleText1: {
        paddingTop:0,
        padding:15,
        color: vars.baseColor,
        textAlign: 'right',
        fontSize: 20,
    },
    description: {
        textAlign: 'right',
        fontSize: 15,
        marginRight: 20,
        marginLeft:20,
        flexWrap:'wrap'
    },
    ViewSize: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        margin: 20,
        
    },
    btnSize: {
        justifyContent: 'center',
        flexDirection:'row',
        backgroundColor: vars.white,
        borderRadius: 60,
        width: 70,
        height: 70,
        alignItems: 'center',
        marginLeft: 20
    },
    btnActive: {
        justifyContent: 'center',
        backgroundColor: vars.baseColor,
        borderRadius: 60,
        width: 70,
        height: 70,
        alignItems: 'center',
        color: vars.bgColor,
        marginLeft: 20
    },
    TextSize: {
        color: vars.grey,
        fontSize: 15,

    },
    SelectTextSize: {
        color: vars.white,
        fontSize: 15,

    },
    chec: {

        backgroundColor: '#ECF0F1',
    },
    addbtn: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: vars.baseColor,
        width: 200,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textbtn: {
        color: vars.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    price: {
        marginRight: 8,
        color: vars.white,
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }


}
