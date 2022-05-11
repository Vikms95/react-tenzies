import React from 'react';
import './App.css';
import Die from './components/Die'
import uniqid from 'uniqid'

function App() {
    /*
    Invoked inside generateArrayOfDie everytime
    an element with className selected-wrong/no className
    is found 
    */
    const generateRandomNumber = () =>{
        return Math.floor(Math.random() * (6 - 1 + 1) + 1)
    } 

    /* 
    Creates array of 10 objects
    */
    const [arrayOfDies, setArrayOfDice] = React.useState(
        new Array(10).fill(null).map(() =>(
            ({id: uniqid(), selected: false, value: generateRandomNumber().toString()})
        )))
    
    /*
    Will be assigned the clicked die *value* on the first click
    and from there, compared to the clicked die in checkIfSelectedNumber()
    */
    const [selected, setSelected] = React.useState("")

    /*
    Takes the values from *array* and maps over them
    creating 10 an array <Die/> components with *value*
    state passed as their props and the checkIfSelectedNumber method
    */
    const renderArrayOfDie = (array) =>{
        return array.map(die =>(
            <Die
                key={die.id}
                id={die.id}
                selected={die.selected}
                value={die.value}
                checkIfSelectedNumber={checkIfSelectedNumber}
            />
        ))
    } 

    /*
    Iterates over the previous *array* and if
    the array index has false as *selected*, generate
    a new *value* with generateRandomNumber()
    */
    const generateNewArrayOfDice = () =>{
        setArrayOfDice(prevArrayOfDice =>(
            prevArrayOfDice.map(die =>(
                (die.selected)
                ? die
                :{
                    id: die.id,
                    selected: die.selected,
                    value: generateRandomNumber().toString()
                 }
            ))
        ))
        removeAllWrongDieStyling()
    }

    const removeAllWrongDieStyling = () =>{
        const wrongDice = Array.from(document.querySelectorAll('.selected-wrong'))
        wrongDice.forEach(die =>{
            die.classList.remove('selected-wrong')
        })
    }

    /*
    Invoked when a dice is clicked, if that button is the
    first one selected, it will display that button as green and
    assign the button textContent to the selected value
    */
    const checkIfSelectedNumber = (dieId, event) =>{
        const element = event.target

        if(!selected){
            setSelected(element.textContent)
            styleCorrectClick(element)
            toggleClickedValue(dieId)
            return
        }

        if(element.textContent !== selected){
            styleIncorrectClick(element)
            return
        }

        styleCorrectClick(element)
        toggleClickedValue(dieId)
        
        if(isWin()) console.log("WIN")
    }

    const toggleClickedValue = (dieId) =>{
        setArrayOfDice(prevArrayOfDice=>(
            prevArrayOfDice.map(die =>(
                (die.id !== dieId) 
                    ? die
                    :{
                        id: die.id,
                        selected : !die.selected,
                        value : die.value
                     } 
            ))
        ))
    }

    const isWin = () =>{
        return arrayOfDies.every(die => die.selected)
    }

    const styleCorrectClick = (element) =>{
        element.classList.add('selected-correct')
    }

    const styleIncorrectClick = (element) =>{
        element.classList.add('selected-wrong')
    }

  return (
    <main>
        <div className='congratulating-message'></div>
        <div className="tenzies">
            <div className="tenzies-container">
                {renderArrayOfDie(arrayOfDies)}
            </div>    
            <div>
                <button onClick={generateNewArrayOfDice} className='roll-dice'>Roll</button>
            </div>
        </div>
    </main>
        
  );
}

export default App;
