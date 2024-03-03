import axios from 'axios';
// const axios = require('axios');

const levels={
    easy:"2/lines",
    medium:"5/lines",
    hard:"8/lines"
}

export default async function getPoem(level){
    const path=levels[level];

    return await axios.get(`https://poetrydb.org/random,linecount/3;${path}`)
    .then(response => {
      const poemsinSingleString=response.data.map(poem=>poem.lines.join(" "));
      console.log(poemsinSingleString);
      return poemsinSingleString;
    })
    .catch(error => {
      console.error('error!', error);
      return false;
    });
}

// getPoem("easy");