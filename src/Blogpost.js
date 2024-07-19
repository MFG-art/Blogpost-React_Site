function Blogpost(props){
  const card = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  }
  
  const container =  {
    padding: "2px 16px",
  }
  return(

    <div>

      <div class="card" style={card}>
        <div class="container" style={container}>
          <h4><b>{props.title}</b></h4>
          <p>{props.content}</p>
          <p>id = {props.id}</p>
          <p>published on {props.published_date}</p>
        </div>
      </div>

    </div>

  );

}

const card  = {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  width: "20px",
}

const container = {
  padding: "2px 16px",
  width: "20px",
}



export default Blogpost;