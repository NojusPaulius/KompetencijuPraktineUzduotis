import { useNavigate } from "react-router-dom"
const Question = (props) => {
    const navigate = useNavigate();

    const handleExpand = () => {
        navigate(`/questions/${props._id}`)
    }
    return(
        <article className="flex flex-col items-center m-4 p-4 bg-jinx-pants-light border-2 border-jinx-tattoo rounded-md shadow-2xl w-full md:w-1/3 lg:w-30%" >
            <div className="w-full h-48 overflow-hidden">
                <img src={props.image} className="object-cover w-full h-full" alt="missing image"></img>
            </div>
            <div className="inline-flex flex-col justify-center items-center space-y-1">
                <h5 className="text-lg font-semibold">{props.title}</h5>
                <p className="text-sm text-gray-600">{props.description}</p>
                <button className="p-1 px-2 bg-jinx-hair rounded-2xl hover:bg-jinx-hair-dark text-jinx-skin" onClick={handleExpand}>more info</button>
            </div>
        </article>
    )
}
export default Question