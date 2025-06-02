import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./LoginForm.css"
import AuthContext from "../AuthContext";

function LoginForm() {
    // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const {user, login, logout} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevents form submission

        // Try to fetch 
        try {
            const response = await fetch("http://127.0.0.1:5000/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            // console.log(data)

            if (response.ok) {
                // localStorage.setItem("token", data.access_token);
                // setIsLoggedIn(true);
                login(data)
                navigate("/")
            }
            else {
                alert("Invalid Username or Password")
            }
        } catch (error) {
            console.log("Login failed:", error);
        }
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/signout", {
            method: "POST",
        })
        localStorage.removeItem("token");
        logout();
        }
        catch (error) {
            console.log("Logout failed:", error);
        }
    }

    return (
        <div className="container LoginForm">
            {/* If LoggedIn, show logout; if LoggedOut, show Login Form */}
            {user ? (
                <div className="LogoutBox">
                    <h1>
                        You Are Logged In!
                    </h1>
                    <button className="Logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : <form className="Form" action="" method="POST" onSubmit={handleLogin}>
                <div className="Credentials">

                    <div className="UserBox">
                        <label className="text" htmlFor="">Username</label>
                        <input className="user" value={username} onChange={(e) => setUsername(e.target.value)} type="text" required />
                    </div>

                    {/* <div className="UserBox">
                        <label className="Username" htmlFor="">Username</label>
                        <input className="Username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                    </div> */}

                    <div className="PassBox">
                        <label className="Password" htmlFor="">Password</label>
                        <input className="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                    </div>



                    <div className="RegisterBox">
                        <p id="RegisterPara">
                            Dont have an account?
                        </p>

                        <Link id="RegisterButton" to="/register">Register</Link>
                    </div>

                </div>

                <div className="SubmitButton">
                    <button className="Login">
                        Login
                    </button>
                </div>

            </form>}

        </div>
    );
}

export default LoginForm;