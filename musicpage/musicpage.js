let playlist = document.querySelector('.playlist');
let options = document.querySelector('.options');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let song_title = document.querySelector('.song-title');
let artist_name = document.querySelector('.artist-name')

let seek_slider = document.getElementById('slider');
let total_duration = document.querySelector('.total_duration');
let track_art = document.querySelector('.img_artist');
let curr_track = document.createElement('audio');

let first = document.querySelector('.first')
let second = document.querySelector('.second')
let third = document.querySelector('.third')
let fourth = document.querySelector('.fourth')


function open_p(){
    playlist.classList.toggle('active');
}

function sidebar(){
    options.classList.toggle('active2');
}


let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/rachie4.jpg',
        name : 'Piano Concerto No. 2',
        artist : 'Rachmaninoff',
        music : 'music/Rachmaninoff_Piano_Concerto_2.mp3'
    },
    {
        img : 'images/rachi5.jpg',
        name : 'Etude Tableau Op. 39 No. 6',
        artist : 'Rachmaninoff',
        music : 'music/Rachmaninoff - Little Red Riding Hood (Etude Tableau Op. 39 No. 6).mp3'
    },
    {
        img : 'images/rachie1.jpg',
        name : 'Prelude in C Sharp Minor Op. 3 No. 2',
        artist : 'Rachmaninoff',
        music : 'music/onlymp3.to - Rachmaninoff Prelude in C Sharp Minor Op. 3 No. 2 -sCtixpIWBto-192k-1699558538.mp3'
    },
    {
        img : 'images/rachie3.jpg',
        name : 'Moment Musicaux No. 4',
        artist : 'Rachmaninoff',
        music : 'music/Rachmaninoff - Moment Musicaux No. 4.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    document.querySelector(".img_artist").src = music_list[track_index].img;
    console.log("done");
    //track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    song_title.innerHTML = music_list[track_index].name;
    //track_name.textContent = music_list[track_index].name;
    artist_name.innerHTML = music_list[track_index].artist;
    //track_artist.textContent = music_list[track_index].artist;
    //now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    var children = playlist.children;
    Array.from(children).forEach(child => child.classList.remove('playing'));

    if(track_index === 0){
        first.classList.add('playing');
    } else if(track_index === 1){
        second.classList.add('playing');
    } else if(track_index === 2){
        third.classList.add('playing');
    } else if(track_index === 3){
        fourth.classList.add('playing');
    }

    updateTimer = setInterval(setUpdate, 500);

    curr_track.addEventListener('ended', nextTrack);
}





function reset(){
    total_duration.innerHTML = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = `<i class='bx bx-pause'></i>`;
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = `<i class='bx bx-play'></i>`;
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        //curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.innerHTML = currentMinutes + ":" + currentSeconds;
    }
}
