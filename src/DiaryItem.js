import { useState, useRef } from "react";

const DiaryItem = ({
  onModify,
  onRemove,
  id,
  author,
  content,
  emotion,
  created_date,
}) => {
  const [isModify, setModify] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const toggleModify = () => {
    setModify(!isModify);
  };
  const handleRemove = () => {
    if (window.confirm(`${id + 1}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitModify = () => {
    setModify(false);
    setLocalContent(content);
  };

  const handleModify = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id + 1}번째 일기를 수정할꺼여?`)) {
      onModify(id, localContent);
      toggleModify();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 감정점수 : {emotion} |
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isModify ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isModify ? (
        <>
          <button onClick={handleQuitModify}>👑Modify Cancel👑</button>

          <button onClick={handleModify}>💩Modify Compleated💩</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>👑Erase👑</button>

          <button onClick={toggleModify}>💩Modify💩</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
