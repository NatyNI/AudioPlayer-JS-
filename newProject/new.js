"use strict";

const audios =[ 
    new Audio("https://picuridinfaguri.s3.eu-west-2.amazonaws.com/cezar_sandra-cugetul-2024-10-24.mp3"),
    new Audio("https://picuridinfaguri.s3.eu-west-2.amazonaws.com/cezar_sandra-intre-nevoie-si-chemare-2024-11-17.mp3"),
    new Audio("https://picuridinfaguri.s3.eu-west-2.amazonaws.com/cezar_sandra-emotie-sau-cercetare-2024-10-17.mp3")
]
// namePrechs name 
const namePrechs = document.getElementsByClassName("list-music")

//mediaPlayer components 
const showNamepreach = document.getElementById("namePreach");
const playPauseBtn = document.getElementById("play-pause");
const currentTimE = document.getElementById("current-time");
const timeRemaining = document.getElementById("time-remaining");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume-control");
const speedButton = document.getElementById("button-speed");

// global variabile for audio prech when click on a prech
let audio;

//take the name and audio of prech when click on it
[...namePrechs].forEach((nameprech) => {
    nameprech.addEventListener("click", function(event) {
        for(let i = 0; i < audios.length; i++){
            if (audios[i] != event.target){
                audios[i].pause();}}
        showNamepreach.value = nameprech.textContent
        audio= audios[[...namePrechs].indexOf(nameprech)]
        audio.play();
        playPauseBtn.textContent = "Pause";
        audio.volume = volumeControl.value;

    audio.addEventListener('timeupdate', function() {
        currentTimE.textContent = formatTime(audio.currentTime);
        timeRemaining.textContent =  formatTime(audio.duration - audio.currentTime);
    });
});
});

// listener "mouseover" for every preach when you wait for 2 seconds on it, and listener "mouseout" after you leave from the prech
[...namePrechs].forEach((nameprech) => {
    let timer = 0;
    let secondaudio;

    nameprech.addEventListener("mouseover", function(event) {
        timer = setTimeout(() => {
            clearTimeout(timer);
            console.log(timer);
            for(let i = 0; i < audios.length; i++){
            if (audios[i] != event.target){
                audios[i].pause();}}

            secondaudio= audios[[...namePrechs].indexOf(nameprech)]
            secondaudio.play();
            secondaudio.volume = volumeControl.value;

    nameprech.addEventListener("mouseout", function(event) {
        if (timer) {
            clearTimeout(timer);
            timer = 0;
            secondaudio.pause();
            audio.play();
            
                }
        }); 

    },2000);
    });  
});


volumeControl.addEventListener("wheel", (event) =>{
    event.preventDefault;
    const deltaY = event.deltaY;  
    if (deltaY < 0) {
        audio.volume = Math.max(audio.volume - 0.05, 0);
        volumeControl.value = audio.volume;  
    } 
    else if (deltaY > 0) {
        audio.volume = Math.min(audio.volume + 0.05, 1);
        volumeControl.value = audio.volume;
    }
});


playPauseBtn.addEventListener("click", ()=> {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent='Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent='Play';
    }
});


progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
    currentTimE.textContent = formatTime(audio.currentTime);
});


volumeControl.addEventListener("input", ()=>{
    audio.volume = volumeControl.value ;
});


speedButton.addEventListener("click", () => {
    if (audio.playbackRate == 1){
        audio.playbackRate = 1.2;
        speedButton.textContent = `${audio.playbackRate}X`;
    }
    else if (audio.playbackRate == 1.2) {
        audio.playbackRate = 1.5;
        speedButton.textContent = `${audio.playbackRate}X`;
    }
    else if (audio.playbackRate == 1.5) {
        audio.playbackRate = 2;
        speedButton.textContent = `${audio.playbackRate}X`;
    }
    else if (audio.playbackRate == 2) {
        audio.playbackRate = 1;
        speedButton.textContent = `${audio.playbackRate}X`;
    }
})


function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};


