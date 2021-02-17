import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {

    constructor(props){
        super(props);
        this.state = {
            xIsNext:true,
            stepNumber:0,
            history: [
                {squares: Array(9).fill(null)} 
            ]            
        }
    }

    Movimientos(step){
        
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) === 0
        })

    }

    Jugada(i){
        const history = this.state.history.slice(0,this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        const ganador = calculoGanador(squares);
        
        if(ganador || squares[i]){
            return;
        }

        squares[i] = this.state.xIsNext?'X':'O';
        
        this.setState({
            history:history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length 
        }); 
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const ganador = calculoGanador(current.squares);
        const moves = history.map((step, move) => {

            const desc = move? 'Movimiento #' + move:'Empieza el juego'
            return (
                <li key={move}>
                    <button onClick={()=>{this.Movimientos(move)}}>
                        {desc}
                    </button>
                </li>
            )
        });

        let status; 
        if(ganador){
            status = 'El Ganador es '+ ganador;
        }
        else{
            status = 'Jugada para la ' + (this.state.xIsNext ? 'X':'O');
        } 

        return ( 
            <div className="game">
                <div className="game-board">
                    <Board onClick = {(i) => this.Jugada(i)}
                    squares={current.squares} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>
                
            </div>
        );
    }
}

function calculoGanador(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(let i=0; i<lines.length; i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a]
        }
    }

    return null;
}