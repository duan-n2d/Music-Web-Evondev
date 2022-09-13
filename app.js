const song = document.getElementById('song');
const playButton = document.querySelector('.play-inner');
const nextButton = document.querySelector('.play-forward');
const prevButton = document.querySelector('.play-back');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const rangeBar = document.querySelector('.range');

let isPlaying = false;
let indexSong = 0;
let timer;

const musics = ['TestLoa','EmIu','WalkOnDaStreet','DuaNaoLamEmBuon','NguoiDiBao','MillionDollarBoy'];

displayTimer();
song.setAttribute("src", `./music/${musics[0]}.mp3`);

nextButton.addEventListener('click', () => {
    changeSong(1);
});
prevButton.addEventListener('click', () => {
    changeSong(-1);
});

song.addEventListener("ended", ()=>changeSong(1));
function changeSong(dir){
    if (dir === 1){
        indexSong ++;
        if (indexSong >= musics.length){
            indexSong = 0;  
        }
    } else if (dir === -1){
        indexSong --;
        if (indexSong < 0){
            indexSong = musics.length - 1;
        }
    }
    song.setAttribute("src", `./music/${musics[indexSong]}.mp3`);
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
        timer = setInterval(displayTimer, 500);
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