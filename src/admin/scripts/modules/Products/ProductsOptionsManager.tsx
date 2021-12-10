import React from 'react';

import { useProductsOptions } from '../../hooks/model';

interface ProductsOptionsManagerProps {
	value: any;
	onChange: (value: any) => void;
}

const ProductsOptionsManager = ({}: ProductsOptionsManagerProps) => {
	const { ProductsOptions } = useProductsOptions();

	return (
		<>
			<div>...ProductsOptionsManager...</div>
		</>
	);
};

export default ProductsOptionsManager;
