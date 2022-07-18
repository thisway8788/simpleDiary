import { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// const dummyList = [
//   {
//     id: 1,
//     author: "JH",
//     content: "Hid",
//     emotion: 3,
//     created_date: new Date().getTime()
//   },

//   {
//     id: 2,
//     author: "LD",
//     content: "His",
//     emotion: 2,
//     created_date: new Date().getTime()
//   },

//   {
//     id: 3,
//     author: "OM",
//     content: "Hia",
//     emotion: 5,
//     created_date: new Date().getTime()
//   }
// ];

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    const newDiaryList = data.filter((it)=> it.id !== targetId)
    setData(newDiaryList)
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
  );
};
export default App;
