import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as MbLogo } from "../../assets/mb-logo.svg"
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer, NavLinks, NavLink, LogoContainer } from  "./navigation.styles";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  
  const isCartOpen = useSelector(selectIsCartOpen);
  
  
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <MbLogo width="75px" height="75px"/>
        </LogoContainer>
        
        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {
            currentUser ? (
              <NavLink as="span" onClick={signOutUser}>
                Sign Out
              </NavLink>
            ) : (
              <NavLink to="/auth">
            Sign-In
              </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
};

export default Navigation