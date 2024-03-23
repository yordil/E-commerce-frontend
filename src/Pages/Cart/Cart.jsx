import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./cart.module.css";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { Type } from "./../../Utility/actiontype";


function Cart() {
	const [{ basket, user }, dispatch] = useContext(DataContext);
	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);

	const increment = (item) => {
		dispatch({
			type: Type.ADD_TO_BASKET,
			item,
		});
	};

	const decrement = (id) => {
		dispatch({
			type: Type.REMOVE_FROM_BASKET,
			id,
		});
	};

	return (
		<Layout>
			<section className={classes.container}>
				<div className={classes.cart_container}>
					<h2>Hello</h2>
					<h3>Your shopping basket</h3>
					<hr />
					{basket?.length === 0 ? (
						<p>No items in your cart.</p>
					) : (
						basket?.map((item) => (
							<section className={classes.cart_product}>
								<ProductCard
									product={item}
									renderDesc={true}
									renderAdd={false}
									flex={true}
								/>
								<div className={classes.btn_container}>
									<button
										className={classes.btn}
										onClick={() => increment(item)}
									>
										<TiArrowSortedUp size={30} />
									</button>
									<span>{item.amount}</span>
									<button
										className={classes.btn}
										onClick={() => decrement(item.id)}
									>
										<TiArrowSortedDown size={30} />
									</button>
								</div>
							</section>
						))
					)}
				</div>
				{basket?.length !== 0 && (
					<div className={classes.subtotal}>
						<div>
							<p>subtotal ({basket?.length} items)</p>
							<CurrencyFormat amount={total} />
						</div>
						<span>
							<input type="checkbox" />
							<small>This order contains a gift</small>
						</span>
						<Link to="/payments">Continue to checkout</Link>
					</div>
				)}
			</section>
		</Layout>
	);
}

export default Cart;
