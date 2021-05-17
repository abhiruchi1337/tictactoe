import React,{useState, useEffect} from "react"
import BoardCell from "./BoardCell"

// import { truncate } from "fs";

function Board(){
    // var [board, setBoard]=useState([
    //     ["_","_","_"],
    //     ["_","_","_"],
    //     ["_","_","_"]
    // ])
    var [board, setBoard]=useState([
        "_","_","_",
        "_","_","_",
        "_","_","_"
    ])

    var [userTurn, setUserTurn]=useState(true)

    var [gameEnd, setGameEnd]=useState(false)

    const wins=[[0,1,2],[3,4,5],[6,7,8],//rows
        [0,3,6],[1,4,7],[2,5,8],//cols
        [0,4,8],[2,4,6]//diags
    ]



    function play(xo, id){
        setBoard(prevBoard =>
            {
                let nboard=prevBoard.slice()//probably not the best way
                nboard[id]=xo
                return nboard
            }
        )
    }

    function handleClick(id){
        
        console.log("clicked", id)
        if (!gameEnd){
            //this is pretty garbage code, there might be a better way
            if (board[id]=="_"){//if cell isn't already filled
                play("X",id)
                setUserTurn(()=>{return false})
                console.log("user turn end", userTurn)
            }
        }
    }

    useEffect(()=>{//computermove each time board updated? potential problem-infinite move, since computer move will also update the board
        console.log(board)
        console.log("useeffect called, user turn", userTurn, "game end", gameEnd)
        if (!userTurn){
            computerMove()    
        }
        if (!gameEnd){
            setUserTurn(()=>{return true})
            console.log('user turn:', userTurn)
        }
        else{
            console.log("A WINNAR IS YOU, ",gameEnd)
        }
    },[board, userTurn])

    

    function checkWin(boardview){//not cleanest
        for (const w of wins){
            // console.log(w)
            
            if (boardview[w[0]]!="_" && boardview[w[1]]==boardview[w[0]] && boardview[w[2]]==boardview[w[1]]){
                console.log('win condition',true)
                return boardview[w[0]]
            }
        }
        console.log('win condition:',false)
        return false
    }


    function availableMoves(){
        return board.map((cell, id)=>{
            if (cell=="_") return id
        }).filter( (v) => {return v>=0} )
    }

    function computerMove(){
        let compTurn=true
        let ans=checkWin(board)//this check if user wins?
        if (ans){
            console.log('game end',ans)
            setGameEnd('X')
            return
        }
        console.log('computer does a move')
        
        var options=availableMoves()
        console.log('availablemoves',availableMoves())

        for (var i=0;i<options.length;i++){
            console.log('checking for win')
            let tempboard=board.slice()
            let oldcell=tempboard[options[i]]
            tempboard[options[i]]="O"
            console.log('replacing',oldcell,'at',options[i],'with O')
            console.log("tempboard:",tempboard)
            if (checkWin(tempboard)=="O"){
                play("O", options[i])
                compTurn=false
                //TODO: something to end game here
                setUserTurn(()=>{return true})
                setGameEnd(()=>{return 'O'})
                break
            }
            else{
                tempboard[options[i]]=oldcell
            }
        }
        if (compTurn){//didn't find a winning 
        console.log('no win found, going random')
        let randind= Math.floor(Math.random()*options.length)
        play("O", options[randind])
        //random no options.length, play with options[randno]
        }

    }

    return(
        <div className="gamecontainer">

        <div className="board-grid">
        <div className="board-row row1">
        <BoardCell id="1" onClick={()=>{handleClick(0)}} cellValue={board[0]}/>
        <BoardCell id="2" onClick={()=>{handleClick(1)}} cellValue={board[1]}/>
        <BoardCell id="3" onClick={()=>{handleClick(2)}} cellValue={board[2]}/>
        </div>
        <div className="board-row row2">
        <BoardCell id="4" onClick={()=>{handleClick(3)}} cellValue={board[3]}/>
        <BoardCell id="5" onClick={()=>{handleClick(4)}} cellValue={board[4]}/>
        <BoardCell id="6" onClick={()=>{handleClick(5)}} cellValue={board[5]}/>
        </div>
        <div className="board-row row3">
        <BoardCell id="7" onClick={()=>{handleClick(6)}} cellValue={board[6]}/>
        <BoardCell id="8" onClick={()=>{handleClick(7)}} cellValue={board[7]}/>
        <BoardCell id="9" onClick={()=>{handleClick(8)}} cellValue={board[8]}/>
        </div>
        {/* <div className="board-row row2">
        <div className="board-cell" onClick={()=>{handleClick()}} id='4'>X</div>
        <div className="board-cell" onClick={()=>{handleClick()}} id='5'>X</div>
        <div className="board-cell" onClick={()=>{handleClick()}} id='6'>X</div>
        </div>
        <div className="board-row row3">
        <div className="board-cell" onClick={()=>{handleClick()}} id='7'>X</div>
        <div className="board-cell" onClick={()=>{handleClick()}} id='8'>X</div>
        <div className="board-cell" onClick={()=>{handleClick()}} id='9'>X</div>
        </div> */}

        
        </div>
        <div className="result">
        <h3> winner:{gameEnd?gameEnd:"?"}</h3>
        </div>
        </div>
    )
}

export default Board


// https://rosettacode.org/wiki/Tic-tac-toe#Python
// Logic:
// -let user only play as X to start with
// -onclick: 
//     -check if cell is blank? change to x: do nothing
//     -computer turn

// computer turn logic:
// observe board current situation 
//     -if all empty, select random position and make it O (board stored in state?)
    
//     -check O trebles: if any potential found, complete, game won 
    
//     -otherwise, check x trebles
//         -x in corner or centre:
//             -check its row, col and diag for treble
//                 -if any completed, game over user won 
//                 -else if any about to be formed, block 
//         -x in non corner but not centre:
//             -check row, col for treble, block

// No O trebles either: game draw



// board/win logic:
// store board array
// store win conditions as list of indices 
// def wincheck: 
//     for each win condition: 
//         b=board[first win index ka character]
//         if b is not blank and all the other indices ke characters === b, win
//     return none



