import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    //  console.log("insideheaderButton===",cartCtx.quantity)
    const itemCnt = cartCtx.item != null ? Object.keys(cartCtx.item).length : 0;
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
