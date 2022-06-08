import {drawCardsArtist, drawCardsMyTracks, drawCardsTraks} from "./drawCard.js";
import {ChartApi} from "./api.js";

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
    {name: "СМУЗИ", author: "The Limba", img: "https://cdnlv.redkassa.ru/live/sitenew/picture/536acba1-e88b-4d1d-b2f9-9a3d1d77fd92", id: 1, audio: "https://cdndl.zaycev.net/track/17688891/b2bwM5ULFXBZhcNnt4mqp4k4gQiaWLeCjnEFKqfNPiM4yPqh28EAb6Mfo3FkHNzPYZgypKoYxVLnjNf4Xoq97nL6ARqm44VUHuFbMvSe54FLcCENQbFwbYtnfywhDnUXzYyp98ysAi4fvazJgKHjK8dETEHtj5erMndYpJNS82nMTQvPcLtum34yqCqGHobbyH9ps3Hf7EwuYp4i1u4BfpSLx9fVDHz7dULbdVzhcyzQRBBunk3fd9BP5ENAa5VPWVJ5qDvvngpGNdYLLsqtQgXGLwGARAvf3Avh76BWKdPFsgnqzayd3bd2mWbEtSwSZizgaz6mv8S9kLQLXj5zZuFmYfBVXu8yz8kHdp25ZZDAbVVb6nB"},
    {name: "МАЛИНОВАЯ ЛАДА", author: "Gayazov$ Brother$", img: "https://i1.sndcdn.com/artworks-TYchmIZvhtB3VOys-eTEhUw-t500x500.png", id: 2, audio: "https://dl2.mp3party.net/online/10202560.mp3"},
    {name: "Baby mama", author: "Скриптонит, Райда", img: "https://cdn.promodj.com/afs/087fbeb0b8233b7d82753860bb2846da12%3Aresize%3A2000x2000%3Asame%3Ad3b874", id: 3, audio: "https://dl2.mp3party.net/online/9339955.mp3"},
]

const btnNavToMyTracks = document.querySelector(".btn-nav_cart")
const btnNavToArtists = document.querySelector(".btn-nav_artists")
const btnNavToTopCart = document.querySelector(".btn-nav_my-tracks")

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
            updateIconInTrack(event.target.id)
            switchAudio(event.target.id)
        }
    }
    if(event.target && event.target.classList == "player__skip player__skip_prev"){
        const prevId = +localStorage.getItem("currentTrack")
        let currentId = prevId - 1 < 1 ? myTracks.length : prevId - 1
        updateIconInTrack(currentId)
        switchAudio(currentId)
    }
    if(event.target && event.target.classList == "player__skip player__skip_next"){
        const prevId = +localStorage.getItem("currentTrack")
        let currentId = prevId + 1 > myTracks.length ? 1 : prevId + 1
        updateIconInTrack(currentId)
        switchAudio(currentId)
    }
    if(event.target && event.target.classList == "btn-nav btn-nav_my-tracks"){
        showPlayer()
        removeCards()
        drawCardsMyTracks("track", myTracks)
    }
    if(event.target && event.target.classList == "btn-nav btn-nav_artists"){
        hiddenPlayer()
        removeCards()
        ChartApi.getTopArtists()
        drawCardsArtist('artists', localStorage.getObject('chart.gettopartists'))
        //drawCardsMyTracks("track", myTracks)
    }
    if(event.target && event.target.classList == "btn-nav btn-nav_cart"){
        hiddenPlayer()
        removeCards()
        ChartApi.getTopTracks()
        drawCardsTraks('track', localStorage.getObject('chart.gettoptracks'))
    }
})

function showPlayer(){
    document.querySelector(".player").style.display = "block"
    document.querySelector(".main").style.margin = "64px 0 128px 0px"
}

function hiddenPlayer(){
    pauseAudio()
    document.querySelector(".player").style.display = "none"
    document.querySelector(".main").style.margin = "64px 0 64px 0px"
}

function removeCards(){
    const cards = document.querySelectorAll(".playlist-wrap")
    cards.forEach(card => {
        card.remove()
    })
}

function setInTracksPlayIcon(){
    const elements = document.querySelectorAll(".playlist__play")
    elements.forEach(element => {
        element.src = "./images/svg/Play.svg"
    })
}

function updateIconInTrack(currentId){
    setInTracksPlayIcon()
    document.getElementById(`${currentId}`).src = './images/svg/Pause.svg'
}

function switchWithoutPlayAudio(id){
    localStorage.setItem("currentTrack", id)
    const track = myTracks.at(id - 1 )
    audio.src = track.audio
    document.querySelector(".track__img").src = track.img
    document.querySelector(".track-info__name").innerHTML = track.name
    document.querySelector(".track-info__author").innerHTML = track.author
}

function switchAudio(id){
    switchWithoutPlayAudio(id)
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
    setInTracksPlayIcon()
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
