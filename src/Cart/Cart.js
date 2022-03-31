import React, { useEffect, useState } from "react";
import "./Cart.css";
import { IoTrashBin } from "react-icons/io5";

const Cart = ({ cart, products, handleClearCart }) => {
  // my practice part start
  const [offer, setOffer] = useState (false);
  const [freeProduct, setFreeProduct] = useState({});

  const handleOffer = () => {
    const randomNumber = Math.floor(Math.random() * products.length);
    const item = products[randomNumber];
    setFreeProduct(item);

  }

  useEffect ( () => {
    if (cart.length > 0) {
      setOffer (true);

    }else {
      setOffer (false);
    }
  }, [cart]);
  // my practice part end

  return (
    <div className='cart'>
      <div className='cart-header'>
        <h1>Order Summary</h1>
        <button
          onClick={handleClearCart}
          className='remove-button'
          title='Clear Cart'
        >
          <IoTrashBin color='white' size={20} />
        </button>
      </div>
      {cart.map((product, index) => (
        <div key={index} className='cart-item'>
          <img src={product.pairImage} alt='' />
          <div>
            <p>
              {product.name} {product.color}
            </p>
            <p>$ {product.price}</p>
            <p>$ {product.quantity}</p>
          </div>
        </div>
      ))}
      {/* my practice part start*/}
      <p>Buy one get one free</p>
      <button onClick={handleOffer} className={ offer ? 'offer-button' : 'offer-button-disabled'}  disabled={!offer}>
        Get one for me
      </button>
      { Object.keys(freeProduct).length > 0  && (
        <div className='cart-item'>
          <img src={freeProduct.pairImage} alt='' />
          <div>
            <p>
              {freeProduct.name} {freeProduct.color}
            </p>
            <p>$ {freeProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
