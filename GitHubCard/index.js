/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

let nathan;
let cards = document.querySelector(".cards");
axios.get("https://api.github.com/users/ConfusionOrb221")
.then(response =>{
  nathan = response;
  cards.appendChild(createCard(nathan));
  axios.get(nathan.data.following_url.replace("{/other_user}", ""))
  .then(following =>{
    following.data.forEach(i=>{
      axios.get(i.url)
        .then(profiles =>{
          cards.appendChild(createCard(profiles));
        })
    })
  })
})
.catch(err =>console.log(err));


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

followersArray.forEach(i =>{
  axios.get(`https://api.github.com/users/${i}`)
  .then(response =>{
    cards.appendChild(createCard(response));
  })
  .catch(err =>{
    console.log(err);
  })
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/


function createCard(gitObject){
  let card = document.createElement("div");
  card.className = "card";

  let img = document.createElement("img");
  img.src = gitObject.data.avatar_url;

  let cardInfo = document.createElement("div");
  cardInfo.className = "card-info";

  let name = document.createElement("h3");
  name.className = "name";
  name.textContent = gitObject.data.name;

  let username = document.createElement("p");
  username.className = "username";
  username.textContent = gitObject.data.login;

  let location = document.createElement("p");
  location.textContent = `Location: ${gitObject.data.location}`;

  let profile = document.createElement("p");
  profile.textContent = "Profile:";

  let profileLink = document.createElement("a");
  profileLink.href = gitObject.config.url;
  profileLink.textContent = gitObject.config.url;
  profile.appendChild(profileLink);

  let followers = document.createElement("p");
  followers.textContent = gitObject.data.followers;

  let following = document.createElement("p");
  following.textContent = gitObject.data.following;

  let bio = document.createElement("p");
  bio.textContent = `Bio: ${gitObject.data.bio}`;

  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  card.appendChild(img);
  card.appendChild(cardInfo);

  return card;
};

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
