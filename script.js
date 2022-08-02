

const orgMovies = document.querySelector('.original_movies')
const trendMovies = document.querySelector('#trending')
const topMovies = document.querySelector('#top_rated')



window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
}

// ** Helper function that makes dynamic API calls **
const fetchMovies = async (url, dom_element, path_type) => {

  // Use Fetch with the url passed down 
  const aFetch = await fetch(url).then(response => {
    if (response.ok) {
      return response.json()

    }
    else {
      throw new Error('Something wrong')
    }
  }).then(data => {

    showMovies(data, dom_element, path_type)
  }).catch(error => {
    console.log(error)
  })

}


//  ** Function that displays the movies to the DOM **
showMovies = (movies, dom_element, path_type) => {

  // Create a variable that grabs id or class
  let elementGrab = document.querySelector(dom_element)

  // Loop through object
  for (i of movies.results) {

    let img = document.createElement('img')
    img.setAttribute('data-id', i.id)

    img.src = `https://image.tmdb.org/t/p/original${i[path_type]}`

    elementGrab.appendChild(img)


  }

}



const getOriginals = () => {
  let url = 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'

  fetchMovies(url, '.original__movies', 'poster_path')
}

const getTrendingNow = () => {
  let url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'

  fetchMovies(url, '#trending', 'poster_path')
}

const getTopRated = () => {
  let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'

  fetchMovies(url, '#top_rated', 'poster_path')
}

// ** BONUS **

// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(id) {
  //URL: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`
  const fetchTrailer = await fetch('https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US').then(response => {
    if (response.ok) {
      return response.json()
    }
    else {
      throw new Error('Could not fetch')
    }
  }



  )
}

// ** Function that adds movie data to the DOM
const setTrailer = trailers => {

  const iframe = document.querySelector('#movieTrailer')
  const noMovie = document.querySelector('.movieNotFound')
  // If there is a trailer add the src for it
  if (trailers.length > 0) {
    // add d-none class to movieNotFound and remove it from iframe
    noMovie.classList.add('d-none')
    iframe.classList.remove('d-none')
    // add youtube link with trailers key to iframe.src
  } else {
    // Else remove d-none class to movieNotfound and ADD it to iframe
    noMovie.classList.remove('d-none')
    iframe.classList.add('iframe')
  }
}




