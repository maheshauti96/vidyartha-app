import React, { useEffect, useState } from 'react'
import { getDeliveries } from '../../services/service'

const DeliveryDisplay = () => {
    const [deliveryList , setDeliveryList] = useState()
    useEffect(() => {
        getDeliveries(setDeliveryList)
    } , [])
    console.log(deliveryList)
    return (
        <div>DeliveryDisplay</div>
    )
}

export default DeliveryDisplay