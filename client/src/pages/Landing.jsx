import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import '../../src/effects.css';
import landingpage from '/landing_page_image.jpeg';



const Landing = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {

        var apiKey = "ab9c7cce208a4d04b3ce75bbf6ca7809";
    
        try {
          const response = await fetch(
            `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&source-countries=au,eu,us,cn,mx,ru&earliest-publish-date=2023-08-23`
          );
    
          if (!response.ok) {
            throw new Error("something went wrong!");
          }
    
          const {news}  = await response.json();
    
          const newsData = news.map((news) => ({
            newsId: news.id,
            title: news.title,
            summary: news.summary,
            source_country: news.source_country,
            image: news.image,
            url: news.url
          }));

        setNewsItems(newsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
    
  }, []);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      margin: 20,
    },
    card: {
      margin: 20,
      background: '#e8eaf6',
      display: 'flex',
      justifyContent: 'center',
      border: '2px solid #00080',
      borderRadius: '20px',
    },
    heading: {
      backgroundImage: 'linear-gradient(blue, white)',
      borderRadius: '15px 50px',
      fontFamily: 'Impact',
      minHeight: 50,
      lineHeight: 3.5,
      fontSize: '3rem',
      color: '#000080',
      padding: '0 20px',
    },
    image: {
      borderRadius: '10px',
      width: '200px',
      height: '200px',
      padding: 15,
    },
    title: {
      fontSize: '1.5rem',
      color: 'black',
      fontFamily: 'Didot, serif',
      padding: 20,
    },
    content: {
      padding: 20,
      fontFamily: 'Didot, serif',
    },
  };

  return (
    <>
      <div className="bg-black h-screen">
        <img
          className="h-full w-full object-cover"
          src={landingpage}
          alt="Landing Page Image"
        ></img>

        {/* <h1 style={styles.heading}>Major News From Around the World!</h1>
        <Row>
          {newsItems.map((news) => {
            return (
              <Col md="4" key={news.newsId}>
                <Card style={styles.card} border="dark">
                  {news.image ? (
                    <Card.Img
                      src={news.image}
                      alt={`Cover image for ${news.title}`}
                      variant="top"
                      style={styles.image}
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title style={styles.title}>{news.title}</Card.Title>
                    <p style={styles.content} className="small">
                      Source Country: {news.source_country}
                    </p>
                    <Card.Text style={styles.content}>{news.summary}</Card.Text>
                    <a href={news.url} style={styles.content}>Read the full article here!</a>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row> */}
      </div>
    </>
  );
};

export default Landing;