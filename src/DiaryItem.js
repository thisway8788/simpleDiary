const DiaryItem =({author, content, created_date, emotion, id})=> {
    return (
    <div className="DiaryItem">
      <div className="info">
        <span>Write: {author} | Emotion Score: {emotion} </span>
        <br />
        <span className="date">{new Date(created_date).toDateString()} </span>
        </div>
  
        <div className="content">{content} </div>
  
       </div>
  )     
  }
  
  export default DiaryItem;