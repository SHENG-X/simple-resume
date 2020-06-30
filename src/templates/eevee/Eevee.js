import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';
import { formatDisplayURL } from '../../utils';
import RichTextArea from '../../shared/RichTextArea';

const Eevee = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, config, theme } = state;

  const Profile = () => (
    <>
      <h1 className="font-bold text-6xl" style={{ color: theme.colors.accent }}>
        {data.basics.name}
      </h1>
      <h6 className="font-medium text-sm mb-2">{data.basics.label}</h6>
    </>
  );

  const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
      <div
        className="flex items-center mx-2 flex-wrap"
      >
        <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent, display: 'inherit' }}>
          {
            icon === 'github' ? <i className='icon-github-circled ' />
            :
            icon === 'linkedin' ? <i className='icon-linkedin ' />
            :
            icon
          }
        </span>
        <a href={link}>
          <span className="font-medium break-all">{value}</span>
        </a>
      </div>
    );

  const Heading = ({ title }) => (
    <h6 className="text-md font-bold uppercase mt-6 mb-2"
      style={{
        color: theme.colors.accent,
        backgroundColor: '#eee',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% + 12px)',
        marginLeft: '-12px',
        padding: '12px',
      }}
    >
      {title}
    </h6>
  );

  const Summary = () =>
    data.basics.summary &&
    config.summary.enable && (
      <div>
        <Heading title={config.summary.heading} />
        <RichTextArea
          className="mt-3"
          value={data.basics.summary}
          readOnly
        />
      </div>
    );

  const SectionItem = ({ date, children }) => 
    <div className="grid grid-cols-8 mt-3">
      <div className="col-span-2">
        { date }
      </div>
      <div className="col-start-3 col-span-6">
        { children }
      </div>
    </div>

  const WorkItem = x => (
    <div>
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.company}{x.location ? ', ' : ''}{x.location}</h6>
          <p className="text-xs">{x.position}</p>
        </div>
      </div>
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
      <>
        <Heading title={config.work.heading} />
        {
          data.work.filter(x => x.enable).map(item =>
            <SectionItem
              date={`${item.startDate} - ${item.endDate}`}
              key={item.id}
            >
              <WorkItem {...item}/>
            </SectionItem>
          )
        }
      </>
    );

  const EducationItem = x => (
    <div>
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.institution}{x.location ? ', ' : ''}{x.location}</h6>
          <div className="text-xs">
            <span>{x.major}</span>
            <span> | </span>
            <span>{x.gpa}</span>
          </div>
        </div>
      </div>
      <RichTextArea
        className="mt-2"
        value={x.description}
        readOnly
      />
    </div>
  );

  const Education = () =>
    data.education &&
    config.education.enable && (
      <div>
        <Heading title={config.education.heading} />
        {
          data.education.filter(x => x.enable).map(item => 
            <SectionItem
                date={`${item.startDate} - ${item.endDate}`}
                key={item.id}
            >
              <EducationItem {...item}/>
            </SectionItem>
          )
        }
      </div>
    );

  const AwardItem = x => (
    <div>
      <div className="flex justify-between">
        <h6 className="font-semibold">{x.title}</h6>
      </div>
      <p className="text-xs">{x.awarder}</p>
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
        {
          data.awards.filter(x => x.enable).map(item => 
            <SectionItem
              date={item.date}
              key={item.id}
            >
              <AwardItem {...item}/>
            </SectionItem>
          )
        }
      </div>
    );

  const CertificationItem = x => (
    <div>
      <div className="flex justify-between">
        <h6 className="font-semibold">{x.title}</h6>
      </div>
      <p className="text-xs">{x.issuer}</p>
      <RichTextArea
        className="mt-2"
        value={x.summary}
        readOnly
      />
    </div>
  );
                            
  const Certifications = () =>
    data.certifications &&
    config.certifications.enable && (
      <div>
        <Heading title={config.certifications.heading} />
        {
          data.certifications.filter(x => x.enable).map(item => 
            <SectionItem
              date={item.date}
              key={item.id}
            >
              <CertificationItem {...item}/>
            </SectionItem>
          )
        }
      </div>
    );

  const SkillItem = x => (
    <span
      key={x.id}
      className="text-xs rounded-full px-3 py-1 font-medium my-2 mr-2"
      style={{
        backgroundColor: '#eeeeee',
        minWidth: '60px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {x.skill}
    </span>
  );

  const Skills = () =>
    data.skills &&
    config.skills.enable && (
      <div>
        <Heading title={config.skills.heading} />
        <div className="mt-1 flex flex-wrap">{data.skills.map(SkillItem)}</div>
      </div>
    );

  const ReferenceItem = x => (
    <div key={x.id} className="flex flex-col">
      <h6 className="text-sm font-medium">{x.name}</h6>
      <span className="text-xs">{x.position}</span>
      <span className="text-xs">{x.phone}</span>
      <span className="text-xs">{x.email}</span>
      <RichTextArea
        className="mt-2"
        value={x.description}
        readOnly
      />
    </div>
  );

  const References = () =>
    data.references &&
    config.references.enable && (
      <div>
        <Heading title={config.references.heading} />
        <div className="grid grid-cols-3 gap-6">
          {data.references.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  return (
    <div
      className="p-10"
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="flex flex-col items-center">
        {/* <div className="col-span-3 flex items-center"> */}
          <Profile />
        {/* </div> */}

        <div className="flex flex-wrap justify-center">
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

      <hr className="my-6" />

      <Summary />
      <Work />
      <Education />

      <Awards />
      <Certifications />

      <div className="grid">
        <Skills />
      </div>

      <References />
    
    </div>
  );
};

export default Eevee;
