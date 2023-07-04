import React,{useReducer} from 'react'
import CartContext from './cart-context'
import MedicineContext from './medicine-context';
const defaultCartState ={
    item: {},
    quantity: {},
    totalAmount: 0,

}
const defaultMediState ={
  item: {},
  addProduct: 0,
}
var flag=false;
const cartReducer = (state,action) =>{
      if(action.type==="ADD"){
  
          const id = action.item.id;
           const qty = action.item.amount; 
          const updatedState = {
                item: {...state.item,  [action.item.id]: action.item },
                quantity: {...state.quantity, [id]: (state.quantity[id]!=null? state.quantity[id]+qty: qty )  }
               ,totalAmount: (state.totalAmount+action.item.price*qty),
               
            }
            return updatedState;
    
        } else if(action.type==="REMOVE"){
          
          const idd = action.id;
          const item = state.item;
          const upqty = state.quantity;
          //console.log("cartItem",state.item[idd],)
          const diffPrice = state.item[idd].price;
          const cnt = state.quantity[idd];
          console.log(idd,cnt,diffPrice);
           
          if(cnt==1){
            
           delete item[idd];
            delete upqty[idd];
        
          } else{
            const curr = upqty[idd]
        
            upqty[idd] = curr-1;
        
          }
          const upAmount = state.totalAmount - diffPrice
        
            return  {
            item: item,
            quantity: upqty,
            totalAmount: upAmount || 0,
          }
        }
       
    

}

const mediReducer = (state,action) =>{
  //console.log("inside mediReducer")
       
  if(action.type==="ADD_"){
   
    

    const updatedState = {...state,
          item: {...state.item,  [action.item.id]: action.item },
          addProduct: Math.random(),
      }
      return updatedState

  } else if(action.type==="REMOVE_"){
    const idd = action.id;
    const item = state.item;
    const upqty = state.quantity;
    const diffPrice = state.item[idd].price;
    const cnt = state.quantity[idd];
    console.log(idd,cnt,diffPrice);
  //   if(cnt==1) {delete item.idd;}   
    if(cnt==1){
      console.log("needToDelete",item)
     delete item[idd];
      delete upqty[idd];
      console.log("deleted",item)
    } else{
      const curr = upqty[idd]
      upqty[idd] = curr-1;
    }
    const upAmount = state.totalAmount - diffPrice
    return {
      item: item,
      quantity: upqty,
      totalAmount: upAmount
    }
  } else if(action.type==="UPDATE_"){
    
    const qty = action.item.quantity;
    console.log("quantity while update==",qty)
    const usedQty = action.item.amount
    
    const upItem = action.item;
     upItem.quantity = qty-usedQty;
    
    const updatedState = {...state,
      item: {...state.item,  [action.item.id]: upItem },
  }

  return updatedState;
  }
   else if(action.type==="PLUSONE"){
    const curItem = state.item[action.id];
    const qty = curItem.quantity;
    const usedQty = 1
    
    const upItem = curItem;
     upItem.quantity = qty+usedQty;
    
    const updatedState = {...state,
      item: {...state.item,  [curItem.id]: upItem },
  }
  return updatedState;

  }  else if(action.type==="MINUSONE"){
    console.log("minusONe==",action.item);
    const qty = action.item.quantity;
    const usedQty = 1;
    
    const upItem = action.item;
     upItem.quantity = qty-usedQty;
    
    const updatedState = {...state,
      item: {...state.item,  [action.item.id]: upItem },
  }
  return updatedState;
  }

  return state;
}

const CartProvider = (props) => {
  const [mediState, dispatchMedi]= useReducer(mediReducer,defaultMediState);
  const [cartState, dispatchCart]= useReducer(cartReducer,defaultCartState);
  

  const addItemToCartHandler = ( item) => {
   
   
   dispatchCart({type: "ADD" , item: item});
 }

 const removeItemFromCartHandler = (id)  => {
  
    dispatchCart({type:"REMOVE" , id: id});
 }

 const addItemToMedicineHandler = ( item) => {
   
   dispatchMedi({type: "ADD_" , item: item});
}
const updateItemToMedicineHandler = ( item) => {

  dispatchMedi({type: "UPDATE_" , item: item});
  console.log("ckeck if dispatch twice");
  
 }
const removeItemFromMedicineHandler = (id)  => {
   dispatchMedi({type:"REMOVE_" , id: id});
}
const minusOneFromMedicineHandler = (item)  => {
  dispatchMedi({type:"MINUSONE" , item: item});
}
const plusOneFromMedicineHandler = (id)  => {
  dispatchMedi({type:"PLUSONE" , id: id});
}



  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    quantity: cartState.quantity,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }
  const medicineContext = {
    item: mediState.item,
    addItem: addItemToMedicineHandler,
    updateItem: updateItemToMedicineHandler,
    removeItem: removeItemFromMedicineHandler,
    plusOne: plusOneFromMedicineHandler,
    minusOne: minusOneFromMedicineHandler,
    addProduct: mediState.addProduct,
  }

  return  <MedicineContext.Provider value={medicineContext}>
 <CartContext.Provider value={cartContext} >
   {props.children}
  </CartContext.Provider>
  </MedicineContext.Provider>    
  
}

export default CartProvider;
