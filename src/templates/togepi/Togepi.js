import React, { useContext } from 'react';

import { formatDisplayURL } from '../../utils';
import RichTextArea from '../../shared/RichTextArea';
import AppContext from '../../context/AppContext';

const Togepi = () =>{
    const context = useContext(AppContext);
    const { state } = context;
    const { data, config, theme } = state;

    const DevideLine = () =>(
        <div className="grid grid-cols-12" style={{'height':'0.1em'}}>
                    <div className="col-span-2" style={{background: theme.colors.accent}}/>
                    <div className="col-span-10" style={{background: theme.colors.primary}}/>
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
            <div className="text-right">
                <a href={link}>
                    <span className="font-medium break-all mr-2">{value}</span>
                </a>
                <span className="float-right material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
                    {
                        icon === 'github' ? <i className='icon-github-circled'/> : 
                        icon === 'linkedin' ? <i className='icon-linkedin' /> : 
                        icon
                    }
                </span>
            </div>
    );

    const Heading = ({ title }) => (
        <h6 className="text-lg font-bold uppercase mt-6 mb-0" style={{ color: theme.colors.accent }}>
            {title}
        </h6>
    );

    const EducationItem = x => (
        <div key={x.id}>
            
            <div className="flex justify-between ">
                <div><h6>{x.startDate}-{x.endDate}</h6></div>
                <div><h6>{x.institution}{x.location ? ', ' : ''}{x.location}</h6></div>
                <div className="mr-15"><h6>{x.major}</h6></div>
            </div>
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
                <DevideLine/>
                {data.education.filter(x => x.enable).map(EducationItem)}
            </div>
        );

    const WorkItem = x => (
        <div key={x.id}>
            <div className="flex justify-between">
                <div><h6>{x.startDate} - {x.endDate}</h6></div>
                <div><h6>{x.company}{x.location ? ', ' : ''}{x.location}</h6></div>
                <div><h6>{x.position}</h6></div>
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
                <DevideLine/>
                {data.work.filter(x => x.enable).map(WorkItem)}
            </div>
    );

    const CertificationItem = x => (
        <div key={x.id} className="mt-3">
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

    const Certificate = () => 
        data.certifications &&
        config.certifications.enable && (
            <div>
                <Heading title={config.certifications.heading} />
                <DevideLine/>
                {data.certifications.filter(x => x.enable).map(CertificationItem)}
            </div>
    );

    const AwardItem = x => 
    (
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
                <DevideLine/>
                <div className="flex flex-col mb-2">
                    {data.awards.filter(x => x.enable).map(AwardItem)}
                </div>
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

    const Skill = () => 
        data.skills &&
        config.skills.enable && (
            <div>
                <Heading title={config.skills.heading}/>
                <DevideLine/>
                <div className="mt-1 flex flex-wrap">{data.skills.map(SkillItem)}</div>
            </div>
    );
    
    const Summary = () =>
        data.basics.summary &&
        config.summary.enable && (
            <div>
                <Heading title={config.summary.heading} />
                <DevideLine/>
                <RichTextArea
                    value={data.basics.summary}
                    readOnly
                />
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
            
            <div className="px-6 py-5">
                <div className="grid grid-cols-12">
                    <div className="col-span-8">
                        <Profile/>
                    </div>

                    <div className="col-span-4 text-xs relative">
                        <div className="object-none absolute bottom-0 right-0">
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