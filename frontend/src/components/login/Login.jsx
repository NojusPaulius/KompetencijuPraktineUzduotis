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
        <form onSubmit={handleSubmit}>
                <div className="">
                    <div className="">
                        <input className="form-control" type="email" name="email" id="email" placeholder="Email" value={user.email} onChange={handleChange}/>
                    </div>
                    <div className="">
                        <input className="form-control" type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChange}/>
                    </div>
                    <div className="">
                        <button className="btn btn-primary" type="submit">Log In</button>
                    </div>
                    <div className="">
                        <a href="/register">Don't have an account?</a>
                    </div>
                </div>
        </form>
    )
}

export default Login