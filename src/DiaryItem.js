import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ id, author, content, emotion, created_date }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);

  useEffect(() => {
    console.log(`${id}번 일기아이템 렌더`);
  });

  const [isModify, setModify] = useState(false);
  const toggleIsEditNow = () => setModify(!isModify);

  const [localContent, setLoclContent] = useState(content);
  const localContentRef = useRef(null);

  const handleClickDelete = () => {
    if (window.confirm(`${id}번 째 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleClickEdit = () => {
    if (localContent.length < 1) {
      localContentRef.current.focus();
      return;
    }

    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEditNow();
    }
  };

  const handleQuitEdit = () => {
    setLoclContent(content);
    toggleIsEditNow();
  };

  return (
    <div className="DiaryItem_container">
      <div className="info">
        <span className="author_info">
          | 작성자 : {author} | 감정점수 : {emotion} |
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>

      <div className="content">
        {isModify ? (
          <textarea
            ref={localContentRef}
            value={localContent}
            onChange={(e) => setLoclContent(e.target.value)}
          />
        ) : (
          content
        )}
      </div>
      {isModify ? (
        <div>
          <button onClick={handleQuitEdit}>😂Cancel Modify😂</button>
          <button onClick={handleClickEdit}>🤠Save🤠</button>
        </div>
      ) : (
        <div>
          <button onClick={handleClickDelete}>😡Delete😡</button>
          <button onClick={toggleIsEditNow}>🤫Modify🤫</button>
        </div>
      )}
    </div>
  );
};

export default memo(DiaryItem);
