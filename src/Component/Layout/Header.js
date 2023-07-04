import React from "react";
import classes from './Header.module.css'
import mealsImg from '../../assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props)=>{
    return <>
    <header className={classes.header}>
        <h1>Medicine-DashBoard</h1>
        <HeaderCartButton onClick={props.onShowCart} />
    </header>
    </>
    };
    export default Header;