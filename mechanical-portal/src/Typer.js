import { useState } from 'react'
import './Typer.css'

export function Typer () 
{
    const [text, setText] = useState(["kaas", "aap", "hoofd", "banaan", "appel", "wortel"]);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [incorrect, setIncorrect] = useState([])

    const handleSpaceBar = (e) => 
    {
        if (e.keyCode == 32)
        {
            e.preventDefault();

            checkInput(e.target.value);

            document.getElementById("input-field").value = "";


            setCurrentIndex(currentIndex + 1);
        }
    };

    const checkInput = (input) =>
    {
        if (input != text[currentIndex])
        {
            setIncorrect([...incorrect, text[currentIndex]])
        }       
    }; 

    return (
        <div className="TypeDiv">
            <div>
            <div>
                {text && 
                    text.map((word, index) => 
                    (
                        <span className={index == currentIndex ? "active" :  index < currentIndex ? (text[index] in incorrect ? "incorrect" : "correct") :  "not-active"}key={index}>{word} </span>
                    )
                )}
            </div>
            <input id="input-field" type="text" onKeyUp={handleSpaceBar}></input>
            </div>
        </div>
    );
}