export const getSavedNewsIds = () => {
    const savedNewsIds = localStorage.getItem('saved_news')
      ? JSON.parse(localStorage.getItem('saved_news'))
      : [];
  
    return savedNewsIds;
  };
  
  export const saveNewsIds = (newsIdArr) => {
    if (newsIdArr.length) {
      localStorage.setItem('saved_news', JSON.stringify(newsIdArr));
    } else {
      localStorage.removeItem('saved_news');
    }
  };
  
  export const deleteNewsId = (newsId) => {
    const savedNewsIds = localStorage.getItem('saved_news')
      ? JSON.parse(localStorage.getItem('saved_news'))
      : null;
  
    if (!savedNewsIds) {
      return false;
    }
  
    const updatedSavedNewsIds = savedNewsIds?.filter((savedNewsId) => savedNewsId !== newsId);
    localStorage.setItem('saved_news', JSON.stringify(updatedSavedNewsIds));
  
    return true;
  };