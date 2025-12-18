import React from "react";
import '../styles.css';
import { render } from "@testing-library/react";

export default function Header(){
    return(
        <div className="header">
            <img className="logo" src="logo.png" alt="Muvi Servo"/>
            <h2 className="app-subtitle">Find your next Movie here!</h2>
        </div>
        
    );
}
