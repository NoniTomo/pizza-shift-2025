import { useLocale } from '../hooks'

export interface PizzaInfoProps {
  pizza: CartPizza | Pick<CartPizza, 'pizza'>
  className?: string
}

export function PizzaInfo({
  pizza,
  className = '',
  ...props
}: PizzaInfoProps) {
  const { t } = useLocale()
  return (
    <p className={`text-secondary ${className}`} {...props}>
      <span>
        {`${pizza?.pizza.name}, ${t(pizza.pizza.size.name)}, ${t(pizza.pizza.doughs.name)}`}
      </span>
      {!!pizza.pizza.toppings.length && <span> + </span>}
      {pizza.pizza.toppings?.map((topping, index) => (
        <span key={index}>
          {index > 0 && ', '}
          {t(topping.name)}
        </span>
      ))}
    </p>
  )
}
