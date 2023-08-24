import { useState, useEffect } from 'react';
import { getHeadlines } from '../utils/news-api';

const Landing = () => {
 const [newsItems, setNewsItems] = useState([]);
  
 useEffect(() => {  
  const fetchNews = async () => {
    try {
      const response = await getHeadlines();

      if (!response.ok) {
      throw new Error('something went wrong!');
      }

      const formatted = await response.json();
      const { items } = formatted;

      const newsData = items.map((news) => ({
      newsId: news.id,
      title: news.title,
      source_country: news.source_country,
      image: news.image,
      url: news.url,
      }));


      setNewsItems(newsData);
    } catch (err) {
      console.error(err);
    }
    }
      fetchNews();
 
  }, []);
  return (
  <>
    {setNewsItems.map((news) => {
   <header className="bg-blue-300 h-10">
    <h1 className="page-title">Headlines</h1>
   </header>

   <section id="top-five-hl" className="grid grid-cols-1 gap-y-2 px-2">
    <div>
      <img></img>
      <h3></h3>
      <img></img>
      <h3></h3>
      <img></img>
      <h3></h3>
      <img></img>
      <h3></h3>
      <img></img>
      <h3></h3>
    </div>
   </section>
    })}
  </>
 );
};

export default Landing;