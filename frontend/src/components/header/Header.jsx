import { useNavigate } from "react-router-dom"


const Header = () =>{

        const navigate = useNavigate()
        const username = localStorage.getItem("username")

        const handleProfile = () => {
            navigate("/profile")
        }

        const handleMain = () => {
            navigate("/")
        }

        const handleForm = () => {
            navigate("/form")
        }

        const handleLogout = () => {
            localStorage.removeItem("username")
            localStorage.removeItem("role")
            localStorage.removeItem("token")
            navigate("/login")
        }

    return(
        <>
        {localStorage.getItem("token") && <header className="bg-jinx-hair w-full h-1/5 flex justify-between items-center text-jinx-skin border-8 border-jinx-hair-dark" >
            <p className="text-8xl p-6 inline rounded-md hover:bg-jinx-hair-dark cursor-pointer mx-4" onClick={handleMain}>Home</p>
            <nav className="inline mx-4">
                <ul className="inline ">
                    <li className="text-6xl inline p-5 rounded-md hover:bg-jinx-hair-dark cursor-pointer" onClick={handleForm}>Add question</li>
                    <li className="text-6xl inline p-5 rounded-md hover:bg-jinx-hair-dark cursor-pointer" onClick={handleProfile}>{username}</li>
                    <li className="text-6xl inline p-5 rounded-md hover:bg-jinx-hair-dark cursor-pointer " onClick={handleLogout}>logout</li>
                </ul>
            </nav>
        </header>}
    </>
    )
}

export default Header