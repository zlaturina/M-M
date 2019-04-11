// Spara bas-url för att slippa skriva in vid varje request

export const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?'


export function addBook(book, cb) {
  const key = localStorage.getItem('apiKey')



  if (key) {
    request(`key=${key}&op=insert&title=${book.title}&author=${book.author}`, function(
      data
    ) {

      cb(data)
      console.log(data)

    })
  } else {
   requestKey(function(key) {
      request(`key=${key}&op=insert&title=${book.title}&author=${book.author}`, function(
      data
    ) {
      cb(data)
      console.log(data)
    })
    })
  }
}

export function fetchBooks(cb) {
  console.log('fetchBooks')
  requestKey(function(key){
    request(`key=${key}&op=select`, function(data){
      if(cb) {
        cb(data)
      }
    })
  })
}




 export function requestKey(cb){
  console.log('request key')
  let apiKey = localStorage.getItem('apiKey')
  if(!apiKey) {
    apiKey = fetch(`${url}requestKey`)
      .then(response => response.json())
      .then(data => {
        cb(data.key)
        localStorage.setItem('apiKey', data.key)
      })
  } else {
    cb(apiKey)
  }
}

export function request(qs, cb, limit = 10) {

  fetch(`${url}${qs}`)

    .then(function(response) {

      return response.json()

    })

    .then(function(data) {

      if (data.status === 'success') {
        if (cb) {
          cb(data)
        }
      } else if (limit > 0) {
        request(qs, cb, limit - 1)
      } else {
        console.log(data.message)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

export function getNewApiKey(){
  fetch(url + 'requestKey')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('apiKey', data.key)})
}

// function getApiKey(callback) {
//
//   request('requestKey', function(data) {
//
//     localStorage.setItem('apiKey', data.key)
//
//     if (callback) {
//       callback(data.key)
//     }
//   })
// }
