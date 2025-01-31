import React from 'react'

import { OrderContext } from './OrderContext'

export const useOrder = () => React.useContext(OrderContext)
