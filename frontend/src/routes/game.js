import React, {useState} from 'react';


export default function Game() {

  const [wpmList, setWpmList] = useState([]);
  const [iter, setIter] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [testString, setTest] = useState(test[iter]);
  const [okay, setOkay] = useState(true);
  const [done, setDone] = useState(false);
  const [wpm, setWpm] = useState(0)
  function updateWpm(){
    setWpm(
      Math.floor((testString.split(' ').length/(Date.now() - startTime)*1000)*60)
    )
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
          if(e.target.value.charAt(e.target.value.length - 1) === testString[testString.length -1]){
            setDone(true);
            setIter(iter + 1)
            updateWpm();
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
      <h1> Wpm: {wpm}</h1>
      <div onClick={() => {setOkay(true); setDone(false); setTest(test[iter]);setWpmList([...wpmList, wpm])}}>Next</div>
      </>
      }
      </> : 
      <>
      <div> Failed</div>
      <div onClick={() => {setOkay(true); setDone(false);setTest(test[iter])}}>Try again</div>
      <div>You had an avg apm of: {avg(wpmList)}</div>
      </>

      }
      
    </div>
  )
}
