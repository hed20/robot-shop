import react, {useEffect} from 'react';
import Product from './Product';

export default function Main(props) {
    const {products, onAdd, cartItems} = props;
    //Array conversion inorder to map through the data
    const data = Array.from(products);

    return (
        <main className='block col-2'>
            <h2>Products</h2>
            <div className='row block'>
                {data.map((product) =>(
                    <Product key={product.id} product = {product} onAdd={onAdd} cartItems={cartItems}></Product>
                ))}
            </div>
        </main>
    );
}