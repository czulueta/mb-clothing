import styled from "styled-components";
import { Link } from "react-router-dom";

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
`
export const Image = styled.img`
  width: 30%;
`
export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
`
export const Name = styled(Link)`
  font-size: 16px;
`


// .cart-item-container {
//     width: 100%;
//     display: flex;
//     height: 80px;
//     margin-bottom: 15px;
  
//     img {
//       width: 30%;
//     }
  
//     .item-details {
//       width: 70%;
//       display: flex;
//       flex-direction: column;
//       align-items: flex-start;
//       justify-content: center;
//       padding: 10px 20px;
  
//       .name {
//         font-size: 16px;
//       }
//     }
//   }
  