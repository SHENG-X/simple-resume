import React from 'react';
import { deleteItem, animateRemove } from '../utils';

const ItemActions = ({ dispatch, identifier, item, onChange, type, itemRef, setOpen }) => {

  return (
    <div className="flex justify-end h-full">
      <div className="flex items-center">
        {
          item.enable ? 
          <button 
            type="button"
            onClick={() => onChange(`${identifier}enable`, false)}
            className="p-1 text-gray-600 hover:text-red-600 flex justify-center items-center"
          >
            <i className="material-icons font-bold text-2xl">visibility</i>
          </button>
          :
          <button 
            type="button"
            onClick={() => onChange(`${identifier}enable`, true)}
            className="p-1 text-gray-600 hover:text-green-600 flex justify-center items-center"
          >
            <i className="material-icons font-bold text-2xl">visibility_off</i>
          </button>
        }

        <button 
          type="button"
          onClick={() => {
            setOpen(false);
            animateRemove(itemRef, ()=>{deleteItem(dispatch, type, item);})
            }
          }
          className="p-1 text-gray-600 hover:text-red-600 flex justify-center items-center"
        >
          <i className="material-icons font-bold text-2xl">delete</i>
        </button>
      </div>
    </div>
  );
};

export default ItemActions;
