import React from 'react';
import ProgressBar from "../components/progressbar";

function Skill(props) {

    const getColor = (slevel) => {
        switch (slevel) {
            case 1:
                return "bg-yellow-800 text-black";
            case 2:
                return "bg-gray-300 text-black";
            case 3:
                return "bg-yellow-400 text-black";
            case 4:
                return "bg-yellow-50 text-black proskill";
        }
    };

    const level = props.level;
    const label = props.label;
    const color = getColor(level);
    return (
        <ProgressBar label={label} value={level} />
    );
};

export default Skill;