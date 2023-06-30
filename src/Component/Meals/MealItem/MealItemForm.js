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
 
    const putItem = (event) =>{
    event.preventDefault();
  console.log("times");
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if(enteredAmount.trim().length==0 ||
     enteredAmountNumber<1 ||
      enteredAmountNumber>5){
          setAmountIsValid(false);
    return;
        }

        setAmountIsValid(true)

        const passItem ={...props.item,amount:enteredAmountNumber }
       cartCtx.addItem(passItem);
       mediCtx.updateItem(passItem);

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
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button  type='submit'>+ Add</button>
     {!amountIsValid && <p>please enter valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;