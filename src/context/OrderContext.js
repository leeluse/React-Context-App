import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext();

export function OrderContextProvider(props) {
  // Map 생성
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map()
  });
  
  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total:0
  })

  const pricePerItem = {
    products: 1000,
    options: 500
  }


  const calculateSubtotal = (orderType, orderCounts) => {
    let optionCounts = 0;
    const pricePerItemForType = pricePerItem[orderType]; // 올바른 orderType에 해당하는 가격을 가져오기
  
    for (const count of orderCounts[orderType].values()) {
      optionCounts += count;
    }
  
    return optionCounts * pricePerItemForType; // 함수의 결과를 반환
  };
  
  useEffect(() => {
    const productsTotal = calculateSubtotal("products", orderCounts)
    const optionsTotal = calculateSubtotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total: total
    });
  }, [orderCounts])
  

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCounts = {...orderCounts};
      const orderCountsMap = newOrderCounts[orderType];
      orderCountsMap.set(itemName, parseInt(newItemCount));
      setOrderCounts(newOrderCounts);
    }

    return[{ ...orderCounts, totals }, updateItemCount]
    // 상품의 개수 & 상품 가격 총합이 바뀔 때마다 렌더링
  }, [orderCounts, totals])

  return <OrderContext.Provider value={value} {...props} />
}