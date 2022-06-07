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
console.log(btnPlay)
const btnVolumeOff = document.querySelector(".volume-off")
const btnVolumeOn = document.querySelector(".volume-on")


btnOpenPlaylist.addEventListener("click", ()=>{
    modalCreatePlayList.classList.toggle("modal-background_active")
})

playlist.addEventListener("click", ()=>{
    modalPlayList.classList.toggle("modal-background_active")
})

btnModalPlayListClose.addEventListener("click", ()=>{
    modalPlayList.classList.remove("modal-background_active");
})

btnModalCreatePlayListClose.addEventListener("click", ()=>{
    modalCreatePlayList.classList.remove("modal-background_active")
})

function playAudio() {
    audio.play()
}

function pauseAudio() {
    audio.pause()
}

btnPlay.addEventListener("click", () => {
    btnPlay.classList.toggle("play_active")
    btnPause.classList.toggle("pause_active")
    playAudio()
})

btnPause.addEventListener("click", () => {
    btnPlay.classList.toggle("play_active")
    btnPause.classList.toggle("pause_active")
    pauseAudio()
})

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    playerIndicator.style.width = `${progressPercent}%`
    playerEndTime.innerHTML = `${Math.floor(duration/60)}:${duration%60 > 10 ? Math.floor(duration%60) : `0${Math.floor(duration%60)}`}`
    playerStartTime.innerHTML = `${Math.floor(currentTime/60)}:${currentTime%60 > 10 ? Math.floor(currentTime%60) : `0${Math.floor(currentTime%60)}`}`
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
