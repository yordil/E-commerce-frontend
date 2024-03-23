import React, { useState, useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./orders.module.css";
import ProductCard from "../../Components/Product/ProductCard";
const Orders = () => {
	const [{ user }, dispatch] = useContext(DataContext);
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				});
		} else {
			setOrders([]);
		}
	}, []);

	return (
		<Layout>
			<section className={classes.container}>
				<div className={classes.orders__container}>
					<h2>Your Orders</h2>
					{/* orderd items */}
					{orders?.length == 0 && (
						<div style={{ padding: "20px" }}>you don't have order yet.</div>
					)}
					<div>
						{orders?.map((eachOrder, i) => {
							return (
								<div key={i}>
									<hr />
									<p>Order ID: {eachOrder?.id}</p>
									{eachOrder?.data?.basket?.map((order, i) => (
										<ProductCard flex={true} product={order} key={order.id} />
									))}
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Orders;
