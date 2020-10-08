const searchBtn = document.getElementById("searchBtn"),
  inputWord = document.getElementById("inputWord"),
  resultArea = document.getElementById("resultArea"),
  pagination = document.getElementById("pagination"),
  detailArea = document.getElementById("detailArea");

const API_URL = "https://api.lyrics.ovh";
const playList = {};
async function getList(term) {
  const response = await fetch(`${API_URL}/suggest/${term}`);
  const songs = await response.json();

  showData(songs);
  songs.data.forEach((v) => (playList[v.id] = v.preview));
}

const audio = new Audio();

const showData = (songs) => {
  const nullImage =
    "https://img.icons8.com/ios-glyphs/50/000000/apple-music.png";
  resultArea.querySelector("#results").innerHTML = `
    <ul class="songsList">
      ${songs.data
        .map(
          (song) => `
        <li id="${song.id}">
          <img src=${song.album.cover_small || nullImage} />
          <div class="listSongInfo">
            <e class="artist">${song.artist.name}</e>
            <b class="title">${song.title}</b>
          </div>
          <button class="playBtn">listen</button>
          <button class="showLyricsBtn">lyrics</button>
        </li>`
        )
        .join("")}
    </ul>
  `;
  (songs.next || songs.prev) && makePagenation(songs);
};

async function getNewList(url) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const songs = await response.json();

  showData(songs);
  songs.data.forEach((v) => (playList[v.id] = v.preview));
};

const makePagenation = (songs) => {
  pagination.innerHTML = "";
  songs.prev &&
    (pagination.innerHTML =
      `<button class="prevBtn listBtn">prev</button>` + pagination.innerHTML);
  songs.next &&
    (pagination.innerHTML += `<button class="nextBtn listBtn">next</button>`);

  pagination.addEventListener("click", (e) => {
    e.target.classList.contains("prevBtn") && getNewList(songs.prev);
    e.target.classList.contains("nextBtn") && getNewList(songs.next);
  });
};

async function getLyrics(artist, title) {
  detailArea.querySelector("#songLyrics").innerHTML = "...loading"
  const response = await fetch(`${API_URL}/v1/${artist}/${title}`);
  const data = await response.json();
  detailArea.querySelector("#songLyrics").innerHTML = data.lyrics ? data.lyrics.replace(/(\r\n|\r|\n)/g,"<br>") : data.error;
}

searchBtn.addEventListener("click", (e) => {
  getList(inputWord.value);
});

resultArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("playBtn")) {
    const playBtn = e.target;

    const prevPlaying = document.querySelector(".playing");
    prevPlaying &&
      prevPlaying !== playBtn &&
      prevPlaying.classList.remove("playing");

    playBtn.classList.toggle("playing");

    const id = playBtn.closest("li").id;
    if (playBtn.classList.contains("playing")) {
      audio.src = playList[id];
      audio.play();
    } else audio.src = "";
  }
});

resultArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("showLyricsBtn")) {
    //detailArea.getElementById('songInfo')
    const showLyricsBtn = e.target;

    const artist = showLyricsBtn.closest("li").querySelector(".artist")
        .innerText,
      title = showLyricsBtn.closest("li").querySelector(".title").innerText;

    detailArea.querySelector(
      "#songInfo"
    ).innerHTML = `<e class="detail_artist">${artist}</e><b class="detail_title">${title}</b>`;
    getLyrics(artist, title);
  }
});
