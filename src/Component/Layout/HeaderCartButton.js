import React, { useContext,useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
    const [cartList,setCartList] = useState({});
    const getCartItem =async ()  => {
        try {
         
         const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/cart.json`)
          if(!resp.ok){
           throw new Error('Request Failed');
          }
          const resArr =await resp.json();
          console.log('cartFetch',resArr);
           setCartList({...resArr});
    
        } catch (error) {
         console.log("failed to Post=",error);
        }
    }
    
    
    useEffect(()=>{
      
        console.log('showCart==',props.showCart);
        getCartItem();
      
    
    });
    


    const cartCtx = useContext(CartContext);
    //  console.log("insideheaderButton===",cartCtx.quantity)
//    const itemCnt = cartCtx.item != null ? Object.keys(cartCtx.item).length : 0;
    const itemCnt = cartList != null ? Object.keys(cartList).length : 0;
    return (
        <button onClick={props.onClick} className={classes.button}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>your cart</span>
            <span className={classes.badge}>{itemCnt}</span>
        </button>
    );
};

export default HeaderCartButton;
