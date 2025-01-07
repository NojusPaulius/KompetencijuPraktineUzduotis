import { useLocation } from "react-router-dom";
import { url } from "../../utilities/url";
import axios from "axios";
import {useState, useEffect} from "react";
import { jwtDecode } from "jwt-decode"

import { useNavigate } from "react-router-dom";
import Comments from "./Comments";

const QuestionPage = () => {
    const navigate = useNavigate();
    const questionId = useLocation().pathname.split("/")[2]
    const user = jwtDecode(localStorage.getItem("token")).id
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState({})
    const [likes, setLikes] = useState(0)
    const [like, setLike] = useState("black")

    useEffect (() => {
        const loadQuestion = async () => {
            try {
                await axios.get(`${url}/questions/${questionId}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                }).then((res) => {
                    setQuestion(res.data.data.question)
                })
            }catch(err)
            {console.error(err)
            }
        }
        if(loading){
            loadQuestion()
            setLoading(false)
        }
    },[loading, questionId, user])

    const [comment, setComment] = useState({
        content: "",
        creator: jwtDecode(localStorage.getItem("token")).id,
        question: questionId
    })

    const handleChange = (e)=>{
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/comments`, comment,  {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            })
        setLoading(true)
        comment.content = ""
          } catch (err) {
            console.error(err);
          }
    }

    const handleLike = async () => {
        if (like === "black"){
            setLike("green")
        } else {
            setLike("black")
        }
        try {
            await axios.post(`${url}/questions/${questionId}`, {likes: user} ,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            }).then((res) => {
                setLikes(res.data.data.question.likes.length)
            })            
        } catch (error) {
            console.error(error)
        }
      }

    const handleDelete = async (e) => {
        e.preventDefault();
        try{
            await axios.delete(`${url}/questions/${questionId}`, {
                headers: {

                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            navigate("/")
        } catch(err) {
            console.error(err);
        }
    }

    return(
        <section className="flex flex-col items-center">
            <div className="mt-8 mb-4">
                <h2 className="text-4xl">{question.title}</h2>
                <div className="mt-3 flex justify-center">
                    {((question.creator ? question.creator.username === localStorage.getItem("username") : false) || (localStorage.getItem("role") === "admin")) && <button className="mx-2 w-20 bg-red-500 hover:bg-red-600 rounded-xl" onClick={handleDelete}>Delete</button>}
                    {(question.creator ? question.creator.username === localStorage.getItem("username") : false) && <button className="mx-2 w-20 bg-orange-500 hover:bg-orange-600 rounded-xl" onClick={() => {navigate(`/edit/${question._id}`)}}>Edit</button>}
                </div>
            </div>
            <div className="flex flex-col items-center mb-5">
                <p className="text-3xl">Created by:</p>
                <a className="text-3xl" href={`/user/${question.creator ? question.creator._id : ''}`}>
                    {question.creator ? question.creator.username : 'Unknown User'}
                </a>
                <p className="">{question.category ? question.category.category : "None"}</p>
            </div>
            <div className="flex flex-col items-center">
                <img className=" my-5 border-8 border-jinx-pants-light" src={question.image} alt={question.image}/>
                <div className="text-xl" style={{height: "auto"}}>{question.description}</div>
            </div>
            <div>
                <span className="hover:cursor-pointer" onClick={handleLike} style={{ color: like, fontSize: "40pt"}}>♥</span> {likes}
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset className="flex flex-col items-center">
                    <div className="my-3 w-56">
                        <textarea  className="w-full border-4 rounded-2xl border-jinx-hair-dark"
                         name="content" id="content" placeholder="Comment" value={comment.content} onChange={handleChange}></textarea>
                    </div>
                        <button className="bg-blue-400 my-3 mb-10 w-36 rounded-3xl hover:bg-blue-500" type="submit">post comment</button>
                </fieldset>
            </form>
            <article className="w-full">
                {question.comments && <Comments comments={question.comments} loading={setLoading}/>}
            </article>
        </section>
    )
}

export default QuestionPage;
