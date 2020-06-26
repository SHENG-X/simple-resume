import React from 'react';
import { useTranslation } from 'react-i18next';

import TextField from '../../../shared/TextField';

const ProfileTab = ({ data, onChange }) => {
  const { t } = useTranslation('sideBar');

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('basics.name.label')}
        placeholder="Jane Doe"
        value={data.basics.name}
        onChange={v => onChange('data.basics.name', v)}
      />

      <TextField
        className="mb-6"
        label={t('basics.label.label')}
        placeholder="Full-Stack Web Developer"
        value={data.basics.label}
        onChange={v => onChange('data.basics.label', v)}
      />

      <hr className="my-6" />

      <TextField
        className="mb-6"
        label={t('basics.location.address.label')}
        placeholder="Palladium Complex"
        value={data.basics.location.address}
        onChange={v => onChange('data.basics.location.address', v)}
      />

      <TextField
        className="mb-6"
        label={t('basics.location.city.label')}
        placeholder="140 E 14th St"
        value={data.basics.location.city}
        onChange={v => onChange('data.basics.location.city', v)}
      />

      <TextField
          className="mb-6"
          label={t('basics.location.region.label')}
          placeholder="New York, NY 10003 USA"
          value={data.basics.location.region}
          onChange={v => onChange('data.basics.location.region', v)}
      />

      <hr className="my-6" />

      <TextField
          className="mb-6"
          label={t('basics.phone.label')}
          placeholder="+1 541 754 3010"
          value={data.basics.phone}
          onChange={v => onChange('data.basics.phone', v)}
      />

      <TextField
        className="mb-6"
        label={t('basics.email.label')}
        placeholder="jane.doe@example.com"
        value={data.basics.email}
        onChange={v => onChange('data.basics.email', v)}
      />

      <hr className="my-6" />

      <TextField
        className="mb-6"
        label={t('basics.website.label')}
        placeholder="janedoe.me"
        value={data.basics.website}
        onChange={v => onChange('data.basics.website', v)}
      />

      <TextField
        className="mb-6"
        label={t('basics.linkedin.label')}
        placeholder="https://www.linkedin.com/in/jane-doe"
        value={data.basics.linkedin}
        onChange={v => onChange('data.basics.linkedin', v)}
      />

      <TextField
        className="mb-6"
        label={t('basics.github.label')}
        placeholder="https://github.com/jane-doe"
        value={data.basics.github}
        onChange={v => onChange('data.basics.github', v)}
      />

    </div>
  );
};

export default ProfileTab;
