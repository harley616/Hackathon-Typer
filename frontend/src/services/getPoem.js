import axios from 'axios';
// const axios = require('axios');

const levels={
    easy:"5/lines",
    medium:"10/lines",
    hard:"15/lines"
}

export default function getPoem(level){
    const path=levels[level];

    axios.get(`https://poetrydb.org/random,linecount/1;${path}`)
    .then(response => {
      console.log(response.data[0].lines);
      return response.data[0].lines;
    })
    .catch(error => {
      console.error('error!', error);
      return false;
    });
}
