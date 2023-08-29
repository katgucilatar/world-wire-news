import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useCurrentUserContext } from '../context/CurrentUser';

import Auth from '../utils/auth';
import { deleteNewsId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../utils/queries';
import { DELETE_NEWS } from '../utils/mutations';

const Homepage = () => {
  const {currentUser} = useCurrentUserContext();
  const { loading, data } = useQuery(QUERY_CURRENT_USER, {variables: {email:currentUser.email}});
  console.log(data);
  const userData = data?.currentUser || null;
  const [deleteNews, { error }] = useMutation(DELETE_NEWS);

  // create function that accepts the news's mongo _id value as param and deletes the news article from the database
  const handleDeleteNews = async (newsId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteNews({
        variables: { newsId },
      });

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // upon success, remove book's id from localStorage
      deleteNewsId(newsId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userData) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved news!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData?.savedNews.length
            ? `Viewing ${userData.savedNews.length} saved news`
            : 'You have no saved news!'}
        </h2>
        <Row>
          {userData?.savedNews.map((news) => {
            return (
              <Col md="4">
                <Card key={news.newsId} border='dark'>
                  {news.image ? <Card.Img src={news.image} alt={`Cover image for ${news.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{news.title}</Card.Title>
                    <p className='small'>Source Country: {news.source_country}</p>
                    <p className='small'>Language: {news.language}</p>
                    <Card.Text>{news.summary}</Card.Text>
                    <a href={news.url}>Read the full article here!</a>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteNews(news.newsId)}>
                      Delete this article!
                    </Button>
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

export default Homepage;