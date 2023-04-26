import { useEffect, useMemo, useState, createContext } from "react";
import axios from "axios";
import moment from "moment";

export const NewsContext = createContext([]);

// const NEWS_BASE_URL = "http://localhost:5001/drivewealth-a7e9a/us-central1/news";
const NEWS_BASE_URL = "https://us-central1-drivewealth-a7e9a.cloudfunctions.net/news";

function NewsProvider({ children }) {
  const [news, setNews] = useState([]);

  function searchNews (q) {
    axios(`${NEWS_BASE_URL}?q=${q}`).then((resp) => setNews(resp.data))
  }

  useEffect(() => {
    axios(`${NEWS_BASE_URL}?q=stocks`).then((resp) => setNews(resp.data))
  }, []);

  return (
    <NewsContext.Provider
      value={{
        news,
        searchNews
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export default NewsProvider;
