class Album{
    construktor(Artist,Title,Year){
    this.Artist = Artist;
    this.Title = Title;
    this.Year = Year;
}}



async function fetchContent() {
        
    try { 
     const response = await fetch ('api/Elisa_music');
            
     if (!response.ok){
         throw new Error (`Error for the in fecth function! status: ${response.status}`);
        }
     const albums = await response.json();

     let albumObjects = [];
 
     for (let i = 0; i < albums.length; i++){ 
         const album = new Album(
            album[i].Artist,
            album[i].albumTitle,
            album[i].Year
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
});
