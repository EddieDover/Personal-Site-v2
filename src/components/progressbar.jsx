import React from 'react';

function determineSkill(level) {

    switch (level) {
        case 1:
            return 'Novice';
        case 2:
            return 'Intermediate';
        case 3:
            return 'Advanced';
        case 4:
            return 'Expert';
        default:
            return 'NA';
    }
}

function ProgressBar(props) {
    var progressPercentage = props.value;
    var label = props.label;
    var skill = determineSkill(props.value);
    return (
        <div className="h-auto w-full pb-1 plr-2">
            <div className="h-full flex">
                <span className="font-bold">{label}</span> <span className="flex-grow"></span>  <span className="pt-1 text-xs">{skill}</span>
            </div>
            <div className="h-1 w-full bg-gray-300">
                <div style={{width: `${progressPercentage * 25}%`}}
                    className="h-full bg-green-600">
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;