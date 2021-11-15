const url = "https://localhost:5001/api/posts";
//const url = "https://cmrozsa-pa4-bigaldatabase-api.herokuapp.com/api/posts";


setGreets = function(tweets)
{
    var html = "<ul>";
    tweets.forEach((tweet) => {    
        html += "<li><div class =\"avatar\"></div><spann>" + tweet.postText + "</spann></li>";
        html += `<input type="text" name="post" id="edit${tweet.postID}" />`;
        html += `<button onclick ="putPost(${tweet.postID})">Edit Post</button>`;
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
    console.log(text);
    fetch(postUrl,{
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            PostText: text,
            Date: new Date().toString(),
            Deleted: 'N'
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
        console.log(json);
        setGreets(json);
    }).catch(function(error){
        console.log(error);
    })
}


function putPost(postID){
    const putPostApiUrl = url +"/"+postID;
    console.log(postID);
    let text = document.getElementById("edit"+postID).value;
    console.log(text)

    fetch(putPostApiUrl,{
        method: "PUT",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            PostText: text
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
