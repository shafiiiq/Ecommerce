import React from 'react'
import { useNavigate } from 'react-router-dom'


function Sidebar() {

    const navigate = useNavigate();

    return (
        <aside className="flow-hidden w-full h-vh">
            <h1 className="h1 a">A</h1>
            <h1 className="h1 g">G</h1>
            <h1 className="h1 z">Z</h1>
            <h1 className="h1 m">M</h1>
            <h1 className="h1 s">S</h1>
            <h1 className="h1 o">O</h1>
            <div className="sidebar full">
                <ul className="flex flex-column gap">
                    <li onClick={() => navigate('/')} className="home height radius-vh-left z-high white-clr pointer w-full flex a-center pad-inline ease gap">
                        <span className="material-symbols-rounded">home</span>
                        Home
                    </li>
                    <li onClick={() => navigate('/add-products')} className="add-products height radius-vh-left z-high white-clr pointer w-full flex a-center pad-inline ease gap">
                        <span className="material-symbols-rounded">add_shopping_cart</span>
                        Add products
                    </li>
                    <li onClick={() => navigate('/products-lists')} className="height radius-vh-left z-high white-clr pointer w-full flex a-center pad-inline ease gap">
                        <span class="material-symbols-rounded">
                            format_list_bulleted
                        </span>
                        Products List
                    </li>
                    <li className="height radius-vh-left z-high white-clr pointer w-full flex a-center pad-inline ease gap">
                        <span className="material-symbols-rounded">notifications</span>
                        Notifications
                    </li>
                    <li className="height radius-vh-left z-high white-clr pointer w-full flex a-center pad-inline ease gap">
                        <span className="material-symbols-rounded">forum</span>
                        Feedbacks
                    </li>
                    <li className="height radius-vh-left z-high white-clr pointer w-full flex a-center pad-inline ease gap">
                        <span className="material-symbols-rounded">account_circle</span>
                        Account
                    </li>
                    <li className="height radius-vh-left z-high white-clr pointer w-full flex a-center pad-inline ease gap">
                        <span className="material-symbols-rounded">dashboard</span>
                        Dashboard
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
