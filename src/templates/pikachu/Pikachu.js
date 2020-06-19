import React, { useContext } from 'react';

import { formatDisplayURL } from '../../utils';
import RichTextArea from '../../shared/RichTextArea';
import AppContext from '../../context/AppContext';

const Pikachu = () => {
    const context = useContext(AppContext);
    const { state } = context;
    const { data, config, theme } = state;

    const Header = () => (
        <div
            className="h-48 rounded flex flex-col justify-center"
            style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
        >
            <div className="flex flex-col justify-center mx-8 my-6">
                <h1 className="text-3xl font-bold leading-tight">
                    {data.basics.name}
                </h1>
                <div className="text-sm font-medium tracking-wide">{data.basics.label}</div>

                <hr className="my-4 opacity-50" />

                <RichTextArea
                    value={data.basics.summary}
                    readOnly
                />
            </div>
        </div>
    );

    const ContactItem = ({ icon, value, link = '#' }) =>
        value && (
            <div className="flex items-center my-3">
                <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
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
        <div
            className="mb-2 border-b-2 pb-1 font-bold uppercase tracking-wide text-sm"
            style={{ color: theme.colors.accent, borderColor: theme.colors.accent }}
        >
            {title}
        </div>
    );

    const SkillItem = x => (
        <span
            key={x.id}
            className="leading-none rounded-lg text-sm font-medium bg-gray-300 py-3 my-1 px-4"
        >
            {x.skill}
        </span>
    );

    const Skills = () =>
        data.skills &&
        config.skills.enable && (
            <div>
                <Heading title={config.skills.heading} />
                <div className="flex flex-col mb-6">{data.skills.map(SkillItem)}</div>
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
                <div className="grid grid-cols-2 gap-2 mb-6">
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
                <div className="flex flex-col mb-4">
                    {data.work.filter(x => x.enable).map(WorkItem)}
                </div>
            </div>
        );

    const EducationItem = x => (
        <div key={x.id} className="mb-2">
            <div className="flex justify-between items-center">
                <div>
                    <h6 className="font-semibold">{x.institution}{x.location ? ', ' : ''}{x.location}</h6>
                    <p className="text-xs">{x.major}</p>
                </div>
                <div className="flex flex-col text-right items-end">
                    <span className="text-sm font-bold" style={{ color: theme.colors.accent }}>
                        {x.gpa}
                    </span>
                    <span className="text-xs font-medium">
                        ({x.startDate} - {x.endDate})
                    </span>
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
                <div className="flex flex-col mb-4">
                    {data.education.filter(x => x.enable).map(EducationItem)}
                </div>
            </div>
        );

    const AwardItem = x => (
        <div key={x.id} className="mb-2">
            <div className="flex justify-between">
                <h6 className="font-semibold">{x.title}</h6>
                <p className="text-xs font-medium">{x.date}</p>
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
                <div className="flex flex-col mb-2">
                    {data.awards.filter(x => x.enable).map(AwardItem)}
                </div>
            </div>
        );

    const CertificationItem = x => (
        <div key={x.id} className="mb-3">
            <div className="flex justify-between">
                <h6 className="font-semibold">{x.title}</h6>
                <p className="text-xs font-medium">{x.date}</p>
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
                <div className="flex flex-col mb-2">
                    {data.certifications.filter(x => x.enable).map(CertificationItem)}
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
            <div className="grid grid-cols-12 col-gap-6 row-gap-8">
                <div className="col-span-12">
                    <Header />
                </div>

                <div className="col-span-4 overflow-hidden">
                    <div className="text-sm mb-6">
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
                        <ContactItem icon="location_on" value={data.basics.location.city + (data.basics.location.region ? `, ${data.basics.location.region}`: '')} />

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

                    <Skills />
                    <Certifications />
                </div>

                <div className="col-span-8">
                    <Work />
                    <Education />
                    <Awards />
                    <References />
                </div>
            </div>
        </div>
    );
};

export default Pikachu;
