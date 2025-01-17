import { useState, useEffect } from "react"
import axios from "axios"
import { url } from "../../utilities/url"
import { jwtDecode } from "jwt-decode"

const Comment = (props) => {
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState({})
    const [reply, setReply] = useState(false)
    const [expand, setExpand] = useState("Reply")
    const [likes, setLikes] = useState(0)
    const [like, setLike] = useState("black")

    useEffect(() => {
        const loadComment = async () => {
            try {
                const res = await axios.get(`${url}/comments/${props._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setComment(res.data.data.comment)
                setLikes(res.data.data.comment.likes)
                for (let i of res.data.data.comment.likes) {
                    if (jwtDecode(localStorage.getItem("token")).id === i._id){
                        setLike("green")
                        break
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
        if (loading){
            loadComment()
            setLoading(false)
        }
    }, [loading, props._id, comment, like, likes])

    const handleReply = () => {
        if(reply){
            setReply(false)
            setExpand("Reply")
        } else {
            setReply(true)
            setExpand("Close")
        }
    }

    const [response, setResponse] = useState({
        content: "",
        creator: jwtDecode(localStorage.getItem("token")).id,
        comment: props._id
    })

    const handleChange = (e)=>{
        setResponse({
            ...response,
            [e.target.name]: e.target.value
        })
    }
    const [loading2, setLoading2] = useState(true)
    const [replies, setReplies] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${url}/comments`, response,  {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            })
            setLoading(true)
            setLoading2(true)
            response.content = ""
          } catch (err) {
            console.error(err);
          }
    }
    useEffect(() => {
        const loadPost = async () => {
            try {
                const res = await axios.get(`${url}/comments/${props._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setReplies(res.data.data.comment.comments)
            } catch (err) {
                console.error(err);
            }
        }
        if (loading2){
            loadPost()
            setLoading2(false)
        }
    }, [loading2, props._id])
    const handleDelete = async () => {
        try {
            await axios.post(`${url}/comments/delete/${props._id}`, comment, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            })
            props.loading(true)
            setLoading(true)
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
            await axios.post(`${url}/comments/${props._id}`, {likes: jwtDecode(localStorage.getItem("token")).id}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                  }
            });
            props.loading(true)
            setLoading(true)
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <article className="p-5 my-6 w-full border-4 rounded-2xl bg-jinx-pants-light border-jinx-tattoo">
            {(comment.creator ? comment.creator.username === localStorage.getItem("username") : false || localStorage.getItem("role") === "admin") && <div onClick={handleDelete} className="float-end hover:cursor-pointer">
                🗑
            </div>}
            <div className="float-end hover:cursor-pointer" onClick={handleLike} style={{ color: like, fontSize: "20pt"}}>♥ {likes.length}</div>
            <a href={`/user/${comment.creator ? comment.creator._id : ''}`}>
                {comment.creator ? comment.creator.username : 'Unknown User'}
            </a>
            <h2 style={{fontSize: "20px"}}>{comment.content}</h2>
            {reply && 
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div>
                            <textarea className="border-2 rounded-2xl border-jinx-hair-dark"  name="content" id="content" placeholder="Reply" value={response.content} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <button className="bg-blue-700 p-1 rounded-2xl" type="submit">Reply</button>
                        </div>
                    </fieldset>
                </form>}
            <button className={expand === "Close"? "bg-purple-700 p-1 rounded-2xl my-2": "bg-blue-700  rounded-2xl p-1 my-2"}  onClick={handleReply}>{expand}</button>
            {replies.map(reply => (
                <Comment key={reply} _id={reply} loading={setLoading2}/>
            ))}
        </article>
    )
}

export default Comment