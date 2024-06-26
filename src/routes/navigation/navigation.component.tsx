import { Fragment, useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.contex';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { NavigationComponent, NavLink, NavLinks, LogoContainer } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { showDropdown } = useContext(CartContext);
  
  return (
    <Fragment>
      <NavigationComponent>
        <LogoContainer to={'/'}>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <span>{}</span>
          <NavLink to={'/shop'}>SHOP</NavLink>
          {
            currentUser ?
            (
              <NavLink as={'span'} onClick={signOutUser}>SIGN OUT</NavLink>
            ) : (
              <NavLink to={'/auth'}>SIGN IN</NavLink>
            )
          }
          <CartIcon />
        </NavLinks>
        {showDropdown && <CartDropdown />}
      </NavigationComponent>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;