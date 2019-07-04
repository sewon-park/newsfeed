$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.parallax').parallax();

var articleContainer = $(".article-container");
$(document).on("click", ".btn.delete", handleArticleDelete);
$(document).on("click", ".btn.notes", handleArticleNotes);
$(document).on("click", ".btn.save", handleNoteSave);
$(document).on("click", ".btn.note-delete", handleNoteDelete);

initPage();

function initPage(){
  articleContainer.empty();
  $.get("/api/headlines?saved=true")
  .then(function(data){
    if (data && data.length){
      renderAricles(data);
    }
    else {
      renderEmpty();
    }
  })
}

function renderEmpty(){
  var emptyAlert =
  $(["<div class='alert'>",
  "<h4> No new articles </h4>",
  "</div>",
  "<div>",
    "<h4> <a class='scrape-new'> Scrape New Articles </a></h4>",
    "<h4> <a href = '/saved'> Go to Saved Articles </a></h4>",
    "</div>"
].join(""));
articleContainer.append(emptyAlert);
  
}


// function renderAricles(result){
//   var articlePanels = [];
//   for (var i = 0; i < result.length; i++){
//     articlePanels.push(createPanel(result[i]))
//   }
// }

// function createPanel(result){
//   var panel =
//   $(["<div class = 'panel'>",
//   "<div calss= 'panel-heading'>",
//   "<h3>",
//   result.headline,
//   "<a class='waves-effect waves-light btn save'>Save</a>",
//   "</h3>",
//   "</div>",
//   "<div class ='panel-body'>",
//   result.summary,
//   "</div>",
//   "</div>"
// ].join(""));
// panel.data("_id", result._id);
// return panel;
// }

function handleArticleDelete(){
  var articleToDelete = $(this).parents(".panel").data();
  $.ajax({
    method:"DELETE",
    url:"/api/headlines/" + articleToDelete._id
  }).then(function(data){
    if(data.ok){
      initPage()
    }
  })
}

function handleArticleNotes(){
  var currentArticle = $(this).parents(".panel").data();
  $.get("/api/notes/"+currentArticle._id).then(function(data){
    var modalText = [
      "<div class='container-fluid text-center'>",
      "<h4>Notes",
      currentArticle._id,
      "</h4>",
      "<textarea placeholder = 'New Note' rows ='4' cols='60' </textarea>",
      "<button class = 'btn save'> Save Note </button>",
      "</div>"

    ].join("");

    bootbox.dialog({
      message:modalText,
      closeButton:true
    });

    var NoteData ={
      _id: currentArticle._id,
      notes:data || []
    }
   $(".btn.save").data("article", noteData)
renderNotesList(noteData)
    
  })
}

function renderNotesList(data){
  var notesToRender = [];
  var currentNote;
  if(!data.notes.length){
    currentNote=[
      "<p> No notes for this article </p>"
    ]
    notesToRender.push(currentNote)
  }
  else{
    for (var i=0; i< data.notes.length; i++){
      currentNote=$([
        "<li class = 'list-group-item note'>",
        data.notes[i].noteTExt,
        "<button class = 'btn note-delete'> x </button>",
        "<li>"
      ].join(""))
      currentNote.children("button").data("_id", data.notes[i]._id);
      notesToRender.push(currentNote)
    }

  }
  $(".note-container").append(notesToRender);
}

function handleNoteSave(){
  var noteData;
  var newNote = $(".bootbox-body textarea").val().trim();
}
});