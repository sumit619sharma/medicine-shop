

import { useContext } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import MedicineContext from '../../store/medicine-context';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
const mediCtx=  useContext(MedicineContext);
const mediitem =  mediCtx.item;
//console.log("mediitem in availMeals===",mediitem);
  const DUMMY_MEALS = mediitem!=null ? Object.keys(mediitem) : []
  const mealsList = DUMMY_MEALS.map((key) => <MealItem  key={key} item={mediitem[key]}  />);

  return (
    <section className={classes.meals}>
    <Card>
      <ul>{mealsList}
      </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;