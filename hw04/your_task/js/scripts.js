const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    url = baseURL + "?type=track&q=" + term + "&limit=5";
    fetch(url)
        .then(response => response.json())
        .then(data => displayTracks(data));
};

const getAlbums = (term) => {
    url = baseURL + "?type=album&q=" + term;
    fetch (url)
        .then(response => response.json())
        .then(data => displayAlbums(data));
};

const getArtist = (term) => {
    url = baseURL + "?type=artist&q=" + term;
    fetch(url)
        .then(response => response.json())
        .then(data => displayArtist(data[0]));
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    // console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};

const displayAlbums = (foundAlbums) => {
    if (foundAlbums[0] == null) {
        document.querySelector('#albums').innerHTML = "no albums found that match your search";
    } else {
        document.querySelector('#albums').innerHTML = " ";
        const lenAlbums = foundAlbums.length;
        for (t=0; t<lenAlbums; t++) {
            template = `<section class="album-card" id="${foundAlbums[t].id}">
                            <div>
                                <img src="${foundAlbums[t].image_url}">
                                <h3>${foundAlbums[t].name}</h3>
                                <div class="footer">
                                    <a href="${foundAlbums[t].spotify_url}" target="_blank">
                                    view on spotify
                                    </a>
                                </div>
                            </div>
                        </section>`;
            document.querySelector('#albums').innerHTML += template;
        }
    }
}

const displayTracks = (foundTracks) => {

    if (foundTracks[0] == null) {
        document.querySelector('#tracks').innerHTML = "no tracks found that match your search";
    } else {
        document.querySelector('#tracks').innerHTML = " ";
        for (const item of foundTracks) {
            template = `<section class="track-item preview" data-preview-track="${item.preview_url}" onclick="playTrack(event);">
                            <img src="${item.album.image_url}">
                            <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h3>${item.name}</h3>
                                <p> ${item.artist.name} </p>
                            </div>
                        </section>`;
            document.querySelector('#tracks').innerHTML += template;
    }
    

}
}

const playTrack = (ev) => {

    const elem = ev.currentTarget;
    const previewURL = elem.dataset.previewTrack;
    console.log(previewURL);
    if (previewURL) {
        audioPlayer.setAudioFile(previewURL);
        audioPlayer.play();
    } else {
        console.log("There is no preview available for this track");
    };
    document.querySelector('footer .track-item').innerHTML = elem.innerHTML;
};

const displayArtist = (art) => {
    if (art == null) {
        document.querySelector('#artist').innerHTML = "no artist found";
    } else {
        template = `<section class="artist-card" id="${art.id}">
                    <div>
                        <img src="${art.image_url}">
                        <h3>${art.name}</h3>
                        <div class="footer">
                            <a href="${art.spotify_url}" target="_blank">
                            view on spotify
                            </a>
                        </div>
                    </div>
                </section>`;

        document.querySelector('#artist').innerHTML = template;
    }
};
