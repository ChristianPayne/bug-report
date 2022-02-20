import React, { FC } from 'react'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'

type Props = { buttonName: string, items: Item[], callback: Function }

type Item = {
  name: string
}

export const Menu: FC<Props> = ({ buttonName, items, callback }) => {



  function getItem (item: Item) {
    return (
      <HeadlessMenu.Item>
        {
          <button className='button mb-2 w-full' onClick={() => callback(item)}>{item.name}</button>
        }
      </HeadlessMenu.Item>
    )
  }

  return (
    <div className="relative">
      <HeadlessMenu>
        <HeadlessMenu.Button className="button">
          { buttonName }
        </HeadlessMenu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          className="absolute top-12 right-0 left-0"
        >
          <HeadlessMenu.Items>
            { items.map((item, i) => <div key={`FieldKey|${i}`}>{getItem(item)}</div>) }
          </HeadlessMenu.Items>
        </Transition>
      </HeadlessMenu>
    </div>
  )
}