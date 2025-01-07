import { useState } from "react"
import axios from "axios"
import { url } from "../../utilities/url"
import { useNavigate } from "react-router-dom"
const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPasword: ""
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
            const res = await axios.post(`${url}/users/register`, user);
            console.log(res)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('role', res.data.role);
            navigate('/');
          } catch (err) {
            console.error(err);
          }
    }
    return(
        <form onSubmit={handleSubmit} className="m-24 w-3/12 flex-col justify-center items-center"> 
                <h2 className="text-center text-8xl p-10">Register</h2>
                <div className="w-full border-4 rounded-2xl h-auto border-jinx-hair-dark p-1">
                    <div className="p-4">
                        <input className="w-full border-4 rounded-2xl border-jinx-hair-dark p-1" type="text" name="username" id="username" placeholder="Username" value={user.username} onChange={handleChange}/>
                    </div>
                    <div className="p-4">
                        <input className="w-full border-4 rounded-2xl border-jinx-hair-dark p-1" type="email" name="email" id="email" placeholder="Email" value={user.email} onChange={handleChange}/>
                    </div>
                    <div className="p-4">
                        <input className="w-full border-4 rounded-2xl border-jinx-hair-dark p-1" type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChange}/>
                    </div>
                    <div className="p-4">
                        <input className="w-full border-4 rounded-2xl border-jinx-hair-dark p-1" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" value={user.confirmPassword} onChange={handleChange}/>
                    </div>
                    <div className="p-4 flex justify-center">
                        <button className="w-30% border-4 rounded-2xl border-jinx-hair-dark" type="submit">Register</button>
                    </div>
                    <div className="p-2 flex justify-center">
                        <a href="/login" className="text-2xl">Have an account?</a>
                    </div>
                </div>
        </form>
    )
}

export default Register