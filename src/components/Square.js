import React, { Component } from 'react';

export default function Square(props) {
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}