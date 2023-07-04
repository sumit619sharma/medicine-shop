import { useContext, useEffect, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import MedicineContext from '../../store/medicine-context';

const Cart = (props) => {
  const [cartList,setCartList]  =useState({});
   const medCtx =  useContext(MedicineContext);
   const cartCtx =  useContext(CartContext);
   
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
  if(props.showCart){
    console.log('showCart==',props.showCart);
    getCartItem();
  }

},[props.showCart]);
console.log("cartList===",cartList)
   const onRemove =(id)=>{
//console.log("onRemove==",id);
cartCtx.removeItem(id);
medCtx.plusOne(id);
// 
}

const onAdd =(item)=>{
  // console.log("item to passwith 1",item);
   cartCtx.addItem(item);
   medCtx.minusOne(item);
}
const itemKeyArr = Object.keys( cartList);
// const itemKeyArr = Object.keys( cartCtx.item);
  const cartItems = (
    <ul className={classes['cart-items']}>
      {/* {itemKeyArr.map((key) =>{
          const item = cartCtx.item[key];
          const qnty = cartCtx.quantity[key];
        return <CartItem key={key} item={item}  qnty={qnty} onRemove={onRemove} onAdd={onAdd} />
      }  )} */}
      {itemKeyArr.map((key) =>{
          const item = cartList[key];
          const qnty = cartList[key].amount;
        return <CartItem key={key} item={item}  qnty={qnty} onRemove={onRemove} onAdd={onAdd} />
      }  )}

    </ul>
  );
 const hasItem = itemKeyArr.length>0 ?true: false;
 const totalAmountAfter = cartCtx.totalAmount;
  return (
    <Modal onClose = {props.onClick} >
      {cartItems}
      
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmountAfter}</span>
      </div>
      <div className={classes.actions}>
        <button  onClick={props.onClick} className={classes['button--alt']}>Close</button>
        {hasItem &&  <button  onClick={props.onClick} className={classes.button}>Order</button>}
       
      </div>
      </Modal>
  );
};

export default Cart;