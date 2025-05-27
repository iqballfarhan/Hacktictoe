//========== ambil data resultHistory dari sessionStorage
// output: array of object
// apabila belum ada game maka akan mereturn array kosong []
// struktur array of object output:
/*
[
  { 
    players: ['playerA', 'playerB'],
    result: 'playerA', <-- ini berarti playerA pemenang
  }, 
  {
    players: ['playerA', 'playerB'],
    result: 'draw', <-- ini berarti draw
  },
  {
    players: ['playerA', 'playerB'],
    result: 'playerB', <-- ini berarti playerB pemenang
  },
]
*/
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("player");
  const volumeSlider = document.getElementById("volumeSlider");

  // Restore previous volume + Init volume
  const savedVolume = localStorage.getItem("audioVolume");
  audio.volume = savedVolume !== null ? parseFloat(savedVolume) : 0.2; // diganti ke 0.2 default karena takut pengguna headset meledak telinganya awokawokwaokwa
  volumeSlider.value = audio.volume;

  // Restore previous playback position
  const savedTime = localStorage.getItem("audioTime");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // workaround browser yang ga bisa autoplay (cth: chrome)
  document.body.addEventListener("click", function playAudio() {
    console.log("music start");
    audio.play().catch((err) => console.warn("Playback prevented:", err));
    document.body.removeEventListener("click", playAudio);
  });
  // Restore play state
  if (localStorage.getItem("isPlaying") === "true") {
    audio.play().catch((err) => console.warn("Audio playback prevented:", err));
  }

  // Save play state, playback position, and volume
  audio.addEventListener("timeupdate", () => {
    localStorage.setItem("audioTime", audio.currentTime);
  });
  audio.onplay = () => localStorage.setItem("isPlaying", "true");
  // audio.onpause = () => localStorage.setItem("isPlaying", "false"); // karena pause button tidak ada, saya commentin aja line ini --ferdi
  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    localStorage.setItem("audioVolume", audio.volume);
  });
});

function getResultHistory() {
  const resultHistory =
    JSON.parse(sessionStorage.getItem("resultHistory")) || [];

  return resultHistory;
}

console.log(getResultHistory());
