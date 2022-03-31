import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { addToLocalStorage, clearFromLocalStorage, getFromLocalStorage } from "../Utilites/Utilites";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  console.log(products);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  
  // my practice part start
  useEffect ( () => {
    if (products.length) {
      const storedProductIds = getFromLocalStorage ();

      const previousCart = [];

      for (const id in storedProductIds) {
        const foundProduct = products.find (product => product.id === id);

        if (foundProduct) {
          const quantity = storedProductIds[id];
          foundProduct.quantity = quantity;
          previousCart.push (foundProduct);
        }
      }
      setCart (previousCart);
    }
  }, [products]);

  // my practice part end
  
  // my practice part start
  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find (product => product.id == selectedProduct.id);

    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    }else {
      const rest = cart.filter (product => product.id !== selectedProduct.id);

      selectedProduct.quantity = selectedProduct.quantity + 1;
      newCart = [...rest, selectedProduct];

    }
    addToLocalStorage (selectedProduct.id);
    setCart (newCart);
  };
  // my practice part end

  const handleClearCart = () => {
    setCart ([]);
    clearFromLocalStorage ();
  };

  return (
    <>
      <div className='shop'>
        <div className='products-container'>
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
        <div className='cart-container'>
          <Cart
            cart={cart}
            products={products}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;
