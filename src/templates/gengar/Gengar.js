import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';
import TextArea from '../../shared/TextArea';
import { hexToRgb, formatDisplayURL } from '../../utils';

const Gengar = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, config, theme } = state;

  const { r, g, b } = hexToRgb(theme.colors.accent) || {};

  const FullName = () => (
    <div>
      <h1 className="text-2xl font-bold leading-tight">{data.basics.name}</h1>
      <div className="text-xs font-medium mt-2">{data.basics.label}</div>
    </div>
  );

  const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
      <div className="flex items-center mb-3">
        <div
          className="w-5 h-5 rounded-full flex justify-center items-center mr-2"
          style={{ backgroundColor: theme.colors.background }}
        >
          <i
            className="flex justify-center items-center material-icons text-xs"
            style={{ color: theme.colors.accent }}
          >
            {
              icon === 'github' ? <i className='icon-github-circled'/>
              :
              icon === 'linkedin' ? <i className='icon-linkedin' />
              :
              icon
            }
          </i>
        </div>
        <a href={link}>
          <span className="text-sm font-medium break-all">{value}</span>
        </a>
      </div>
    );

  const Heading = ({ title }) => (
    <h6 className="font-bold text-xs uppercase tracking-wide mb-2">{title}</h6>
  );

  const Summary = () =>
    data.basics.summary &&
    config.summary.enable && (
      <div className="flex flex-col justify-center items-start mb-6">
        <Heading title={config.summary.heading} />
        <TextArea
          value={data.basics.summary}
          readOnly
        />
      </div>
  );

  const SkillItem = x => (
    <li key={x.id} className="text-sm py-1">
      {x.skill}
    </li>
  );

  const Skills = () =>
    data.skills &&
    config.skills.enable && (
      <div className="mb-6">
        <Heading title={config.skills.heading} />
        <ul>{data.skills.map(SkillItem)}</ul>
      </div>
    );

  const EducationItem = x => (
    <div key={x.id} className="mb-3">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">
            {x.institution}{x.location ? ', ' : ''}{x.location}
          </h6>
          <small>
            {
              x.startDate !== '' && x.endDate !== '' && (
                  <span className="text-xs font-medium">
                    ({x.startDate} - {x.endDate})
                  </span>
              )
            }
        </small>
          <p className="text-xs">{x.major}</p>
        </div>
        <div className="flex flex-col text-right items-end">
          <span className="text-sm font-bold" style={{ color: theme.colors.accent }}>
            {x.gpa}
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
      <div className="mb-6">
        <Heading title={config.education.heading} />
        {data.education.filter(x => x.enable).map(EducationItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={x.id} className="mb-3">
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
      <div className="mb-6">
        <Heading title={config.certifications.heading} />
        {data.certifications.filter(x => x.enable).map(CertificationItem)}
      </div>
    );

  const AwardItem = x => (
    <div key={x.id} className="mb-3">
      <div className="flex justify-between">
        <h6 className="font-semibold">{x.title}</h6>
        <p className="text-xs font-medium">{x.date}</p>
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
      <div className="mb-6">
        <Heading title={config.awards.heading} />
        {data.awards.filter(x => x.enable).map(AwardItem)}
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
        <div className="grid grid-cols-2 gap-6">
          {data.references.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  const WorkItem = x => (
    <div key={x.id} className="mb-3">
      <div className="flex justify-between items-center">
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
      <div className="mb-6">
        <Heading title={config.work.heading} />
        {data.work.filter(x => x.enable).map(WorkItem)}
      </div>
    );

  return (
    <div
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-12"
        style={{'minHeight': 'inherit'}}
      >
        <div
          className="col-span-4 px-6 py-8"
          style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
        >
          <div className="flex items-center">
            <FullName />
          </div>

          <hr className="w-1/4 my-5 opacity-50" />

          <ContactItem 
            icon="phone" 
            value={data.basics.phone} 
            link={`tel:${data.basics.phone}`} 
          />
          <ContactItem
            icon="email"
            value={data.basics.email}
            link={`mailto:${data.basics.email}`}
          />
          <ContactItem
            icon="language"
            value={data.basics.website}
            link={`http://${data.basics.website}`}
          />
          <ContactItem 
            icon="location_on" 
            value={data.basics.location.city + (data.basics.location.region ? `, ${data.basics.location.region}`: '')} 
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

        <div
          className="col-span-8 px-6 py-8"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <Summary />
        </div>

        <div
          className="col-span-4 px-6 py-8"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
        >
          <Skills />
          <Education />
          <Certifications />
        </div>

        <div className="col-span-8 px-6 py-8">
          <Work />
          <Awards />
          <References />
        </div>
      </div>
    </div>
  );
};

export default Gengar;
