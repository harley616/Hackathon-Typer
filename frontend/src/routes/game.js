import React, {useState, useContext} from 'react';
import getPoem from '../services/getPoem';
import {context} from './root';
import Api from '../services/api'; 
import gif1 from '../Animated GIFs/pot.gif';
import gif2 from '../Animated GIFs/layer1.gif';
import gif3 from '../Animated GIFs/layer2.gif';
import gif4 from '../Animated GIFs/layer3.gif';
import deathGif from '../Animated GIFs/flower death.gif';

const gifs = [gif1, gif2, gif3, gif4];

const test = ['lorem ipsum dolor sit amet', 'consectetur adipiscing elit', 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'ut enim ad minim veniam', 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 'duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', 'excepteur sint occaecat cupidatat non proident', 'sunt in culpa qui officia deserunt mollit anim id est laborum']
export default function Game() {
  // const [test] = useState(getPoem('easy'));
  const api = new Api();
  const [wpmList, setWpmList] = useState([]);
  const [iter, setIter] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [testString, setTest] = useState(test[iter]);
  const [typed, setTyped] = useState('');
  const [okay, setOkay] = useState(true);
  const [done, setDone] = useState(false);
  const [wpm, setWpm] = useState(0)
  const {setMessage, user} = useContext(context);

  function updateWpm(){
    if (iter === 0){
      setMessage('Need to finish first test to get a score!');
      setWpm(0)
    }else{
      setWpm(
        Math.floor((testString.split(' ').length/(Date.now() - startTime)*1000)*60)
      )
    } 
    api.postScore(wpm, user);
  }
  function avg(lst){
    let sum = 0
  
    lst.forEach(el => {
      sum = sum + el
    });
    return sum/lst.length
  }
  return (
    <div>
      <h1>Welcome to Typer</h1>
      {okay ? 
      <>
      {!done ? 
      <>
      <div className="relative">

      <textarea className="w-64 h-24 bg-sky-100 text-black p-1" onChange={(e) => {
        if(e.target.value.charAt(e.target.value.length - 1) !== testString[e.target.value.length - 1]){
          setOkay(false);
          setIter(0);
        }else{
          if(e.target.value.charAt(e.target.value.length - 1) === testString[0]){
            setStartTime(Date.now());
          }
          else if(e.target.value.charAt(e.target.value.length - 1) === testString[testString.length -1]){
            setDone(true);
            setIter(iter + 1)
            updateWpm();
          }else{
            setTyped(e.target.value)
          }
        }
        }}>
      </textarea>
      <div className="w-64 h-24 bg-none text-black opacity-25 absolute top-0 left-0 pointer-events-none p-1">
        {testString}
      </div>
      </div>
     
      </>
      :
      <> 
      {/* WRITE HELPER FUNCTIONS!!! There is a bug in the logic, ends prematurely */}
      <h1> Wpm: {wpm}</h1>
      <div onClick={() => {setOkay(true); setDone(false); setTest(test[iter]);setWpmList([...wpmList, wpm])}}>Next</div>
      </>
      }
      </> : 
      <>
      <div> Failed</div>
      <div onClick={() => {setOkay(true); setDone(false);setTest(test[iter]); setWpm(0)}}>Try again</div>
      <div>You had an avg apm of: {avg(wpmList)}</div>
      </>

      }
      {okay ?
       <img src ={gifs[Math.floor((typed.length / testString.length)*100/25)]} alt = 'gifs of flower'/> 
       : <img src={deathGif} alt = 'death gif'/>}

      
    </div>
  )
}
