import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';


// let formDetail = {
//   category: enteredCategory,
//   id: enteredID,
//   price: enteredAmount,
//   product: enteredtitle,}
const MealItem = (props) => {
  const item = props.item;
  const price = `$ ${item.price}`;
   
  return (
    <li className={classes.meal}>
      <div>
        <h3>{item.product}</h3>
        <div className={classes.description}>{item.description}</div>
        <div className={classes.description}> <h3>{item.quantity}</h3> </div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm item={item} />
      </div>
    </li>
  );
};

export default MealItem;