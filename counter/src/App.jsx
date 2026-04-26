import react, {useState,useRef} from 'react';

function App (){
  const [count,setCount] = useState(0);
  const timeRef = useRef(null);

  const handleStart = () =>{
    if(timeRef.current!==null) return;

    timeRef.current = setInterval(()=>{
      setCount((prev)=>prev+1);
    },1000)
  }

  const handleStop = () =>{
    clearInterval(timeRef.current);
    timeRef.current=null;
    setCount(0);
  }

  const handlePause = () =>{
    clearInterval(timeRef.current);
    timeRef.current=null;
  }
  return (
    <>
    <h1>Counter</h1>
    <h2>{count}</h2>
    <button onClick={handleStart}>Start</button>
    <button onClick={handleStop}>Stop</button>
    <button onClick={handlePause}>Pause</button>
    </>
  )
}
export default App;