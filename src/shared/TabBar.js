import React from 'react';

const TabBar = ({ tabs, currentTab, setCurrentTab }) => {

  return (
    <div className="py-6 flex-column overflow-auto">
      {
        tabs.map((tab) =>(
          <div key={tab.key} className="mx-4 list-none noselect">
            <div 
              className={`whitespace-no-wrap rounded-md cursor-pointer text-sm py-3 px-6 font-medium ${currentTab === tab.key ? 'text-white bg-gray-700': 'hover:bg-gray-200 bg-white'}`}
              onClick={() => setCurrentTab(tab.key)}
            >
              {tab.name || 'Tab'}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default TabBar;
