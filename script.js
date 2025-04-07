const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const volumeValue = document.getElementById("volumeValue");

const songs = [
    {name: "oqibat.mp3", title: "oqibat 1"},
    {name: "СейчасМонатик.mp3", title: "СейчасМонатик"},
    {name: "song3.mp3", title: "Track 3"},
];

let songIndex = 0;
let isPlaying = false;

function loading(index) {
    const song = songs[index];
    audio.src = "music/" + song.name;
    title.textContent = song.title;
}

loading(songIndex);

function playSong() {
    isPlaying = true;
    audio.play();
    playBtn.textContent = 'Pause';
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    playBtn.textContent = 'Play';
}

playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loading(songIndex);
    playSong();
});

prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loading(songIndex);
    playSong();
});

audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});


volume.addEventListener("input", () => {
    const vol = volume.value;
    audio.volume = vol / 100;
    volumeValue.textContent = vol;
});

// Foydali funksiya: vaqtni formatlash
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}
