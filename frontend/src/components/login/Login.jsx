import { useState } from "react"
import axios from "axios"
import { url } from "../../utilities/url.js"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/users/login`, user);
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('username', res.data.data.username )
            localStorage.setItem('role', res.data.data.role )
            navigate('/');
          } catch (err) {
            console.error(err);
          }
    }
    return(
        <form onSubmit={handleSubmit} className="m-24 w-3/12 flex-col justify-center items-center">
                <h2 className="text-center text-8xl p-10">Log in</h2>
                <div className="w-full border-4 rounded-2xl h-auto border-jinx-hair-dark p-1">
                    <div className="p-4">
                        <input className="w-full border-4 rounded-2xl border-jinx-hair-dark p-1" type="email" name="email" id="email" placeholder="Email" value={user.email} onChange={handleChange}/>
                    </div>
                    <div className="p-4">
                        <input className="w-full border-4 rounded-2xl border-jinx-hair-dark p-1" type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChange}/>
                    </div>
                    <div className="p-4 flex justify-center">
                        <button className="w-30% border-4 rounded-2xl border-jinx-hair-dark hover:bg-jinx-pants-light" type="submit">Log In</button>
                    </div>
                    <div className="p-2 flex justify-center">
                        <a href="/register" className="text-2xl">Don't have an account?</a>
                    </div>
                </div>
        </form>
    )
}

export default Login