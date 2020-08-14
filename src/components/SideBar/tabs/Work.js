import React, { useState, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import TextArea from '../../../shared/TextArea';
import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import { addItem, migrateSection } from '../../../utils';
import ItemActions from '../../../shared/ItemActions';
import AddItemButton from '../../../shared/AddItemButton';
import ItemHeading from '../../../shared/ItemHeading';

const WorkTab = ({ data, config, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox checked={config.work.enable} onChange={v => onChange('config.work.enable', v)} />
        </div>

        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={config.work.heading}
            onChange={v => onChange('config.work.heading', v)}
          />
        </div>
      </div>
      <hr className="my-6" />

      <AddItem heading={config.work.heading} dispatch={dispatch} />

      <ReactSortable
        list={data.work}
        setList={newState => migrateSection(dispatch, 'work', newState)}
      >
        {
          data.work.map((x, index) => (
            <Item
              dispatch={dispatch}
              index={index}
              item={x}
              key={x.id}
              onChange={onChange} 
            />
          ))
        }
      </ReactSortable>

    </>
  );
};

const Form = ({ item, onChange, identifier = '' }) => {
  const { t } = useTranslation(['sideBar', 'app']);

  return (
    <div>
      <TextField
        className="mb-6"
        label={t('work.company.label')}
        placeholder="Amazon"
        value={item.company}
        onChange={v => onChange(`${identifier}company`, v)}
      />

      <TextField
        className="mb-6"
        label={t('work.location.label')}
        placeholder="NYC, NY"
        value={item.location}
        onChange={v => onChange(`${identifier}location`, v)}
      />

      <TextField
        className="mb-6"
        label={t('work.position.label')}
        placeholder="Full-Stack Web Developer"
        value={item.position}
        onChange={v => onChange(`${identifier}position`, v)}
      />

      <div className="grid grid-cols-2 col-gap-4">
        <TextField
          className="mb-6"
          label={t('app:item.startDate.label')}
          placeholder="March 2018"
          value={item.startDate}
          onChange={v => onChange(`${identifier}startDate`, v)}
        />

        <TextField
          className="mb-6"
          label={t('app:item.endDate.label')}
          placeholder="June 2022"
          value={item.endDate}
          onChange={v => onChange(`${identifier}endDate`, v)}
        />
      </div>

      <TextArea
        className="mb-6"
        label={t('app:item.description.label')}
        value={item.description}
        onChange={v => onChange(`${identifier}description`, v)}
      />
    </div>
  );
};

const AddItem = ({ heading, dispatch }) => {
  const workItem = {
    id: uuidv4(),
    enable: true,
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  };

  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({...workItem});

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const onSubmit = () => {
    if (item.title === '' || item.role === '') return;

    addItem(dispatch, 'work', item);

    setItem({...workItem});

    setOpen(false);
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5 ">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      {
        isOpen ?
        <div className="mt-6">
          <Form item={item} onChange={onChange} />
          <AddItemButton onSubmit={onSubmit} />
        </div>
        :
        null
      }

    </div>
  );
};

const Item = ({ item, index, onChange, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.work[${index}].`;
  const itemRef = useRef(null);

  return (
    <div className={`my-4 bg-white border border-gray-200 rounded p-5 animate__animated ${item.enable ? '' :'opacity-50 hover:opacity-75'}`} ref={itemRef}>
      <ItemHeading title={item.company} setOpen={setOpen} isOpen={isOpen}>
        <div className={`${isOpen ? 'hidden' : 'block'}`}>
          <ItemActions
            dispatch={dispatch}
            identifier={identifier}
            item={item}
            onChange={onChange}
            itemRef={itemRef}
            setOpen={setOpen}
            type="work"
          />
        </div>
      </ItemHeading>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <Form item={item} onChange={onChange} identifier={identifier} />
      </div>
    </div>
  );
};

export default WorkTab;
