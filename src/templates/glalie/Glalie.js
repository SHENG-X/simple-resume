import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';
import RichTextArea from '../../shared/RichTextArea';
import { hexToRgb, formatDisplayURL } from '../../utils';

const Glalie = () => {
    const context = useContext(AppContext);
    const { state } = context;
    const { data, config, theme } = state;

    const { r, g, b } = hexToRgb(theme.colors.accent) || {};

    const FullName = () => (
        <div className="text-4xl font-bold leading-none">
            <h1>{data.basics.name}</h1>
        </div>
    );

    const Subtitle = () => (
        <div className="tracking-wide text-xs uppercase font-medium">{data.basics.label}</div>
    );

    const ContactItem = ({ title, link='#', value }) =>
        value && (
            <div className="flex flex-col">
                <h6 className="text-xs font-bold" style={{ color: theme.colors.accent }}>
                    {title}
                </h6>
                <a href={link}>
                    <p className="text-sm">{value}</p>
                </a>
            </div>
        );

    const ContactInformation = () => (
        <div
            className="w-full border-2 pl-4 pr-4 mb-6"
            style={{
                borderColor: theme.colors.accent,
            }}
        >
            <div
                className="inline-block relative px-4"
                style={{ top: '-.75em', color: theme.colors.accent }}
            >
                <h2 className="flex">
                    <i className="material-icons">flare</i>
                </h2>
            </div>

            <div className="grid grid-cols-1 row-gap-4">
                <ContactItem 
                    title="Phone Number" 
                    link={`tel:${data.basics.phone}`} 
                    value={data.basics.phone} 
                />
                <ContactItem 
                    title="Email Address" 
                    link={`mailto:${data.basics.email}`}
                    value={data.basics.email} 
                />
                <ContactItem 
                    title="Website" 
                    value={data.basics.website}
                    link={`http://${data.basics.website}`}
                />

                <div className="flex flex-col">
                    <i className="material-icons text-lg" style={{ color: theme.colors.accent }}>
                        home
                    </i>
                    <p className="text-sm">{data.basics.location.address}</p>
                    <p className="text-sm">
                        {data.basics.location.city}
                        {
                            data.basics.location.region ? 
                            `, ${data.basics.location.region}`
                            :
                            ''
                        }
                    </p>
                </div>
                
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
        </div>
    );

    const Heading = ({ title }) => (
        <h6
            className="text-sm font-semibold uppercase pb-1 mb-2 border-b"
            style={{ borderColor: theme.colors.accent, color: theme.colors.accent }}
        >
            {title}
        </h6>
    );

    const Summary = () =>
        data.basics.summary && config.summary.enable && (
            <div>
                <Heading title={config.summary.heading} />
                <RichTextArea
                    className="justify-text" 
                    value={data.basics.summary}
                    readOnly
                />
            </div>
        );

    const WorkItem = x => (
        <div key={x.id} className="mt-3">
            <div className="flex justify-between">
                <div>
                    <h6 className="font-semibold text-sm">{x.company}{x.location ? ', ' : ''}{x.location}</h6>
                    <p className="text-xs opacity-75 font-medium">
                        {x.position} / {x.startDate} - {x.endDate}
                    </p>
                </div>
            </div>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
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
            <div>
                <h6 className="font-semibold text-xs">{x.institution}{x.location ? ', ' : ''}{x.location}</h6>
                <p className="text-xs opacity-75">{x.major}</p>
                <p className="text-xs opacity-75">
                    {x.startDate} - {x.endDate}
                </p>
            </div>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const Education = () =>
        data.education &&
        config.education.enable && (
            <div>
                <Heading title={config.education.heading} />
                <div className="grid grid-cols-2 gap-4">
                    {data.education.filter(x => x.enable).map(EducationItem)}
                </div>
            </div>
        );

    const AwardItem = x => (
        <div key={x.id} className="mt-3 text-left">
            <div className="flex justify-between">
                <h6 className="font-semibold">{x.title}</h6>
                <p className="text-xs font-medium">{x.date}</p>
            </div>
            <p className="text-xs">{x.awarder}</p>
            <ReactMarkdown className="mt-2 text-sm" source={x.summary} />
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
        <div key={x.id} className="mt-3 text-left">
            <div className="flex justify-between">
                <h6 className="font-semibold">{x.title}</h6>
                <p className="text-xs font-medium">{x.date}</p>
            </div>
            <p className="text-xs">{x.issuer}</p>
            <ReactMarkdown className="mt-2 text-sm" source={x.summary} />
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
        <li key={x.id} className="text-xs font-medium">
            {x.skill}
        </li>
    );

    const Skills = () =>
        data.skills &&
        config.skills.enable && (
            <div>
                <Heading title={config.skills.heading} />
                <ul className="pt-2 grid grid-cols-2 gap-3">{data.skills.map(SkillItem)}</ul>
            </div>
        );

    const ReferenceItem = x => (
        <div key={x.id} className="flex flex-col">
            <h6 className="text-sm font-medium">{x.name}</h6>
            <span className="text-xs">{x.position}</span>
            <span className="text-xs">{x.phone}</span>
            <span className="text-xs">{x.email}</span>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const References = () =>
        data.references &&
        config.references.enable && (
            <div>
                <Heading title={config.references.heading} />
                <div className="grid grid-cols-3 gap-8">
                {data.references.filter(x => x.enable).map(ReferenceItem)}
                </div>
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
            <div className="grid grid-cols-12">
                <div
                    className="h-full col-span-4 p-8 grid grid-cols-1 row-gap-4 text-center"
                    style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`, minHeight: '29.7cm' }}
                >
                    <div className="grid grid-cols-1 gap-2">
                        <FullName />
                        <Subtitle />
                    </div>

                    <ContactInformation />
                    <Summary />
                    <Certifications />
                </div>

                <div className="col-span-8 p-8 grid grid-cols-1 row-gap-4">
                    <Work />
                    <Education />
                    <Skills />
                    <Awards />
                    <References />
                </div>
            </div>
        </div>
    );
};

export default Glalie;
