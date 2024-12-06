import axios from "axios";
import React, { useState } from "react";
import "./index.css";

function Kitob() {
  const [bookname, setBookname] = useState("");
  const [data, setData] = useState([]);
  const [notFoundBook, setNotFoundBook] = useState(false);

  function handleSearch(event) {
    const value = event.target.value;
    setBookname(value);
    if (value) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${value}`)
        .then((response) => {
          if (response.status === 200 && response.data.items) {
            setData(response.data.items);
            setNotFoundBook(false);
          } else {
            setData([]);
            setNotFoundBook(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setData([]);
          setNotFoundBook(true);
        });
    } else {
      setData([]);
      setNotFoundBook(false);
    }
  }

  return (
    <div className="container box">
      <h1 className="title">Uchinchi Masala!</h1>
      <form className="search-form">
        <input
          className="input-field"
          onChange={handleSearch}
          value={bookname}
          type="text"
          placeholder="Enter your book name.."
        />
      </form>
      <p className="error-message">
        {notFoundBook && "Bunday kitob mavjud emas !!"}
      </p>
      <div className="books-list">
        {data.map((value, index) => (
          <div key={index} className="book-item">
            <img
              src={value.volumeInfo.imageLinks?.thumbnail}
              className="book-image"
              alt={`${value.volumeInfo.title} Cover`}
            />
            <div className="book-details">
              <h3 className="book-title">
                {value.volumeInfo.title || "Title not available"}
              </h3>
              <p className="book-authors">
                {value.volumeInfo.authors?.join(", ")}
              </p>
              <p className="book-published-date">
                {value.volumeInfo.publishedDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kitob;
