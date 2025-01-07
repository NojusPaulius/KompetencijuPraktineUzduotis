import { useEffect, useState } from "react"
import axios from "axios";
import { url } from "../../utilities/url"
import Question from "../question/Question"
const Questions = (props) => {
    const [questions, setQuestions] = useState([])
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
        <section
         className="inline-flex flex-row flex-wrap justify-between w-10/12"
         >
            {questions.map((question) => (
                <Question key={question._id} title={question.title} description={question.description} image={question.image} _id={question._id}/>
            ))}
        </section>
    )
}
export default Questions