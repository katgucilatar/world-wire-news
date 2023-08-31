import { useEffect, useState } from 'react';

import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import { useCurrentUserContext } from '../context/CurrentUser';

import Auth from '../utils/auth';
import { deleteNewsId } from '../utils/localStorage';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../utils/queries';
import { DELETE_NEWS } from '../utils/mutations';

const Homepage = () => {
  const { currentUser } = useCurrentUserContext();
  console.log(currentUser);
  const { loading, data } = useQuery(QUERY_CURRENT_USER, {
    variables: { email: currentUser.email },
  });
  console.log(data);
  const userData = data?.currentUser || null;
  // const [userData, setUserData] = useState(data?.currentUser || null);
  const [deleteNews, { error }] = useMutation(DELETE_NEWS);
  // useEffect(() => setUserData(data?.currentUser || null), [data]);

  // create function that accepts the news's mongo _id value as param and deletes the news article from the database
  const handleDeleteNews = async newsId => {
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
      <div
        className="
      relative
      bg-newsGray
      h-full
      w-full
      top-0
      "
      >
        <div
          className="
        text-center 
        text-3xl 
        font-bold 
        pt-2
        "
        >
          <h1 class>{userData?.firstName}'s Saved News</h1>
        </div>
        <div
          className="
        top-0 
        w-full
        "
        >
          <h2
            className="
          pt-0 
          mb-2 
          font-bold
          text-center
          "
          >
            {userData?.savedNews.length
              ? `${userData.savedNews.length} Saved Headlines`
              : 'You have no saved news!'}
          </h2>
          <div
            className="
          w-full
          grid 
          grid-cols-1
          lg:grid-cols-2 
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-2
          px-5"
          >
            {userData?.savedNews.map(news => {
              return (
                <div
                  className="
                    mb-2 
                    w-full
                    bg-newsGrayBlue 
                    rounded 
                    shadow-xl"
                >
                  <Card key={news.newsId}>
                    {news.image ? (
                      <Card.Img
                        src={news.image}
                        alt={`Cover image for ${news.title}`}
                        variant="top"
                        className="rounded shadow-xl"
                      />
                    ) : null}
                    <Card.Body className="p-3">
                      <Card.Title className="font-bold text-white text-lg">
                        {news.title}
                      </Card.Title>

                      <Card.Text className="leading-relaxed text-md">
                        {news.summary}
                      </Card.Text>

                      <a className="text-blue-600" href={news.url}>
                        Read the full article here!
                      </a>

                      <Button
                        className="btn-block text-red-600 btn-danger float-right"
                        onClick={() => handleDeleteNews(news.newsId)}
                      >
                        Delete this article!
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
