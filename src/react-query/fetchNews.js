import {useQuery} from '@tanstack/react-query';

const fetchNewsAPi = (news) => {
  console.log('????????????? ',news);
  let newsType = news?news:'all'
  console.log('>>>>>>>>>>>>>',newsType);
  return fetch(
    `https://newsapi.org/v2/everything?q=${newsType} india&apiKey=6cc0ca3374df4f9ebeb1fac5774675ea`,
  ).then(res => res.json());
};

// export const fetchNews = (news) => useQuery(['Wdata',{news}], fetchNewsAPi);
export const fetchNews = (payload) => useQuery(['Wdata',{payload}],()=> fetchNewsAPi(payload));
