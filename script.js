console.log("Welcome to Spotify");

//Intialization of variables
let audioElement = new Audio("./songs/1.mp3");
let songIndex = 0;
let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.getElementsByClassName('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let progress= undefined;
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Naa-Pranama", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Nuvve-Nuvve-Na..", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Chinnadhana-Niko..", filePath: "./songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Roja-roja-Preku..", filePath: "./songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Niharika-Niharika", filePath: "./songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sanamre-sanamre", filePath: "./songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "channa-mereya!", filePath: "./songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Meenakshi-Meenakshi", filePath: "./songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Dangerous..", filePath: "./songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Merupai-Saagara!", filePath: "./songs/10.mp3", coverPath: "covers/10.jpg"},
];

songItems.forEach((element, i ) =>{
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

//handling Events

console.log(masterSongName);

// console.log(masterSongName.textContent = songs[0].songName);

////////////////////MASTER PLAY BUTTON//////////////////////
masterPlay.addEventListener('click', (event)=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else if(audioElement.play() || audioElement.currentTime>=0){
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Adding Event Listeners
audioElement.addEventListener('timeupdate', () => {
    //updateSeekbar//ProgressBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(element)
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `./songs/${songIndex}.mp3`;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    })
});

////////////////NEXT BUTTON//////////////////////
document.getElementById('next').addEventListener('click', (e)=>{
    if(songIndex>9){
        songIndex=0
    }
    else{
        songIndex = songIndex + 1;
    }
    audioElement.src = `./songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

///////////////BEFORE BUTTON////////////////////
document.getElementById('previous').addEventListener('click', (e)=>{
    if(songIndex<=0){
        songIndex=0
    }
    else{
        songIndex = songIndex - 1;
    }
    audioElement.src = `./songs/${songIndex-1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
