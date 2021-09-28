import React, {useEffect, useState} from 'react';
import {Linkedin, GitHub, Mail, Smartphone, Twitter} from 'react-feather';
import Skill from './skill';

function SideBar(props) {
    if (props.data === undefined || props.data.name == undefined) return (<></>);

    const name = props.data.name.first + " " + props.data.name.last;
    const social = props.data.social;
    const phone = "(" + social.phone.area + ") " + social.phone.prefix + "-" + social.phone.line;
    const my_skills = props.myskills;
    const [skillsOpen, setSkillsOpen] = useState(true);

    const skilltab = document.getElementById("tab-skills");

    const skillsClick = (event) => {
        setSkillsOpen(!skillsOpen);
    }

    useEffect(() => {
        const mql = window.matchMedia("(max-width:640px)");
        setSkillsOpen(!mql.matches);
    }, []);

    return (
        <div className="bg-gray-800 text-white p-3 lg:w-1/5 lg:mw-1/5 sm:shadow h-auto sm:h-screen" id="sidebar">
            <div id="sidebar-pic">
                <img className="w-20 rounded-full mx-auto" src="/images/profilepic1.jpg" />
            </div>
            <div className="text-center text-xl font-bold" id="sidebar-name">
                {name}
            </div>
            <div className="text-center text-sm text-gray-400 pb-2">
                Senior Software Developer<br/>Senior Web Developer
            </div>
            <hr className="pb-2" />
            <div id="sidebar-social">
                <div className="flex items-center"><Mail className="pr-2"/><a href={social.email}>{social.email}</a></div>
                <div className="flex items-center"><Smartphone className="pr-2"/>{phone}</div>
                <div className="flex items-center"><Twitter className="pr-2" /><a href={`${social.mastodon}`} target='_blank'>@EddieDover@qoto.org</a></div>
                <div className="flex items-center"><Linkedin className="pr-2" /><a href={`${social.linkedin}`} target='_blank'>EddieDover</a></div>
                <div className="flex items-center"><GitHub className="pr-2"/><a href={`${social.github}`} target='_blank'>EddieDover</a></div>
            </div>

            <div className="shadow-md">
                <div className="tab w-full overflow-hidden border-t bg-grey-800">
                    <input className="absolute opacity-0" id="tab-skills" checked={skillsOpen} readOnly type="radio" name="tabs" />
                    <label className="block p-2 leading-normal cursor-pointer" htmlFor="tab-skills" onClick={skillsClick}>Skills</label>
                    <div className="tab-content overflow-visible bg-gray-800 border-indigo-500 leading-normal">
                        <div className="p-2" id="skills">
                            <div className="grid grid-cols-1">
                                {my_skills.map((skill, i) => <Skill key={i} label={skill.Name} level={skill.Level} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;