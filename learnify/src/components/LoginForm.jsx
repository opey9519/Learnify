import "./LoginForm.css"

function LoginForm() {
    return (
        //
        <div className="container LoginForm">
            <form className="Form" action="" method="post">
                <div className="Credentials">
                    <div className="UserBox">
                        <label className="Username" htmlFor="">Username</label>
                        <input className="Username" type="text" />
                    </div>

                    <div className="PassBox">
                        <label className="Password" htmlFor="">Password</label>
                        <input className="Password" type="password" />
                    </div>
                    {/* Need to create Email specific box */}
                    <div className="EmailBox">
                        <label className="Email" htmlFor="">Email</label>
                        <input className="Email" type="email" />
                    </div>

                </div>

                <div className="SubmitButton">
                    <button className="Login">
                        Login
                    </button>
                </div>

            </form>
        </div>
    );
}

export default LoginForm;