import { 
    LOAD, LOGIN, GET_USERS, GET_USER_BY_ID, GET_ALL_FAV, GET_PRODUCTOS, GET_PRODUCT_BY_ID, GET_CATEGORIES,
    MERCADO_PAGO, POST_COMPRA, GET_COMPRAS, GET_COMPRAS_USER, GET_COMPRA_DETALLE, GET_CARRITO_USER, 
    GET_USER_ADDRESS, FILTRA_MENU, RESET, GET_CATEGORY_BY_ID, GET_PROD_BY_NAME, FILTRA_AZ_ZA, FILTRA_PRICE, FILTRA_CAT, GET_COMPRAS_USER_BY_NAME, RESET_COMPRAS, GET_VENTAS_POR_DIA, VENTAS_POR_MES, LOGIN_GOOGLE, 
} from "./Actions/actionsType";

const initialState = {
    users: [],
    user: {},
    userAddress: [],
    cart: [],
    favorites: [],
    products: [],
    product: {},
    resultProducts:[],
    productsFiltrados:[],//para filtrar menú
    categories: [],
    category: {},
    allCompras:[],
    comprasUser: [],
    compraDetalle: {},
    linkmp: "",
    idCompra: "",
    logged: false,
    load: false
};

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case LOAD:
            return{
                ...state,
                load: true
            }
        case LOGIN:
            let resp;
            if(action.payload === "ok"){resp = true}
            return{
                ...state,
                logged: resp
            }
        case LOGIN_GOOGLE:
            let resp_G;
            if(action.payload === "ok"){resp_G = true}
                return{
                    ...state,
                    logged: resp_G
            }
        case GET_USERS:
            return{
                ...state,
                users: action.payload,
                load: false
            }
        case GET_USER_BY_ID:
            return{
                ...state,
                user: action.payload
            }
        case GET_USER_ADDRESS:
            return{
                ...state,
                userAddress: action.payload
            }            
        case GET_ALL_FAV:
            return{
                ...state,
                favorites: action.payload
            }
        case GET_PRODUCTOS:
            return{
                ...state,
                products: action.payload,
                resultProducts: action.payload,
                load: false
            }
        case GET_PRODUCT_BY_ID:
            return{
                ...state,
                product: action.payload
            }
        case GET_PROD_BY_NAME:
            return{
                ...state,
                resultProducts: action.payload,
                load: false
            }
        case GET_CATEGORIES:
            return{
                ...state,
                categories: action.payload
            }
        case GET_CATEGORY_BY_ID:
            return{
                ...state,
                category: action.payload
            }
        case GET_CARRITO_USER:
            return{
                ...state,
                cart: action.payload
            }
        case MERCADO_PAGO:
            return {
              ...state,
              linkmp: action.payload,
            }
        case POST_COMPRA:
            //asigno a "idCompra" el contenido de --> action.payload 
            localStorage.setItem("idCompra", JSON.stringify(action.payload));
            return {
                ...state,
                idCompra: action.payload,   
            }
        case GET_COMPRAS:
            return{
                ...state,
                allCompras: action.payload,
                comprasUser: action.payload,
                load: false
            }
        case GET_COMPRAS_USER:
            return{
                ...state,
                comprasUser: action.payload
            }  
        case GET_COMPRAS_USER_BY_NAME:
            return{
                ...state,
                comprasUser: action.payload
            } 
        case GET_VENTAS_POR_DIA:
            return{
                ...state,
                comprasUser: action.payload
            }
        case VENTAS_POR_MES:
            return{
                ...state,
                comprasUser: action.payload
            }
        case RESET_COMPRAS:
            return{
                ...state,
                comprasUser: state.allCompras

            }
        case GET_COMPRA_DETALLE:
            return{
                ...state,
                compraDetalle: action.payload
            }
        case FILTRA_MENU:
            let allP = state.products;
            let menufiltrado ;
            
            if(action.payload === 'completo'){
                menufiltrado = allP;
            }else{
                menufiltrado = allP.filter(p => p.category === action.payload);
            }
            
            return{
                ...state,
                productsFiltrados: menufiltrado,
                load: false
            }
        case FILTRA_AZ_ZA:
            let allProd = [...state.resultProducts];
            if(action.payload === 'az'){
                allProd.sort((a,b) =>{
                    let prodA = a.name, prodB = b.name;
                    if(prodA > prodB) return 1;
                    if(prodA < prodB) return -1;
                    return 0;
                });
            }
            if(action.payload === 'za'){
                allProd.sort((a,b) => {
                    let prodA = a.name, prodB = b.name;
                    if(prodA < prodB) return 1;
                    if(prodA > prodB) return -1;
                    return 0;
                });
            }
            return{
                ...state,
                resultProducts: allProd
            }
        case FILTRA_PRICE:
            let filtraPrice = [...state.resultProducts];
            if(action.payload === 'minP'){
                filtraPrice.sort((a,b) => {
                    if(a.priceG < b.priceG) return 1;
                    if(a.priceG > b.priceG) return -1;
                    return 0;
                });
            }
            if(action.payload === 'maxP'){
                filtraPrice.sort((a,b) => {
                    if(a.priceG > b.priceG) return 1;
                    if(a.priceG < b.priceG) return -1;
                    return 0;
                });
            }
            return{
                ...state,
                resultProducts: filtraPrice
            }
        case FILTRA_CAT:
                let filtraCat = state.resultProducts;
                filtraCat = filtraCat.filter(p => p.category === action.payload);                
                
                return{
                    ...state,
                    resultProducts: filtraCat,
            }
        case RESET:
            return{
                ...state,
                productsFiltrados: [],
                resultProducts: state.products
            }
        default:
            return state;
    }
}


