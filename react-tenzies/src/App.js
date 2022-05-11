import React from 'react';
import './App.css';
import Die from './components/Die'

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
    Array of 10 objects, which will be:
    selected : true/false - whether the value has been selected 
    and matched *selected* when clicked
    value: "" - the value assigned from generateRandomNumber() 
    which will be compared in checkIfSelectedNumber()
    */
    const [arrayOfDies, setArrayOfDice] = React.useState(
        new Array(10).fill(null).map(() =>(
            ({selected: false, value: generateRandomNumber().toString()})
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
                value={die.value}
                checkIfSelectedNumber={checkIfSelectedNumber}
            />
        ))
    } 

    /*
    Invoked:
        - Roll button is clicked
    Iterates over the previous *array* and if
    the array index has false as *selected*, generate
    a new *value* with generateRandomNumber()
    */
    const generateNewArrayOfDice = () =>{
        // Call setArrayOfDice with prevArrayOfDice
        setArrayOfDice(prevArrayOfDice =>{
            // Create *newArray*
            let newArray = []
            const length = prevArrayOfDice.length
            // Iterate over *prevArrayOfDice*
            for(let i = 0 ; i < length; i++){
                const die = prevArrayOfDice[i]
                // If *prevArrayOfDice[i].selected* === true
                if(die.selected === true){
                    newArray.push(die)
                // Else if *prevArrayOfDice[i].selected* === false
                }else if(die.selected === false){
                    newArray.push({selected: die.selected, value: generateRandomNumber().toString()})
                }
            }
            removeAllWrongDieStyling()
            // Return *newArray*
            return newArray
        })
    }

    const removeAllWrongDieStyling = () =>{
        const wrongDice = Array.from(document.querySelectorAll('.selected-wrong'))
        console.log(wrongDice)
        wrongDice.forEach(die =>{
            die.classList.remove('selected-wrong')
        })
    }


    /*
    Invoked when a dice is clicked, if that button is the
    first one selected, it will display that button as green and
    assign the button textContent to the selected value
    */
    const checkIfSelectedNumber = (event) =>{
        // assign *element* to *event.target*
        const element = event.target
        console.log(selected)
        // if *element.textContent* === ""
        if(selected === ""){
            // assign the event.target.textContent to  *selected*
            setSelected(element.textContent)
            // add className selected-correct *event.target.classList*
            element.classList.add('selected-correct')
            // return
            return
        }

        // if *element.textContent* is not equals to *selected*
        if(element.textContent !== selected){
            // add className selected-wrong to *event.target.classList*
            element.classList.add('selected-wrong')
            // return
            return
        }
        element.classList.add('selected-correct')
        // else
            // add className selected-correct *event.target.classList*
            // 
    }

  return (
    <main>
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
