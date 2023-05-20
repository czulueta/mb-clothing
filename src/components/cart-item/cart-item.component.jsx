
import { CartItemContainer, ItemDetails, Name} from "./cart-item.styles.jsx";

const CartItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
      <CartItemContainer>
        <img src={imageUrl} width="30%" alt={`${name}`}/>
        <ItemDetails >
          <Name>
            {name}
          </Name>
          <span className="price" >
            {quantity} x ${price}
          </span>
        </ItemDetails>
      
      </CartItemContainer>
    
  );
};

export default CartItem