import React from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from './Checkbox';
import { deleteItem, animateRemove } from '../utils';

const ItemActions = ({ dispatch, identifier, item, onChange, type, itemRef, setOpen }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Checkbox
          size="2.25rem"
          checked={item.enable}
          onChange={v => {
              onChange(`${identifier}enable`, v);
          }}
        />

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            animateRemove(itemRef, ()=>{deleteItem(dispatch, type, item);})
            }
          }
          className="ml-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex items-center">
            <i className="material-icons mr-2 font-bold text-base">delete</i>
            <span className="text-sm">{t('buttons.delete.label')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ItemActions;
