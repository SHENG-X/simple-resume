import React from 'react';
import { useTranslation } from 'react-i18next';

import TextArea from '../../../shared/TextArea';
import TextField from '../../../shared/TextField';

const ObjectiveTab = ({ data, config, onChange }) => {
  const { t } = useTranslation('sideBar');

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          {
            config.summary.enable ? 
            <button 
              type="button"
              onClick={() => onChange(`config.summary.enable`, false)}
              className="p-1 text-gray-600 hover:text-red-600 flex justify-center items-center"
            >
              <i className="material-icons font-bold text-2xl">visibility</i>
            </button>
            :
            <button 
              type="button"
              onClick={() => onChange(`config.summary.enable`, true)}
              className="p-1 text-gray-600 hover:text-green-600 flex justify-center items-center"
            >
              <i className="material-icons font-bold text-2xl">visibility_off</i>
            </button>
          }
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={config.summary.heading}
            onChange={v => onChange('config.summary.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      <TextArea
        className="textarea-summary"
        label={t('basics.summary.label')}
        value={data.basics.summary}
        placeholder="Looking for a challenging role in a reputable organization to utilize my technical, database, and management skills for the growth of the organization as well as to enhance my knowledge about new and emerging trends in the IT sector."
        onChange={v => onChange('data.basics.summary', v)}
      />
    </div>
  );
};

export default ObjectiveTab;
