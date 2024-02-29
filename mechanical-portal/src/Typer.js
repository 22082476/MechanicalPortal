import { useState } from 'react'
import './Typer.css'

export function Typer () 
{
    const [text, setText] = useState(["kaas", "aap", "hoofd", "banaan", "appel", "wortel"]);
    const [currentIndex, setCurrentIndex] = useState(0)

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

    const checkInput = () =>
    {

    }; 

    return (
        <div className="TypeDiv">
            <div>
                {text && 
                    text.map((word, index) => 
                    (
                        <span className={index == currentIndex ? "active" : "not-active"}key={index}>{word} </span>
                    )
                )}
            </div>
            <input id="input-field" type="text" onKeyUp={handleSpaceBar}></input>

        </div>
    );
}