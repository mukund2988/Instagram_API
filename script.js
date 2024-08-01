const corsProxy = 'https://cors-anywhere.herokuapp.com/';
function searchUser() {
  const username = document.getElementById("username").value;
  
  const maindiv = document.getElementById("maindiv");
  const url =
    "https://instagram-scraper-api2.p.rapidapi.com/v1/search_users?search_query=" +
    encodeURIComponent(username);

  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader(
    "x-rapidapi-key",
    "Your-Api-Key"
  );
  request.setRequestHeader(
    "x-rapidapi-host",
    "instagram-scraper-api2.p.rapidapi.com"
  );
  request.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      if (response.data && response.data.items) {
        displayUserResults(response.data.items, maindiv);
      } else {
        maindiv.innerText = "No results found.";
      }
    } else {
      maindiv.innerText = "Error fetching data.";
    }
  };
  request.send();
}

function getFollowers() {
  const username = document.getElementById("followers-username").value;
  const followersDiv = document.getElementById("followers-results");
  const url =
    `https://instagram-scraper-api2.p.rapidapi.com/v1/followers?username_or_id_or_url=${encodeURIComponent(username)}`;

  if (!followersDiv) {
    console.error("Followers container not found.");
    return;
  }

  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader(
    "x-rapidapi-key",
    "Your-Api-Key"
  );
  request.setRequestHeader(
    "x-rapidapi-host",
    "instagram-scraper-api2.p.rapidapi.com"
  );
  request.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      if (response.data && response.data.items) {
        displayUserResults(response.data.items, followersDiv);
      } else {
        followersDiv.innerText = "No followers found.";
      }
    } else {
      followersDiv.innerText = "Error fetching data.";
    }
  };
  request.send();
}

function getFollowing() {
  const username = document.getElementById("following-username").value;
  const followingDiv = document.getElementById("following-results");
  const url =
    `https://instagram-scraper-api2.p.rapidapi.com/v1/following?username_or_id_or_url=${encodeURIComponent(username)}`;

  if (!followingDiv) {
    console.error("Following container not found.");
    return;
  }

  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader(
    "x-rapidapi-key",
    "Your-Api-Key"
  );
  request.setRequestHeader(
    "x-rapidapi-host",
    "instagram-scraper-api2.p.rapidapi.com"
  );
  request.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      if (response.data && response.data.items) {
        displayUserResults(response.data.items, followingDiv);
      } else {
        followingDiv.innerText = "No following found.";
      }
    } else {
      followingDiv.innerText = "Error fetching data.";
    }
  };
  request.send();
}

function getPostReels() {
  const username = document.getElementById("post-reels").value;
  const resultsDiv = document.getElementById("show_post-results");
  const url =
    `https://instagram-scraper-api2.p.rapidapi.com/v1.2/posts?username_or_id_or_url=${encodeURIComponent(username)}`;

  if (!resultsDiv) {
    console.error("Results container not found.");
    return;
  }

  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader(
    "x-rapidapi-key",
    "Your-Api-Key"
  );
  request.setRequestHeader(
    "x-rapidapi-host",
    "instagram-scraper-api2.p.rapidapi.com"
  );
  request.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      if (response.data && response.data.items) {
        displayPostReels(response.data.items, resultsDiv);
      } else {
        resultsDiv.innerText = "No posts or reels found.";
      }
    } else {
      resultsDiv.innerText = "Error fetching data.";
    }
  };
  request.send();
}

function displayUserResults(users, container) {
  if (!container) {
    console.error("Container element is null.");
    return;
  }
  
  container.innerHTML = ""; 
  if (users.length === 0) {
    container.innerText = "No users found.";
    return;
  }

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user-result";

    const userInfo = document.createElement("div");
    userInfo.innerHTML = `<strong>${user.full_name || 'No Name'}</strong><br>@${user.username || 'No Username'}`;

    userDiv.appendChild(userInfo);

    container.appendChild(userDiv);
  });
}

function displayPostReels(items, container) {
  if (!container) {
    console.error("Container element is null.");
    return;
  }
  
  container.innerHTML = ""; 

  if (items.length === 0) {
    container.innerText = "No posts or reels found.";
    return;
  }

  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "post-reel-result";

    const media = document.createElement("img");
    media.crossOrigin = "anonymous";	
    media.src = `${corsProxy}${item.thumbnail_url}`; 
    media.alt = item.caption.text || 'No Caption';
    media.style.width = '100%'; 
    media.style.borderRadius = '8px';

    const caption = document.createElement("div");
    caption.innerHTML = `<p>${item.caption.text || 'No Caption'}</p>`;

    itemDiv.appendChild(media);
    itemDiv.appendChild(caption);

    container.appendChild(itemDiv);
  });
}
