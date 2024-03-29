import { Fragment, useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.contex';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { showDropdown } = useContext(CartContext);
  
  return (
    <Fragment>
      <div className='nav'>
        <Link className='logo-container' to={'/'}>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <span>{}</span>
          <Link className='nav-link' to={'/shop'}>SHOP</Link>
          {
            currentUser ?
            (
              <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
            ) : (
              <Link className='nav-link' to={'/auth'}>SIGN IN</Link>
            )
          }
          <CartIcon />
        </div>
        {showDropdown && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;