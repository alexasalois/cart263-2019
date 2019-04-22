"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let $avatar;
let enemy = [];
let projectiles = [];

let $blogPost;
let $textInput;

let $name;
let $profile;

let numberOfComments;

let username;
let password;
let friends = 200;
let influence = 150;
let ranking= 57625;

let loveCounter = 0;

let positiveWord = 0;
let negativeWord = 0;
let positiveVerb = 0;
let negativeVerb = 0;

let positive = 0;
let negative = 0;

let $approvedWords = 0;
let $availablePositiveVerbs = [
  "love",
  "like",
  "adore",
  "admire",
  "amaze",
  "amazes",
  "amazed",
  "praise",
  "appreciate",
  "approve",
  "celebrate",
  "cherish",
  "enjoy",
  "accomplish",
  "accomplished",
  "accept",
  "dedicate",
  "dedicated",
  "encourage",
  "respect",
  "help",
  "support"
]

let $availableNegativeVerbs = [
  "hate",
  "dislike",
  "loathe",
  "kill",
  "murder",
  "refuse",
  "torture",
  "reject",
  "ashamed",
  "grossed out",
  "repulsed",
  "assault",
  "abuse",
  "threaten",
  "unwelcome",
  "get rid of",
  "rape",
  "violate",
  "strangle",
  "hurt",
  "punish",
  "imprison"
]

let $availablePositiveWords = [
  "dogs",
  "cats",
  "people",
  "immigrants",
  "family",
  "friends",
  "teachers",
  "rights",
  "equality",
  "feminism",
  "environment",
  "planet",
  "ocean",
  "animals",
  "humanitarians",
  "humans",
  "women",
  "men",
  "puppies",
  "kittens",
  "Starbucks",
  "ice caps",
  "school",
  "chocolate",
  "candy",
  "veganism",
  "vegan",
  "vegetarian",
  "democracy",
  "democrat",
  "pizza",
  "fast food",
  "guns",
  "Apple",
  "iPhones"
]

let $availableNegativeWords = [
  "video games",
  "nazi",
  "liars",
  "racists",
  "terrorists",
  "evildoers",
  "kidnappers",
  "bullies",
  "homophobes",
  "murderers",
  "repulsive",
  "nasty",
  "fuck",
  "ugly",
  "gross",
  "disgusting",
  "murder",
  "kill",
  "pain",
  "should be ashamed",
  "torture",
  "deported",
  "filthy",
  "annoying",
  "awful",
  "reject",
  "loser",
  "atheists",
  "periods",
  "offensive",
  "illegal",
  "drugs",
  "weed",
  "sex"
]

let $positiveComments = [
  "Omg queen",
  "Woah #powerful",
  "So true!!!!!",
  "Honestly same",
  "You are so right!!",
  "totally agree.",
  "SAY IT LOUDER FOR THE PEOPLE IN THE BACK",
  "Yessssssss thank you",
  "DAMN. u right",
  "Sharing this!!!!",
  "I wish I could like this post twice.",
  "so relatable",
  "You are amazing",
  "omg i love you",
  "you're awesome!!",
  "Such a good message.",
  "Well said.",
  "FINALLY someone says it",
  "This is great.",
  "Everyone needs to hear this.",
  "about time someone said it",
  "THANK YOU!!!!!",
  "I thought i was alone thinking that!!",
  "Inspiring",
  "Wow, hadn't even thought of that. GENIUS",
  "This is why freedom of speech exists"
]

let $negativeComments = [
  "Wtf?",
  "This is troubling...",
  "Why would you say that?",
  "what's wrong with you",
  "WOAH you really went there.",
  "shut the fuck up",
  "gtfo",
  "Honestly you need to stop.",
  "Reporting this.",
  "You are immature.",
  "How could you say that",
  "You're fucked.",
  "you need to stop right now",
  "what the actual",
  "I can't",
  "How is this allowed",
  "SHUT UP",
  "This is so stupid.",
  "can everyone report this pls thx",
  "...says the priviliged.",
  "You have problems wtf",
  "THINK before you TYPE. god this is ridiculous",
  "nobody cares about your worthless opinion",
  "You disgust me",
  "get help. NOT OKAY",
  "how the hell could you even say that???"
]

$(document).ready(function() {
  $("#mainpage").css("display","none");
  $("#btnConnect").on("click",login);
  $("#avatar").css("display","none");
});

function login() {
  // what the game does when you begin! displays log in screen, then runs the main events
  if ($("#usernameInput").val() != "" && $("#passwordInput").val() != "") {
    username = $("#usernameInput").val();
    password = $("#passwordInput").val();
    $("#mainpage").css("display","block");
    $("#login").css("display","none");

    displayStats();
    displayName();
    playMusic();
    startMiniGame();
  }
}

function displayName() {
  // welcome the user with the personalized username
  $name = "<h4 id='welcomeMessage'> Welcome "+username+"!</h4>";
  $('body').prepend($name);
}

