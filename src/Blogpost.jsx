function Blogpost(props){



  return(

    <div>

      <div className="card">
        <div className="container" >
          <p>{props.title}</p>
          <p>{props.content}</p>
        </div>
      </div>

    </div>

  );

}


export default Blogpost;