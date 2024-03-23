import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./payment.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/actiontype";

const Payment = () => {
	const [{ user, basket } , dispatch] = useContext(DataContext);

	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);

	const totalItem = basket?.reduce((amount, item) => {
		return item.amount + amount;
	}, 0);

	const stripe = useStripe();
	const elements = useElements();
	const [cardError, setError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		e?.error?.message ? setError(e?.error?.message) : setError("");
	};
	const [processing , setProcessing] = useState(false);

	const handlePayment = async (e) => {
		e.preventDefault();
		//  backend setup

		try {
			setProcessing(true);
			const response = await axiosInstance({
				method: "post",
				url: `/payments/create?total=${total}`,
			});

			const clientSecret = response.data?.clientSecret;
			const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});
			
			 await db
					.collection("users")
					.doc(user.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});
			
			dispatch({ type: Type.EMPTY_BASKET})
			// setProcessing(false);
			setProcessing(false);
			navigate("/orders" , {state :  { msg : "You have placed new order"}});
		} catch (error) {
			console.log(error);
			setProcessing(false);
		}
	};

	return (
		<Layout>
			{/* header */}
			<div className={classes.payment__header}>
				Checkout ({totalItem}) items
			</div>
			{/* payment method */}
			<section className={classes.payment}>
				<div className={classes.flex}>
					<h3>Delivery Address</h3>
					<div>
						<div>{user?.email}</div>
						<div>123 React Lane</div>
						<div>Chicago IL</div>
					</div>
				</div>
				<hr />
				{/* product */}
				<div className={classes.flex}>
					<h3>Review items and delivery</h3>
					<div>
						{basket?.map((item) => (
							<ProductCard product={item} flex={true} />
						))}
					</div>
				</div>
				<hr />
				{/* payment */}
				<div className={classes.flex}>
					<h3>Payment methods</h3>
					<div className={classes.payment__card__container}>
						<div className={classes.payment__details}>
							<form onSubmit={handlePayment}>
								{cardError && (
									<small style={{ color: "red" }}>{cardError}</small>
								)}
								<CardElement onChange={handleChange} />

								{/* price */}
								<div className={classes.payment__price}>
									<div>
										<span style={{ display: "flex", gap: "10px" }}>
											<p> Total Order | </p>{" "}
											<CurrencyFormat amount={total} />
										</span>
									</div>
									<button type="submit">
										{processing ? (
											<div className={classes.loading}>
												<ClipLoader color="white" size={13} />
												<p>Please Wait ... </p>
											</div>
										) : (
											<p>Pay Now</p>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Payment;
