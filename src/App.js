import React, { Component } from "react";
import "./App.css";
import Search from './Search'
import Table from './Table'
import Button from "./Button";

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react",
    author: "Jordan Walke",
    num_coments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs./redux",
    author: "Dan Abramov, Andrew Clark",
    num_coments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
      newBook: {
        title: '',
        url: '',
        author: '',
        num_coments: 0,
        points: 0,
        objectID: 0
      }
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);

    this.setState({ list: updatedList });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onNewBookInputChange(objectChanged) {
    this.setState(state => ({
      ...state,
      newBook: {
        ...state.newBook,
        ...objectChanged
      }
    }))
  }

  addNewBook(newBook) {
    console.log('button clicked! ' + this.state.list.length)

    const lengthBook = this.state.list.length - 1
    const book = {
      ...newBook,
      objectID: this.state.list[lengthBook].objectID + 1
    }

    this.setState(state => ({
      ...state,
      list: state.list.concat(book)
    }))

    console.log(JSON.stringify(this.state.list))
  }

  render() {
    const { list, searchTerm, newBook } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <div className="add-new-book">
          <form>
            Title:
            <input
              type="text"
              value={newBook.title}
              name={'title'}
              onChange={e => this.onNewBookInputChange({ title: e.target.value })}
            />
            URL:
            <input
              type="text"
              value={newBook.url}
              name={'url'}
              onChange={e => this.onNewBookInputChange({ url: e.target.value })}
            />
            Author:
            <input
              type="text"
              value={newBook.author}
              name={'author'}
              onChange={e => this.onNewBookInputChange({ author: e.target.value })}
            />
            N. Coments:
            <input
              type="number"
              value={newBook.num_coments}
              name={'num_coments'}
              onChange={e => this.onNewBookInputChange({ num_coments: e.target.value })}
            />
            Points:
            <input
              type="number"
              value={newBook.points}
              name={'points'}
              onChange={e => this.onNewBookInputChange({ points: e.target.value })}
            />

            <Button
              onClick={() => this.addNewBook(newBook)}
              className="button-inline"
            >
              Adicionar
            </Button>
          </form>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

export default App;
