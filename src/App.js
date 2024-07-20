import React, { useState, useEffect } from 'react';
import Blogpost from './Blogpost';
import { render } from 'react-dom';

function App() {
  const [data, setData] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch("http://3.144.206.166:8000/blogposts/")
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      console.log(data);
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  
  return (
    <div>
      <h1 className="header">Mauricio's Blogposts</h1>
      <div className="form">
        <p>Enter Blogpost Title:</p>
        <input className='blogTitle' type="text"  value={title} onChange={handleTitleChange} ></input>
        <p>Enter Blogpost Content:</p>
        <input className='blogContent' type="text"  value={content} onChange={handleContentChange} ></input>
        <button onClick={() => submitBlogpost(title,content)}>Add blogpost</button>
      </div>
      {data ? renderBlogposts(data,setData) : <p>Loading...</p>}

    </div>
  );



}
function renderBlogposts (data,setData) {
  return(

    Object.keys(data).map((key, i) => (
      <div >
      <Blogpost id={data[key].id} title={data[key].title} content={data[key].content} published_date={data[key].published_date} />
      <button className="deleteButton" onClick={()=>{deleteAPost(data[key].id,data,setData)}}>Delete</button>
      </div>
    ))
  )
}

function submitBlogpost(title,content){
  const formData = new FormData();
  formData.append('title',title);
  formData.append('content',content);


  fetch("http://3.144.206.166:8000/blogposts/",{
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .catch(error => console.error(error));
  console.log(title + " " + content);
}

function deleteAPost(id,data, setData){
  fetch("http://3.144.206.166:8000/blogposts/"+id.toString(),{
    method: 'DELETE',
  })
  .then(response => response.json())
  .catch(error => console.error(error));
  updatePosts(data,setData);
};

function updatePosts(data, setData){
  fetch("http://3.144.206.166:8000/blogposts/")
  .then(response => response.json())
  .then(json => setData(json))
  .catch(error => console.error(error))
  console.log(data);
  renderBlogposts(data,setData);
};




export default App;