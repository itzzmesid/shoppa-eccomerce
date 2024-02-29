import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
			
		<NavLink to='/shop/electronics' activeStyle onClick={()=>localStorage.setItem('category','Electronics')}>
			Electronics
		</NavLink>
		<NavLink to='/shop/clothing' activeStyle onClick={()=>localStorage.setItem('category','Home & Living')}>
			Home & Living
		</NavLink>
		<NavLink to='/shop/homeLiving' activeStyle onClick={()=>localStorage.setItem('category','Grocery')}>
			Grocery
		</NavLink>
		<NavLink to='/shop/fashion' activeStyle onClick={()=>localStorage.setItem('category','Fashion')}>
			Fashion
		</NavLink>
		<NavLink to='/shop/mobiles' activeStyle onClick={()=>localStorage.setItem('category','Mobiles')}>
			Mobiles
		</NavLink>
		<NavLink to='/shop/pets' activeStyle onClick={()=>localStorage.setItem('category','Pets & Gardening')}>
			Pets and Gardening
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
