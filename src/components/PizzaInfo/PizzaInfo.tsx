import { useLocale } from '@/src/shared/hooks'

export interface PizzaInfoProps {
  pizza: {
    size: PizzaSize
    doughs: PizzaDough
    name: string
    toppings?: OrderedPizzaIngredient[]
  }
  className?: string
}

export function PizzaInfo({
  pizza,
  className = '',
  ...props
}: PizzaInfoProps) {
  const { t } = useLocale()
  return (
    <span className={`text-accent ${className}`} {...props}>
      <span>
        {`${pizza.name}, ${t(pizza.size.name)}, ${t(pizza.doughs.name)}`}
      </span>
      {!!pizza.toppings?.length && <span> + </span>}
      {pizza.toppings?.map((topping, index) => (
        <span key={index}>
          {index > 0 && ', '}
          {t(topping.name)}
        </span>
      ))}
    </span>
  )
}
