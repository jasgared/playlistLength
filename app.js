const apiKey = "your_key_here";
const playlistId = "PLB03EA9545DD188C3";


function getLength(e) {
    let url = "https://www.googleapis.com/youtube/v3/playlistItems?" +
                "part=snippet,contentDetails" +
                "&maxResults=50" +
                "&playlistId=" + playlistId +
                "&key=" + apiKey;
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        return data.items.map(function (playListItems) {
            return {
                videoId: playListItems.contentDetails.videoId,
                playListItems: playListItems
            }
        })
    }).then(function(arr) {
        showDetails(arr);
    }).then(function(error){
        console.log("Error: " + error);
    })
}

function showDetails(data) {
    data.forEach(function(video){
        console.log(video.videoId);
    })
}
