let p = document.getElementById("joke");
let p2 = document.getElementById("meteo");
const reportJokes:Joke[] = [];

type Joke = {
    joke: string | null
    score: number
    date: string
} 

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const jokeApis = ["https://icanhazdadjoke.com/", "https://api.chucknorris.io/jokes/random"];
let dadJoke = false;
let i = 0;
function getJoke(){
    fetch(jokeApis[i], options)
    .then(res => res.json()) 
    .then(response =>{
        if(i == 0){
            p!.textContent ='"'+ response.joke + '"';
            i = 1;
        }else{
            p!.textContent ='"'+ response.value + '"';
            i = 0;
        }                   
    });     
};

getJoke();

function rateJoke(score:number){
    const date = new Date().toISOString();
    const joke:Joke = {
        joke: document.getElementById("joke")!.textContent,
        score: score,
        date: date
    }
    const found = reportJokes.find((element) => element.joke === joke.joke);
    found == null ? reportJokes.push(joke) : found.score = score;
    
    console.log(reportJokes);
}

fetch("https://www.el-tiempo.net/api/json/v2/home", options)
    .then(res => res.json())
    .then(response =>{
        p2!.textContent ='El tiempo hoy: '+ response.ciudades[0].stateSky.description;             
    });