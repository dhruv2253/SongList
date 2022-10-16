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

        const songs = Store.getSongs();

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
    static deleteSong(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
            UI.displayAlert("Song removed.", "success");
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
        }

    }

    static displayAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#song-form')
        container.insertBefore(div, form);

        // Leave after 3 sec
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value ='';
        document.querySelector('#artist').value ='';
        document.querySelector('#genre').value ='';
    }
}

// Store class: Storage
class Store {
    static getSongs() {
        let songs;
        if(localStorage.getItem('songs') === null){
            songs = [];
        } else {
            songs = JSON.parse(localStorage.getItem('songs'));
        }
        
        return songs;
    }

    static addSong(song) {
        const songs = Store.getSongs();

        songs.push(song);
        localStorage.setItem('songs', JSON.stringify(songs));
    }

    static removeSong(title, artist, genre) {
        const songs = Store.getSongs();

        songs.forEach((song, index) => {
            if(song.title === title && song.artist === artist && song.genre === genre) {
                songs.splice(index, 1);
            }
        });

        localStorage.setItem('songs', JSON.stringify(songs));
    }
}

// Event: Show song
document.addEventListener('DOMContentLoaded', UI.displaySongs);

// Event: Add song
document.querySelector('#song-form').addEventListener('submit', (e)=> {
    // prevent actual submit
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const artist = document.querySelector('#artist').value;
    const genre = document.querySelector('#genre').value;

    // data validation
    if (title === '' || artist === '' || genre === ''){
        UI.displayAlert("Fill in all fields.", "danger");
    } else {
        // instantiate song
        const song = new Song(title, artist, genre);

        //add the song to the UI display
        UI.addSongToList(song);

        // add the song to local storage
        Store.addSong(song);

        UI.displayAlert("Song added.", "success");
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

        // Clear 
        UI.clearFields();

});


// Event: Remove song
document.addEventListener('click', (e) => {
    // UI remove
    UI.deleteSong(e.target)
    
    // Remove from local storage
    const genre = e.target.parentElement.previousElementSibling.textContent;
    const artist = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    Store.removeSong(title, artist, genre);

});
    
