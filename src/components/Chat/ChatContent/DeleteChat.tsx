import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';

import { ChatInterface } from '@type/chat';

import useInitialiseNewChat from '@hooks/useInitialiseNewChat';

import TickIcon from '@icon/TickIcon';

const DeleteChat = React.memo(() => {
  const { t } = useTranslation();

  const setChats = useStore((state) => state.setChats);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  const initialiseNewChat = useInitialiseNewChat();

  const deleteChat = () => {
    const updatedChats = JSON.parse(
      JSON.stringify(useStore.getState().chats)
    );
    const index = useStore.getState().currentChatIndex;
    updatedChats.splice(index, 1);
    if (updatedChats.length > 0) {
      setCurrentChatIndex(0);
      setChats(updatedChats);
    } else {
      initialiseNewChat();
    }
  };

  return (
    <button
      className='btn btn-neutral flex gap-1'
      aria-label={t('cloneChat') as string}
      onClick={deleteChat}
    >
    <>{t('deleteChat')}</>
    </button>
  );
});

export default DeleteChat;

