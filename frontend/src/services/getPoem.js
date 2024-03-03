import axios from 'axios';
// const axios = require('axios');

const levels={
    easy:"2/lines",
    medium:"4/lines",
    hard:"6/lines"
}

export default function getPoem(level){
    const path=levels[level];

    return axios.get(`https://poetrydb.org/random,linecount/3;${path}`)
    .then(response => {
      const poemString = response.data.map(poem => poem.lines.join(' '));
      // console.log(response.data[0].lines);
      return  poemString;
    })
    .catch(error => {
      console.error('error!', error);
      return false;
    });
}
