import { useState, useEffect } from 'react'
import './Typer.css'
import json from './words.json'

export function Typer() {
    const [text, setText] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [incorrect, setIncorrect] = useState([]);
    const [timeAcc, setTimeAcc] = useState({time: null, acc: null})

    useEffect(()=>
    {
        setWords(10) 
    }, [])
    
    
    const handleSpaceBar = (e) => 
    {
        if (e.keyCode === 32) {
            const input = e.target.value.trim() + " ";
            e.preventDefault();

            checkInput(input);

            document.getElementById("input-field").value = "";

            setCurrentIndex(currentIndex + 1);

            document.getElementById("input-field").style.backgroundColor = "#3c444e";

            setTimeAcc({...timeAcc, acc: incorrect.length / text.length *})

        }
    };

    const inputFieldColor = (e) =>
    {
        
        const word = e.target.value;
            
        if (word !== text[currentIndex].substring(0, word.length) )
        {
            document.getElementById("input-field").style.backgroundColor = "red";
        }
        else
        {
            document.getElementById("input-field").style.backgroundColor = "#3c444e";
        }
    };

    const checkInput = (input) => 
    {
        if (input !== text[currentIndex]) {
            setIncorrect([...incorrect, currentIndex]);  
        }
    };

    const setWords = (count) => {
        const newWords = [];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * json.words.length);
            newWords.push(json.words[randomIndex]);
        }
        setText(newWords);
        setCurrentIndex(0);
        setIncorrect([]);
    };

    return (
        <div className="TypeDiv">
            <div className="center-div">
                <span style={{color: "#FFFF"}}>
                    <button className={text.length == 10 ? "button-active" : "button"} onClick={() => setWords(10)}>10</button>
                    /
                    <button className={text.length == 25 ? "button-active" : "button"} onClick={() => setWords(25)}>25</button>
                    /
                    <button className={text.length == 50 ? "button-active" : "button"} onClick={() => setWords(50)}>50</button>
                    /
                    <button className={text.length == 100 ? "button-active" : "button"} onClick={() => setWords(100)}>100</button>
                    /
                    <button className={text.length == 250 ? "button-active" : "button"} onClick={() => setWords(250)}>250</button>
                </span>
                <span className='time-acc'>
                    {timeAcc.time ? timeAcc.time : "XX "}
                    /
                    {timeAcc.acc ? timeAcc.acc + "%" : " XXX"}
                </span>
                <div className="text-div">
                    {text.map((word, index) => (
                        <span className={index === currentIndex ? "active" : (index < currentIndex ? (incorrect.includes(index) ? "incorrect" : "correct") : "not-active")} key={index}>{word} </span>
                    ))}
                </div>
                <span >
                    <input id={"input-field"} type="text" onChange={inputFieldColor} onKeyUp={handleSpaceBar}></input>
                    <button className='redo-button'>redo</button>
                </span>
            </div>
        </div>
    );
}
