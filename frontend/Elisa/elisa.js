function Album(Artist,Title,Year){
    this.Artist = Artist;
    this.Title = Title;
    this.Year = Year;
}



async function fetchContent(albums) {
    const album = await fetch ('api/Elisa_music'){
       


 let albumObjects = [];
 
 for (let i = 0; i < album.length; i++)
    { 
        const album = new Album(
            album[i].Artist,
            album[i].albumTitle,
            album[i].Year
        );
    
     albumObjects.push(album)
    } 
    
 return albumObjects;

};

console.log(album)
console.log(albumObjects);
