import React from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from './Checkbox';
import { deleteItem, moveItemUp, moveItemDown, animateDown, animateUp, animateRemove } from '../utils';

const ItemActions = ({ dispatch, first, identifier, item, last, onChange, type, itemRef, setOpen }) => {
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

      <div className="flex">
        <button
          type="button"
          onClick={() => animateUp(itemRef, first, ()=>{
              moveItemUp(dispatch, type, item);
              if(first) return;
              setOpen(false);
            })
          }
          className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded mr-2"
        >
          <div className="flex items-center">
            <i className="material-icons font-bold text-base">arrow_upward</i>
          </div>
        </button>

        <button
          type="button"
          onClick={() => animateDown(itemRef, last, ()=>{
              moveItemDown(dispatch, type, item);
              if(last) return;
              setOpen(false);
            })
          }
          className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded"
        >
          <div className="flex items-center">
            <i className="material-icons font-bold text-base">arrow_downward</i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ItemActions;
