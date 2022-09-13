const song = document.getElementById('song');
const playButton = document.querySelector('.play-inner');
const nextButton = document.querySelector('.play-forward');
const prevButton = document.querySelector('.play-back');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const rangeBar = document.querySelector('.range');
const musicName = document.querySelector('.music-name');
const musicImage = document.querySelector('.music-thumb img');
const playRepeat = document.querySelector(".repeat");

let isPlaying = false;
let indexSong = 0;
let timer;
let isRepeat = false;
let repeatCount = 0;

const db = [
    {
        "_id": 0,
        "name": "Test Loa",
        "file": "TestLoa.mp3",
        "image": "TestLoa.png"
    },
    {
        "_id": 1,
        "name": "Đứa nào làm em buồn",
        "file": "DuaNaoLamEmBuon.mp3",
        "image": "DuaNaoLamEmBuon.jpg"
    },
    {
        "_id": 2,
        "name": "Em iu",
        "file": "EmIu.mp3",
        "image": "EmIu.jpg"
    },
    {
        "_id": 3,
        "name": "Million Dollar Boy",
        "file": "MillionDollarBoy.mp3",
        "image": "MillionDollarBoy.jpg"
    },
    {
        "_id": 4,
        "name": "Người Đi Bao",
        "file": "NguoiDiBao.mp3",
        "image": "NguoiDiBao.jfif"
    },
    {
        "_id": 5,
        "name": "Walk On Da Street",
        "file": "WalkOnDaStreet.mp3",
        "image": "WalkOnDaStreet.jfif"
    }
]

nextButton.addEventListener('click', () => {
    changeSong(1);
});

prevButton.addEventListener('click', () => {
    changeSong(-1);
});

playRepeat.addEventListener('click', () => {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute("style");
    } else {
        isRepeat = true;
        playRepeat.style.color = "#ffb86c";
    }
});

song.addEventListener("ended", ()=>{
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
        isPlaying = false;
        playPause();
    } else {
        changeSong(1);
    }
});

function changeSong(dir){
    if (dir === 1){
        indexSong ++;
        if (indexSong >= db.length){
            indexSong = 0;  
        }
    } else if (dir === -1){
        indexSong --;
        if (indexSong < 0){
            indexSong = db.length - 1;
        }
    }
    init(indexSong);
    isPlaying=false;
    playPause();
}

playButton.addEventListener('click', playPause);
function playPause() {
    if (isPlaying) {
        song.pause();
        isPlaying = false;
        playButton.innerHTML = '<ion-icon name="play"></ion-icon>';
        clearInterval(timer);
    } else {
        song.play();
        isPlaying = true;
        playButton.innerHTML = '<ion-icon name="pause"></ion-icon>';
        timer = setInterval(displayTimer, 100);
    }
}

function displayTimer(){
    const {duration, currentTime} = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);

    if (!duration){
        duration.textContent = "00:00";

    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(time){
    const minitues = Math.floor(time / 60);
    const seconds = Math.floor(time -minitues * 60);
    return `${minitues < 10 ? "0"+minitues: minitues}:${seconds < 10 ? "0"+seconds: seconds}`;
}

rangeBar.addEventListener('change',handleChangeBar);
function handleChangeBar(){
    song.currentTime = rangeBar.value;
}

function init(indexSong){
    song.setAttribute("src", `./music/${db[indexSong].file}`);
    musicImage.setAttribute("src", `./img/${db[indexSong].image}`);
    musicName.textContent = db[indexSong].name;
}

displayTimer();
init(indexSong);
