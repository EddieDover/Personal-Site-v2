import React from 'react';
import { ExternalLink } from 'react-feather';

function StatText(props) {
    const text = props.text;
    const stat = props.stat;
    const link = props.link || null;
    const doClick = () => {
        if (link) { window.open(link, '_blank'); }
    }
    return(
        <div className={"flex flex-row p-2 h-16 w-auto place-content-center sm:place-content" } onClick={doClick}>
            <div className={"text-green-600 font-bold text-4xl"}>{stat}</div>
            <div className={"flex flex-row text-2xl text-white pt-1.5 pl-1 " + (link !== null ? "hover:cursor-pointer hover:underline" : "") }>{text}{link && <ExternalLink className="pr-2"/>}</div>
        </div>
    );
}

export default StatText;