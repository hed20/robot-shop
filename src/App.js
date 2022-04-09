import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import Footer from './components/Footer';
import CheckOut from './components/CheckOut';
import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SubmitOrder from './components/SubmitOrder';


function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  
  //Local API with stored shop data.
  useEffect (() => {
    fetch('http://localhost:2000/robots')
      .then((res) => {
        //Response object
        return res.json();
      })
      //Recieved data
      .then((data) => {
        setProducts(data);
      });
  }, [])

  //Add to cart
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (product.inStock !== 0) {
      if(exist) {
        setCartItems(cartItems.map((x) => 
          x.id === product.id ? {...exist, qty: exist.qty + 1} : x ));
      } else {
        setCartItems ([...cartItems, {...product, qty: 1}]);
      }
    }else {
      alert('This product is out of stock!');
    }
  };

  //Remove product from cart
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if(exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(cartItems.map((x) => 
        x.id === product.id ? {...exist, qty: exist.qty - 1} : x 
        )
      );
    }
  };

    /**Retrieve data stored in the localstorage  */
  useEffect (() => {
    const cartData = window.localStorage.getItem("robot-store-key");
    setCartItems(JSON.parse(cartData));
  }, [])
  /**Store cart data in the localstorage to preserve on page update */
  useEffect (() => {
      /**Store current cart in local storage */
      window.localStorage.setItem("robot-store-key", JSON.stringify(cartItems));
  })

  return (
    <Router>
      <div className="App">
        <Header countCartItems={cartItems?.length}></Header>
        
        <Routes>
          <Route path='/' element={(
            <div className='row'>
              <Main onAdd={onAdd} products={products} cartItems={cartItems}/>
              <Basket onAdd = {onAdd} onRemove={onRemove} cartItems={cartItems} products={products}></Basket>
            </div>
          )}></Route>
          <Route path='/checkout' element={(
            <div>
              <CheckOut onAdd = {onAdd} onRemove={onRemove} cartItems={cartItems}/>
            </div>
          )}></Route>
          <Route path='/submitorder' element={<SubmitOrder/>}>

          </Route>
        </Routes>
        
        <Footer></Footer> 
      </div>
    </Router>
  );
}

export default App;
