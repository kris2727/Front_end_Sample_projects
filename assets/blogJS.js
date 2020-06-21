
var fontindex = 0;
var styleindex = 0;
var serverURI = 'http://localhost:9000';


function fontResize() {
  var ptags = document.getElementsByTagName("p");

  var fontnamesize;
  if (fontindex == 0) {
    fontnamesize = "26px";
    fontindex++;
  }
  else if (fontindex == 1) {
    fontnamesize = "36px";
    fontindex++;
  }
  else if (fontindex > 1) {
    fontnamesize = "16px";
    fontindex = 0;
  }
  for (var j in ptags) {
    ptags[j].style.fontSize = fontnamesize;

  }

}

function changeImage(num) {
  if (num == 1) {
    document.getElementById("blogimage").src = "imgs/pic1.jpg";
  }
  if (num == 2) {
    document.getElementById("blogimage").src = "imgs/pic2.jpg";
  }
  if (num == 3) {
    document.getElementById("blogimage").src = "imgs/pic3.jpg";
  }

}
var myIndex = 0;
var doSliding = 0;

function carousel() {
  if (doSliding == 0) {
    var i;
    var x = document.getElementsByClassName("blogSlide");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 3000); // Change image every 2 seconds
  }
}

function stopSlides() {
  doSliding = 1;
}
function startSlides() {
  doSliding = 0;
  carousel();
}

function changeStyle() {
  if (styleindex == 0) {
    //document.body.style.backgroundImage = 'imgs/blue.jpg';
    document.body.style.backgroundImage = "url('../imgs/blue.jpg')";
    styleindex++;
  }
  else {
    styleindex = 0;
    document.body.style.backgroundImage = "url('../imgs/yellow.jpg')";
  }
}

function savePost() {

  postName = document.getElementById("postName").value;
  postText = document.getElementById("postText").value;
  //alert(postText + postText);

  console.log(postText);
  console.log(postName);
  if (postText != "" && postName != "") {
    axios.post(serverURI + '/post',
      {
        //console.log("i am inside post")
        'postHEAD': postName,
        'postSECTION': postText
      })
      .then((response) => {
        if (response.error != "") {
          console.log(response.data);
          document.getElementById('status').innerHTML = "inserted successfully";
        }
        else {
          document.getElementById('status').innerHTML = "insertion FAILED";
        }
      })
      .catch((connectionError) => {
        console.log(connectionError);
        document.getElementById('status'.innerHTML = connectionError);
      })
  }
  return false;
}

function updatePost() {

  postID   = document.getElementById("postID").value;
  postName = document.getElementById("postName").value;
  postText = document.getElementById("postText").value;
  //alert(postText + postText);

  console.log(postText);
  console.log(postName);
  if (postID != "" && postText != "" && postName != "") {
    axios.post(serverURI + '/updatePost',
      {
        //console.log("i am inside post")
        'id' : postID,
        'postHEAD': postName,
        'postSECTION': postText
      })
      .then((response) => {
        if (response.error != "") {
          console.log(response.data);
          document.getElementById('status').innerHTML = "updated the record successfully";
        }
        else {
          document.getElementById('status').innerHTML = "UPDATE FAILED";
        }
      })
      .catch((connectionError) => {
        console.log(connectionError);
        document.getElementById('status'.innerHTML = connectionError);
      })
  }
  return false;
}

function deletePost(id) {

  var postID   = id;
 
  //alert(postText + postText);

  
  if (postID != "" ) {
    axios.post(serverURI + '/deletePost',
      {
        //console.log("i am inside post")
        'id' : postID,
        
      })
      .then((response) => {
        if (response.error != "") {
          console.log(response.data);
          document.getElementById('status').innerHTML = "deleted the record successfully";
        }
        else {
          document.getElementById('status').innerHTML = "DELETE FAILED";
        }
      })
      .catch((connectionError) => {
        console.log(connectionError);
        document.getElementById('status'.innerHTML = connectionError);
      })
  }
  return false;
}

function checkfile() {
var file = document.getElementById('txtfile');

if(file.value != ""){
  var ext = file.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case 'txt':
      //alert('Allowed');
      document.getElementById('status').innerHTML = "";
      break;
    default:
      document.getElementById('status').innerHTML = "File type not allowed";
      document.getElementById('txtfile').value = "";
  }
}
}