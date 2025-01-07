import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import Question from "../question/Question"
import { url } from "../../utilities/url"

const UserPage = () => {

    // const navigate = useNavigate()
    const userId = useLocation().pathname.split("/")[2]
    const [user, setUser] = useState({})
    const [questions, setQuestions] = useState([])
    const [likedQuestions, setLikedQuestions] = useState([])
    const [loading, setLoading] = useState("true")

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await axios.get(`${url}/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setUser(res.data.data.user)
                setQuestions(res.data.data.user.questions)
                setLikedQuestions(res.data.data.user.likes)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadUser()
            setLoading(false)
        }
    }, [loading, userId])

    return(
        <div>
            <h2>{user.username}</h2>
            <h2>{user.username}'s questions</h2>
            <article>
                {questions.map(question => (
                    <Question title={question.title} description={question.description} image={question.image} _id={question._id}/>
                ))}
            </article>
            <h2>{user.username}'s liked questions</h2>
            <article>
                {likedQuestions.map(question => (
                    <Question title={question.title} description={question.description} image={question.image} _id={question._id}/>
                ))}
            </article>

        </div>
    )
}

export default UserPage