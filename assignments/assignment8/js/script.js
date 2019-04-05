"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let $blogPost;
let $textInput;
let $approvedWords = 0;
let $availableWords = [
  "I",
  "You",
  "We",
  "She",
  "He",
  "They",
  "are",
  "is",
  "talk",
  "want",
  "need",
  "have",
  "find",
  "your",
  "my",
  "their",
  "them",
  "to",
  "men",
  "women",
  "society",
  "food",
  "dogs",
  "cats",
  "people",
  "a",
  "person",
  "life",
  "immigrants"
]

let $availablePositiveWords = [
  "beautiful",
  "awesome",
  "feminism",
  "perfect",
  "freedom",
  "amazing",
  "love",
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
  "bad",
  "ugly",
  "gross",
  "disgusting",
  "murder",
  "kill",
  "pain",
  "inflict",
  "torture",
  "deported",
  "filthy",
  "annoying",
  "corruption",
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



$(document).ready(function() {
  console.log("welcome");
});

function checkWords() {
  $approvedWords = 0;
  let str = $("#textInput").val();
  let blogWords = str.split(" ");
  $("#textInput").autocomplete({source: $availableWords});
  console.log(blogWords);

  for (let i=0; i<blogWords.length; i++) {
    for (let cpt=0; cpt<$availableWords.length && $availablePositiveWords.length && $availableNegativeWords.length; cpt++) {
      if (blogWords[i].toLowerCase() == $availableWords[cpt].toLowerCase() || blogWords[i].toLowerCase() == $availablePositiveWords[cpt].toLowerCase() || blogWords[i].toLowerCase() == $availableNegativeWords[cpt].toLowerCase()){
        $approvedWords+=1;
        // create individual ifs, negative give -1 and pos +1. create variable that acts as external counter, which if higher or lower than zero, good or bad response. have counter reset to 0 outside of loop after calculation. if zero, the response will be dependant on another variable that tallies up cumulative good or bad activity, and if you are bad, 0 is bad
      }
    }
  }

  if ($approvedWords === blogWords.length) {
    writePost();
  }
}

function writePost() {
  $textInput = $("#textInput").val();
  $blogPost = "<div class='posts'>"+$textInput+"</div>";
  // document.getElementById("displayPost").innerHTML = $blogPost;
  $("#blogPosts").prepend($blogPost);
  $("#textInput").val('');
}
