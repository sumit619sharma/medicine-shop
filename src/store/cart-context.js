import React from "react";

 const CartContext =  React.createContext({
  item: {},
  totalAmount: 0,
  quantity: {},
  addItem: (item)=> {},
  removeItem: (id)=> {}
})
export default CartContext;