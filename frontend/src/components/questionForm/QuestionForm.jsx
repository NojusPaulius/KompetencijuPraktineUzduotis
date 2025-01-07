import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../utilities/url";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const QuestionForm = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [category, setCategory] = useState("");
    const [question, setQuestion] = useState({
        title: "",
        category: "",
        description: "",
        image: "",
        creator: jwtDecode(localStorage.getItem("token")).id
    })

    const handleChange = (e)=>{
        setQuestion({
            ...question,
            [e.target.name]: e.target.value
        })
    }
    const handleCategoryChange = (e)=>{
        setCategory(e.target.value);
    }

    const handleCategorySubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post(`${url}/categories`, { category: category },{
                headers:{ 
                    "Authorization" : `Bearer ${localStorage.getItem("token")}` 
                }
            })
            setCategory('');
            setLoading(true)
        }catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        const loadCategories = async () =>{
            try{
                const res = await axios.get(`${url}/categories`,{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setCategories(res.data.data.categories)
            }
            catch(err){
                console.error(err)
            }   
        }
        if(loading){
            loadCategories()
            setLoading(false)
        }
    }, [loading])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${url}/questions`, question, {
                headers:{ 
                    "Authorization" : `Bearer ${localStorage.getItem("token")}` 
                }
            }
        );
            navigate("/");
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        <div className="w-3/12 h-4/5">
            <form className="flex flex-col justify-start items-center w-full border-8 border-jinx-hair-dark rounded-3xl my-10" onSubmit={handleSubmit}>
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
                <button className="bg-blue-400 my-3 mb-10 w-36 rounded-3xl hover:bg-blue-500" type="submit">Post</button>
            </form>

            <form onSubmit={handleCategorySubmit}>
                <h3>Add category</h3>
                <input type="text" name="category" value={category} onChange={handleCategoryChange}></input>
                <button className="bg-green-500 my-3" type="submit">press me!</button>
            </form>
        </div>
    )
}

export default QuestionForm