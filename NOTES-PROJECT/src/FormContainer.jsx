import React, { useContext } from 'react'
import {TaskApi} from "./context/TaskContext"

const FormContainer = () => {

    //!step 3: context consumer
    //?Syntax : let value=useContext(ContextApi)
    let data = useContext(TaskApi);
    // console.log(data);
    let {formData,handleChange, handleSubmit} = data;
    let { title, description ,category} = formData;

  return (
    <>
      <form onSubmit={handleSubmit} className='formContainer'>
        <section>
          <h1>📝 TAKE NOTES</h1>
        </section>
        <section>
          <label htmlFor="tname" className='form_label'>TITLE : </label>
          <div>
            <input
              type="text"
              id="tname"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
        </section>
        <section>
          <label htmlFor="desc" className='form_label'>DESCRIPTION : </label>
          <div>
            <textarea
              id="desc"
              cols={21}
              rows={7}
              name="description"
              value={description}
              onChange={handleChange}
            ></textarea>
          </div>
        </section>
        <section>
          <label htmlFor="cat" className='form_label'>CATEGORY :</label>
          <select id='cat' name="category" value={category} onChange={handleChange}>
            <option value="" disabled>
              --select--
            </option>
            <option value="general">GENERAL</option>
            <option value="official">OFFICIAL</option>
            <option value="technical">TECHNICAL</option>
          </select>
        </section>
        <section className='btn'>
          <button>SUBMIT</button>
        </section>
      </form>
    </>
  );
}
export default FormContainer

//!When we provide "multi input options" for the user,value attr(react) & onChange
//!should be given to "immediate parent tag" of "multi input options"
//?checkbox,radio-btn,drop-down