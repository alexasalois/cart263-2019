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
  "like",
  "hate",
  "are",
  "is",
  "dogs",
  "cats",
  "blue",
  "pink",
  "men",
  "women",
  "society",
  "beautiful",
  "ugly",
  "disgusting",
  "bad",
  "gross",
  "cute",
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
    for (let cpt=0; cpt<$availableWords.length; cpt++) {
      if (blogWords[i].toLowerCase() == $availableWords[cpt].toLowerCase()){
        console.log("iss ok");
        console.log($approvedWords);
        $approvedWords+=1;
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
