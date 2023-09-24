import React, { useContext, useState } from 'react'
import { OrderContext } from '../../context/OrderContext';

const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  const [orderDetails] = useContext(OrderContext);

  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  
  const hasOption = orderDetails.options.size > 0;
  let optionDisplay = null;
  
  if(hasOption) {
    const optionsArray = Array.from(orderDetails.options.keys());
    const optionList = optionsArray.map((key) => <li key={key}>{key}</li>)
    optionDisplay = (
      <>
      <h2>옵션: {orderDetails.totals.options}</h2>
      <ul>{optionList}</ul>
      </>
    )
    
    const handleSubmit = (e) => {
      // 버튼을 눌렀을 때 페이지가 자동으로 리프레쉬 되는 것을 방지
      e.preventDefault();
      setStep(2)
    }

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDetails.totals.products}</h2>
      <ul>
        {productList}
      </ul>
        {optionDisplay}
      <form onSubmit={handleSubmit}>
        <input
        type="checkbox"
        checked={checked}
        id='confirm-checkbox' 
        onChange={(e) => { setChecked(e.target.checked) }}
        /> {" "}
        <label htmlFor='confirm-checkbox'> 주문하려는 것을 확인하셨나요?</label>
        <br />
        <button
          disabled={!checked} 
          type='submit'> 주문 확인 </button>
      </form>
    </div>
    )
}
}

export default SummaryPage

