import React,{useState} from "react";
import Header from "./Component/Layout/Header";
import NewExpense from "./Component/NewExpense/NewExpense";
import Meals from "./Component/Meals/Meals";
import Cart from "./Component/Cart/Cart";
import CartProvider from "./store/CartProvider";

const App = () => {

  const [showCart,setShowCart] = useState(false);
   const toggleCart=()=> {
    setShowCart(!showCart);
   }
    return (
        
        <CartProvider>
        {showCart && <Cart onClick={toggleCart} showCart={showCart} /> }
            <Header onShowCart={toggleCart}/>
            <NewExpense />
            <Meals/>
            </CartProvider>
        
    );
};

export default App;
