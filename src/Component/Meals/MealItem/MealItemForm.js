import { useContext ,useRef, useState} from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import CartContext from '../../../store/cart-context';
import MedicineContext from '../../../store/medicine-context';

const MealItemForm = (props) => {
     const cartCtx = useContext(CartContext);
     const mediCtx = useContext(MedicineContext);
  const amountInputRef = useRef();
    const [amountIsValid,setAmountIsValid] = useState(true);
  //  console.log("quantity===",mediCtx.item[props.item.id].quantity)
  const addToCartCrud =async (cartItem)  => {
    try {
     
     const resp=  await fetch(`https://react-http-2f680-default-rtdb.firebaseio.com/cart.json`,{
       method:'POST',
       body: JSON.stringify(cartItem),
       headers:{
         'Content-Type': 'application/json'
       }
      })
      if(!resp.ok){
       throw new Error('Request Failed');
      }
      const resArr =await resp.json();
    return resArr;

    } catch (error) {
     console.log("failed to Post=",error);
    }
}
  
    const putItem =async (event) =>{
    event.preventDefault();
//  console.log("times");
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    // if(enteredAmount.trim().length==0 ||
    //  enteredAmountNumber<1 ||
    //   enteredAmountNumber>mediCtx.item[props.item.id].quantity){
    //       setAmountIsValid(false);
    // return;
    //     }
    if(enteredAmount.trim().length==0 ||
     enteredAmountNumber<1 ||
      enteredAmountNumber>props.item.quantity){
          setAmountIsValid(false);
    return;
        }

        setAmountIsValid(true)

        const passItem ={...props.item,amount:enteredAmountNumber }
   const cartResult = await  addToCartCrud(passItem);
     
        cartCtx.addItem(passItem);
    //   mediCtx.updateItem(passItem);
       
   }       
     return (
    <form className={classes.form} onSubmit={putItem} >
      <Input
      ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.item.id,
          type: 'number',
          min: '1',
        
          step: '1',
          defaultValue: '1',
        }}
      />
      {/* disabled= {mediCtx.item[props.item.id].quantity<=0 ? true: false} */}
      <button  type='submit' >+ Add</button>
     {!amountIsValid && <p>please enter valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;