import React from "react";
import { categoryinfos } from "./CategoryFullInfo";
import Categorycard from "./CategoryCard";
import classes from "./Category.module.css";
function Category() {
	return (
		<div>
			<section className={classes.category_container}>
				{categoryinfos.map((infos, i) => {
					return <Categorycard data={infos} key={i} />;
				})}
			</section>

			
		</div>
	);
}

export default Category;
