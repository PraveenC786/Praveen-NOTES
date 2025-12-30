import React, { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from "uuid";

    //!step 1: create a context
    //TaskApi-->Context api compo
    export const TaskApi=createContext()

const TaskContext = (props) => {
  //* store the "form data"
  let [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    id: uuidv4(), //* to generate "random id"
  });

  //*onChange form
  let handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //! getting the data from local-storage
  let getData = () => {
    // localStorage.getItem("key")
    let data = localStorage.getItem("items");
    if (data) {
      return JSON.parse(data) //?converting JSON data to normal data
    } else {
      return []
    }
  }

  //*to store "multi set of notes"
  let [multiTask, setMultiTask] = useState(getData());

  //! storing data in local-storage
  useEffect(() => {
    //localStorage.setItem("key",value)--->JSON DATA
    localStorage.setItem("items", JSON.stringify(multiTask));//?converting data into JSON
  },[multiTask])

  //! store "choosen category"
  let [selectedCategory, setSelectedCategory] = useState({
    selected: "all",//? by default will display "all" data on UI
  });

  //! to handle selectedCategory
  let handleCategory = (event) => {
    let { name, value } = event.target
    setSelectedCategory({[name]:value})
  }

  //! onSubmit form

  // let handleSubmit = (event) => {
  //   event.preventDefault();   
  //   setMultiTask([...multiTask, formData]); //!pass the data into array
  //   setFormData({  //!setting all input back to empty
  //     title: "",
  //     description: "",
  //     category: "",
  //     id: uuidv4(), //* to generate "random id" for "next data"
  //   });
  // };

  let handleSubmit = (event) => {
  event.preventDefault();

  let isExisting = multiTask.some((task) => task.id === formData.id);

  if (isExisting) {
    // update existing item
    setMultiTask(
      multiTask.map((task) =>
        task.id === formData.id ? formData : task
      )
    );
  } else {
    // add new item
    setMultiTask([...multiTask, formData]);
  }

  // reset form
  setFormData({
    title: "",
    description: "",
    category: "",
    id: uuidv4(),
  });
};

  //!write edit logic
   let handleEdit = (editId) => {
    console.log("Id of the item to be edited", editId);
    
    //? collecting " all remaing values" apart from "value to be edited"
    let remaingVal=multiTask.filter((val) => {
      return val.id !== editId
    })
    
    //? finding specific item to update
    let editItem=multiTask.find((val) => {
      // console.log("current val", val); //obj
      return val.id === editId; //* if the id of the specific val matches with id of
      //* item to be edited, then will store in "editItem"
    })
    console.log("item to edited", editItem);//obj
    console.log("remaing values",remaingVal);//array
  
    setFormData({
      title: editItem.title,
    description: editItem.description,
    category: editItem.category,
    id: editItem.id,
    });
  }
  
  //! delete logic
let handleDelete = (delId) => {
    console.log("id to delete", delId);
    let reaminingVal=multiTask.filter((val) => {
      // console.log("current val in filter", val); //obj
      return val.id !== delId; //? if id of "current val" is not matching with id of item to be delted,
      // ?then only we will collect data in "reamingVal"
    })
    // console.log("remaining val",reaminingVal);
    // setFormData({...formData, items: reaminingVal });
    setMultiTask(reaminingVal)
  }


  //!step 2 : Context Provider --> Wrap consumer by Context provider
  return (
    <TaskApi.Provider
      value={{
        formData,
        handleChange,
        handleSubmit,
        selectedCategory,
        handleCategory,
        multiTask,
        handleEdit,
        handleDelete
      }}
    >
      {props.children} {/*FormContainer.jsx  and TodoList.jsx*/}
    </TaskApi.Provider>
  );
}

export default TaskContext