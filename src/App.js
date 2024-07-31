import React, { useState, useEffect } from 'react';
import Blogpost from './Blogpost';

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
  
  
const submitBlogpost = async (title,content) => {
  const formData = new FormData();
  formData.append('title',title);
  formData.append('content',content);
  await fetch("http://3.144.206.166:8000/blogposts/",{
    method: 'POST',
    body: formData,
  })
  .then(
    response => response.json()
  ).then(setData)
  .catch(error => console.error(error));
  console.log(title + " " + content);
  getBlogposts();
}

const getBlogposts = async () => {
  await fetch("http://3.144.206.166:8000/blogposts/")
  .then(response => response.json())
  .then(json => setData(json))
  .catch(error => console.error(error))
  console.log(data);
  renderBlogposts(data,setData);
};

const deleteAPost = async (id) =>{
  await fetch("http://3.144.206.166:8000/blogposts/"+id.toString(),{
    method: 'DELETE',
  })
  .then(response => response.json())
  .catch(error => console.error(error));
  getBlogposts();
};

const renderBlogposts = () => {
  return(

    Object.keys(data).map((key, i) => (
      <div >
      <Blogpost title={data[key].title} content={data[key].content} />
      <button className="deleteButton" onClick={()=>{deleteAPost(data[key].id,data,setData)}}>Delete</button>
      </div>
    ))
  )
}
  
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




export default App;