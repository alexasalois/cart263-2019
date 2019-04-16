"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let $blogPost;
let $textInput;
let $name;

let numberOfComments;

let username;
let password;

let loveCounter = 0;

let positive = 0;
let negative =0;

let $approvedWords = 0;
let $availableWords = [
  "I like to laugh at",
  "I like to see",
  "I enjoy watching",
  "I hate",
  "I love",
  "Society is",
  "I like",
  "I dislike",
  "They love",
  "We want",
  "We need",
  "I need",
  "I enjoy talking about",
  "We need to think about",
  "I think men are",
  "I think that women are",
  "We should all consider that",
  "I want to destroy",
  "I want to talk about",
  "I need to denounce",
  "I have to disagree on",
  "We need to destroy",
  "We have to value",
  "I value",
  "We do not like",
  "I do not tolerate",
  "I tolerate",
  "I look up to",
  "I admire",
  "I loathe",
  "Don't talk to me about"
]

let $availablePositiveWords = [
  "beautiful",
  "proud",
  "accomplishments",
  "awesome",
  "feminism",
  "perfect",
  "freedom",
  "amazing",
  "positivity",
  "admire",
  "accomplished",
  "goal",
  "goals",
  "ambition",
  "help",
  "save",
  "minorities",
  "equality",
  "choice",
  "environment",
  "important",
  "praise",
  "applaud",
  "recognize",
  "growth",
  "veganism",
  "social justice",
  "impressive",
  "interesting",
  "life-changing",
  "thought-provoking"
]

let $availableNegativeWords = [
  "hate",
  "dislike",
  "repulsive",
  "nasty",
  "fuck",
  "bad",
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
  "corruption is good",
  "corrupted",
  "awful",
  "reject",
  "loser",
  "outcasts",
  "atheists",
  "shit",
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
  "Everyone needs to hear this."
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
  "...says the priviliged."
]

$(document).ready(function() {
  $("#mainpage").css("display","none");
  $("#btnConnect").on("click",login);
  $("#textInput").autocomplete({
    source: $availableWords
  });
});

function login() {
  if ($("#usernameInput").val() != "" && $("#passwordInput").val() != "") {
    username = $("#usernameInput").val();
    password = $("#passwordInput").val();
    $("#mainpage").css("display","block");
    $("#login").css("display","none");

    displayName();
  }
}

function displayName() {
  $name = "<h4 id='welcomeMessage'> Welcome "+username+"!</h4>";
  $('body').prepend($name);
  console.log($name);

  playMusic();
}

// function that suggests the available words and checks all the words to make sure it is okay to post
function checkWords() {
  $approvedWords = 0;
  let str = $("#textInput").val();

  // split the blog post to check every word individually
  let blogWords = str.split(" ");

  // go through the blog post and check every word to see if it corresponds to any of the available arrays
  for (let i=0; i<blogWords.length; i++) {
    for (let cpt=0; cpt<$availableWords.length && $availablePositiveWords.length && $availableNegativeWords.length; cpt++) {

        switch(blogWords[i]) {
          // if neutral word, just accept it without influencing the love counter
          //case $availableWords[cpt].toLowerCase(): $approvedWords+=1;
          //break;

          // if it's positive, count it as plus one
          case $availablePositiveWords[cpt].toLowerCase():
          //  $approvedWords+=1;
            positive+=1;
          break;

          // if it's negative, count it as a negative plus one
          case $availableNegativeWords[cpt].toLowerCase():
          //  $approvedWords+=1;
            negative+=1;
            console.log(negative);
        }
      }
    }
    // after checking the value of the words, generate the post
    writePost();
  }

// Writing the post: creates a div with the post and check if its mostly positive or negative
function writePost() {
  $textInput = $("#textInput").val();
  $blogPost = "<div class='posts'>"+$textInput+"</div>";
  // document.getElementById("displayPost").innerHTML = $blogPost;
  $("#blogPosts").prepend($blogPost);
  $("#textInput").val('');
  checkLove();
}

// if its positive, add 1 to the love counter (checks your influence), if negative, minus one
function checkLove() {
  if (positive > negative) {
    loveCounter+=1;
    positiveResponse();
  }

  else if (negative > positive) {
    loveCounter-=1;
    negativeResponse();
  }

  // reset the positive and negative counters
  positive = 0;
  negative = 0;

  updateLove();
}

// when a post is considered positive, people are happy and comments pop up
function positiveResponse() {
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
  if (loveCounter += 5) {
    numberOfComments = numberOfComments*2;
    console.log(numberOfComments);
  }

  else if (loveCounter -= -5) {
    numberOfComments = numberOfComments*3;
  }
}

function playMusic() {
  $("#audioPlayer")[0].src = $("#playlist li a")[0];
 //  $("music").musicPlayer({
 //    // elements: ['information', 'controls', 'progress', 'time', 'volume'],
 //    // onPlay: function() {
 //    //    $('body').css('background', 'black');
 //    // }
 //
 //   autoPlay: false,
 //   volume: 80,
 //   loop: false,
 //   timeSeparator: ' / ',
 //   playerAbovePlaylist: true,
 //   infoElements: ['title' , 'artist'] ,
 //   elements: ['artwork', 'information', 'controls', 'progress', 'time', 'volume'],
 //   timeElements: ['current', 'duration'],
 //   controlElements: ['backward', 'play', 'forward', 'stop'],
 //
 //
 //
 // });
}
