import React from 'react';
import './App.css';

const MiniCart = ({ cartItems, productTitle, productPrice, productImage }) => {
  return (
      <div className="mini-cart-items" >
        {cartItems.map((item) => (
            <div className="cart-section" key={item.size}>
                <img  src={productImage} alt="Classic Tee" style={{height: "100px",verticalAlign: "top"}} />
                <div className="cart-item">
                    <span className='cartItemDetail'> {productTitle}  </span>
                    <span className='cartItemDetail'>Size: {item.size} x {item.quantity}</span>
                    <span className='cartItemDetail'> ${productPrice}</span>
                </div>
            </div>
   
        ))}
      </div>
  );
};

export default MiniCart;
