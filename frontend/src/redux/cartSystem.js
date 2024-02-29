import { createSlice } from "@reduxjs/toolkit";

var priceList =""
const initialState = { //initial states of redux store
    cartItems:[],
    cartQuantity:0,
    cartTotalPrice:0
}
const cartSystem = createSlice({
    name:"cart",
    initialState,
    reducers:{
        AddCart:(state = initialState,action)=>{ // add items to the stores 
            // console.log("cartIems", action)
            const find = state.cartItems.findIndex((item)=>item._id===action.payload._id)
            const searchById= state.cartItems.findIndex((item)=>item.productId===action.payload._id)
            state.cartItems.map((item)=>
                priceList=item.productPrice+item.productPrice
            )
            state.cartTotalPrice=priceList
            // console.log('priceList',priceList)
            
            
            if (find>=0){
                state.cartItems[find].cartQuantity+=1
                
            }else if(searchById>=0) {

                state.cartItems[searchById].cartQuantity+=1
            }else{
                state.cartQuantity++
                const productItems={...action.payload,cartQuantity:1}
                state.cartItems = [productItems, ...state.cartItems]
        }
        },
        RemoveCart:(state = initialState,action)=>{// remove items from the stores 
           
            const nextItems=state.cartItems.filter((cartItems)=>cartItems._id!==action.payload._id);
            state.cartItems=nextItems
            state.cartQuantity--
        }
    }
});
export const {AddCart,RemoveCart}=cartSystem.actions;
export default cartSystem.reducer;