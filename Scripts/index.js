// var tweets = ["Hey, it's Big Al", "Me again", "42-21!!"];

// setGreets = function()
// {
//     var html = "<ul>";
//     tweets.forEach((tweet) => {    
//         html += "<li><div class =\"avatar\"></div><spann>" + tweet + "</spann></li>";
//     })
//     html += "</ul>";
//     document.getElementById("greets").innerHTML = html;
// }

// function handleOnLoad()
// {
//     setGreets();
// }   

// addPost() = function() 
// {
//     let postText = document.getElementById("post").value;
//     tweets.push(postText);
//     setGreets();
// }

// function handleOnSubmit(){
//     addPost();
// }
function handleOnLoad(){
    const postUrl = "https://localhose:5001/api/posts";
    //const postUrl = "https://alumni-video-series-cmrozsa.herokuapp.com/api/person";

    fetch(postUrl).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);//this is the part that changes
        displayTable(json);
    }).catch(function(error){
        console.log(error);
    })
}
//FOR EXAM!!! - first thing to do is to look at the json and make sure I understand it

function displayTable(json){
    var dataTable = document.getElementById("dataTable");
    var html = "<table><tr><th>First Name</th><th>Last Name</th><th>City</th></tr>";
    json.forEach(post => {
        html+=`<tr><td>${post.id}</td><td>${post.post}</td><td>${post.date}</td></tr>`;
    })
    html+="</table>";
    dataTable.innerHTML = html;
}