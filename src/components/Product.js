import React, { useEffect, useState } from 'react'

export default function Product(props) {
  const { product , onAdd, cartItems } = props;
  const [counter, setCounter] = useState(1);

  const UpdateBD = (e) => {
    setCounter(counter+1);

    const newStock = e.inStock - counter;
    fetch(`http://localhost:2000/robots/${e.id}`, {
      method: 'PUT',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({
        id: e.id,
        name: e.name, 
        price: e.price, 
        image: e.image,
        inStock: newStock,
      })
    }).then((res) => {
      return res.json();
    });
    window.location.reload();
  }
 
  const stockEmpty = () => {
    alert('This product is out of stock!');
  }

  return (
    <div>
        <div className='img-box' >
          <img  alt={product.name}></img> 
        </div>
        <div className='info-box'>
          <h3 >{product.name}</h3>
          <div>{product.price} kr</div>
          <div>{product.inStock}</div>
        </div>
        {product.inStock >= 1 ? 
          (
            <div>
              <button className='add-button' onClick={()=> {onAdd(product);  UpdateBD(product)}}>Add to Cart</button>
            </div>
          ) : 
          (
            <div>
              <button className='add-button' onClick={() => stockEmpty()}>Add to Cart</button>
            </div>
          )
        }
    </div>
  )
}
