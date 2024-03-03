//import axios from 'axios';
const axios = require('axios');

const levels={
    easy:"5/lines",
    medium:"10/lines",
    hard:"15/lines"
}

export default function getPoem(level){
    const path=levels[level];

    axios.get(`https://poetrydb.org/random,linecount/3;${path}`)
    .then(response => {
      const poemsinSingleString=response.data.map(poem=>poem.lines.join("\n"));
      console.log(poemsinSingleString);
      return poemsinSingleString;
    })
    .catch(error => {
      console.error('error!', error);
      return false;
    });
}

getPoem("easy");