function displayStats() {
  // show influence of the profile, and display it
  $profile = "<div id='stats'> Friends: "+friends+" Influence Points: "+influence+" Ranking: "+ranking+"</h4>";

  // if the stats are already displayed, remove them before adding the updated ones...
  if ($("#stats").length) {
    $("#stats").remove();
    $('body').prepend($profile);
  }

  // else don't do anything...
  else {
    $('body').prepend($profile);
  }
}

function alertMessages() {
  alert("Uh-oh! Looks like you have no friends who want to talk to you in real life. Whoops!");
}

function alertGroups() {
  alert("Awww, you are not part of any groups. Looking for attention isn't really a squad.");
}

function alertEvents() {
  alert("No plans for you this weekend. Well actually, nothing you were invited to.");
}

function alertMarketplace() {
  alert("I don't think you need to buy stuff again. Always want more, never enough, isn't it?");
}

function alertRanking() {
  alert("No matter what the ranking is V.S. your other followers, I don't think you'll ever be satisfied.");
}

// function that suggests the available words and checks all the words to make sure it is okay to post
function checkWords() {
  $approvedWords = 0;
  let str = $("#textInput").val();

  // split the blog post to check every word individually
  let blogWords = str.split(" ");

  // go through the blog post and check every word to see if it corresponds to any of the available arrays
  for (let i=0; i<blogWords.length; i++) {
    for (let cpt=0; cpt<$availablePositiveVerbs.length && $availableNegativeVerbs.length && $availablePositiveWords.length && $availableNegativeWords.length; cpt++) {

        switch(blogWords[i]) {

          // if it's positive verb, count it as plus one
          case $availablePositiveVerbs[cpt].toLowerCase():
            positiveVerb+=1;
          break;

          // if it's negative verb, count it as a negative plus one
          case $availableNegativeVerbs[cpt].toLowerCase():
            negativeVerb+=1;
          break;

          // if it's positive word, plus one
          case $availablePositiveWords[cpt].toLowerCase():
            positiveWord+=1;
          break;

          // if it's negative word, plus one
          case $availableNegativeWords[cpt].toLowerCase():
            negativeWord+=1;
          break;
        }
      }
    }

    // after checking the value of the words, generate the post
    // check if sentence is negative or positive!
    if (negativeVerb >= 1 && positiveWord >=1) {
      negative+=1;
    }

    else if (negativeVerb >= 1 && negativeWord >=1) {
      positive+=1;
    }

    else if (positiveVerb >= 1 && negativeWord >=1) {
      negative+=1;
    }

    else if (positiveVerb >= 1 && positiveWord >=1) {
      positive+=1;
    }
    writePost();
  }

// Writing the post: creates a div with the post and check if its mostly positive or negative
function writePost() {
  $textInput = $("#textInput").val();
  $blogPost = "<div class='posts'>"+$textInput+"</div>";
  // document.getElementById("displayPost").innerHTML = $blogPost;
  $("#blogPosts").prepend($blogPost);
  $("#textInput").val('');
  responsiveVoice.speak($textInput,'UK English Male');
  checkLove();
}

// if its positive, add 1 to the love counter (checks your influence), if negative, minus one
function checkLove() {
  if (positive >= 1) {
    loveCounter+=1;
  }

  else if (negative >= 1) {
    loveCounter-=1
  }

   // if your reputation is good, people like what you post (no matter what...)
   if (loveCounter > 0) {
     positiveResponse();
   }

   // if your reputation is bad, people dismiss you (no matter what...)
   else if (loveCounter < 0) {
     negativeResponse();
   }

  // reset the positive and negative counters
  positive = 0;
  negative = 0;
  positiveVerb = 0;
  positiveWord = 0;
  negativeWord = 0;
  negativeVerb = 0;

  // Update the counter of influence... multiply responses based on reception of blog entry
  updateLove();
}

// when a post is considered positive, people are happy and comments pop up
function positiveResponse() {
  friends = friends+50;

  if (ranking-10500 > 1) {
    ranking = ranking-10500;
  }

  influence = influence+50;

  displayStats();

  let numberOfComments = Math.floor(Math.random()*3)+2;
  let positivePosts;
  let positionTop;
  let positionLeft;

  // loop to generate random comments from the specific list of positive options
  for (let i=0; i <= numberOfComments; i++) {
   positivePosts = "<div id ='comment"+i+"' class = 'comment'>"+$positiveComments[Math.floor(Math.random()*$positiveComments.length)]+"</div>";

   // display the comments randomly in the window
   $("#comments").prepend(positivePosts);
   positionTop = Math.floor(Math.random()*700)+0;
   positionLeft = Math.floor(Math.random()*1250)+0;

   $("#comment"+i).css("top", positionTop);
   $("#comment"+i).css("left", positionLeft);
 }
}

