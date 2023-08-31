import React, { useState, useEffect } from 'react';
import { getHeadlines } from '../utils/news-api';
import { dummyNewsItems } from '../../../_misc/hs_dummyData';
import '../../src/effects.css';



const Landing = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // const response = await getHeadlines();

        // if (!response.ok) {
        //   throw new Error('something went wrong!');
        // }

        // const formatted = await response.json();
        // const { items } = formatted;

        // const newsData = dummyNewsItems.map((news) => ({
        //   newsId: news.id,
        //   title: news.title,
        //   source_country: news.source_country,
        //   image: news.image,
        //   url: news.url,
        // }));

        setNewsItems(dummyNewsItems);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
    
  }, []);

  return (
  <>
  
   <div className="bg-white h-10 py-1 border-t-2 border-b-2 border-newsBlue overflow-hidden">

    <h1 className="page-title news-ticker inline-block">
    {dummyNewsItems.length > 0 && (
            <span >
              {dummyNewsItems.map((news) => news.title).join(' • ')}
            </span>
          )}
    </h1>
 
   </div>
  
<section id="top-five-hl" className="container">
    {dummyNewsItems.slice(0, 5).map((news, index) => (
      <div className="column">
        <div className="post-module" key={news.id} >
          <div className="thumbnail">
            <div className="date">
              <div className="day">28</div>
              <div className="month">Aug</div>
            </div>
            <div><img className='w-full' src={news.image} alt={`Image for ${news.title}`} /></div>
          </div>
          <div className="post-content">
            <div className="category">Photos</div>
            <h1 className='title'>{news.title}</h1>
            <h2 className="sub_title">Subtitle</h2>
            <p className="description">Description/First Sentence</p>
          </div>
        </div>
      </div>
    ))}
</section>

<section id="more-news-hl" className="grid grid-cols-1 gap-y-2 px-2 mt-2">
  <div>
  <h2 className='border-t-2 border-b-2 py-1 border-newsBlue h-10 font-bold'> More News Headlines</h2>
  </div>
  {dummyNewsItems.slice(6, 11).map((news, index) => (
    <div key={news.id} >
      <div className={`border-b-2 border-newsGray ${index === 4 ? 'last:border-b-0' : ''}`}>
        <a href={news.url} className='flex justify-right font-medium p-1'>{news.title}</a>
      </div>
    </div>
  ))}
</section>
  </>

)};

export default Landing;