import React, { useState, useEffect } from 'react';
import MiniCart from './MiniCart';
import './App.css';

const App = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsAmount, setCartItemsAmount] = useState(0);
  const [cartReview,setCartReview] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product'
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  if (!product) {
    return <div>Loading...</div>;
  }
  const handleSizeButtonClick = (size) => {
    setSelectedSize(size)
    setError(false);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      setCartItemsAmount(cartItemsAmount + 1);
      const existingCartItem = cartItems.find((item) => item.size === selectedSize);
      if (existingCartItem) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item.size === selectedSize ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        const newCartItem = { size: selectedSize, quantity: 1, product: product.title }; 
        setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="App">
      <header className="header-container">
            <div className='cartButton'>
              <button type="button" className="btn btn-outline-dark cartButton" onClick={()=>setCartReview(true)} style={{outline:"none"}}>
                <span className="material-symbols-outlined">
                  shopping_cart_checkout 
                </span>
                <span className="cartAmount">{cartItemsAmount}</span> 
             </button>
            </div>
      </header>
      <main>
        <div className='row'>
          {cartReview && cartItemsAmount ?
          ( <div className="mini-cart col-lg-2  col-sm-8">
              <MiniCart cartItems={cartItems} productTitle={product.title} productPrice={product.price} productImage={product.imageURL}/>
            </div>)
          :(<></>)  
          }
          <div className="container text-center main-part col-10">
            <div className="row">
              <div className="col-lg-6 col-sm-12 ">
                  <section className="product-section">
                    <div >
                      <img className="product-image" src={product.imageURL} alt="Classic Tee"/>
                    </div>         
                  </section>
              </div>
              <div className="col-lg-6 col-sm-12">
                <section className="mini-cart-section">
                  <div className="intro-part">
                    <h4 className="product-title">{product.title}</h4>
                    <h5 className="product-price">${product.price}</h5>
                    <p className="product-text">{product.description}</p>
                    <p className="product-label">SIZE * {selectedSize}</p>
                    <div className="product-size" >
                        {product.sizeOptions.map((size) => (
                            <div key={size.id} className="size-options-container">
                              {selectedSize === size.label ? 
                              ( <button className="btn btn-dark"  onClick={() => handleSizeButtonClick(size.label)} style={{width:"40px"}}>
                                {size.label}
                                </button > )
                              :( <button className="btn btn-outline-dark"  onClick={() => handleSizeButtonClick(size.label)} style={{width:"40px"}}>
                                  {size.label}
                                </button >)}
                            </div>
                        ))}
                    </div>
                    <div className="product-add">
                      <button type="button" className="btn btn-outline-dark" onClick={handleAddToCart}>ADD TO CART</button>
                      {error && <p id="error-message">*Please select a size</p>}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div >
      </main>
    </div>
  );
};

export default App;