// when a post is considered negative, people are not happy with you and comment about it
function negativeResponse() {
  if (friends-20 > 1) {
    friends = friends - 20;
  }

  ranking = ranking+500;
  influence = influence-50;

  displayStats();


  numberOfComments = Math.floor(Math.random()*3)+2;
  let negativePosts;
  let positionTop;
  let positionLeft;

  // loop to generate a few comments from the list of negative options
  for (let i=0; i <= numberOfComments; i++) {
   negativePosts = "<div id ='comment"+i+"' class = 'comment'>"+$negativeComments[Math.floor(Math.random()*$negativeComments.length)]+"</div>";

   // display the comments randomly
   $("#comments").prepend(negativePosts);
   positionTop = Math.floor(Math.random()*700)+0;
   positionLeft = Math.floor(Math.random()*1250)+0;

   $("#comment"+i).css("top", positionTop);
   $("#comment"+i).css("left", positionLeft);
 }
}

function updateLove() {
  if (loveCounter > 5 && loveCounter < 10) {
    friends = friends*2;
    ranking = 1;
    numberOfComments = numberOfComments*2;
    alert("Wow! One of the top influencers! Nice!");
  }

  else if (loveCounter >= 10 && loveCounter < 15) {
    loveCounter+=1;
    friends = 9999999999999999;
    influence = 9999999999999999;
    $("#textInput").val('POSITIVE POSITIVE POSITIVE POSITIVE POSITIVE POSITIVE POSITIVE POSITIVE POSITIVE');
    alert("POSITIVITY! It's what the people want.")
  }

  else if (loveCounter >= 15) {
    $("#textInput").remove();
    $( "#postBtn" ).on( "click", distortedPositivity);
  }

  if (loveCounter < -5 && loveCounter > -10) {
    loveCounter-=1;
    numberOfComments = numberOfComments*5;
    ranking = 999999999999;
    friends = 0;
    $("#textInput").val('YOU SHOULD BE ASHAMED.');
    alert("Think before you type. You don't know who could be listening. ");
  }

  if (loveCounter <= -10) {
    numberOfComments = numberOfComments*10;
    $("#textInput").remove();
    $( "#postBtn" ).on( "click", distortedNegativity);
  }
}

function distortedPositivity() {
  $blogPost = "<div class='posts'>p o s i t i v i t y</div>";
  alert("willful ignorance (noun): Making the conscious decision to deny facts and reality because you have such a fragile ego that if you admit you are wrong your whole world would implode in a fiery mess of gore." )
  $("#blogPosts").prepend($blogPost);
}

function distortedNegativity() {
  $blogPost = "<div class='posts'>i s  t h i s  o f f e n s i v e ?</div>";
  alert("Politically Correct (expression): A method of controlling and dictating public speech and thought. A powerful form of censorship.");
  $("#blogPosts").prepend($blogPost);
}


function playMusic() {
  // play and display songs
  var currentSong = 0;
   $("#audioPlayer")[0].src = $("#playlist li a")[0];
   $("#playlist li a").click(function(e){
     e.preventDefault();
     $("#audioPlayer")[0].src = this;
     $("#audioPlayer")[0].play();
     $("#playlist li").removeClass("current-song");
     currentSong = $(this).parent().index();
     $(this).parent().addClass("current-song");
   });

     // if song ends, play next one!
     $("#audioPlayer")[0].addEventListener("ended", function(){
      currentSong++;
      if(currentSong == $("#playlist li a").length) {
       currentSong = 0;
       $("#playlist li").removeClass("current-song");
       $("#playlist li:eq("+currentSong+")").addClass("current-song");
       $("#audioPlayer")[0].src = $("#playlist li a")[currentSong].href;
       $("#audioPlayer")[0].play();
     }
   });
}

//
// function setup() {
//   let canvas = createCanvas(320, 250);
//   canvas.parent("#miniGame");
//   background(255, 0, 200);
//   let avatar = new Avatar(width/2,height-35,45,75,10,LEFT_ARROW,RIGHT_ARROW,10);
// }
//
// function draw() {
//   avatar.display();
//
//   avatar.moveAvatar();
//   avatar.handleInput();
//
//   spawnEnemy();
//
//   for (let i=0; i< enemy.length; i++) {
//     enemy[i].display();
//     enemy[i].updateEnemy();
//     enemy[i].handleCollision(avatar);
//     enemy[i].isOffScreen();
//   }
// }

function startMiniGame() {
  $("#playGame").on("click", function(){
    $("#playGame").remove();
    $("#avatar").css("display","block");
    moveAvatar();
  });
  }

function moveAvatar() {
let avatarLeft = $("#avatar").position().left;
let avatarTop = $("#avatar").position().top;
console.log($("#avatar").position().left);


  $(document).keydown(function(e){
    switch (e.which){
    case 37:    //left arrow key
        if (avatarLeft > 0 && avatarLeft < 320) {
        $("#avatar").finish().animate({
            left: "-=50"
        });
      }

        break;

    case 38:    //up arrow key
        $("#avatar").finish().animate({
            top: "-=50"
        });
        break;
    case 39:    //right arrow key
        $("#avatar").finish().animate({
            left: "+=50"
        });
        break;
    case 40:    //bottom arrow key
        $("#avatar").finish().animate({
            top: "+=50"
        });
        break;
    }
});
}
