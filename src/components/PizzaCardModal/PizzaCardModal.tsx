'use client'

import { Main } from '@/app/(components)'
import { HeaderClient } from '@/app/(components)/Header/HeaderClient'
import { PizzaInfo } from '@/src/components'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
} from '@/src/shared/components'
import { API_URL } from '@/src/shared/constants'
import { useCartPizzaStorage, useLocale } from '@/src/shared/hooks'
import BackSvg from '@/static/icons/back.svg'
import CancelIcon from '@/static/icons/cancel.svg'
import ToppingChooseSvg from '@/static/icons/toppingChoose.svg'
import Image from 'next/image'
import { usePizzaCardModal } from './hooks/usePizzaCardModal'

const DOUGHS = ['THIN', 'THICK'] as Dough[]
const SIZES = ['LARGE', 'MEDIUM', 'SMALL'] as Size[]

export interface PizzaCardModalProps {
  type: 'add' | 'change'
  pizza: {
    id: string
    name: string
    img: string
    sizes: PizzaSize[]
    dough: PizzaDough[]
    toppings: PizzaIngredient[]
    choosenDough: PizzaDough
    choosenSize: PizzaSize
    choosenToppings: PizzaIngredient[]
    price: number
  }
  action?: () => void
  triggerButton: React.ReactNode
  className?: string
}

export function PizzaCardModal({ type = 'add', pizza, action, triggerButton, className }: PizzaCardModalProps) {
  const { t } = useLocale()
  const { add, remove } = useCartPizzaStorage()
  const { state, functions } = usePizzaCardModal({ pizza })
  return (
    <div className={className}>
      <Dialog open={state.modal} onOpenChange={functions.setModal}>
        <DialogTrigger asChild>
          {triggerButton}
        </DialogTrigger>
        <DialogContent
          childrenCloseButton={(
            <Image
              className="hover:grey-dark-filter"
              priority
              src={CancelIcon}
              height={32}
              width={32}
              alt={t('buttonBack')}
            />
          )}
          className="relative max-w-full p-0 sm:max-w-max"
        >
          <HeaderClient className="display h-min p-0 sm:hidden">
            <Button
              className="border-none bg-background shadow-none"
              onClick={() => functions.setModal(false)}
            >
              <Image
                className="hover:grey-dark-filter"
                priority
                src={BackSvg}
                height={32}
                width={32}
                alt={t('buttonBack')}
              />
            </Button>
            <h1>{t('pizza')}</h1>
          </HeaderClient>
          <DialogTitle className="hidden sm:block">
            <DialogClose></DialogClose>
          </DialogTitle>
          <Main className="grid font-inter  auto-cols-min grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-[800px]">
            <Image
              priority
              className="mx-auto"
              src={`${API_URL}${pizza.img}`}
              alt={pizza.name}
              height={300}
              width={300}
            />
            <div className="scrollbar flex flex-col gap-4 overflow-y-scroll sm:h-[500px]">
              <h1 className=" text-3xl font-bold text-text">{pizza.name}</h1>
              <PizzaInfo pizza={{ doughs: state.doughs, name: pizza.name, size: state.size, toppings: state.toppings }} />
              <div className="h-max">
                <Tabs value={state.size.name} onValueChange={functions.handleSize}>
                  <TabsList className="h-max rounded-2xl bg-text-light w-full">
                    {SIZES.map(size => (
                      <TabsTrigger
                        key={size}
                        className="h-max w-full rounded-2xl text-lg lg:text-xl"
                        value={size}
                      >
                        {t(size)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <Tabs value={state.doughs.name} onValueChange={functions.handleDoughs}>
                <TabsList className="h-max rounded-2xl bg-text-light w-full">
                  {DOUGHS.map(dough => (
                    <TabsTrigger
                      key={dough}
                      className="h-max rounded-2xl text-lg lg:text-xl w-full"
                      value={dough}
                    >
                      {t(dough)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div>
                <h3>{t('seasonToTaste')}</h3>
                <ToggleGroup
                  value={state.toppings.map(topping => topping.name)}
                  onValueChange={functions.handleValueChange}
                  className="grid grid-cols-3 gap-2 p-2"
                  type="multiple"
                >
                  {pizza.toppings.map((topping: PizzaIngredient) => (
                    <ToggleGroupItem
                      className="flex relative h-full w-full flex-col p-2 bg-background justify-between rounded-2xl border-background shadow-xl border-solid border-2 data-[state=on]:border-primary"
                      key={topping.name}
                      value={topping.name}
                    >
                      <Image
                        priority
                        src={ToppingChooseSvg}
                        alt={pizza.name}
                        height={32}
                        width={32}
                        className={`absolute top-2 right-2 primary-filter ${state.toppings.find(toppingFind => toppingFind.name === topping.name) ? 'block' : 'hidden'}`}
                      />
                      <div>
                        <Image
                          priority
                          src={`${API_URL}${topping.img}`}
                          alt={pizza.name}
                          height={100}
                          width={100}
                        />
                        <h3>{t(topping.name)}</h3>
                      </div>
                      <p className="font-bold">
                        {topping.cost}
                        {' '}
                        ₽
                      </p>

                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            <Button
              className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light sm:col-start-2"
              onClick={() => {
                if (type === 'add') {
                  add({ ...pizza, choosenDough: state.doughs, choosenSize: state.size, choosenToppings: state.toppings })
                  action && action()
                  functions.setModal(false)
                }
                else {
                  remove(pizza)
                  add({ ...pizza, choosenDough: state.doughs, choosenSize: state.size, choosenToppings: state.toppings })
                  action && action()
                  functions.setModal(false)
                }
              }}
            >
              {type === 'add' ? t('buttonAddToCart') : t('buttonChanged')}
            </Button>
          </Main>
        </DialogContent>
      </Dialog>
    </div>
  )
}
