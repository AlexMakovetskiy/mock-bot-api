import { useState } from 'react';

import './App.css';

const App = () => {
    const [buttonColors, setButtonColors] = useState(['', '', '']);

    function makeRenderBaseUrl(domainPart: string) {
        return `https://${domainPart}.onrender.com/wakeup`;
    }

    const handleButtonClick = async (index: number, domainPart: string) => {
        await fetch(makeRenderBaseUrl(domainPart))
            .then((response: Response) => {
                if(response.status >= 200 && response.status < 300) {
                    const newColors = [...buttonColors];
                    newColors[index] = 'green';
                    setButtonColors(newColors);

                    setTimeout(() => {
                        newColors[index] = '';
                        setButtonColors(newColors);
                    }, 15000);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    };

    return (
        <div className="app">
        <h1>Красивые кнопки с градиентами</h1>
        <div className="button-container">
            <button 
                style={{ background: `linear-gradient(to right, ${buttonColors[0] || 'red'}, ${buttonColors[0] || 'blue'})` }} 
                onClick={() => handleButtonClick(0, "interactive-game-bot-23845")}
            >Interactive game</button>
            <button style={{ background: `linear-gradient(to right, ${buttonColors[1] || 'red'}, ${buttonColors[1] || 'blue'})` }} onClick={() => handleButtonClick(1, "")}>Кнопка 2</button>
            <button style={{ background: `linear-gradient(to right, ${buttonColors[2] || 'red'}, ${buttonColors[2] || 'blue'})` }} onClick={() => handleButtonClick(2, "")}>Кнопка 3</button>
        </div>
        </div>
    );
};

export default App;