const songs = [
  {
    title: "Bezodbek Oodirov madina",
    src: "music/song1.mp3",
    cover: "images/cover1.jpg",
  },
  {
    title: "Satisfya Song | Fight scene",
    src: "music/song2.mp3",
    cover: "images/cover2.jpg",
  },
  {
    title: "Mashhur Muhammad Siqilma",
    src: "music/song3.mp3",
    cover: "images/cover3.jpg",
  },
];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const musicCount = document.getElementById("music-count");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const volumeValue = document.getElementById("volume-value");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  cover.src = song.cover;
  title.textContent = song.title;
  musicCount.textContent = `Play music ${index + 1} / ${songs.length}`;
  audio.load();
  cover.classList.remove("rotating"); // Yangi qo‘shiq yuklanganda to‘xtatish
  playBtn.innerHTML = "▶️";
}

function playSong() {
  audio.play();
  playBtn.innerHTML = "❚❚";
  cover.classList.add("rotating"); // Rasm aylantirish
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "▶️";
  cover.classList.remove("rotating"); // Rasm to‘xtatish
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
  volumeValue.textContent = Math.round(volume.value * 100);
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

loadSong(currentSong);
