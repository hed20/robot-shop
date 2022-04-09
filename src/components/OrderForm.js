import React, { useState, useEffect } from 'react'

export default function OrderForm(props) {
const {cartItems} = props;
const [loading, setLoading] = useState(false);

const [forName, setForName] = useState("");
const [surName, setSurName] = useState("");
const [mail, setMail] = useState("");
const [address, setAddress] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    const costumerForm = {forName, surName, mail, address }
    const orderData = {...costumerForm,...cartItems};

    //Save costumer data and order history to API.
    fetch('http://localhost:8000/customers', {
        method: 'POST',
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(orderData)
    }).then((res) => {
        return res.json();
    })

    cartItems.map((e) => {
        const newStock = (e.inStock - e.qty) > 0 ? e.inStock - e.qty : 0;
        //Update instock data upon purchasing 
        fetch(`http://localhost:2000/robots/${e.id}`, {
            method: 'PUT',
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: e.id,
                name: e.name, 
                price: e.price, 
                image: e.image,
                inStock: newStock,
            })
        }).then((res) => {
            return res.json();
        }); 
        //Clear lcal storage and reload the page before redirection
        window.localStorage.removeItem("robot-store-key");
        window.location.reload();
        window.location.replace('/submitorder')
        return 0
    })
}

  return (
    <form className='form' onSubmit={handleSubmit}>
        <label>Forname:</label>
        <input
            type="text" 
            required
            value={forName}
            onChange={(e) => setForName(e.target.value)}
        />
        <label>Surname</label>
        <input
            type="text" 
            required
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
        />
        <label>Email</label>
        <input
            type="text" 
            required
            value={mail}
            onChange={(e) => setMail(e.target.value)}
        />
        <label>Shipping address</label>
        <input
            type="text" 
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
        />

        <button type='submit' className='add-button' >Submit order</button>
    </form>
  )
}
