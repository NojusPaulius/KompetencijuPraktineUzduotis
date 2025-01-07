import axios from "axios";
import { url } from "../../utilities/url";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Question from "../question/Question";



const ProfilePage = () =>{

    const [users, setUsers] = useState([])
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)

    const getUser  = jwtDecode(localStorage.getItem("token"))
    const [questions, setQuestions] = useState([])
    const [likedQuestions, setLikedQuestions] = useState([])


    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await axios.get(`${url}/users/${getUser.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setQuestions(res.data.data.user.questions)
                setLikedQuestions(res.data.data.user.likes)
                setUser(res.data.data.user.username)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadUser()
            setLoading(false)
        }
    }, [loading])

    useEffect (() => {
        const loadUsers = async () => {
            try {
                await axios.get(`${url}/users`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem("token")}`
                    }
                }).then((res) => {
                    setUsers(res.data.data.users)
                })
            }catch(err)
            {console.error(err)
            }
        }
        if(loading){
            loadUsers()
            setLoading(false)
        }
    },[loading])

    const handleKill = async (id) => {
        try {
            await axios.delete(`${url}/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            });
            setLoading(true)
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <>
            <div className="w-7/12">
                <h2>{user}</h2>
                <h2>{user}'s questions</h2>
                <article className="flex flex-wrap">
                    {questions.map(question => (
                        <Question key={question._id} title={question.title} description={question.description} image={question.image} _id={question._id}/>
                    ))}
                </article>
                <h2>{user}'s liked questions</h2>
                <article>
                    {likedQuestions.map(question => (
                        <Question key={question._id} title={question.title} description={question.description} image={question.image} _id={question._id}/>
                    ))}
                </article>

            </div>
            <div>
                <ol>
                    {users.map(user => (
                        <div key={user._id}>
                            <li className="text-3xl">{user.username}</li>
                            {<button className="bg-red-700 text-2xl" onClick={() => handleKill(user._id)}>delete</button>}
                        </div>
                    ))}
                </ol>
            </div>
        </>
    )
}

export default ProfilePage