import React, { useState, useEffect } from 'react';
import { getNews } from '../utils/news-api';

const Landing = () => {
 const [newsItems, setNewsItems] = useState([]);

 useEffect(() => {
  async function fetchNews() {
   try {
    const response = await getNews();

    if (!response.ok) {
     throw new Error('something went wrong!');
    }

    const { items } = await response.json();

    const newsHL = items.map((news) => ({
     newsId: news.id,
     title: news.title,
     source_country: news.source_country,
     image: news.volumeInfo.imageLinks?.thumbnail || '',
     url: news.url,
    }));

    setNewsItems(newsHL);
   } catch (err) {
    console.error(err);
   }
  }

  fetchNews();
 }, []);

 return (
  <>
   <header className="bg-blue-300 h-10">
    <h1 className="page-title">Headlines</h1>
   </header>

   <section id="top-five-hl" className="grid grid-cols-1 gap-y-2 px-2">
    {newsItems.slice(0, 5).map((news) => (
     <div key={news.newsId} className="border-2 border-purple-200">
      <img src={news.image} alt={news.title} />
      <h2 className="font-bold">{news.title}</h2>
     </div>
    ))}
   </section>

   <section id="more-top-stories" className="grid grid-cols-1 gap-y- px-2 mt-3 border-2 border-green-200">
    <h3 className="font-bold">More Top Stories</h3>
    {newsItems.slice(5).map((news) => (
     <h4 key={news.newsId}>{news.title}</h4>
    ))}
   </section>
  </>
 );
};

export default Landing;



