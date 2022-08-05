import { useState, useRef, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// https://jsonplaceholder.typicode.com/comments#

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  // api 로 데이타 가지고오기
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments#"
    ).then((res) => res.json());

    // 1~20개만 짤라서 가져옴
    const initData = res.slice(0, 20).map((it) => {
      return {
        authhor: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  // setData를 통해서 어떤 값을 전달할것 이다 그리고 변경시키는 값을 어떻게 만들까? 그것은 onModify함수는
  // 어떤 특정 일기 데이타를 수정하는 함수이다 그래서 targetId가 갖는 일기 데이타를 배열에서 수정할것 이기때문에
  // 원본 데이타 배열에 map을 이용해서 모든 곳을 순회하고 배열을 만들어 setData에 넣어준다
  // 그다음부터가 it.id이다
  const onModify = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onModify={onModify} onRemove={onRemove} diaryList={data} />
    </div>
  );
};
export default App;
