import React from 'react';
import styled from 'styled-components';
import { alertOrderModal } from '../../modules/modal';
import { useDispatch } from 'react-redux';

const BasketWrapper = styled.div`
  position: fixed;
  width: 500px;
  right: -12%;
  z-index: 10;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 75vh;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
  padding: 0px 20px 0px 20px;
  &:hover {
    right: 0%;
    transition: all ease 1s;
  }
  @media screen and (min-width: 1000px) and (max-width: 1300px) {
    right: -22%;
    &:hover {
      right: 0%;
    }
  }
  @media screen and (max-width: 1000px) {
    right: -40%;
    &:hover {
      right: 0%;
    }
  }
`;

const BasketTitle = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const BasketOrderList = styled.div`
  height: 40%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const BasketOrder = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  font-size: 20px;
  margin-right: 10px;

  textarea {
    height: 25px;
    border: none;
    outline: none;
    resize: none;
    width: 180px;
    margin-right: -50px;
  }

  .small {
    font-size: 17px;
    padding-top: 4px;
  }

  button {
    outline: 0;
    border: none;
    width: 2rem;
    height: 100%;
    margin-left: 10px;
    margin-right: 10px;
    &:hover {
      background-color: gray;
    }
  }
`;

const BasketPrice = styled.div`
  margin-top: 50px;
  height: 50%;
  .price {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
`;

const PriceBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  width: 460px;
  height: 42px;
  margin: 100px 0px 20px 0px;
  background-color: #03154e;
  outline: 0;
  color: #fff;
`;

const OrderBasket = ({ cartItems, onAdd, onRemove }) => {
  const dispatch = useDispatch();

  const itemsPrice = cartItems.reduce(
    (a, c) => a + (10000 + c.songList.length * 2000) * c.qty,
    0,
  );
  const taxPrice = itemsPrice * 0.14;
  const totalPrice = itemsPrice + taxPrice;

  console.log('?', cartItems);

  const payHandler = () => {
    dispatch(alertOrderModal());
  };
  return (
    <>
      <BasketWrapper>
        <BasketTitle>결제 목록</BasketTitle>
        <BasketOrderList>
          <BasketOrder>
            <div>
              {cartItems.length === 0 && (
                <div className="small">결제 대기중인 내역이 없습니다.</div>
              )}
            </div>
          </BasketOrder>

          {cartItems.map((item) => (
            <BasketOrder key={item._id}>
              <textarea>{item.title}</textarea>
              <div>
                <button onClick={() => onAdd(item)}>+</button>
                {item.qty}
                <button onClick={() => onRemove(item)}>-</button>
              </div>
              <div className="small">{itemsPrice} 원</div>
            </BasketOrder>
          ))}
        </BasketOrderList>
        <BasketPrice>
          {cartItems.length !== 0 && (
            <>
              <div className="price">
                <div>상품 가격</div>
                <div>{itemsPrice} 원</div>
              </div>
              <div className="price">
                <div>부가세</div>
                <div>{taxPrice.toFixed(0)} 원</div>
              </div>
              <div className="price">
                <div>총 합계</div>
                <div>
                  <strong>{totalPrice.toFixed(0)} 원</strong>
                </div>
              </div>
            </>
          )}
          <PriceBtn onClick={payHandler}>결제하기</PriceBtn>
        </BasketPrice>
      </BasketWrapper>
    </>
  );
};

export default OrderBasket;
