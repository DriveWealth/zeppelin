import { useEffect, useMemo, useState, createContext } from "react";

export const NewsContext = createContext([]);

function NewsProvider({ children }) {
  const [news, setNews] = useState([]);

  function searchNews (q) {
    setNews([])
  }

  useEffect(() => {
    setNews([])
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
