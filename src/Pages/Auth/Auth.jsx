import React, { useState, useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./auth.module.css";
import Layout from "../../Components/Layout/Layout";
import { Link } from "react-router-dom";
import { useNavigation, useLocation,useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { Type} from "../../Utility/actiontype";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState({
		signin: false,
		signup: false,
	});

	const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

	const authHandler = async (e) => {
		e.preventDefault();
		if (e.target.name == "signin") {
			setLoading({ ...loading, signin: true });
			signInWithEmailAndPassword(auth, email, password)
				.then((userinfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userinfo.user,
					});
					setLoading({ ...loading, signin: false });
          
        navigate(navStateData?.state?.redirect || "/");
				})
				.catch((error) => {
					setError(error.message);
					setLoading({ ...loading, signin: false });
				});
		} else {
			setLoading({ ...loading, signup: true });
			createUserWithEmailAndPassword(auth, email, password)
				.then((userinfo) => {
					dispatch({
						type: Type.SET_USER,
						user: userinfo.user,
					});
					setLoading({ ...loading, signup: false });
          navigate(navStateData?.state?.redirect || "/");
				})
				.catch((error) => {
					setError(error.message);
					setLoading({ ...loading, signup: false });
				});
		}
	};

	return (
		<section className={classes.login}>
			<Link to="/">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
					alt=""
				/>
			</Link>
			<div className={classes.login__container}>
				<h1>Sign-In</h1>
				{
					navStateData?.state?.msg && (<small
					style ={{
						padding: "5px",
						color: "red",
						textAlign: "center",
						fontWeight: "bold",
					
					}}>
						{navStateData?.state?.msg}
				</small>)}
				<form action="">
					<div>
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
						/>
					</div>
					<button
						type="submit"
						name="signin"
						onClick={authHandler}
						className={classes.login_signInButton}
					>
						{loading.signin ? (
							<ClipLoader color="black" size={20} />
						) : (
							"Sign In"
						)}
					</button>
				</form>
				{/* agreementm*/}
				<p>
					By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest-Based Ads Notice.
				</p>

				{/* create account button */}

				<button
					type="submit"
					name="signup"
					onClick={authHandler}
					className={classes.login__registerButton}
				>
					{loading.signup ? (
						<ClipLoader color="black" size={20} />
					) : (
						"Create your Amazon Account"
					)}
				</button>
				{error && (
					<small style={{ padding: "5px", color: "red" }}>{error}</small>
				)}
			</div>
		</section>
	);
};

export default Auth;
