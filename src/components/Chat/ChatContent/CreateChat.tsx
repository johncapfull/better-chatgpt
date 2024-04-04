import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAddChat from '@hooks/useAddChat';

const CreateChat = React.memo(() => {
  const { t } = useTranslation();
  const addChat = useAddChat();

  return (
    <button
      className='btn btn-neutral flex gap-1'
      aria-label={t('cloneChat') as string}
      onClick={() => { addChat(); }}
    >
    <>{t('newChat')}</>
    </button>
  );
});

export default CreateChat;

