import React from 'react';
import './App.css';
import Die from './components/Die'

function App() {
  return (
    <main className="tenzies-container">
        <div className='row'>
            <Die value='1' />
            <Die value='1' />
            <Die value='1' />
            <Die value='1' />
            <Die value='1' />    
        </div>
        <div className='row'>
            <Die value='1' />
            <Die value='1' />
            <Die value='1' />
            <Die value='1' />
            <Die value='1' />
        </div>
    </main>
  );
}

export default App;
