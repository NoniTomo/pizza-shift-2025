'use client'

import { Header, Main } from '@/app/[lang]/(components)'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
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
import Image from 'next/image'
import React from 'react'
import { usePizzaCard } from './hooks/usePizzaCard'

export interface PizzaCardProps {
  pizza: Pizza
}

const DOUGHS = ['THIN', 'THICK'] as Dough[]
const SIZES = ['LARGE', 'MEDIUM', 'SMALL'] as Size[]

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { t } = useLocale()
  const { add } = useCartPizzaStorage()
  const { state, functions } = usePizzaCard({ pizza })

  return (
    <Card className="flex flex-col justify-between gap-4 border-none p-0 shadow-none">
      <CardContent className="flex flex-col items-center gap-4 font-inter">
        <Image priority src={`${API_URL}${pizza.img}`} alt={pizza.name} height={240} width={240} />
        <h3 className="text-balance text-left text-xl font-bold">{pizza.name}</h3>
        <p className="text-balance text-left text-base">{pizza.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-1">
        <span className="text-left text-xl font-bold">
          {t('costPizza', { cost: String(pizza.sizes[0].price) })}
        </span>
        <Dialog open={state.modal} onOpenChange={functions.setModal}>
          <DialogTrigger asChild>
            <Button className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light">
              {t('buttonSelected')}
            </Button>
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
            <Header className="display h-min p-0 sm:hidden">
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
            </Header>
            <DialogTitle className="hidden sm:block">
              <DialogClose></DialogClose>
            </DialogTitle>
            <Main className="grid auto-cols-min grid-cols-1 p-0 sm:grid-cols-2 lg:max-w-[800px]">
              <Image
                priority
                className="mx-auto"
                src={`${API_URL}${pizza.img}`}
                alt={pizza.name}
                height={250}
                width={250}
              />
              <div className="scrollbar flex flex-col gap-4 overflow-x-hidden overflow-y-scroll sm:h-[500px]">
                <h1 className="font-inter text-3xl font-bold text-text">{pizza.name}</h1>
                <p className="font-inter text-base text-secondary">
                  {t(state.size.name)}
                  ,
                  {t(state.doughs.name)}
                  {' '}
                  {t('doughs')}
                </p>
                <p className="text-balance font-inter text-lg text-secondary">
                  {pizza.ingredients.map((ingredient, index) => (
                    <span key={ingredient.name}>
                      {t(ingredient.name)}
                      {index < pizza.ingredients.length - 1 && ', '}
                    </span>
                  ))}
                </p>
                <div className="h-max">
                  <Tabs value={state.size.name} onValueChange={functions.handleSize}>
                    <TabsList className="h-max rounded-2xl bg-text-light">
                      {SIZES.map(size => (
                        <TabsTrigger
                          key={size}
                          className="h-max rounded-2xl text-lg lg:text-xl"
                          value={size}
                        >
                          {t(size)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
                <Tabs value={state.doughs.name} onValueChange={functions.handleDoughs}>
                  <TabsList className="h-max rounded-2xl bg-text-light">
                    {DOUGHS.map(dough => (
                      <TabsTrigger
                        key={dough}
                        className="h-max rounded-2xl text-lg lg:text-xl"
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
                    className="grid grid-cols-3"
                    type="multiple"
                  >
                    {pizza.toppings.map((topping: PizzaIngredient) => (
                      <ToggleGroupItem
                        className="flex h-full w-full flex-col gap-3 p-1 data-[state=on]:border-2 data-[state=on]:border-solid data-[state=on]:border-primary data-[state=on]:p-0"
                        key={topping.name}
                        value={topping.name}
                      >
                        <Image
                          priority
                          src={`${API_URL}${topping.img}`}
                          alt={pizza.name}
                          height={80}
                          width={80}
                        />
                        <h3>{t(topping.name)}</h3>
                        <p>{topping.cost}</p>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
              <Button
                className="h-max w-full rounded-2xl bg-primary py-4 text-base text-text-light sm:col-start-2"
                onClick={() =>
                  add({
                    description: pizza.description,
                    doughs: state.doughs,
                    imgSrc: pizza.img,
                    name: pizza.name,
                    size: state.size,
                    pizzaId: pizza.id,
                    toppings: state.toppings,
                  })}
              >
                {t('buttonAddToCart')}
              </Button>
            </Main>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
