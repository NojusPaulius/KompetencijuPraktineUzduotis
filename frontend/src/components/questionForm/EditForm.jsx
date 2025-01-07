import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { url } from "../../utilities/url"

const EditForm = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const questionId = useLocation().pathname.split("/")[2]
    const [question, setQuestion] = useState({
        title: "",
        description: "",
        image: "",
        creator: "",
        category: ""
    })

    useEffect(() => {
        const loadQuestion = async () => {
            try {
                const questionResponse = await axios.get(`${url}/questions/${questionId}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setQuestion(questionResponse.data.data.question);
    
                const categoriesResponse = await axios.get(`${url}/categories`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setCategories(categoriesResponse.data.data.categories);
                console.log(categoriesResponse)
            } catch (err) {
                console.error(err);
            }
        };
    
        if (loading) {
            loadQuestion();
            setLoading(false);
        }
    }, [loading, questionId]);

    const handleChange = (e) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/questions/update/${questionId}`, {title: question.title, description: question.description, image: question.image, category: question.category}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            navigate('/');
        } catch (err) {
            console.error('Error:', err);
        }
    };


    return(
    <div className="d-flex flex-column items-center text-center w-3/12 h-4/5 border-8 rounded-3xl border-jinx-hair-dark my-8">
        <div className="mt-5">
            <h2 className="mt-5 text-4xl inline">Edit the question:</h2>
        </div>
    
        <form className="flex flex-col justify-center items-center w-full rounded-3xl my-3" onSubmit={handleSubmit}>
            <fieldset className="flex flex-col items-center ">
            <div className="my-3 flex flex-col items-center w-72">
                    <label className="text-3xl">Title:</label>
                    <input className="w-full border-4 rounded-2xl border-jinx-hair-dark " type="text" name="title" value={question.title} onChange={handleChange}></input>
                </div>
                <div className="my-3 flex flex-col items-center w-72">
                    <label className="text-3xl">Category:</label>
                <select className="w-full border-4 rounded-2xl border-jinx-hair-dark" name="category" value={question.category} onChange={handleChange}>
                    <option  className="" value="None">None</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.category}</option>
                        ))}
                </select>
                </div>
                <div className="my-3 flex flex-col items-center w-72">
                    <label className="text-3xl">Description:</label>
                    <textarea className="w-full border-4 rounded-2xl border-jinx-hair-dark" name="description" value={question.description} onChange={handleChange}></textarea>
                </div>
                <div className="my-3 flex flex-col items-center w-72">
                    <label className="text-3xl">Image:</label>
                    <input className="w-full border-4 rounded-2xl border-jinx-hair-dark" type="text" name="image" value={question.image} onChange={handleChange}></input>
                </div>
                    <button className="w-40 bg-yellow-300 rounded-2xl hover:bg-yellow-400 my-5" type="submit">Edit</button>
                
            </fieldset>
        </form>
    </div>
    )
}

export default EditForm