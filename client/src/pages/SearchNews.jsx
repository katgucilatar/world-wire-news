import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";
import { saveNewsIds, getSavedNewsIds } from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVE_NEWS } from "../utils/mutations";

const SearchNews = () => {
  // create state for holding returned google api data
  const [searchedNews, setSearchedNews] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedNewsIds, setSavedNewsIds] = useState(getSavedNewsIds());

  const [saveNews, { error }] = useMutation(SAVE_NEWS);

 

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveNewsIds(savedNewsIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    var apiKey = "ab9c7cce208a4d04b3ce75bbf6ca7809";

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&source-countries=${searchInput}`
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
        url: news.url,
        // latest_publish_date: news.latest_publish_date
      }));

      setSearchedNews(newsData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveNews = async (newsId) => {
    // find the book in `searchedBooks` state by the matching id
    const newsToSave = searchedNews.find((news) => news.newsId === newsId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveNews({
        variables: { newNews: { ...newsToSave } },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedNewsIds([...savedNewsIds, newsToSave.newsId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <>
        <div className="text-light bg-dark p-5">
          <Container>
            <h1>News from Every Country!</h1>
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    name="searchInput"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Search for a country here"
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Button type="submit" variant="success" size="lg">
                    Submit Search
                  </Button>
                </Col>
              </Row>
            </Form>
            <h2>
              See a news article you wanna save? Click{' '}
              <Link to="/register" className="text-blue-600">
                here
              </Link>{' '}
              to make an account!
            </h2>
          </Container>
        </div>

        <Container>
          <h2 className="pt-5">
            {searchedNews.length
              ? `Viewing ${searchedNews.length} results:`
              : 'Search for a country to begin'}
          </h2>
          <Row>
            {searchedNews.map(news => {
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
                      <p className="small">Language: {news.language}</p>
                      <Card.Text>{news.summary}</Card.Text>
                      <a href={news.url}>Read the full article here!</a>
                      {Auth.loggedIn() && (
                        <Button
                          disabled={savedNewsIds?.some(
                            savedNewsId => savedNewsId === news.newsId
                          )}
                          className="btn-block btn-info"
                          onClick={() => handleSaveNews(news.newsId)}
                        >
                          {savedNewsIds?.some(
                            savedNewsId => savedNewsId === news.newsId
                          )
                            ? 'This article has already been saved!'
                            : 'Save this news article!'}
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </>
    </>
  );
};

export default SearchNews;
