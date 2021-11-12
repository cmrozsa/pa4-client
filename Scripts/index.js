//const url = "https://localhost:5001/api/posts";
const url = "https://cmrozsa-pa4-bigaldatabase-api.herokuapp.com/api/posts";


setGreets = function(tweets)
{
    var html = "<ul>";
    tweets.forEach((tweet) => {    
        html += "<li><div class =\"avatar\"></div><spann>" + tweet.postText + "</spann></li>";
        html += `<button onclick ="putPost(${tweet.postID})">Edit Post</button>`;
        html += `<input type="text" name="post" id="edit${tweet.postID}" />`;
        html += `<button onclick ="removePost(${tweet.postID})">Delete Post</button>`;
        html += `<hr></hr>`;
    })
    html += "</ul>";
    document.getElementById("greets").innerHTML = html;
}


function addPost()
{
    const postUrl = url;
    let text = document.getElementById("post").value;
    fetch(postUrl,{
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            Text: text
        })
    })
    .then((response)=>{
        console.log(response);
        handleOnLoad();
    })
}
    

function handleOnSumbit(){
    addPost();
}

function handleOnLoad(){
    const postUrl = url;

    fetch(postUrl).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);//this is the part that changes
        setGreets(json);
    }).catch(function(error){
        console.log(error);
    })
}


// function displayTable(json){
//     var dataTable = document.getElementById("dataTable");
//     var html = "<table><tr><th>ID</th><th>Post</th><th>Date</th></tr>";
//     json.forEach(post => {
//         html+=`<tr><td>${post.postID}</td><td>${post.postText}</td><td>${post.date}</td></tr>`;
//     })
//     html+="</table>";
//     dataTable.innerHTML = html;
// }


function putPost(text){
    const putPostApiUrl = url +"/"+text;
    const postText = document.getElementById("edit"+text).value;
    console.log(text)

    fetch(putPostApiUrl,{
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            Text: postText
        })
    })
    .then((response)=>{
        console.log(response);
        handleOnLoad();
    })
}

function removePost(postID){
    const deletePostUrl = url+"/"+postID;

    fetch(deletePostUrl,{
        method: "DELETE",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
    })
    .then((response)=>{
        console.log(response);
        handleOnLoad();
    })

}
