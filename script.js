let searchBtn = document.getElementById("search-btn");


document.getElementById("usr-country").addEventListener("keyup", function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
    document.getElementById("search-btn").click();
  }
})
document.getElementById("usr-inp").addEventListener("keyup", function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
    document.getElementById("search-btn").click();
  }
})

searchBtn.addEventListener("click", () => {
  var title = document.getElementById("usr-inp").value;
  var country = document.getElementById("usr-country").value;
  let url = 'https://streaming-availability.p.rapidapi.com/v2/search/title?' + new URLSearchParams({title, country}).toString();
  var options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'faef8837aemshdd85d451045e146p1b04fbjsndb1add5e7f37',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };
  if(title.length == 0 || country.length == 0) {
    result.innerHTML = '<h3>Input field cannot be empty</h3>';
  }
  else {
    fetch(url, options).then(response => response.json()).then((data) => {
      console.log(data);
      let myMovie = data.result[0];
      console.log(myMovie);
      console.log(myMovie.originalTitle);
      console.log(myMovie.overview);
      let genres = [];
      let prime = "#";
      let disney = "#";
      let hulu = "#";
      let hbo = "#";
      let netflix = "#";
      for(let i=0; i<myMovie.genres.length; i++){
        genres.push(myMovie.genres[i].name);
      }
      console.log(genres)
      console.log(myMovie.posterURLs.original);
      console.log(myMovie.runtime);
      if(myMovie.streamingInfo.us.prime) {
        for(let i=0; i<myMovie.streamingInfo.us.prime.length; i++) {
          if(myMovie.streamingInfo.us.prime[i].type == 'subscription') {
            prime = (myMovie.streamingInfo.us.prime[i].link);
          }
        }
      }
      if(myMovie.streamingInfo.us.netflix){
        netflix = (myMovie.streamingInfo.us.netflix[0].link);
      }
      if(myMovie.streamingInfo.us.disney){
        disney = (myMovie.streamingInfo.us.disney[0].link);
      }
      if(myMovie.streamingInfo.us.hulu) {
        for(let i=0; i<myMovie.streamingInfo.us.hulu.length; i++) {
          if(myMovie.streamingInfo.us.hulu[i].type == 'subscription') {
            hulu = (myMovie.streamingInfo.us.hulu[i].link)
          }
        }
      }
      if(myMovie.streamingInfo.us.hbo) {
        hbo = (myMovie.streamingInfo.us.hbo[0].link);
      }
      console.log(myMovie.year);
      console.log(prime);

    

      result.innerHTML = `
    <img src=${myMovie.posterURLs.original}>
    <div class="details">
      <h2>${myMovie.originalTitle}</h2>
      <h4>
      ${myMovie.runtime} minutes
      <br>
      Came out in ${myMovie.year}
      <br>
      ${genres}
      </h4>
    </div>
    <div id="watch">
      <button id="hide-watch">X</button>
      <div id="watch-links">
        <i class="fa-solid fa-compact-disc"></i><a class="wtw" href="${prime}" target="_blank">Amazon Prime Video</a>
        <br>
        <i class="fa-solid fa-ticket"></i><a class="wtw" href="${netflix}" target="_blank">Netflix</a>
        <br>
        <i class="fa-solid fa-wand-sparkles"></i><a class="wtw" href="${disney}" target="_blank">Disney</a>
        <br>
        <i class="fa-solid fa-clapperboard"></i><a class="wtw" href="${hulu}" target="_blank">Hulu</a>
        <br>
        <i class="fa-solid fa-eye"></i><a class="wtw" href="${hbo}" target="_blank">HBO</a>
      </div>  
    </div>
    <button id="show-watch">Where to Watch</button>
    `;

    let watch = document.getElementById("watch");
    let watchLinks = document.getElementById("watch-links");
    let hideWatch = document.getElementById("hide-watch");
    let showWatch = document.getElementById("show-watch"); 
  
    showWatch.addEventListener("click", () => {
      watch.style.display = "block";
    })

    hideWatch.addEventListener("click", () => {
      watch.style.display = "none";
    })
  
  }).catch(() => {
    result.innerHTML = `<h3>Invalid Input</h3>`
  })
  document.getElementById("usr-inp").value = "";
  document.getElementById("usr-country").value = "";
  }
})