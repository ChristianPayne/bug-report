/* This example requires Tailwind CSS v2.0+ */
import React, { FC, Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

type DropdownOption = {
  name: string
}

type Props = { 
  placeholder: string,
  options: Array<DropdownOption>,
  onSelect: Function,
 }

export const Dropdown: FC<Props> = (props: Props) => {
  let [currentSelection, setCurrentSelection] = useState<DropdownOption>({name: props.placeholder})

  function _setSelection (option: DropdownOption) {
    setCurrentSelection(option);
    props.onSelect(option);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      
      <Menu.Button className="inline-flex justify-center w-full rounded-md border-2 border-zinc-400 px-4 py-1">
        {currentSelection.name}
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {props.options.map((option, key)=> {
              return (
                option.name &&
                  <Menu.Item key={"Option" + key}>
                    {() => (
                      <button
                        className='block px-4 py-2 text-sm w-full'
                        onClick={()=>{_setSelection(option)}}
                      >
                        {option.name}
                      </button>
                    )}
                  </Menu.Item> ||
                  <Fragment key={"Option" + key}></Fragment>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
