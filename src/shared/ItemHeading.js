import React from 'react';
import { useTranslation } from 'react-i18next';

const ItemHeading = ({ title, heading, subtitle, isOpen, setOpen, children }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex justify-between items-center cursor-pointer"
    >
      <div className="flex flex-col">
        <div className="text-sm font-medium">
          {typeof heading === 'undefined' ? title : t('item.add', { heading })}
        </div>
        {
          subtitle &&
          <div className="text-xs font-small">
            { subtitle }
          </div>
        }
      </div>
      <div className="flex items-center">
        {
          children
        }
        <button 
          type="button"
          onClick={() => setOpen(!isOpen)}
          className="p-1 text-gray-600 hover:text-green-600 text-sm font-medium flex justify-center items-center"
        >
          <i className="material-icons text-2xl">{heading ? (isOpen ? 'clear' :'add') : (isOpen ? 'expand_less' : 'expand_more')}</i>
        </button>
      </div>
    </div>
  );
};

export default ItemHeading;
