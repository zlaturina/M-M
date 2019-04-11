import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import {addBook, fetchBooks, requestKey, url } from "./utils/apiii"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: [],
      title: "",
      author: ""
    }

    this.titleHandler = this.titleHandler.bind(this)
    this.authorHandler = this.authorHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.apiHandler = this.apiHandler.bind(this)
  }

  titleHandler(event){
    this.setState({
      title: event.target.value
    })

  }

  authorHandler(event){
    this.setState({
      author: event.target.value
    })

  }

  apiHandler(event){
    event.preventDefault()
      fetch(url + 'requestKey')
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('apiKey', data.key)})
    }


  submitHandler(event){
  event.preventDefault()
  const book = {
    title: this.state.title,
    author: this.state.author

  }
  addBook(book, (id)=>{
    this.setState ({
      books: [...this.state.books, { ...book, id }]
    })
    }
  )
  this.state.books.forEach(book => console.log(book))
}


  componentDidMount(){
    console.log('mount')
    // fetchBooks(({data}) => {
    //   console.log('data', data)
    //   this.setState({
    //     books: [...data]
    //
    //   })
    //
    // })
    const key = localStorage.getItem('apiKey')

    if (key) {
      fetch(url + 'op=select' + '&key=' + key)
        .then(response => response.json())
        .then(data => {
          if(data.status === 'success') {
          this.setState({
            books: data.data
          })
        }
        })
    } else {
      fetch(url + 'requestKey')
        .then(response => response.json())
        .then(data => {
          fetch(url + 'op=select' + '&key=' + data.key)
            .then(response => response.json())
            .then(data => {
              if(data.status === 'success') {
              this.setState({
                books: data.data
              })
            }
            })
        })
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row form-section">
            <form className="book-form col-6">
              <legend>Lägg till dina favoritböcker</legend>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Lägg till titel"
                  onChange={this.titleHandler}
                />

                <input
                  type="text"
                  className="form-control"
                  id="author"
                  rows="3"
                  data-gramm="true"
                  data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_editor="true"
                  placeholder="Lägg till författare"
                  onChange={this.authorHandler}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={this.submitHandler}
              >
                Skicka
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={this.apiHandler}
              >
                NewApi
              </button>
            </form>
          </div>
        </div>
        <div className="display-books">
          <div className="container">
            <div className="col-12">
              <ul className="list-group">
                <li className="list-item list-group-item d-flex align-items-center">
                  <strong className="title">Titel</strong>

                  <strong className="author">Författare</strong>

                  <div className="buttons">
                    <button type="button" className="btn btn-success">
                      Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                      Ta bort
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-12">
              <ul className="list-group">
              {this.state.books.map((book)=>
                (<li className="list-item list-group-item d-flex align-items-center">
                  <div className="title">{book.title}</div>

                  <div className="author">{book.author}</div>

                  <div className="buttons">
                    <button type="button" className="btn btn-success">
                      Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                      Ta bort
                    </button>
                  </div>
                </li>))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
// <ul>
//   {this.state.books.map((book)=>
//     (<li>{book.title}</li>))}
// </ul>

export default App
