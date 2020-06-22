import React, { useContext } from 'react';

import { formatDisplayURL } from '../../utils';
import RichTextArea from '../../shared/RichTextArea';
import AppContext from '../../context/AppContext';

const Togepi = () =>{
    const context = useContext(AppContext);
    const { state } = context;
    const { data, config, theme } = state;

    const LineDivider = () =>(
        <div className="grid grid-cols-12">
            <div className="col-span-2" style={{background: theme.colors.accent, height: '2px'}}/>
            <div className="col-span-10" style={{background: theme.colors.primary, height: '2px'}}/>
        </div>
    );

    const Title = ({t1, t2, t3}) => (
      <div className="grid grid-cols-12 font-semibold">
        <h6 className="col-span-3">
          {t1}
        </h6>
        <h6 className="col-start-4 col-span-5">
          {t2}
        </h6>
        <h6 className="col-start-9 col-span-4">
          {t3}
        </h6>
      </div>
    );
    
    const Profile = () => (
        <div className="flex justify-start">
            <div className="mt-0">
                <h1 className="text-6xl">{data.basics.name}</h1>
                <h6 className="text-xl" style={{color: theme.colors.primary}}>{data.basics.label}</h6>
            </div>
        </div>
    );

    const ContactItem = ({icon, value, link = '#'}) => 
        value && (
            <div className="flex items-center justify-end my-3">
                <a href={link}>
                    <span className="font-medium break-all mr-2">{value}</span>
                </a>
                <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
                    {
                        icon === 'github' ? <i className='icon-github-circled'/> : 
                        icon === 'linkedin' ? <i className='icon-linkedin' /> : 
                        icon
                    }
                </span>
            </div>
    );

    const Heading = ({ title }) => (
        <>
          <h6 className="text-lg font-bold uppercase mt-6 mb-0" style={{ color: theme.colors.accent }}>
            {title}
          </h6>
          <LineDivider/>
        </>
    );

    const EducationItem = x => (
        <div className="mt-3" key={x.id}>
            <Title
              t1={`${x.startDate} - ${x.endDate}`}
              t2={`${x.institution}${x.location ? ', ' : ''}${x.location}`}
              t3={x.major}
            />
            <div>
                <RichTextArea
                    className="mt-2"
                    value={x.description}
                    readOnly
                />
            </div>
        </div>
    );

    const Education = () =>
        data.education &&
        config.education.enable && (
            <div className="mb-6">
                <Heading title={config.education.heading} />
                {data.education.filter(x => x.enable).map(EducationItem)}
            </div>
        );

    const WorkItem = x => (
        <div className="mt-3" key={x.id}>
            <Title
              t1={`${x.startDate} - ${x.endDate}`}
              t2={`${x.company}${x.location ? ', ' : ''}${x.location}`}
              t3={x.position}
            />
            <RichTextArea
                className="mt-2"
                value={x.description}
                readOnly
            />
        </div>
    );

    const Work = () => 
        data.work &&
        config.work.enable && (
            <div>
                <Heading title={config.work.heading} />
                {data.work.filter(x => x.enable).map(WorkItem)}
            </div>
    );

    const CertificationItem = x => (
        <div key={x.id} className="mt-3">
            <Title
              t1={x.date}
              t2={x.issuer}
              t3={x.title}
            />
            <RichTextArea
                className="mt-2"
                value={x.summary}
                readOnly
            />
        </div>
    );

    const Certificate = () => 
        data.certifications &&
        config.certifications.enable && (
            <div>
                <Heading title={config.certifications.heading} />
                {data.certifications.filter(x => x.enable).map(CertificationItem)}
            </div>
    );

    const AwardItem = x => 
    (
        <div key={x.id} className="mt-3">
            <Title
              t1={x.date}
              t2={x.awarder}
              t3={x.title}
            />
            <RichTextArea
                className="mt-2"
                value={x.summary}
                readOnly
            />
        </div>
    );

    const Awards = () => 
        data.awards &&
        config.awards.enable && (
            <div>
                <Heading title={config.awards.heading} />
                <div className="flex flex-col mb-2">
                    {data.awards.filter(x => x.enable).map(AwardItem)}
                </div>
            </div>
    );

    const SkillItem = x => (
        <li
          key={x.id}
          className="text-xs py-1 font-medium"
        >
            {x.skill}
        </li>
    );

    const Skill = () => 
        data.skills &&
        config.skills.enable && (
            <div>
                <Heading title={config.skills.heading}/>
                <ul className="mt-1 grid grid-cols-2">{data.skills.map(SkillItem)}</ul>
            </div>
    );
    
    const Summary = () =>
        data.basics.summary &&
        config.summary.enable && (
            <div>
                <Heading title={config.summary.heading} />
                <div className="mt-3">
                  <RichTextArea
                      value={data.basics.summary}
                      readOnly
                  />
                </div>
            </div>
    );

    return(
        <div style={{fontFamily: theme.font.family}}>
            <div className="grid grid-cols-12 mb-5">
                <div className="col-span-1 mt-8 h-8" style={{background: theme.colors.primary}}/>
                <div className="col-start-2 col-span-11 mt-8 text-white h-8" style={{backgroundColor: theme.colors.accent}}>
                    <h1 className="ml-3 mt-1">RESUME</h1>
                </div>
            </div>
            
            <div className="px-6 pb-5">
                <div className="grid grid-cols-12">
                    <div className="col-span-8 flex items-center">
                        <Profile/>
                    </div>

                    <div className="col-span-4 text-xs">
                      <ContactItem 
                          icon="location_on" 
                          value={data.basics.location.city + (data.basics.location.region ? `, ${data.basics.location.region}`: '')} 
                      />
                      <ContactItem 
                          icon="phone" 
                          value={data.basics.phone} 
                          link={`tel:${data.basics.phone}`} 
                      />
                      <ContactItem
                          icon="language"
                          value={data.basics.website}
                          link={`http://${data.basics.website}`}
                      />
                      <ContactItem
                          icon="email"
                          value={data.basics.email}
                          link={`mailto:${data.basics.email}`}
                      />
                      <ContactItem 
                          icon="github" 
                          value={formatDisplayURL(data.basics.github)} 
                          link={data.basics.github}
                      />
                      <ContactItem 
                          icon="linkedin" 
                          value={formatDisplayURL(data.basics.linkedin)}
                          link={data.basics.linkedin}
                      />
                    </div>
                </div>
                <Education/>
                <Work/>
                <Certificate/>
                <Awards/>
                <Skill/>
                <Summary/>
            </div>

            <div className="grid grid-cols-12 w-full absolute bottom-0">
              <div className="col-span-3 h-2" style={{background: theme.colors.primary}}/>
              <div className="col-start-4 col-span-9 h-2" style={{backgroundColor: theme.colors.accent}}/>
            </div>
        </div>
    );
};

export default Togepi;