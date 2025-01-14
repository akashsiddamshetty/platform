import React from "react";

const Issue = ({issue}) => {
  return (
    <a
      className="text-pink-600 text-xs hover:underline"
      href={`https://github.com/chess-centre/platform/issues/${issue}`}
    >
      {`Ref #${issue}`}
    </a>
  );
};

export const TechRoadmap = () => {
  return (
    <div className="relative sm:w-1/2 m-8 text-sm sm:text-base">
      <div
        className="border-r-2 border-orange-brand absolute h-full top-0"
        style={{ left: "7.5px" }}
      ></div>
      <div
        className="border-r-2 border-teal-500 absolute h-full top-2"
        style={{ left: "7.5px" }}
      ></div>
      <ul className="list-none m-0 p-0">
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              First Release <span className="font-thin">v1.0.0</span>
            </div>
          </div>
          <div className="ml-12">
            <p>Platform launch 🥂</p>
            <ul className="list-disc ml-5">
              <li>
                Code available here:<br />
                <a
                  className="text-pink-600 hover:underline"
                  href="https://github.com/chess-centre"
                >
                  GitHub Code repository
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
          <div className="bg-orange-brand rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-black p-1 rounded  leading-none">
                Complete
              </span>
              <span className="font-thin">v1.1.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>DGT Live games ♟️ <br /><Issue issue="99" /></li>
              <li>Automatic ECF ratings <br /><Issue issue="246" /></li>
              <li>Lichess / Chess.com integration <br /><Issue issue="282" /></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-teal-500 rounded-full h-4 w-4"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-green-200 text-black p-1 rounded  leading-none">
                Complete
              </span>
              <span className="font-thin">v2.0.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Dashboard insights <br /><Issue issue="100" /></li>
              <li>Player search <br /><Issue issue="246" /></li>
              <li>PGN viewer <br /><Issue issue="243" /></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-teal-500 rounded-full h-4 w-4"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-blue-200 text-blue-700 p-1 rounded  leading-none">
                BETA
              </span>
              <span className="font-thin">v2.2.0-beta</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Game / Event Result  <br /><Issue issue="449" /></li>
              <li>Performance Ratings <br /> <Issue issue="473" /></li>
              <li>Image Gallery <br /> <Issue issue="468" /></li>
              <li>Enhanced FAQs <br /> <Issue issue="453" /></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-teal-500 rounded-full h-4 w-4"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-yellow-200 text-black p-1 rounded  leading-none">
                Soon
              </span>
              <span className="font-thin">v2.3.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Event Crosstable / Results <br /><Issue issue="475" /></li>
              <li>Latest News <br /><Issue issue="312" /></li>
              <li>Chess Festival Launch <br /><Issue issue="457" /></li>
            </ul>
          </div>
        </li>
        <li className="mb-2">
        <div className="flex items-center mb-1">
            <div className="bg-teal-700 rounded-full h-4 w-4 z-0"></div>
            <div className="flex-1 ml-4 font-medium">
              <span className="mr-2 bg-blue-200 text-black p-1 rounded  leading-none">
                Discuss
              </span>
              <span className="font-thin">v3.0.0</span>
            </div>
          </div>
          <div className="ml-12">
            <ul className="list-disc ml-5">
              <li>Junior - lesson resources</li>
              <li>FB event integration</li>
              <li>Eventbite event integration</li>
            </ul>
            <br />
            <ul className="ml-1">   
              <li>Have your say 
                <a className="text-pink-600 hover:underline" href="https://github.com/chess-centre/platform/discussions"> here</a>{" "}💡
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <br />
    </div>
  );
};
