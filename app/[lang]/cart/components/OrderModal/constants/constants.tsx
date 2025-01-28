import { PaymentCardForm } from '../components/PaymentCardForm/PaymentCardForm'
import { PaymentCardHeader } from '../components/PaymentCardHeader/PaymentCardHeader'
import { SuccessView } from '../components/SuccessView/SuccessView'
import { SuccessViewHeader } from '../components/SuccessViewHeader/SuccessViewHeader'
import { UserDataForm } from '../components/UserDataForm/UserDataForm'
import { UserDataHeader } from '../components/UserDataHeader/UserDataHeader'

export const CREATE_ORDER_STAGES = {
  cardForm: PaymentCardForm,
  successView: SuccessView,
  userDataForm: UserDataForm,
}

export const HEADER_STAGES = {
  cardForm: PaymentCardHeader,
  successView: SuccessViewHeader,
  userDataForm: UserDataHeader,
}
