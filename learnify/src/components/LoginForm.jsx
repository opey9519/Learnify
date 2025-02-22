import { useState } from "react";
import "./LoginForm.css"

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // prevents form submission

        try {
            const response = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.access_token);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.log("Login failed:", error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <div className="container LoginForm">
            {/* If LoggedIn, show logout; if LoggedOut, show Login Form */}
            {isLoggedIn ? (
                <div>
                    <h1>
                        You Are Logged In!
                    </h1>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : <form className="Form" action="" method="post">
                <div className="Credentials">
                    <div className="UserBox">
                        <label className="Username" htmlFor="">Username</label>
                        <input className="Username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                    </div>

                    <div className="PassBox">
                        <label className="Password" htmlFor="">Password</label>
                        <input className="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    </div>
                    {/* Need to create Email specific box */}
                    <div className="EmailBox">
                        <label className="Email" htmlFor="">Email</label>
                        <input className="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                    </div>

                </div>

                <div className="SubmitButton">
                    <button onClick={handleLogin} className="Login">
                        Login
                    </button>
                </div>

            </form>}

        </div>
    );
}

export default LoginForm;