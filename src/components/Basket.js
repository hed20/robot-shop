import react, {useState} from 'react';
import { Link } from 'react-router-dom';

export default function Basket(props) {
    const {cartItems , products,onAdd, onRemove} = props;
    const [counter, setCounter] = useState(1);
    const itemsPrice = cartItems?.reduce((a, b) => a + b.price * b.qty, 0)
    const shippingPrice = itemsPrice > 999 ? 0 : 89; 
    const totalPrice = itemsPrice + shippingPrice;
    //Convert products data to 
    const data = Array.from(products);

    const Restock = (e) => {

        const exist = data.find(item => item.id === e.id);

        if (exist) {
            data.map((elem) => {
                if (elem.id === e.id) {
                    const newValue = elem.inStock + 1;
                    fetch(`http://localhost:2000/robots/${elem.id}`, {
                    method: 'PUT',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify ({
                        id: elem.id,
                        name: elem.name, 
                        price: elem.price, 
                        image: elem.image,
                        inStock: newValue,
                    })
                    }).then((res) => {
                    return res.json();
                    });
                }
               window.location.reload();
            })


        }

    }

    const stockEmpty = () => {
        alert('This product is out of stock!');
    }
    
    return (
        <aside className=' col-1'>
            <div className='block basket-item'>
                <h2>Cart Items</h2>
                <div>
                    {cartItems?.length === 0 && <div>Cart is empty</div>}
                </div>
                
                {cartItems?.map((e) => (
                    <div key={e.id} className="row">
                        <div className='col-2'>{e.name}</div>
                        
                        <div className='col-2'>
                            {e.inStock > e.qty ? 
                                (<button onClick={()=>onAdd(e)} className="add">+</button>) 
                                : 
                                (<button className="add" onClick={() => stockEmpty()}>+</button>)
                        }   

                            <button onClick={()=> {onRemove(e); Restock(e)}} className="remove">-</button>
                        </div>
                        <div className='col-2'>
                            {e.qty} x {e.qty*e.price.toFixed(2)}kr
                        </div>
                    </div>
                ))}
                
                {cartItems.length !== 0 && ( 
                    <>
                        <hr></hr>
                        <div className='row'>
                            <div >Shipping</div>
                            <div className='col-1 text-right'>{shippingPrice.toFixed(2)}kr</div>
                        </div>
                        <div className='row'>
                            <div>
                                <strong>Total Price</strong> 
                            </div>
                            <div className='col-1 text-right'>{totalPrice.toFixed(2)}kr</div>
                        </div>
                        <hr/>
                        <div className='row'>
                            <Link to="/checkout">
                                <button className='add-button' >Checkout</button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}