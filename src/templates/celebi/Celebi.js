import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';
import RichTextArea from '../../shared/RichTextArea';
import { hexToRgb, formatDisplayURL } from '../../utils';

const styles = {
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#222',
        height: '160px',
        display: 'flex',
        alignItems: 'center'
    },
    section: {
        marginTop: '167px',
        marginLeft: '20px',
    }
};

const Celebi = () => {
    const context = useContext(AppContext);
    const { state } = context;
    const { data, config, theme } = state;

    const { r, g, b } = hexToRgb(theme.colors.accent) || {};

    const Heading = ({ title, className }) => (
        <h5
            className={`my-2 text-md uppercase font-semibold tracking-wider pb-1 border-b-2 border-gray-800 ${className}`}
        >
            {title}
        </h5>
    );

    const Header = () => (
        <header style={styles.header}>
            <div className="text-center">
                <h1 className="tracking-wide uppercase font-semibold" style={{ fontSize: '2.75em' }}>
                    {data.basics.name}
                </h1>
                <h6 className="text-lg tracking-wider uppercase">{data.basics.label}</h6>
            </div>
        </header>
    );

    const Summary = () =>
        data.basics.summary &&
        config.summary.enable && (
            <div className="mb-6">
                <Heading title={config.summary.heading} />
                <RichTextArea
                    className="my-3 mr-10"
                    value={data.basics.summary}
                    readOnly
                />
            </div>
        );

    const ContactItem = ({ title, link='#', value }) =>
        value && (
            <div className="mb-3">
                <h6 className="text-xs font-bold">{title}</h6>
                <a href={link}>
                    <p className="text-sm">{value}</p>
                </a>
            </div>
        );

    const Contact = () => (
        <div className="mb-6">
            <Heading title="Contact" className="mt-8 w-3/4 mx-auto" />
            {
                (data.basics.location.address || data.basics.location.city
                || data.basics.location.region) &&
                <div className="mb-3">
                    <h6 className="text-xs font-bold">Address</h6>
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
            }
            <ContactItem 
                title="Phone" 
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
                link={`http://${data.basics.website}`}
                value={data.basics.website} 
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

    const WorkItem = x => (
        <div key={x.id} className="my-3 mr-10">
            <div>
                <h6 className="font-semibold">{x.company}</h6>
                <p className="text-xs text-gray-800">
                    {x.position}{x.location ? ', ' : ''}{x.location} | {x.startDate} - {x.endDate}
                </p>
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
            <div className="mb-6">
                <Heading title={config.work.heading} />
                {data.work.filter(x => x.enable).map(WorkItem)}
            </div>
        );

    const EducationItem = x => (
        <div key={x.id} className="my-3 mr-10">
            <h6 className="font-semibold">{x.institution}{x.location ? ', ' : ''}{x.location}</h6>
            <p className="text-xs">{x.major} | {x.startDate} - {x.endDate}</p>
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
            <div className="mb-6">
                <Heading title={config.education.heading} />
                {data.education.filter(x => x.enable).map(EducationItem)}
            </div>
        );

    const Skills = () =>
        config.skills.enable && (
            <div className="mb-6">
                <Heading title="Skills" className="w-3/4 mx-auto" />
                <ul className="list-none text-sm">
                {data.skills.map(x => (
                    <li key={x.id} className="my-2">
                    {x.skill}
                    </li>
                ))}
                </ul>
            </div>
        );

    const ReferenceItem = x => (
        <div key={x.id} className="flex flex-col">
            <h6 className="text-sm font-semibold">{x.name}</h6>
            <span className="text-sm">{x.position}</span>
            <span className="text-sm">{x.phone}</span>
            <span className="text-sm">{x.email}</span>
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
            <div className="mb-6">
                <Heading title={config.references.heading} />
                <div className="grid grid-cols-2 col-gap-4 row-gap-2">
                {data.references.filter(x => x.enable).map(ReferenceItem)}
                </div>
            </div>
        );

    const AwardItem = x => (
        <div key={x.id} className="my-2">
            <div className="flex justify-between">
                <h6 className="font-semibold">{x.title}</h6>
            </div>
            <p className="text-xs">{x.awarder}{x.date ? ` | ${x.date}`: ''}</p>
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
            <div className="mb-6">
                <Heading light title={config.awards.heading} />
                {data.awards.filter(x => x.enable).map(AwardItem)}
            </div>
        );

    const CertificationItem = x => (
        <div key={x.id} className="my-2 px-6">
            <div className="flex justify-between">
                <h6 className="font-semibold">{x.title}</h6>
                <p className="text-xs font-medium">{x.date}</p>
            </div>
            <p className="flex text-xs">{x.issuer}</p>
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
            <div className="mb-6">
                <Heading title={config.certifications.heading} className="w-3/4 mx-auto" />
                {data.certifications.filter(x => x.enable).map(CertificationItem)}
            </div>
        );

    return (
        <div
            style={{
                fontFamily: theme.font.family,
                backgroundColor: theme.colors.background,
                color: theme.colors.primary,
                minHeight: '29.7cm'
            }}
        >
            <div className="grid grid-cols-12"
                style={{'minHeight': 'inherit'}}
            >
                <div
                    className="sidebar col-span-4 pb-8 ml-8 z-10 text-center"
                    style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`, marginTop: '160px' }}
                >
                    <Contact />
                    <Skills />
                    <Certifications />
                </div>
                
                <div className="col-span-8">
                    <Header />
                    
                    <section className="py-4" style={styles.section}>
                        <Summary />
                        <Work />
                        <Education />
                        <Awards />
                        <References />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Celebi;
