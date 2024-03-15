import React, { useState } from 'react';

interface ProductOption {
    name: string;
    quantity: number;
}

interface Product {
    name: string;
    options: ProductOption[];
}

const InventoryManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = () => {
        const newProduct: Product = {
            name: '',
            options: [],
        };
        setProducts([...products, newProduct]);
    };

    const addOption = (productIndex: number) => {
        const newOption: ProductOption = {
            name: '',
            quantity: 0,
        };
        const updatedProducts = [...products];
        updatedProducts[productIndex].options.push(newOption);
        setProducts(updatedProducts);
    };

    const handleProductChange = (productIndex: number, name: string) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].name = name;
        setProducts(updatedProducts);
    };

    const handleOptionChange = (productIndex: number, optionIndex: number, name: string, quantity: number) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].options[optionIndex].name = name;
        updatedProducts[productIndex].options[optionIndex].quantity = quantity;
        setProducts(updatedProducts);
    };

    return (
        <div>
            <button onClick={addProduct}>Add Product</button>
            {products.map((product, productIndex) => (
                <div key={productIndex}>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductChange(productIndex, e.target.value)}
                    />
                    <button onClick={() => addOption(productIndex)}>Add Option</button>
                    {product.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                            <input
                                type="text"
                                value={option.name}
                                onChange={(e) => handleOptionChange(productIndex, optionIndex, e.target.value, option.quantity)}
                            />
                            <input
                                type="number"
                                value={option.quantity}
                                onChange={(e) => handleOptionChange(productIndex, optionIndex, option.name, parseInt(e.target.value))}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default InventoryManager;