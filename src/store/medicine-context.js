import React from "react";

 const MedicineContext =  React.createContext({
  item: {},
  updateItem: (item)=> {},
  addItem: (items)=> {},
  removeItem: (id)=> {},
  plusOne: (id)=>{},
  minusOne: (id)=>{},
  addProduct: 123,
})
export default MedicineContext;