import { Link } from "react-router-dom";
import { useState } from "react";
import "./RegisterForm.css"
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault(); // prevents form submission

        // Try to fetch 
        try {
            const response = await fetch("http://127.0.0.1:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.access_token);
                navigate('/')
                // setIsLoggedIn(true);
            }
        } catch (error) {
            console.log("Login failed:", error);
        }
    }

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <div className="container RegisterForm">
            {/* If LoggedIn, show logout; if LoggedOut, show Login Form */}
            {isLoggedIn ? (
                <div className="LogoutBox">
                    <h1>
                        You Are Logged In!
                    </h1>
                    <button className="Logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : <form className="Form" action="" method="post" onSubmit={handleRegister}>
                <div className="Credentials">

                    <div className="UserBox">
                        <label className="Username" htmlFor="">Username</label>
                        <input className="Username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" required/>
                    </div>

                    <div className="PassBox">
                        <label className="Password" htmlFor="">Password</label>
                        <input className="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required/>
                    </div>
                
                    <div className="EmailBox">
                        <label className="Email" htmlFor="">Email</label>
                        <input className="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required/>
                    </div>

                    <div className="LogBox">
                        <p id="LogPara">
                            Already have an account?
                        </p>

                        <Link id="LogButton" to="/login">Log in</Link>
                    </div>

                </div>

                <div className="SubmitButton">
                    <button className="Signup">
                        Signup
                    </button>
                </div>

            </form>}

        </div>
    );
}

export default RegisterForm;