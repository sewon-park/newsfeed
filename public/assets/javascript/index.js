$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.parallax').parallax();


  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  initPage();

  function initPage(){
    articleContainer.empty();
    $.get("/api/headlines?saved=false")
    .then(function(data){
      if (data && data.length){
        renderAricles(data);
      }
      else {
        renderEmpty();
      }
    })
  }

  function renderAricles(result){
    var articlePanels = [];
    for (var i = 0; i < result.length; i++){
      articlePanels.push(createPanel(result[i]))
    }
  }

function createPanel(result){
  var panel =
  $(["<div class = 'panel'>",
  "<div calss= 'panel-heading'>",
  "<h3>",
  result.headline,
  "<a class='waves-effect waves-light btn save'>Save</a>",
  "</h3>",
  "</div>",
  "<div class ='panel-body'>",
  result.summary,
  "</div>",
  "</div>"
].join(""));
panel.data("_id", result._id);
return panel;
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

function handleArticleSave(){
  var articleToSave = $(this).parents(".panel").data();
  articleToSave.saved = true;

  $.ajax({
    method:"PATCH",
    url: "/api/headlines",
    data: articleToSave
  })
  .then(function(data){
    if(data.ok){
      initPage();
    }
  })
}


function handleArticleScrape(){
  $.get("/api/fetch")
  .then(function(data){
    initPage();
    alert("<h3>"+ data.message + "</h3>");
  })
}

});