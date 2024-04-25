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
        setTimeAcc({time: null, acc: null})
    }, [])
    
    const checkAcc = () => 
    {
        console.log(incorrect.length);
        console.log(text.length-2);
        console.log((incorrect.length / text.length -2));
        console.log(9 / 9)


        return (incorrect.length / text.length -2) * 100;

    }

    const handleSpaceBar = (e) => 
    {
        if (e.keyCode === 32) {
            

            if (currentIndex != text.length-1)
            {
                const input = e.target.value.trim() + " ";
                e.preventDefault();

                checkInput(input);

                document.getElementById("input-field").value = "";
    
                setCurrentIndex(currentIndex + 1);
    
                document.getElementById("input-field").style.backgroundColor = "#3c444e";
    
                if(currentIndex == text.length-2)
                {
                    setTimeAcc({...timeAcc, acc: checkAcc()})
                }
            }
            else
            {
                document.getElementById("input-field").readOnly = true;
            }
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
        newWords.push(" ");
        setText(newWords);
        setCurrentIndex(0);
        setIncorrect([]);
    };

    const handelRedo = () => 
    {
        location.reload();
    }

    return (
        <div className="TypeDiv">
            <div className="center-div">
                <span style={{color: "#FFFF"}}>
                    <button className={text.length == 11 ? "button-active" : "button"} onClick={() => setWords(10)}>10</button>
                    /
                    <button className={text.length == 26 ? "button-active" : "button"} onClick={() => setWords(25)}>25</button>
                    /
                    <button className={text.length == 51 ? "button-active" : "button"} onClick={() => setWords(50)}>50</button>
                    /
                    <button className={text.length == 101 ? "button-active" : "button"} onClick={() => setWords(100)}>100</button>
                    /
                    <button className={text.length == 251 ? "button-active" : "button"} onClick={() => setWords(250)}>250</button>
                </span>
                <span className='time-acc'>
                    WPM:
                    {timeAcc.time ? timeAcc.time : " XX "}
                    /
                    ACC:
                    {timeAcc.acc ? (100 - timeAcc.acc) + "%" : " XXXX"}
                </span>
                <div className="text-div">
                    {text.map((word, index) => (
                        <span className={index === currentIndex ? "active" : (index < currentIndex ? (incorrect.includes(index) ? "incorrect" : "correct") : "not-active")} key={index}>{word} </span>
                    ))}
                </div>
                <span >
                    <input id={"input-field"} type="text" onChange={inputFieldColor} onKeyUp={handleSpaceBar}></input>
                    <button className='redo-button' onClick={() => handelRedo()}>redo</button>
                </span>
            </div>
        </div>
    );
}
