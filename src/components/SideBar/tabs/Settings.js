import React from 'react';
import { useTranslation } from 'react-i18next';

import { languages } from '../../../i18n';
import Dropdown from '../../../shared/Dropdown';

const SettingsTab = ({ settings, onChange }) => {
  const { t } = useTranslation('sideBar');

  return (
    <div>
      <Dropdown
        label={t('settings.language.label')}
        value={settings.language}
        onChange={x => onChange('settings.language', x)}
        options={languages}
        optionItem={
          x => (
            <option key={x.code} value={x.code}>
              {x.name}
            </option>
          )
        }
      />
    </div>
  );
};

export default SettingsTab;
