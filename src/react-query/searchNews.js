import { useQuery } from "@tanstack/react-query";

export const searchNews = (topic) => {
    console.log(topic,"Input")
    return fetch(
        `https://newsapi.org/v2/everything?q=${topic} india&apiKey=6cc0ca3374df4f9ebeb1fac5774675ea`,
    ).then(res => res.json());
  };


  export const searchNewsGlobal = (payload) => useQuery(['Gdata',{payload}],()=> searchNews(payload));