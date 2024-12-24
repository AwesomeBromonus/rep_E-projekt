class Album{
    constructor(Artist,Title,Year){
    this.Artist = Artist;
    this.Title = Title;
    this.Year = Year;
}}



async function fetchContent() {
    const response = await fetch ('/api/Elisa_music');
    
        
    try { 
     
            
     if (!response.ok){
         throw new Error (`Error for the in fecth function! status: ${response.status}`);
        }
     
     const albums = await response.json();
     let albumObjects = [];
 
     for (let i = 0; i < albums.length; i++){ 
         const album = new Album(
            albums[i].artist,
            albums[i].title,
            albums[i].year
        );
    
        albumObjects.push(album)
     }; 
    

 return albumObjects;

} catch (error) {
    console.error("error fetching albums:", error);
    return[];
            
}

};

fetchContent()
.then(albumObjects =>{
console.log(albumObjects);
})
.catch(error => {
    console.error("Error in fetchContent promise:", error);
});

function displayAlbums(albumObjects){
    
    const albuminformation = document.getElementById('albuminformation');
    
    

    for(let j = 0; j < albumObjects.length;j++) {
        const album = albumObjects[j];

        const albumDiv = document.createElement('div');
        
       

        albumDiv.innerHTML = 
            '<h2>' + album.Title + '</h2>'+
            '<h3>' + album.Artist + '</h3>'+
            '<h3>' + album.Year + '</h3>' +
            '<a src = "/Elisa-chapter2.jpg"'+'<a>'+
            albuminformation.appendChild(albumDiv);
    }
   
};

document.addEventListener("DOMContentLoaded", async function() {
    const albums = await fetchContent();
    if (albums.length > 0) {
        displayAlbums(albums);
    } else {
        console.warn("No albums found.");
    }
   
});
