const username = document.getElementById("username");
const maindiv = document.getElementById("maindiv");

function searchUser() {
  const url ="https://instagram-scraper-api2.p.rapidapi.com/v1/search_users?search_query=" +username.value;
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("x-rapidapi-key","your-api-key");
  request.setRequestHeader("x-rapidapi-host","instagram-scraper-api2.p.rapidapi.com");
  request.onload = callBackResponse;
  request.send();
}

function callBackResponse() {
  maindiv.innerText = this.responseText;
}
