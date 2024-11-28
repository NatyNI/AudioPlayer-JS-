"use strict";

const audios =[ 
    new Audio("https://picuridinfaguri.s3.eu-west-2.amazonaws.com/cezar_sandra-cugetul-2024-10-24.mp3"),
    new Audio("https://picuridinfaguri.s3.eu-west-2.amazonaws.com/cezar_sandra-intre-nevoie-si-chemare-2024-11-17.mp3"),
    new Audio("https://picuridinfaguri.s3.eu-west-2.amazonaws.com/cezar_sandra-emotie-sau-cercetare-2024-10-17.mp3")
]

const players = document.querySelectorAll(".audio-player")

for (let i = 0; i < players.length; i++) {
    const audio = audios[i];
    const player = players[i];

    const playPauseBtn = player.querySelector(".play-pause");
    const currentTimE = player.querySelector(".current-time");
    const timeRemaining = player.querySelector(".time-remaining");
    const progressBar = player.querySelector(".progress-bar");
    const volumeControl = player.querySelector(".volume-control");
    const speedButton = player.querySelector(".button-speed");

    playPauseBtn.addEventListener("click", ()=> {
        audio.volume = volumeControl.value / 100;
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
        audio.volume = volumeControl.value / 100;

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
    
    audio.addEventListener('play', function(e){
        for(let i = 0; i < audios.length && i < players.length; i++){
            if (audios[i] != e.target){
                audios[i].pause();
                let updateBtn = players[i].querySelector(".play-pause")
                updateBtn.textContent = "Play";
            }
        }})

    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = Math.floor(seconds % 60);
        audio.volume = volumeControl.value / 100;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }


};



