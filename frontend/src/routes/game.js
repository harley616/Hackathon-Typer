import React, {useState, useContext} from 'react';
import {context} from './root';
import { useNavigate } from 'react-router-dom';
import Api from '../services/api'; 
import gif1 from '../Animated GIFs/pot.gif';
import gif2 from '../Animated GIFs/layer1.gif';
import gif3 from '../Animated GIFs/layer2.gif';
import gif4 from '../Animated GIFs/layer3.gif';
import deathGif from '../Animated GIFs/flower death.gif';
import getScore from '../services/getScore';

const gifs = [gif1, gif2, gif3, gif4];

// const test = ['lorem ipsum dolor sit amet', 'consectetur adipiscing elit', 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', 'ut enim ad minim veniam', 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat', 'duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur', 'excepteur sint occaecat cupidatat non proident', 'sunt in culpa qui officia deserunt mollit anim id est laborum']
export default function Game() {
  // const [test] = useState(getPoem('easy'));
  const {setMessage, user, test} = useContext(context);

  const api = new Api();
  const [wpmList, setWpmList] = useState([]);
  const [iter, setIter] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [testString, setTest] = useState(test[iter]);
  const [typed, setTyped] = useState('');
  const [okay, setOkay] = useState(true);
  const [done, setDone] = useState(false);
  const [wpm, setWpm] = useState(0)
  const [typping, setTypping] = useState(false);
  const navigate = useNavigate();

  function updateWpm(){
    setWpm(Math.floor((typed.split(' ')/(Date.now() - startTime)*1000)*60))
  }
  function finishedString(){
    console.log('finishedString')
    setIter(iter + 1);
    setDone(true);
    updateWpm();
  }

  function nextTest(){
    setOkay(true);
    setDone(false); 
    setTest(test[iter]);
    updateWpm();
    setWpmList([...wpmList, wpm]); 
    setWpm(0);
    setTyped('')
  }

  function startOver(){
    updateWpm();
    handlePostScore();
    navigate('/login')
    // setOkay(true); 
    // setDone(false);
    // setIter(0);
    // setTest(test[iter]); 
    // setWpm(0); 
    // setTyped('')
  }

  function handlePostScore(){
    let score;
    if (iter === 0){
      score = getScore(wpm, typed.length + 1);
      api.postScore({name: user, score: score});
      return
    }
    score = getScore(avg([...wpmList, wpm]), typed.length + 1);
    api.postScore({name: user, score: score});
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

      <textarea className="w-100 h-40 bg-sky-100 text-black p-1" onChange={(e) => {
        if(e.target.value.charAt(e.target.value.length - 1) !== testString[e.target.value.length - 1]){
          setOkay(false);
        }else{
          if(e.target.value.charAt(e.target.value.length - 1) === testString[0] && !typping){
            setTypping(true);
            setStartTime(Date.now());
          }
          else if(e.target.value.length === testString.length){
            finishedString();
            return;
          }else{
            setTyped(e.target.value)
          }
        }
        }}>
      </textarea>
      <div className="w-100 h-40 bg-none text-black opacity-25 absolute top-0 left-0 pointer-events-none p-1">
        {testString}
      </div>
      </div>
     
      </>
      :
      <> 
      <h1> Wpm: {wpm}</h1>
      <div onClick={() => {nextTest()}}>Next</div>
      </>
      }
      </> : 
      <>
      <div> Failed</div>
      <div onClick={() => {startOver()}}>Try again</div>
      <div>You had an avg apm of: {avg(wpmList)}</div>
      </>

      }
      {okay ?
       <img src ={gifs[Math.floor((typed.length / testString.length)*100/25)]} alt = {`gifs[${Math.floor((typed.length / testString.length)*100/25)}]`}/> 
       : <img src={deathGif} alt = 'death gif'/>}

      
    </div>
  )
}
