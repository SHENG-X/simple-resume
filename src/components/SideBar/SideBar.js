import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import ProfileTab from './tabs/Profile';
import Summary from './tabs/Summary';
import WorkTab from './tabs/Work';
import EducationTab from './tabs/Education';
import AwardsTab from './tabs/Awards';
import CertificationsTab from './tabs/Certifications';
import SkillsTab from './tabs/Skills';
import ReferencesTab from './tabs/References';
import TemplatesTab from './tabs/Templates';
import ColorsTab from './tabs/Colors';
import FontsTab from './tabs/Fonts';
import ActionsTab from './tabs/Actions';
import AboutTab from './tabs/About';
import SettingsTab from './tabs/Settings';

const Sidebar = () => {
  const { t } = useTranslation('sideBar');

  const context = useContext(AppContext);
  const { state, dispatch } = context;
  const { data, theme, settings, config } = state;
  const tabs = [
    {
      key: 'templates',
      name: t('templates.title'),
    },
    { 
      key: 'basics', 
      name: t('basics.title'),
    },
    { 
      key: 'summary', 
      name: config.summary.heading 
    },
    { 
      key: 'work', 
      name: config.work.heading 
    },
    { 
      key: 'education', 
      name: config.education.heading 
    },
    { 
      key: 'awards', 
      name: config.awards.heading 
    },
    { 
      key: 'certifications', 
      name: config.certifications.heading 
    },
    { 
      key: 'skills', 
      name: config.skills.heading 
    },
    { 
      key: 'references', 
      name: config.references.heading
    },
    {
      key: 'colors',
      name: t('colors.title'),
    },
    {
      key: 'fonts',
      name: t('fonts.title'),
    },
    {
      key: 'actions',
      name: t('actions.title'),
    },
    {
      key: 'settings',
      name: t('settings.title'),
    },
    {
      key: 'about',
      name: t('about.title'),
    },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0].key);
  const [tabOpen, setTabOpen] = useState(true); 

  const handleChangeTab = (tabName) => {
    if(currentTab === tabName){
      setTabOpen(!tabOpen);
    }else{
      setTabOpen(true);
    }
    setCurrentTab(tabName);
  }

  const onChange = (key, value) => {
    dispatch({
      type: 'on_input',
      payload: {
        key,
        value,
      },
    });

    dispatch({ type: 'save_data' });
  };

  const renderTabs = () => {
    switch (currentTab) {
      case 'basics':
        return <ProfileTab 
            data={data}
            onChange={onChange} 
        />;
      case 'summary':
        return <Summary 
            data={data} 
            config={config}
            onChange={onChange}
        />;
      case 'work':
        return <WorkTab 
            data={data} 
            config={config}
            onChange={onChange}
        />;
      case 'education':
        return <EducationTab 
            data={data} 
            config={config}
            onChange={onChange} 
        />;
      case 'awards':
        return <AwardsTab 
            data={data}
            config={config}
            onChange={onChange} 
        />;
      case 'certifications':
        return <CertificationsTab 
            data={data} 
            config={config}
            onChange={onChange} 
        />;
      case 'skills':
        return <SkillsTab 
            data={data}
            config={config} 
            onChange={onChange} 
        />;
      case 'references':
        return <ReferencesTab 
            data={data}
            config={config}
            onChange={onChange} 
        />;
      case 'templates':
        return <TemplatesTab 
            theme={theme} 
            onChange={onChange} 
        />;
      case 'colors':
        return <ColorsTab 
            theme={theme} 
            onChange={onChange} 
        />;
      case 'fonts':
        return <FontsTab 
            theme={theme} 
            onChange={onChange} 
        />;
      case 'actions':
        return <ActionsTab 
            data={data} 
            theme={theme} 
            config={config}
            dispatch={dispatch} 
        />;
      case 'settings':
        return <SettingsTab 
            settings={settings} 
            onChange={onChange} 
        />;
      case 'about':
        return <AboutTab />;
      default:
        return null;
    }
  };

  return (
    <div
      id="sideBar"
      className="animated slideInLeft h-screen bg-white shadow-2xl overflow-y-scroll z-20 flex"
    > 
      <TabBar tabs={tabs} currentTab={currentTab} setCurrentTab={handleChangeTab} />
      <div 
        className="px-6 py-6 h-screen overflow-y-scroll"
        style={{'width': '320px', 'display': `${tabOpen ? 'block': 'none'}`}}
      >
        {renderTabs()}
      </div>
    </div>
  );
};

export default Sidebar;
