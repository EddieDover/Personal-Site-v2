import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function TextBlock(props) {
    const title = props.title;
    const text = props.text;
    const link = props.link;
    const link_text = props.link_text;
    const size = props.size;
    const stipulation = props.stipulation;
    const modal = props.modal;
    const is_modal = (link === "Modal") ? true : false;
    let asize = "";
    switch (size) {
        case 'xsmall':
            asize = "max-h-200 max-w-200";
            break;
        case 'small':
            asize = "max-h-300 max-w-300";
            break;
        case 'medium':
            asize = "max-h-400 max-w-400";
            break;
        case 'large':
            asize = "max-h-500 max-w-500";
            break;
        default:
            asize = "max-h-300 max-w-300";
            break;
    }

    const fireSwal = (html) => {
        MySwal.fire(html);
    }

    return(
        <section className={"shadow-xl grid grid-col-1 justify-begin p-3 m-1 bg-gray-700 " + asize}>
            <div className="font-extrabold text-white">{title}</div>
            <div className="p-1 text-gray-300" dangerouslySetInnerHTML={{__html:text}}></div>
            {link !== "" &&
            <div className="pt-1 text-green-500 decorate-underline">
                {is_modal && <a className="cursor-pointer" onClick={() => fireSwal(modal)}>{link_text}</a>}
                {!is_modal && <a href={link}>{link_text}</a>}
            </div>
            }
            {stipulation !== "" &&
                <aside className='font-semibold text-xs text-gray-500'>*{stipulation}</aside>
            }
        </section>
    );
};

export default TextBlock;