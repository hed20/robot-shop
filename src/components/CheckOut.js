import react from 'react';
import { Link } from 'react-router-dom';
import OrderForm from './OrderForm';

export default function CheckOut(props) {
    const {cartItems , onAdd, onRemove} = props;
    const itemsPrice = cartItems?.reduce((a, b) => a + b.price * b.qty, 0)
    const shippingPrice = itemsPrice > 999 ? 0 : 89; 
    const totalPrice = itemsPrice + shippingPrice;

    return (
        <section className='row center'>
            {cartItems.length !== 0 && (
                <div className='block col-2'>
                <OrderForm cartItems={cartItems}></OrderForm>
                </div>
            )}
            <div  className=' block col-1'>
                <h2>Cart Items</h2>
                <div>
                    {cartItems.length === 0 && <div>Cart is empty</div>}
                </div>
                
                {cartItems.map((item) => (
                    <div key={item.id} className="row">
                        <div className='col-2'>{item.name}</div>
                        <div className='col-1'>
                            {item.inStock > item.qty ? 
                                (<button onClick={()=>onAdd(item)} className="add">+</button>) 
                                : 
                                (<button className="add">+</button>)
                            }
                            
                            <button onClick={()=>onRemove(item)} className="remove">
                                -
                            </button>
                        </div>
                        <div className='col-1'>
                            {item.qty} x {item.qty*item.price.toFixed(2)}kr
                        </div>
                    </div>
                ))}
                {cartItems.length !== 0 && ( 
                    <>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>Shipping</div>
                            <div className='col-1 text-right'>{shippingPrice.toFixed(2)}kr</div>
                        </div>
                        <div className='row'>
                            <div className='col-2'>
                                <strong>Total Price</strong> 
                            </div>
                            <div className='col-1 text-right'>{totalPrice.toFixed(2)}kr</div>
                        </div>
                        <hr/>
                    </>
                )}
            </div>
        </section>
    );
}