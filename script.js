const username = document.getElementById("username");
const maindiv = document.getElementById("maindiv");

function searchUser() {
  const url ="https://instagram-scraper-api2.p.rapidapi.com/v1/search_users?search_query=" +username.value;
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("x-rapidapi-key","65a75442e0mshba2d2bc0555706ep15a1e8jsn8e32cab806c7");
  request.setRequestHeader("x-rapidapi-host","instagram-scraper-api2.p.rapidapi.com");
  request.onload = callBackResponse;
  request.send();
}

function callBackResponse() {
  maindiv.innerText = this.responseText;
}
