import React, { useState, useContext, useRef } from 'react';
import { ReactSortable } from "react-sortablejs";
import { v4 as uuidv4 } from 'uuid';

import AppContext from '../../../context/AppContext';
import Checkbox from '../../../shared/Checkbox';
import TextField from '../../../shared/TextField';
import { addItem, migrateSection } from '../../../utils';
import ItemHeading from '../../../shared/ItemHeading';
import AddItemButton from '../../../shared/AddItemButton';

const SkillsTab = ({ data, config, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      <div className="mb-6 grid grid-cols-6 items-center">
        <div className="col-span-1">
          <Checkbox
            checked={config.skills.enable}
            onChange={v => onChange('config.skills.enable', v)}
          />
        </div>
        <div className="col-span-5">
          <TextField
            placeholder="Heading"
            value={config.skills.heading}
            onChange={v => onChange('config.skills.heading', v)}
          />
        </div>
      </div>

      <hr className="my-6" />

      <AddItem heading={config.skills.heading} dispatch={dispatch} />
      <ReactSortable
        list={data.skills}
        setList={newState => migrateSection(dispatch, 'skills', newState)}
      >
        {
          data.skills.map((x, index) => (
            <Item item={x} key={x.id} index={index} onChange={onChange} dispatch={dispatch} />
          ))
        }
      </ReactSortable>
    </>
  );
};

const Form = ({ item, onChange }) => {
  return (
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      placeholder="Team Building &amp; Training"
      value={item.skill}
      onChange={e => onChange(e.target.value)}
      type="text"
    />
  );
};

const AddItem = ({ heading, dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: uuidv4(),
    skill: '',
    enable: true,
  });

  const add = () => {
    if (item.skill === '') return;

    addItem(dispatch, 'skills', item);

    setItem({
        id: uuidv4(),
        skill: '',
        enable: true,
    });
  };

  return (
    <div className="my-4 border border-gray-200 rounded p-5 ">
      <ItemHeading heading={heading} setOpen={setOpen} isOpen={isOpen} />

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col">
          <div className="mb-3">
            <Form item={item} onChange={v => setItem({...item, skill: v})} />
          </div>

          <div className="flex justify-end">
            <AddItemButton
              onSubmit={add}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Item = ({ item, index, onChange, dispatch }) => {
  const identifier = `data.skills[${index}]`;
  const itemRef = useRef(null);

  return (
    <div className={`my-4 grid grid-cols-12 animate__animated ${item.enable ? '' :'opacity-50 hover:opacity-75'}`} ref={itemRef}>
      <div className="col-span-9">
        <Form item={item} onChange={v => onChange(identifier, {...item, skill: v})} />
      </div>
      <div className="col-span-1"/>

      <div className="col-span-1"/>

      <button
        type="button"
        onClick={() => animateRemove(itemRef, ()=> {
            deleteItem(dispatch, 'skills', item)
          })
        }
        className="col-span-1 text-gray-600 hover:text-red-600 text-sm font-medium flex justify-center items-center"
      >
          <i className="material-icons font-bold text-xl">close</i>
      </button>
    </div>
  );
};

export default SkillsTab;
