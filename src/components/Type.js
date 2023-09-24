import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Products from './Products';
import Options from './Options';
import ErrorBanner from './ErrorBanner';
import { OrderContext } from '../context/OrderContext';

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  // 초기 값은 에러가 없는 False
  const [error, setError] = useState(false);
  const [orderData, updateItemCount] = useContext(OrderContext);
  useEffect(() => {
    loadItems(orderType);

  }, [orderType, error])
  
  const loadItems = async (orderType) => {
    try {
      const response = await axios.get(`http://localhost:4000/${orderType}`)
      setItems(response.data)
      // 에러 발생 시 True로 설정
    } catch (error) {
      setError(true)
    }
  }
  const ItemComponent = orderType === "products" ? Products : Options
  const optionItems = items.map(item => (
    <ItemComponent 
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCounts) =>
         updateItemCount(itemName, newItemCounts, orderType)}
    />
  ))
  // 에러 문구 처리
  if(error){
    return(
      <ErrorBanner message="에러가 발생했습니다." />
    )
  } 

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>총 가격: {orderData.totals[orderType]}</p>
      <div
        style={{ display: 'flex',
        flexDirection: orderType === "options" ? "column" : ''}}
      >
        {optionItems}
      </div>
    </div>
  )
}

export default Type