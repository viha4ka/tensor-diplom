import {drawCardsMyTracks} from "./drawCard.js";

const btnOpenPlaylist = document.querySelector(".btn-create-playlist")
const modalPlayList = document.querySelector(".modal-background_playlist")
const modalCreatePlayList = document.querySelector(".modal-background_create-playlist")
const btnModalPlayListClose = document.querySelector(".modal-background_playlist .modal__close")
const btnModalCreatePlayListClose = document.querySelector(".modal-background_create-playlist .modal__close")
const playlist = document.querySelector(".playlist")

const audio = document.querySelector(".audio")
const playerStartTime = document.querySelector(".player__start-time")
const playerEndTime = document.querySelector(".player__end-time")
const playerIndicator = document.querySelector(".player__indicator")
const playerIndicatorWrap = document.querySelector(".player__indicator-wrap")

const volumeIndicatorWrap = document.querySelector(".volume__indicator-wrap")
const volumeIndicator = document.querySelector(".volume__indicator")

const btnPlay = document.querySelector(".play")
const btnPause = document.querySelector(".pause")
const btnVolumeOff = document.querySelector(".volume-off")
const btnVolumeOn = document.querySelector(".volume-on")

const myTracks = [
    {name: "Razlom", author: "Schurik", img: "./images/album.jpg", id: 1, audio: "./audio/1.mp3"},
    {name: "Войтенко - motivation", author: "Войтенко Игорь", img: "./images/album3.jpg", id: 2, audio: "./audio/2.mp3"},
    {name: "Sluschat Vsem", author: "Schurik", img: "./images/album2.jpg", id: 3, audio: "./audio/3.mp3"},
]

window.onload = function (){
    drawCardsMyTracks("track", myTracks)
    switchWithoutPlayAudio(1)
}

document.body.addEventListener("click", function (event){
    if( event.target && event.target.classList == "playlist") {
        modalPlayList.classList.toggle("modal-background_active")
    };
    if(event.target && event.target.classList == "playlist__play"){
        if(document.getElementById(`${event.target.id}`).src.split("/").at(-1) === "Pause.svg"){
            document.getElementById(`${event.target.id}`).src = './images/svg/Play.svg'
            pauseAudio()
        }else{
            const elements = document.querySelectorAll(".playlist__play")
            elements.forEach(element => {
                element.src = "./images/svg/Play.svg"
            })
            document.getElementById(`${event.target.id}`).src = './images/svg/Pause.svg'
            switchAudio(event.target.id)
        }
    }
    if(event.target && event.target.classList == "player__skip player__skip_prev"){
        const prevId = +localStorage.getItem("currentTrack")
        let currentId = prevId - 1 < 1 ? myTracks.length : prevId - 1
        const elements = document.querySelectorAll(".playlist__play")
        elements.forEach(element => {
            element.src = "./images/svg/Play.svg"
        })
        document.getElementById(`${currentId}`).src = './images/svg/Pause.svg'
        switchAudio(currentId)
    }
    if(event.target && event.target.classList == "player__skip player__skip_next"){
        const prevId = +localStorage.getItem("currentTrack")
        let currentId = prevId + 1 > myTracks.length ? 1 : prevId + 1
        const elements = document.querySelectorAll(".playlist__play")
        elements.forEach(element => {
            element.src = "./images/svg/Play.svg"
        })
        document.getElementById(`${currentId}`).src = './images/svg/Pause.svg'
        switchAudio(currentId)
    }
})

btnOpenPlaylist.addEventListener("click", ()=>{
    modalCreatePlayList.classList.toggle("modal-background_active")
})

btnModalPlayListClose.addEventListener("click", ()=>{
    modalPlayList.classList.remove("modal-background_active");
})

btnModalCreatePlayListClose.addEventListener("click", ()=>{
    modalCreatePlayList.classList.remove("modal-background_active")
})

function switchWithoutPlayAudio(id){
    localStorage.setItem("currentTrack", id)
    const track = myTracks.at(id - 1 )
    audio.src = track.audio
    document.querySelector(".track__img").src = track.img
    document.querySelector(".track-info__name").innerHTML = track.name
    document.querySelector(".track-info__author").innerHTML = track.author
}

function switchAudio(id){
    localStorage.setItem("currentTrack", id)
    const track = myTracks.at(id - 1 )
    audio.src = track.audio
    document.querySelector(".track__img").src = track.img
    document.querySelector(".track-info__name").innerHTML = track.name
    document.querySelector(".track-info__author").innerHTML = track.author
    playAudio()
}

function playAudio() {
    const currentId = +localStorage.getItem("currentTrack")
    btnPlay.classList.remove("play_active")
    btnPause.classList.add("pause_active")
    document.getElementById(`${currentId}`).src = './images/svg/Pause.svg'
    audio.play()
}

function pauseAudio() {
    btnPlay.classList.add("play_active")
    btnPause.classList.remove("pause_active")
    const elements = document.querySelectorAll(".playlist__play")
    elements.forEach(element => {
        element.src = "./images/svg/Play.svg"
    })
    audio.pause()
}

btnPlay.addEventListener("click", () => {
    playAudio()
})

btnPause.addEventListener("click", () => {
    pauseAudio()
})

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    if(!isNaN(duration)){
        const progressPercent = (currentTime / duration) * 100
        playerIndicator.style.width = `${progressPercent}%`
        playerEndTime.innerHTML = `${Math.floor(duration/60)}:${duration%60 > 10 ? Math.floor(duration%60) : `0${Math.floor(duration%60)}`}`
        playerStartTime.innerHTML = `${Math.floor(currentTime/60)}:${currentTime%60 > 10 ? Math.floor(currentTime%60) : `0${Math.floor(currentTime%60)}`}`
    }
}

audio.addEventListener("timeupdate", updateProgress)

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

playerIndicatorWrap.addEventListener("click", setProgress)

btnVolumeOff.addEventListener("click", () => {
    btnVolumeOff.classList.toggle("volume-off_active")
    btnVolumeOn.classList.toggle("volume-on_active")
    localStorage.setItem("volume", audio.volume)
    audio.volume = 0
})

btnVolumeOn.addEventListener("click", () => {
    btnVolumeOff.classList.toggle("volume-off_active")
    btnVolumeOn.classList.toggle("volume-on_active")
    audio.volume = localStorage.getItem("volume")
    localStorage.removeItem("volume")
})

function setVolume(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    volumeIndicator.style.width = `${(clickX / width) * 100}%`
    audio.volume = (clickX / width)
}

volumeIndicatorWrap.addEventListener("click", setVolume)
