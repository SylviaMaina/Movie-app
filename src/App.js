import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [end, setEnd] = useState("");
  const [film, setFilm] = useState([]);
  const inputRef = useRef("");

  useEffect(() => {
    fetch(
      `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/+${end}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "imdb-internet-movie-database-unofficial.p.rapidapi.com",
          "x-rapidapi-key":
            "6c0d9e0babmshf1be131337a0beep1c2a90jsnaf5b617cec26",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilm(data.titles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [end]);

  const onSubmit = (e) => {
    e.preventDefault();
    setEnd(inputRef.current.value);
  };
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
      <div className="print">
        {film.map((item, index) => {
          return (
            <div key={index} className="container">
              <img src={item.image} alt="" />
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
