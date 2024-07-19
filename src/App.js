import React, { useState, useEffect } from 'react';
import Blogpost from './Blogpost';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://3.144.206.166:8000/blogpost/")
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      console.log(data);
  }, []);

  

  return (
    <div>
      {data ? renderBlogposts(data) : <p>Loading...</p>}

    </div>
  );

}

function renderBlogposts(data){
  return(
  Object.keys(data).map((key, i) => (
    <Blogpost id={data[key].id} title={data[key].title} content={data[key].content} published_date={data[key].published_date} />
  ))
)
}

export default App;