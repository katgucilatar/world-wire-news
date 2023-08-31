import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import '../../src/effects.css';



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

  return (
    <>

      <Container>
        <h1>Major News From Around the World!</h1>
        <Row>
          {newsItems.map((news) => {
            return (
              <Col md="4" key={news.newsId}>
                <Card border="dark">
                  {news.image ? (
                    <Card.Img
                      src={news.image}
                      alt={`Cover image for ${news.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{news.title}</Card.Title>
                    <p className="small">
                      Source Country: {news.source_country}
                    </p>
                    <Card.Text>{news.summary}</Card.Text>
                    <a href={news.url}>Read the full article here!</a>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Landing;