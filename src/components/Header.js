import react from 'react';
import { Link } from 'react-router-dom';

/** Export a function that accept props, using a functional component*/
/** Props are the proporties that comes from the parent component*/
export default function Header(props) {
    const {countCartItems} = props;
    return (
        <header className='row block center'>
            <div>
                <Link to='/'> 
                    <h1>RobotShop</h1>
                </Link>
            </div>
            <div>
                <Link to='/checkout'>
                   
                    Cart { ' ' }
                    {countCartItems ? (
                        <button className='badge'>{countCartItems}</button>
                    ) : (
                        ' '
                    )}
                    
                </Link>
            </div>
        </header>
    );
}