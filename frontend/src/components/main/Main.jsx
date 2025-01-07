import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { url } from "../../utilities/url.js"
import axios from "axios";
import Questions from "../questions/Questions.jsx";

const Main = () =>{

    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
    }, [navigate])


    useEffect(() =>{
        const loadCategories = async () =>{
            try{
                const res = await axios.get(`${url}/categories`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}` 
                    }
            });
            setCategories(res.data.data.categories);
        }catch(err){
            console.error(err)
        }
    
        };
        if(loading){
            loadCategories()
            setLoading(false)
        }
        },[loading])

        const handleSearch = (e) => {
            setLoading(true)
            setSearch(`title=${e.target.value}`)
            console.log(search)
            if(e.target.value === ""){
                setSearch("")
            }
            
        }


        const handleCategories = (e) => {
            setLoading(true)
            setCategory(`category=${e.target.value}`)
            if(e.target.value === "None"){
                setCategory("")
            }
        }

        return(
            <main className="container inline-flex flex-col items-center">
            <div className="select-container inline my-4">
                <input className="border-4 rounded-2xl border-jinx-hair-dark mx-2" type="text" placeholder="Search" onChange={handleSearch}/>
                <select className="border-4 rounded-2xl border-jinx-hair-dark mx-2" name="category" id="category" onChange={handleCategories}>
                    <option value="None">None</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.category}</option>
                    ))}
                </select>
            </div>
                <Questions search={search} category={category} loading={loading} setLoading={setLoading}/>
        </main>
        )
    }

export default Main