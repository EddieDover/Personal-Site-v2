import React, { useEffect } from 'react';
import SideBar from '../components/sidebar';
import StatText from '../components/stattext';
import TextBlock from '../components/textblock';
import Head from 'next/head';
import fetchJsonp from 'fetch-jsonp';
import { SRLWrapper } from 'simple-react-lightbox';
import ReactGA from 'react-ga';

ReactGA.pageview('/homepage');

function IndexPage() {
  
  const employers = [
    {"filename":"UNLV","alt":"University of Nevada - Las Vegas"},
    {"filename":"maverick","alt":"Maverick Helicopters"},
    {"filename":"starpoint","alt":"Starpoint Resorts"},
    {"filename":"webtron", "alt":"Webtron"},
  ]

  const certs = [
    {
      "img":"",
      "thumb":"",
      "alt":"",
      "provider":"TestDome",
      "data":"<a href='https://app.testdome.com/cert/1b33a89dc2f04defb6073d2438ebb138' target='_blank' class='testdome-certificate-stamp gold'><span class='testdome-certificate-name'>Eddie Dover</span><span class='testdome-certificate-test-name'>Python </span><span class='testdome-certificate-card-logo'>TestDome<br />Certificate</span></a>"
    },
    {
      "img":"/images/certs/js_basic.jpg",
      "thumb": "/images/certs/js_basic_lntesx_c_scale,w_454.jpg",
      "alt": "Javascripts Certification from HackerRank",
      "provider":"HackerRank",
      "data":""
    },
    {
      "img":"/images/certs/ps_basic.jpg",
      "thumb": "/images/certs/ps_basic_lmiobq_c_scale,w_486.jpg",
      "alt": "Problem Solving Certification from HackerRank",
      "provider":"HackerRank",
      "data":""
    },
    {
      "img":"/images/certs/python_basic.jpg",
      "thumb": "/images/certs/python_basic_ohppbv_c_scale,w_471.jpg",
      "alt": "Python 3 Certification from HackerRank",
      "provider":"HackerRank",
      "data":""
    },
    {
      "img":"/images/certs/java_basic.jpg",
      "thumb": "/images/certs/java_basic_kaugay_c_scale,w_471.jpg",
      "alt": "Java Certification from HackerRank",
      "provider":"HackerRank",
      "data":""
    },
    {
      "img":"/images/certs/react_basic.jpg",
      "thumb": "/images/certs/react_basic_k6vrjx_c_scale,w_471.jpg",
      "alt": "React Certification from HackerRank",
      "provider":"HackerRank",
      "data":""
    },
    {
      "img":"/images/certs/rest_int.jpg",
      "thumb": "/images/certs/rest_int_hszuod_c_scale,w_485.jpg",
      "alt": "Restful A.P.I. Certification from HackerRank",
      "provider":"HackerRank",
      "data":""
    },
    {
      "img":"/images/certs/csharp_full.jpg",
      "thumb": "/images/certs/csharp_rms9ny_c_scale,w_464.jpg",
      "alt": "C-Sharp Certification from HackerRank",
      "provider":"HackerRank",
      "data":""
    },
    {
      "img":"/images/certs/sql_full.jpg",
      "thumb": "/images/certs/sql_jsj8d2_c_scale,w_465.jpg",
      "alt": "SQL Certification from HackerRank",
      "provider":"HackerRank",
      "data":""
    },
  ]

  const blocksdata = [
    {
      "Title":"I mentor and tutor.",
      "Text":"I use multiple services to both mentor and tutor, including: \
      QuickTutor, Tutting, Gooroo, and Wyzant", 
      "Link":"",
      "LinkText":"Click here",
      "Size" : "xsmall",
      "Stipulation":"",
    },
    {
      "Title":"Github Stuff",
      "Text":"{GithubData}",
      "Link":"https://www.github.com/EddieDover/",
      "LinkText":"Visit my GitHub page.",
      "Size" : "small",
      "Stipulation":"Data pulled from Github every 24 hours."
    },
    {
      "Title":"This site...",
      "Text": "is open source and can be found on my <a style='text-decoration:underline' href='https://github.com/EddieDover/Personal-Site-v2'>Github</a>.<br/> \
      It uses a combination of the following technologies: \
      <table class='techtable'> \
      <thead><tr><td>Backend</td><td>Frontend</td></tr></thead> \
      <tbody><tr><td><a href='https://www.python.org' target='_blank'>Python</a></td><td><a href='https://www.javascript.com' target='_blank'>JavaScript</a><td></tr> \
      <tr><td><a href='https://flask.palletsprojects.com/en/2.0.x/' target='_blank'>Flask</a></td><td><a href='https://reactjs.org/' target='_blank'>React</a></td></tr> \
      <tr><td></td><td><a href='https://tailwindcss.com/' target='_blank'>TailwindCSS</a></td></tr></tbody> \
      </table> \
      I also have a <a style='text-decoration:underline' href='https://github.com/EddieDover/Personal-Site-v2/issues'>Github Issues</a> page for any bugs or feature requests.",
      "Link":"",
      "LinkText":"",
      "Size" : "medium",
      "Stipulation":""
    },
    {
      "Title":"I love to code.",
      "Text":"<img alt=\"Code Time\" src=\"https://img.shields.io/endpoint?style=for-the-badge&url=https://codetime-api.datreks.com/badge/1998?logoColor=white%26project=%26recentMS=0%26showProject=false\" /> \
      <br/> My Wakatime data says I've used the following languages in the last year (in order of frequency):<br/>{WakaData}",
      "Link":"Modal",
      "LinkText":"Click here for a graph.",
      "Size" : "large",
      "Stipulation": "Data pulled from Wakatime every 24 hours.",
      "Modal":"<div>{WakaModal}</div>"
    }
  ];
  
  const [data, setData] = React.useState({});
  const [jobs, setJobs] = React.useState([]);
  const [viewer, setViewer] = React.useState('HR');
  const [skills, setSkills] = React.useState([]);
  const [rankedSkills, setRankedSkills] = React.useState([]);
  const [filteredSkills, setFilteredSkills] = React.useState([]);
  const [wakaData, setWakaData] = React.useState([]);
  const [githubData, setGithubData] = React.useState({});
  const [wakaModal, setWakaModal] = React.useState([]);
  const [blogCount, setBlogCount] = React.useState(0);

  const setupGithubStuff = (data) => {
    let text = "";
    const repocount = data.repos.length;
    let commitcount = 0;
    let issues_assigned = 0;
    data.repos.map(repo => {
      commitcount += parseInt(repo.commits);
      issues_assigned += parseInt(repo.issues.length);
    });
    //const openissues = data.repos.map(repo => parseInt(repo.open_issues)).reduce((a, b) => a + b);
    //const pendingPRs = data.repos.map(repo => parseInt(repo.pending_prs)).reduce((a, b) => a + b);
    text = `In my ${repocount} Public & Non-NDA Repos I have ${commitcount} commits. <br/>
    Between those repos, I have ${issues_assigned} issues assigned.</h1>`;
    setGithubData(text);
  };


  const clickFilter = event => {
    const skill = event.target.getAttribute('data-skill');
    const nskills = filteredSkills;
    if (nskills.indexOf(skill) === -1) {
      nskills.push(skill);
    } else {
      const index = nskills.indexOf(skill);
      nskills.splice(index, 1);
    }
    setFilteredSkills(nskills.slice());
  }

  const fetchWakaTime = () => {
    fetchJsonp('https://wakatime.com/share/@EddieDover/e92851b5-b2e5-47a6-bc94-655393ac77d2.json', {
      'Content-Type': 'application/jsonp',
    })
    .then(response => response.json())
    .then(data => {
      let langs = [];
      if (data.data !== undefined) {
        data.data.map(obj => {
          langs.push(obj.name);
        });
      } else if (data.error !== undefined) {
        setTimeout( () => fetchWakaTime(), 2000);
      }
      setWakaData(langs);
    });
  }

  useEffect(() => {

    fetch('/resume.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setJobs(data.experience);
        
        const tskills = [];
        
        for (let i = 0; i < data.experience.length; i++) {
          const job = data.experience[i];
          for (let j = 0; j < job.technologies.length; j++) {
            {
              const tech = job.technologies[j];
              if (tskills.indexOf(tech) === -1) {
                tskills.push(tech);
              }
            }
          }
        }
        tskills.sort();
        setSkills([...tskills]);
        setRankedSkills(data.ranked_skills);
    });
    
    fetch("https://www.eddiedover.dev/blog/wp-json/wp/v2/posts?")
    .then(response => response.json())
    .then(data => {
      setBlogCount(data.length);
    });

    fetchWakaTime();  

    fetch("https://www.eddiedover.net/api/github")
    .then(response => response.json())
    .then(json => {
      setupGithubStuff(json);
    });

    fetch("https://www.eddiedover.net/api/wakatime")
    .then(response => response.json())
    .then(json => {
      const block = json.wakablocks[0];
      const str ="<object data=\"" + block.src + "\" title=\"" + block.title + "\" alt=\"" + block.title + "\" type=\"image/svg+xml\"></object>";
      setWakaModal(str);
    });

  },[]);
  
  return (
    ((data && rankedSkills && wakaData) &&
      <main className="flex flex-col sm:flex-row h-screen w-screen bg-gray-800 overflow-auto min-h-0">
        <Head>
          <title>EddieDover.dev</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          
        </Head>
        <SideBar myskills={rankedSkills} data={data}/>
        <div className="flex flex-col flex-grow-1 h-screen w-screen sm:h-100 bg-gray-800">
          <img className='headerImg p-10 ml-auto mr-auto' src='/images/siteheaderbg.jpg'/>
          <div className="flex flex-col sm:flex-row flex-wrap w-100 sm:place-content-evenly">
            <StatText text="years as a developer." stat="20+" />
            <StatText text="'fluent' languages." stat="4+" />
            {blogCount != 0 && <StatText link="https://www.eddiedover.dev/blog/" text="blog posts." stat={blogCount} />}
          </div>

          <SRLWrapper>
              <div className="flex flex-wrap bg-gray-700 w-11/12 mx-auto h-auto shadow-xl pb-2 pl-2">
              <p className="font-extrabold text-white">Companies I Have Worked For</p>
              <div className="flex flex-wrap w-full h-full">
                {employers && employers.map((eimg, idx) => {
                  return (
                    <div key={idx} className="max-w-200 max-h-150 p-1">
                      <a href={"/images/work/" + eimg.filename + ".jpg"}><img width="200" height="150" src={"/images/work/" + eimg.filename +"_tn.jpg"} alt={eimg.alt}/> </a>
                    </div>
                  )
                })}
              </div>
              </div>
              <br/>
            <div className="flex flex-wrap bg-gray-700 w-11/12 mx-auto h-auto shadow-xl pb-2 pl-2">
              <p className="font-extrabold text-white">Certificates</p>
            <div className="flex flex-wrap w-full h-full">
              {certs.map( (cert, idx) => { 
              return (
                cert.data !== "" ? 
                <div key={idx} className="max-w-200 max-h-150 p-1" dangerouslySetInnerHTML={{__html:cert.data}}></div> :
                <div  key={idx} className="max-w-200 max-h-150 p-1">
                <a href={cert.img}><img width="200" height="150" src={cert.thumb} alt={cert.alt}/></a>
                </div>
              )
            })}
            </div>
            </div>
          </SRLWrapper>

          <br/>

          <div className="flex flex-none flex-col flex-wrap sm:flex-row h-auto p-5">
            { blocksdata !== undefined && blocksdata.map((block,idx) => {
              return (<TextBlock 
                key={idx}
                title={block.Title}
                text={block.Text
                  .replace("{WakaData}", wakaData.join(", "))
                  .replace("{GithubData}", githubData)
                }
                link={block.Link}
                link_text={block.LinkText}
                size={block.Size}
                stipulation = {block.Stipulation}
                modal = {block.Modal?.replace("{WakaModal}", wakaModal)}
              />)
            })}
          </div>
          
        </div>
      </main>
    )
  )
}

export default IndexPage
