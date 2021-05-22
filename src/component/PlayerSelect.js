import React,{useState, useEffect} from "react"

// import { truncate } from "fs";

function PlayerSelect(props){
    

    var [player, setPlayer]=useState("X")
    // var [player, setPlayer]=useState("O")

    function handleSubmit(e){
        e.preventDefault()
        let comp= (player=="X"? "O": "X")
        props.setPlayer(player)
        props.setComp(comp)
    }

    function handleChange(value){
        setPlayer(value)
        // setComp
        console.log(value)
        console.log(props)
    }

    return (
        <div>
            <form onSubmit={e => {handleSubmit(e)}}>
        <select onChange={e => handleChange(e.target.value)}>
            <option value="X" >X</option>
            <option value="O">O</option>
        </select>
        <button>Go</button>
        </form>
</div>
    )

}

export default PlayerSelect
