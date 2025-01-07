import Comment from "./Comment"

const Comments = (props) => {

    const comments = props.comments

    return(
    <div className="flex flex-col items-center w-full">
        <h2 className="text-2xl my-3">Comments:</h2>
        <div className="w-full">
            {comments.length === 0 ? (
                <p>Be the first to comment!</p>
            ) : (
            comments.map(commentID => (
                    <Comment key={commentID} _id={commentID} loading={props.loading}/>
                ))
            )}
        </div>
    </div>
)}



export default Comments