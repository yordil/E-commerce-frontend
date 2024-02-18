import React from "react";
import Layout from "../../Components/Layout/Layout";
import Product from "../../Components/Product/Product";
import Category from "../../Components/Category/Category";
import Carousel from "../../Components/Carousel/Carousel";
const Landing = () => {
	return (
		<Layout>
			<Carousel />
			<Category />
			<Product />
		</Layout>
	);
};

export default Landing;
