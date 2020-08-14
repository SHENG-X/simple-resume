import React, { useContext } from 'react';

import { formatDisplayURL } from '../../utils';
import AppContext from '../../context/AppContext';
import TextArea from '../../shared/TextArea';

const Castform = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, config, theme } = state;

  const PersonalInformation = () => (
    <div className="pt-5 px-5">
      <h1 className="text-2xl font-bold">
        {data.basics.name}
      </h1>
      <h5>{data.basics.label}</h5>
    </div>
  );

  const Heading = ({ title, light = false }) => (
    <div
      className={`py-2 my-4 ${light ? 'mx-5 border-t border-b border-gray-400' : ''}`}
      style={{ backgroundColor: light ? '' : 'rgba(0, 0, 0, 0.25)' }}
    >
      <h6 className={`${light ? '' : 'pl-5'} font-semibold`}>{title}</h6>
    </div>
  );

  const Address = () => (
    (data.basics.location.address || data.basics.location.city
    || data.basics.location.region) &&
    <div className="px-5 my-2">
      <h6 className="text-xs font-bold">Address</h6>
      <div className="text-sm">{data.basics.location.address}</div>
      <div className="text-sm">
        {data.basics.location.city}
        {
          data.basics.location.region ? 
          `, ${data.basics.location.region}`: ''
        }
      </div>
    </div>
  );

  const ContactItem = ({ title, value, link = '#' }) =>
    value && (
      <div className="px-5 my-2">
        <h6 className="text-xs font-bold">{title}</h6>
        <a href={link}>
          <div className="text-sm">{value}</div>
        </a>
      </div>
    );

  const ContactInformation = () => (
    <div>
      <Heading title="Contact Information" />
      <Address />
      <ContactItem 
        title="Phone" 
        value={data.basics.phone} link={`tel:${data.basics.phone}`} 
      />
      <ContactItem
        title="Email Address"
        value={data.basics.email}
        link={`mailto:${data.basics.email}`}
      />
      <ContactItem
        title="Website"
        value={data.basics.website}
        link={`http://${data.basics.website}`}
      />
      <ContactItem 
        title="Github" 
        value={formatDisplayURL(data.basics.github)}
        link={data.basics.github}
      />
      <ContactItem 
        title="Linkedin" 
        value={formatDisplayURL(data.basics.linkedin)}
        link={data.basics.linkedin}
      />
    </div>
  );

  const SkillItem = x => x.enable && (
    <li key={x.id} className="text-sm my-2">
        {x.skill}
    </li>
  );

  const Skills = () =>
    data.skills &&
    config.skills.enable && (
      <div>
        <Heading title={config.skills.heading} />
        <ul className="list-none px-5">{data.skills.map(SkillItem)}</ul>
      </div>
    );

  const Summary = () =>
    data.basics.summary && 
    config.summary.enable && 
    <TextArea
      className="m-5"
      value={data.basics.summary}
      readOnly
    />;

  const WorkItem = x => (
    <div key={x.id} className="my-3 px-5">
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
        <Heading light title={config.work.heading} />
        {data.work.filter(x => x.enable).map(WorkItem)}
      </div>
    );

  const ReferenceItem = x => (
    <div key={x.id} className="flex flex-col">
      <h6 className="text-sm font-medium">{x.name}{x.location ? ', ' : ''}{x.location}</h6>
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
        <Heading light title={config.references.heading} />
        <div className="grid grid-cols-2 gap-6 px-5 pb-5">
          {data.references.filter(x => x.enable).map(ReferenceItem)}
        </div>
      </div>
    );

  const EducationItem = x => (
    <div key={x.id} className="my-3 px-5">
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
        <Heading light title={config.education.heading} />
        {data.education.filter(x => x.enable).map(EducationItem)}
      </div>
    );

  const AwardItem = x => (
    <div key={x.id} className="my-3 px-5">
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
      <div>
        <Heading light title={config.awards.heading} />
        {data.awards.filter(x => x.enable).map(AwardItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={x.id} className="my-3 px-5">
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
          className="col-span-4"
          style={{
            color: theme.colors.background,
            backgroundColor: theme.colors.accent,
          }}
          >
          <PersonalInformation />
          <ContactInformation />
          <Skills />
          <Certifications />
        </div>
        <div className="col-span-8">
          <Summary />
          <Work />
          <Education />
          <Awards />
          <References />
        </div>
      </div>
    </div>
  );
};

export default Castform;
