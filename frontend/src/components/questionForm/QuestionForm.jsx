import { useState } from "react"


const QuestionForm = () => {

    const [question, setQuestion] = useState({
        title: "",
        category: "",
        description: "",
        image: ""
    })

    const handleChange = (e)=>{
        setQuestion({
            ...question,
            [e.target.name]: e.target.value
        })
    }

    return(
        <form>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={question.title} onChange={handleChange}></input>
            </div>
            <div>
                <label>Category:</label>
            <select name="category" value={question.category} onChange={handleChange}>

            </select>
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={question.description} onChange={handleChange}></textarea>
            </div>
            <div>
                <label>Image:</label>
                <input type="text" name="image" value={question.image} onChange={handleChange}></input>
            </div>
            <button type="submit">Post</button>
        </form>
    )
}

export default QuestionForm