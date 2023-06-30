import classes from './CartItem.module.css';

const CartItem = (props) => {
  const item=  props.item;
  const qnty = props.qnty
  const price = `$${ Math.floor( item.price)}`;

  const decrItem = ()=>{
         props.onRemove(item.id);
  }
  const incItem = ()=>{
    const passItem ={...item,amount: 1}
  props.onAdd(passItem);
  }

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{item.product}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {qnty}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={decrItem}>−</button>
        <button onClick={incItem}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
