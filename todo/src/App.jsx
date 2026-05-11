import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    if (editId !== null) {
      const updatedEditVal = list.map(
        (item) => item.id == editId ?
          { ...item, value: inputValue } : item
      )
      setList(updatedEditVal);
      setEditId(null);
    } else {
      const newTodo = {
        id: list.length + 1,
        value: inputValue
      }
      setList((prev) => [...prev, newTodo]);
    }
    setInputValue("")
  }
  console.log(list)

  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  }
  const handleEdit = (id) => {
    const updateValue = list.find((item) => item.id === id);
    setInputValue(updateValue.value);
    setEditId(updateValue.id);
  }

  return (
    <>
      <div className="flex items-center flex-col h-screen">
        <div className="text-xl">TODO LIST</div>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="border border-soild mr-4 p-2 rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="border border-soild rounded-md p-2"
          >Submit
          </button>
          {list.map((item) => (
            <div className="flex mt-2 gap-2">
              <div className="w-2/4 border border-soild p-1 rounded-md">{item.value}</div>
              <button onClick={() => handleEdit(item.id)} className="border border-soild rounded-md p-1">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="border border-soild rounded-md p-1">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
