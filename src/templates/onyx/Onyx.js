import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';
import { formatDisplayURL } from '../../utils';
import TextArea from '../../shared/TextArea';

const Onyx = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, config, theme } = state;

  const Profile = () => (
    <div>
      <h1 className="font-bold text-6xl" style={{ color: theme.colors.accent }}>
        {data.basics.name}
      </h1>
      <h6 className="font-medium text-sm">{data.basics.label}</h6>
    </div>
  );

  const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
      <div className="flex items-center my-2">
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
    <h6 className="text-xs font-bold uppercase mt-6 mb-2" style={{ color: theme.colors.accent }}>
      {title}
    </h6>
  );

  const Summary = () =>
    data.basics.summary &&
    config.summary.enable && (
      <div>
        <Heading title={config.summary.heading} />
        <TextArea
          value={data.basics.summary}
          readOnly
        />
      </div>
    );

  const WorkItem = x => (
    <div key={x.id} className="mt-3">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.company}{x.location ? ', ' : ''}{x.location}</h6>
          <p className="text-xs">{x.position}</p>
        </div>
        <span className="text-xs font-medium">
          ({x.startDate} - {x.endDate})
        </span>
      </div>
      <TextArea
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

  const EducationItem = x => (
    <div key={x.id} className="mt-3">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.institution}{x.location ? ', ' : ''}{x.location}</h6>
          <p className="text-xs">{x.major}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold">{x.gpa}</span>
          <span className="text-xs font-medium">
              ({x.startDate} - {x.endDate})
          </span>
        </div>
      </div>
      <TextArea
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
        {data.education.filter(x => x.enable).map(EducationItem)}
      </div>
    );

  const AwardItem = x => (
    <div key={x.id} className="mt-3">
      <div className="flex justify-between">
        <h6 className="font-semibold">{x.title}</h6>
        <p className="text-xs font-medium" style={{'whiteSpace': 'nowrap'}}>{x.date}</p>
      </div>
      <p className="text-xs">{x.awarder}</p>
      <TextArea
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
        {data.awards.filter(x => x.enable).map(AwardItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={x.id} className="mt-3">
      <div className="flex justify-between">
        <h6 className="font-semibold">{x.title}</h6>
        <p className="text-xs font-medium">{x.date}</p>
      </div>
      <p className="text-xs">{x.issuer}</p>
      <TextArea
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
        {data.certifications.filter(x => x.enable).map(CertificationItem)}
      </div>
    );

  const SkillItem = x => (
    <span
      key={x.id}
      className="text-xs rounded-full px-3 py-1 font-medium my-2 mr-2"
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
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
      <TextArea
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
      <div className="grid grid-cols-4 items-center">
        <div className="col-span-3 flex items-center">
          <Profile />
        </div>

        <div className="col-span-1 text-xs">
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

      <div className={`grid ${config.awards.enable && config.certifications.enable ? 'grid-cols-2 gap-6' : ''}`}>
        <Awards />
        <Certifications />
      </div>

      <div className="grid">
        <Skills />
      </div>

      <References />
    
    </div>
  );
};

export default Onyx;
