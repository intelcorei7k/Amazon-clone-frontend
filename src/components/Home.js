import React, { useEffect, useState } from 'react';
import { getProducts } from '../library';
import Product from './Product';
import './styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Object.keys(products).length === 0 &&
      getProducts()
        .then((res) => res.status === 200 && setProducts(res.data))
        .catch((error) => {});
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <img
          className="home-image"
          src="https://m.media-amazon.com/images/I/71WuHHp+uDL._SX3000_.jpg"
          alt="hero-back"
        ></img>

        <div className="home-row">
          {products?.slice(0, 2).map((item, i) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.imageUrl}
              rating={item.rating}
            />
          ))}
        </div>

        <div className="home-row">
          {products?.slice(2, 5).map((item, i) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.imageUrl}
              rating={item.rating}
            />
          ))}
        </div>

        <div className="home-row">
          {products?.slice(5, 6).map((item, i) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.imageUrl}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
