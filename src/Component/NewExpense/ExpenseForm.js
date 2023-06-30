import React, { useState,useContext } from 'react'
import "./ExpenseForm.css"
import MedicineContext from '../../store/medicine-context';


const ExpenseForm = (props) => {
  const [enteredID, setID] = useState('');
    const [enteredtitle, setTitle] = useState('');
    const [enteredDesc, setDescription] = useState('');
    const [enteredAmount, setAmount] = useState('');
    const [enteredQuantity, setQuantity] = useState('Electronic');
    const [newExpense,setNewExpense] = useState(true);
      
    const medCtx = useContext(MedicineContext);
     
 //    console.log(props," in expenseForm ====")
    const addExpense = (event) => {
      event.preventDefault();
      setNewExpense(!newExpense);
     
          let formDetail = {
            quantity: enteredQuantity,
            id: enteredID,
          price: enteredAmount,  
            product: enteredtitle,
            description: enteredDesc}
    
            medCtx.addItem(formDetail);

  setAmount(''); setQuantity(''); setTitle('');  setID(''); setDescription('') ;
};
           
  const showAddExpense = ()=>{
    setNewExpense(!newExpense);
  }
    return (
      <>
      { newExpense ? (
              <div className='new-expense__show'>
              
            <button  onClick={showAddExpense} >Add-New-Product</button>
            
            </div>
      ) : (
        
      <form onSubmit={addExpense} >
      <div className='new-expense__controls'>            
      <div className='new-expense__control'>
      <label>ID</label>
      <input  type='text' value={enteredID} onChange={(e) => {setID(e.target.value)}}  />
      </div>
      <div className='new-expense__control'>
      <label>Medicine-name</label>
      <input  type='text' value={enteredtitle} onChange={(e) => {setTitle(e.target.value)}}  />
      </div>
      <div className='new-expense__control'>
      <label>Description</label>
      <input  type='text' value={enteredDesc} onChange={(e) => {setDescription(e.target.value)}}  />
      </div>
      <div className='new-expense__control'>
      <label>Selling Price</label>
      <input  type='number' value={enteredAmount} onChange={(e) => {setAmount(e.target.value)}}   />
      </div>
      <div className='new-expense__control'>
      <label>Available- Quantity</label>
      <input  type='number' value={enteredQuantity} onChange={(e) => {setQuantity(e.target.value)}}   />
      </div>
      </div>
      
      <div className='new-expense__actions'>
      <button  onClick={showAddExpense} >Cancel</button>
    <button  type='submit' >Add-Product</button>
    
    </div>
       </form>
      ) }

         </>
  )
}

export default ExpenseForm