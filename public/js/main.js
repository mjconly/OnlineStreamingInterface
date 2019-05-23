let horror = [true];
let romance = [true];
let comedy = [true];
let fantasy = [true];

let count = 0;

let rowLength = 12;

$(document).ready(function(){
  $(".nav-item").on("click", function(){
    $(".nav-item").removeClass("active");
    $(this).addClass("active");
  })


  //request new relase info
  $.ajax({
    url:"loadNew",
    type:"GET",
    dataType:"json",
    success: function(data){
      $wrapperOpen = "<div class='carousel-item'>" + "<div class='row'>"
      $wrapperClose = "</div> </div>"
      let col = "<div class='col-md-12 style='max-width:100%;'>"   +
                "<a href='#'>"          +
                  "<img class='img-fluid' src='' alt=''>" +
                "</a>"                  +
              "</div>"

      $.each(data, function(key, value){
        var title = value.title;
        var poster = value.src;
        console.log("loading " + title + " poster " + value.src);
        let tmp = col.replace("src=''", "src=" + poster);
        tmp = tmp.replace("alt=''", "alt=" + title);
        $("#main-banner").append($wrapperOpen + tmp + $wrapperClose);
      })

      $("#main-banner .carousel-item").first().addClass("active");
    }
  })

//request titles to add images to reel
  $.ajax({
    url: "load",
    type:"GET",
    dataType: "json",
    success: function(data){
      console.log("ajax success!", data);
      $.each(data, function(key, value){
        var query = (value.title.split(" ").join("+"));
        var genre = value.genre;

        getMovieApi(query, genre);

      });

    }
  });
})


function getMovieApi(query, genre){
  let col = "<div class='col-md-3 style='max-width:100%;'>"   +
            "<a href='#'>"          +
              "<img class='img-fluid' src='' alt=''>" +
            "</a>"                  +
          "</div>"


  $.getJSON("http://www.omdbapi.com/?t=" + query + "&apikey=d7fc5b33")

  .done(function(data){
    let poster = data.Poster;
    col = col.replace("src=''", "src=" + poster + "");
    col = col.replace("alt=''", "alt='" + query + "'")
    switch(genre){
      case "Horror":
        horror.push(col);
        break;
      case "Romance":
        romance.push(col);
        break;
      case "Comedy":
        comedy.push(col);
        break;
      case "Fantasy":
        fantasy.push(col);
        break;
    }

    buildCarousel(genre);

  })

  .fail(function(data){
    console.log(data);
  })
}


function buildCarousel(genre){
  switch(genre){
    case "Fantasy":
      buildFantasy();
      break;
    case "Horror":
      buildHorror();
      break;
    case "Comedy":
      buildComedy();
      break;
    case "Romance":
      buildRomance();
      break;
  }


}


function buildHorror(){
  $wrapperOpen = "<div class='carousel-item'>" + "<div class='row'>"
  $wrapperClose = "</div> </div>"
  if (horror.length === rowLength + 1 && horror[0] === true){
    let idx = 1;
    horror[0] = false;
    for(var i = 0; i < (rowLength / 4); i++){
      $("#horror").append($wrapperOpen + horror.slice(idx, idx + 4).join("") + $wrapperClose);
      idx += 4;
    }
    $("#horror .carousel-item").first().addClass("active");
  }
}

function buildFantasy(){
  $wrapperOpen = "<div class='carousel-item'>" + "<div class='row'>"
  $wrapperClose = "</div> </div>"
  if (fantasy.length === rowLength + 1 && fantasy[0] === true){
    let idx = 1;
    fantasy[0] = false;
    for(var i = 0; i < (rowLength / 4); i++){
      $("#fantasy").append($wrapperOpen + fantasy.slice(idx, idx + 4).join("") + $wrapperClose);
      idx += 4;
    }
    $("#fantasy .carousel-item").first().addClass("active");
  }
}

function buildComedy(){
  $wrapperOpen = "<div class='carousel-item'>" + "<div class='row'>"
  $wrapperClose = "</div> </div>"
  if (comedy.length === rowLength + 1 && comedy[0] === true){
    let idx = 1;
    comedy[0] = false;
    for(var i = 0; i < (rowLength / 4); i++){
      $("#comedy").append($wrapperOpen + comedy.slice(idx, idx + 4).join("") + $wrapperClose);
      idx += 4;
    }
    $("#comedy .carousel-item").first().addClass("active");
  }
}

function buildRomance(){
  $wrapperOpen = "<div class='carousel-item'>" + "<div class='row'>"
  $wrapperClose = "</div> </div>"
  if (romance.length === rowLength + 1 && romance[0] === true){
    let idx = 1;
    romance[0] = false;
    for(var i = 0; i < (rowLength / 4); i++){
      $("#romance").append($wrapperOpen + romance.slice(idx, idx + 4).join("") + $wrapperClose);
      idx += 4;
    }
    $("#romance .carousel-item").first().addClass("active");
  }
}
