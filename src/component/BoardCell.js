import React, {useState} from "react"

//TODO:
//figure out styling red green? maybe useEffect and another state variable for cellvalue?(didnt work first time)

function BoardCell(props){
    

    function cellColor(){
        // console.log("clicked cell")
        cellColor=""
        if (props.cellValue=="X"){
            cellColor="red"
        }
        else if (props.cellValue=="O"){
            cellColor='green'
        }
        return cellColor

    }

    return(
        <div className="board-cell" style={{color: cellColor()}} onClick={props.onClick}>{props.cellValue}</div>
    )
}

export default BoardCell