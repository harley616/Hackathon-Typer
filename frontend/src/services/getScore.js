export default function getScore(wpm, level,length) {      
    let score = 0;
    if (level === "easy") {
        score = wpm * 1*length/10
    } else if (level === "medium") {
        score = wpm * 2*length/10;
    } else if (level === "hard") {
        score = wpm * 3*length/10;
    }
    return score;
}