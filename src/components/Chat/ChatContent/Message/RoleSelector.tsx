import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';

import DownChevronArrow from '@icon/DownChevronArrow';
import { ChatInterface, ModelOptions, Role, roles } from '@type/chat';

import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';

const RoleSelector = React.memo(
  ({
    role,
    messageIndex,
    model,
    sticky,
  }: {
    role: Role;
    messageIndex: number;
    model?: ModelOptions;
    sticky?: boolean;
  }) => {
    const { t } = useTranslation();
    const setInputRole = useStore((state) => state.setInputRole);
    const setChats = useStore((state) => state.setChats);
    const currentChatIndex = useStore((state) => state.currentChatIndex);

    const [dropDown, setDropDown, dropDownRef] = useHideOnOutsideClick();

    return (

      <div className='lg:w-[calc(100%-115px)] flex gap-2 grow w-full'>
        <button
          className='btn btn-neutral btn-small flex gap-1'
          aria-label={t(role) as string}
          type='button'
          onClick={() => setDropDown((prev) => !prev)}
        >
          {t(role)}
          <DownChevronArrow />
        </button>
        <div
          ref={dropDownRef}
          id='dropdown'
          className={`${
            dropDown ? '' : 'hidden'
          } absolute top-100 bottom-100 z-10 bg-white rounded-lg shadow-xl border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800 opacity-90`}
        >
          <ul
            className='text-sm text-gray-700 dark:text-gray-200 p-0 m-0'
            aria-labelledby='dropdownDefaultButton'
          >
            {roles.map((r) => (
              <li
                className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                onClick={() => {
                  if (!sticky) {
                    const updatedChats: ChatInterface[] = JSON.parse(
                      JSON.stringify(useStore.getState().chats)
                    );
                    updatedChats[currentChatIndex].messages[messageIndex].role =
                      r;
                    setChats(updatedChats);
                  } else {
                    setInputRole(r);
                  }
                  setDropDown(false);
                }}
                key={r}
              >
                {t(r)}
              </li>
            ))}
          </ul>
        </div>
        <div className='font-mono text-xs p-1 flex items-center justify-end grow'>
          {model}
        </div>
      </div>
    );
  }
);
export default RoleSelector;
