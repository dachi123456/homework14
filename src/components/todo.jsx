import { useCallback, useState } from "react";
import "./todo.css";
import TodoList from "./todoList";
import Finished from './finished'

const Todo = () =>  {
  const [inputValue, setInputValue] = useState('');
  const [plan, setPlan] = useState([{id:1, name: "dachi"}]);
  const [finishedTasks, setFinishedTask] = useState([])
  

  const onChange = useCallback((event) => {
    const value = event.target.value;
    setInputValue(value);
    console.log('onchange');
  }, [])

  const addPlan = useCallback((event) =>{
    event.preventDefault();
    const newPlan = {
      id: plan.length + 1,
      name: inputValue
    }
    setPlan((prevState) => [...prevState,newPlan]);
    setInputValue('');
    console.log('add');
  },[plan])

  const returnToPlan = useCallback((id) => {
    const retTask = finishedTasks.find(el => el.id === id)
    setFinishedTask((prevState) => prevState.filter(el => el.id !== id))
    setPlan((prevState) => [...prevState,retTask])
    console.log('return');
  }, [finishedTasks])

  const removePlan = useCallback((id) => {
    setFinishedTask((prevState) => prevState.filter(el => el.id !== id));
    console.log('remove');
  }, [])

  const moveToFinished = useCallback((id) => {
    const finishedTask = plan.find(el => el.id === id)
    setFinishedTask((prevState) => [...prevState,finishedTask])
    setPlan(prevState => prevState.filter(el => el.id !== id))
    console.log('move');
  }, [plan])

  return (
    
    <div className="main">
    
      <section className="plan-section">
        <form className="todo-add">
          <input
            type="text"
            className="add-input"
            onChange={onChange}
            value={inputValue}
          />
          <button className="add-btn" onClick={addPlan}>
            Add
          </button>
        </form>
        {plan.map((el) => (
          <TodoList 
            name={el.name}
            id={el.id}
            key={el.id}
            action={moveToFinished}
          />
        ))}
      </section>
      <section className="finished-section">
        {finishedTasks.map((finishedItem) => (
          <Finished
            name={finishedItem.name}
            key={finishedItem.id}
            id={finishedItem.id}
            deleteFinished={removePlan}
            returnToPlan={returnToPlan}
          />
        ))}
      </section>
    </div>
  );
}

export default Todo;