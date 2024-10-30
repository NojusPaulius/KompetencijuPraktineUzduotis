import { useEffect, useState } from "react"
import axios from "axios";
import { url } from "../../utilities/url"
import Question from "../question/Question"
const Questions = (props) => {
    const [questions, setQuestions] = useState([])
    console.log(props)
    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const res = await axios.get(`${url}/questions?${props.search}${props.category}
                    `, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                      }
                });
                setQuestions(res.data.data.questions)
            } catch (err) {
                console.error(err);
            }
        }
        if (props.loading){
            loadQuestions()
            props.setLoading(false)
        }
    }, [props])

    return(
        <section className="d-flex flex-row flex-wrap">
            {questions.map(question => (
                <Question title={question.title} description={question.description} price={question.price} image={question.image} _id={question._id}/>
            ))}
        </section>
    )
}
export default Questions