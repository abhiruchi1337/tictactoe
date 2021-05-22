import React from "react"

//TODO:
//figure out styling red green? maybe useEffect and another state variable for cellvalue?(didnt work first time)

function BoardCell(props){
    

    function setCellColor(){
        // console.log("clicked cell")
        var cellColor=""
        if (props.cellValue==="X"){
            cellColor="red"
        }
        else if (props.cellValue==="O"){
            cellColor='green'
        }
        return cellColor

    }

    return(
        <div className="board-cell" style={{color: setCellColor()}} onClick={props.onClick}>{props.cellValue}</div>
    )
}

export default BoardCell