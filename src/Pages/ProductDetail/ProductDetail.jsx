import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import classes from "./ProductDetail.module.css";
import axios from "axios";
import { productUrl } from "../../Api/endpoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

const ProductDetail = () => {
	const [product, setproduct] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const { productId } = useParams();
	
	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${productUrl}/products/${productId}`)
			.then((res) => {
				console.log(res.data)
				setproduct(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, [productId]);
	// console.log(product);
	return (
		<Layout>
			{isLoading ? <Loader /> : (<ProductCard product={product} 
				flex = {true}
				renderDesc={true}
			
			/>)}
		</Layout>
	);
};

export default ProductDetail;
