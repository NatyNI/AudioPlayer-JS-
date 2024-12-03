"use strict";

const audio = new Audio("https://picuridinfaguri.s3.eu-west-2.amazonaws.com/cezar_sandra-cugetul-2024-10-24.mp3")

const playPauseBtn = document.getElementById("play-pause")
const currentTimE = document.getElementById("current-time")
const timeRemaining = document.getElementById("time-remaining")
const progressBar = document.getElementById("progress-bar")
const volumeControl = document.getElementById("volume-control")
const speedButton = document.getElementById("button-speed")

volumeControl.addEventListener("wheel", (event) =>{
    event.preventDefault
    const deltaY = event.deltaY;  
    if (deltaY < 0) {
        audio.volume = Math.max(audio.volume - 0.05, 0);
        volumeControl.value = audio.volume;  
    } 
    else if (deltaY > 0) {
        audio.volume = Math.min(audio.volume + 0.05, 1);
        volumeControl.value = audio.volume;
    }
} )

playPauseBtn.addEventListener("click", ()=> {
    audio.volume = volumeControl.value ;
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent='Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent='Play';
    }
})

audio.addEventListener('timeupdate', function() {
    
    currentTimE.textContent = formatTime(audio.currentTime);
    timeRemaining.textContent =  formatTime(audio.duration - audio.currentTime);
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
    currentTimE.textContent = formatTime(audio.currentTime);
})

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
}





