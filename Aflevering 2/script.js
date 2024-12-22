
//Konstrukter funktion som skaber album objekter
function Album(genre, name, artist, website, year, trackList) {
    this.genre = genre;
    this.name = name;
    this.artist = artist;
    this.website = website;
    this.year = year;
    this.trackList = trackList;
}

//Magisk formular
async function fetchContent(url) {
  const response = await fetch(url);
  const albums = await response.json();

  //Deklaration af en tom array til at gemme album-objekter
  let albumObjects = [];

    //Et for-loop, som indlæser JSON filen og henter informationen
    for (let i = 0; i < albums.length; i++) {
        const album = new Album(
            albums[i].genre,
            albums[i].albumName,
            albums[i].artistName,
            albums[i].artistWebsite,
            albums[i].productionYear,
            albums[i].trackList
        );
     //Tilføjer album-objekterne til albumObjects-arrayet
     albumObjects.push(album);
     }

 //Returner album-objekterne
  return albumObjects;
};


 //Funktion til at vise albuminformation på hjemmesiden
 function displayAlbums(albumObjects) {
    //Definerer albumList til id´et 'album-list'
    const albumList = document.getElementById('album-list');

    //For-loop gennem arrayet af album-objekter
    for (let i = 0; i < albumObjects.length; i++) {
        const album = albumObjects[i];
        
        //Opret et nyt div-element med klassen 'album' til at holde albuminformation
        const albumDiv = document.createElement('div');
        albumDiv.classList.add('album');

        //Tilføj albuminformationen til 'albumDiv', lavet med innerhtml
        albumDiv.innerHTML = 
            '<h2>' + album.name + '</h2>' +
            '<p>Artist: <a href="' + album.website + '" target="_blank">' + album.artist + '</a></p>' +
            '<p>Production year: ' + album.year + '</p>' +
            '<p>Genre: ' + album.genre + '</p>' +
            '<p>Number of Tracks: ' + album.trackList.length + '</p>';

        //Definere tracklistDiv-elementet til at have information om tracks
        const tracklistDiv = document.createElement('div');
        tracklistDiv.classList.add('tracklist');

        //For-loop gennem trackList-arrayet for information om tracks, lavet med elementer og class
        for (let i = 0; i < album.trackList.length; i++) {
            const track = album.trackList[i];
            //Laver en paragraf i html
            const trackP = document.createElement('p');
            trackP.classList.add('track');
            //Tilføjer information om tracks og udskriver det
            trackP.textContent = 
                track.trackNumber + '. ' + track.trackTitle + ' (' + track.trackTimeInSeconds + 's)';
            tracklistDiv.appendChild(trackP);
        }

        //Opret et knap-element til at skifte mellem tracks
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('toggle-btn');
        toggleBtn.textContent = 'Show tracklist';

        //Tilføj eventlistener til at skifte tracklistens synlighed, når der klikkes på knappen
        toggleBtn.addEventListener('click', function() {
            const visible = tracklistDiv.style.display === 'block';
            tracklistDiv.style.display = visible ? 'none' : 'block';
            toggleBtn.textContent = visible ? 'Show tracklist' : 'Hide tracklist';
        });

        //Tilføjer knappen og tracklisten til albumDiv, og albumDiv til albumList
        albumDiv.appendChild(toggleBtn);
        albumDiv.appendChild(tracklistDiv);
        albumList.appendChild(albumDiv);
    }
}

//Sørger for at dataet bliver loaded
document.addEventListener("DOMContentLoaded", async function() {
    const albums = await fetchContent('./albums.json');
    if (albums) {
        displayAlbums(albums);
    }
});
