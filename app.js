// Song Class: A song
class Song {
    constructor(title, artist, genre) {
        this.title = title;
        this.artist = artist;
        this.genre = genre;
    }
}


// UI class: UI tasks
class UI {
    static displaySongs() {
        const storedSongs = [
            {
                title: "Song Name",
                artist: "Artist Name",
                genre: "genre"
            },

            {
                title: "Song Name",
                artist: "Artist Name",
                genre: "genre"
            }
        ];

        const songs = storedSongs;

        songs.forEach((song) => UI.addSongToList(song));
     
    }
    static addSongToList(song){
        const list = document.getElementById('song-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${song.title}</td>
        <td>${song.artist}</td>
        <td>${song.genre}</td>
        <td><a href="#" class="btn btn-danger delete btn-sm">Remove</a></td>
        `
        list.appendChild(row);

    }

    static clearFields() {
        document.querySelector('#title').value ='';
        document.querySelector('#artist').value ='';
        document.querySelector('#genre').value ='';
    }
}

// Store class: Storage

// Event: Show song
document.addEventListener('DOMContentLoaded', UI.displaySongs);

// Event: Add song
document.querySelector('#song-form').addEventListener('submit', (e)=> {
    // prevent actual submit
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const artist = document.querySelector('#artist').value;
    const genre = document.querySelector('#genre').value;

    // instantiate song
    const song = new Song(title, artist, genre);

    //add the song to the UI display
    UI.addSongToList(song);

    // Clear 
    UI.clearFields();
});



// Event: Remove song