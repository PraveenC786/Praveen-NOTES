import React, { Fragment, useContext } from 'react'
import { TaskApi } from './context/TaskContext';

const TodoList = () => {
    //!step 3: context consumer
    //?Syntax : let value=useContext(ContextApi)
  let data = useContext(TaskApi);
  // console.log(data);  
  
  let {selectedCategory:{selected},handleCategory,multiTask,handleEdit,handleDelete} = data;

  return (
    <>
      <main className='noteslist'>
        <h1 className='noteslist_heading'>DISPLAY NOTES</h1>
        <div value={selected} onChange={handleCategory} className='notes_category'>
  
  <label>CHOOSE CATEGORY :</label> 

  <label className="input_field">
    <input type="radio" name="selected" value="all" />
    <span>ALL</span>
  </label>

  <label className="input_field">
    <input type="radio" name="selected" value="general" />
    <span>GENERAL</span>
  </label>

  <label className="input_field">
    <input type="radio" name="selected" value="official" />
    <span>OFFICIAL</span>
  </label>

  <label className="input_field">
    <input type="radio" name="selected" value="technical" />
    <span>TECHNICAL</span>
  </label>
</div>

        <br /><br />
        <section className='notes_container'>

        {/*itterating over 2nd state to display notes based on category*/}
        {multiTask.length === 0 ? "LOADING..." : multiTask.map((val) => {
          console.log("current val",val);//object
          return selected === "all" ? (
            <Fragment key={val.id} >
              <div className='listitem'>
                <h2>TITLE : {val.title}</h2>
                <h3>CATEGORY : {val.category}</h3>
                <p>{val.description}</p>
                <div className='btnset'>
                  <button onClick={()=>{handleEdit(val.id)}} id='editbtn'>EDIT</button>
                    <button onClick={()=>{handleDelete(val.id)}} id='delbtn'>DELETE</button>
                </div>
              </div>
          
            </Fragment>
          ) : (
            selected === val.category && (
              <Fragment key={val.id}>
                <div  className='listitem'>
                  <h2>TITLE : {val.title}</h2>
                  <h3>CATEGORY : {val.category}</h3>
                  <p>{val.description}</p>
                  <div className='btnset'>
                    <button onClick={()=>{handleEdit(val.id)}} id='editbtn'>EDIT</button>
                    <button onClick={()=>{handleDelete(val.id)}} id='delbtn'>DELETE</button>
                  </div>
                </div>
              
              </Fragment>
            )
          );
        })}
        </section>  {/* end of notes_container */}
      </main>
    </>
  );
}

export default TodoList

//!When we provide "multi input options" for the user,value attr(react) & onChange
//!should be given to "immediate parent tag" of "multi input options"
//?checkbox,radio-btn,drop-down