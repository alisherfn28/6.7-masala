import axios from "axios";
import React, { useState } from "react";
import "./index.css";

const Github = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);
  const [notFoundUsername, setNotFoundUsername] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (username.trim()) {
      setNotFoundUsername(false);

      axios
        .get(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.length === 0) {
              setNotFoundUsername(true);
              setData([]);
            } else {
              setData(response.data);
            }
          }
        })
        .catch((error) => {
          setNotFoundUsername(true);
          setData([]);
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    } else {
      setNotFoundUsername(true);
      setData([]);
    }
  };

  return (
    <div className="container box">
      <h1 className="title">Github UserName </h1>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="input-field"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your GitHub username.."
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {notFoundUsername && (
        <p className="message">Foydalanuvchini GitHub username topilmadi!!</p>
      )}

      <div className="repo-list">
        {data.length > 0 &&
          data.map((value, index) => (
            <div key={index} className="repo-item">
              <img
                src={value.owner.avatar_url}
                alt={`${value.name} Avatar`}
                className="repo-avatar"
              />
              <div className="repo-details">
                <p>
                  <strong>Repo Name:</strong> {value.name}
                </p>
                <p className="flex gap-2">
                  <strong>Star:</strong>{" "}
                  <span className="text-yellow-400">
                    {value.stargazers_count}
                  </span>
                </p>
                <p>
                  <strong>Vercel link:</strong>{" "}
                  {value.homepage ? (
                    <a
                      href={value.homepage}
                      className="vercel-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {value.homepage}
                    </a>
                  ) : (
                    "Not available"
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Github;
