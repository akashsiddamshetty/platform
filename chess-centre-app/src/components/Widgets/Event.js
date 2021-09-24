import React, { useState, useEffect } from "react";
import API from "@aws-amplify/api";
import { Link, useParams } from "react-router-dom";
import { classNames, bgColor700 } from "../../utils/Classes";
import { prettyDate } from "../../utils/DateFormating";
import logo from "../../assets/img/logo-dark-theme-small.png";

const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      description
      rounds
      time
      startDate
      endDate
      maxEntries
      entryCount
      complete
      cancelled
      isLive
      active
      type {
        id
        name
        description
        url
        color
        time
        maxEntries
        stripePriceId
        timeControl
        eventType
        defaultPrice
        canRegister
        createdAt
        updatedAt
      }
    }
  }
`;

const EventDetails = ({ details }) => {
    return (
        <div className="pt-6 pb-8 px-6">
            <h3 className="text-xs font-medium text-teal-700 tracking-wide uppercase">
                Details
            </h3>
            <ul className="mt-4 space-y-2">
                {details && details.map(({ icon, information, show, empty }, key) => {
                    return (
                        show && !empty && (
                            <li key={key} className="flex items-start">
                                <div className="flex-shrink-0">
                                    <span className="text-teal-500 ml-2">
                                        <i className={icon}></i>
                                    </span>
                                </div>
                                <p className="ml-3 text-md text-gray-700">{information}</p>
                            </li>
                        )
                    );
                })}
                {/* gnarly solution */}
                {details && details.filter(({ empty }) => empty).map(() => <li key="1000" className="h-6"></li>)}
            </ul>
        </div>
    )
}

const EventHeader = ({ name, description }) => {
    return (
        <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
                <span className="text-2xl -mt-2 text-center">{name}</span>
            </h2>
            <p className={`text-gray-500 mt-4 text-sm text-center`}>{description}</p>
        </div>
    );
};

const EventPrice = ({ isLive, isFull, defaultPrice }) => {
    return (
        <div className="mt-5 text-center">
            {isLive && (
                <span className="animate-pulse bg-gray-100 px-16 rounded-lg text-5xl font-extrabold text-red-600 mr-1">
                    LIVE
                </span>
            )}
            {isFull && !isLive && (
                <span className="bg-gray-50 px-16 rounded-lg text-5xl font-extrabold text-gray-300 mr-1">
                    FULL
                </span>
            )}
            {!isLive && !isFull && (
                <>
                    <span className="text-5xl font-extrabold text-gray-900 mr-1">
                        £{defaultPrice}
                    </span>
                    <span className="text-base font-medium text-gray-500">entry fee</span>
                </>
            )}
        </div>
    );
};

const RegisterButton = ({ id, isLive, isFull }) => {
    return (
        <>
            {isLive && (
                <div>
                    <a
                        href="/broadcast/live"
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-6 
              w-full flex items-center justify-center 
              py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:border-teal-800 
              focus:shadow-outline-teal transition duration-150 ease-in-out`}
                    >
                        <span className="flex relative h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
                        </span>{" "}
                        <span className="ml-2">Watch Here</span>
                    </a>
                </div>
            )}

            {isFull && !isLive && (
                <button
                    disabled
                    className="  mt-6 block w-full bg-orange-600 border border-orange-600 rounded-md py-2 text-sm font-semibold text-white text-center cursor-not-allowed"
                >
                    Closed
                </button>
            )}
            {!isLive && !isFull && (
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`/register?eventId=${id}`}
                    className="mt-6 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                    <span>Register Now</span>
                </a>
            )}
        </>
    );
};

const EventCard = ({
    id,
    name,
    description,
    defaultPrice,
    details,
    type,
    color,
    url,
    isLive,
    isFull,
}) => {
    return (
        <div
            className={`relative m-2 rounded-lg shadow-lg divide-y divide-gray-100 max-w-xs bg-white`}
        >
            <div
                className={classNames(
                    bgColor700(color),
                    "absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
                )}
            ></div>
            <div className="p-6 px-10">
                <img alt="The Chess Centre" className="mb-4" src={logo} />
                <EventHeader
                    name={name}
                    description={description}
                    type={type}
                />
                <EventPrice
                    defaultPrice={defaultPrice}
                    isFull={isFull}
                    isLive={isLive}
                />
                <RegisterButton id={id} isFull={isFull} isLive={isLive} />
            </div>
            <div>
                <EventDetails details={details} />
            </div>
            <div className="text-center p-2">
                <Link
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-center text-teal-500 hover:text-teal-700"
                    to={`${url}/${id}`}
                >
                    More Info
                </Link>
            </div>
        </div>
    );
};

export default function RenderEvent() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [eventDetails, setEventDetails] = useState({});

    useEffect(() => {
        const fetchEvent = async () => {
            setIsLoading(true);
            const response = await API.graphql({
                query: getEvent,
                variables: { id },
                authMode: "AWS_IAM",
            }).catch((error) => {
                console.log("Error fetching event.", id);
                console.log(error.response);
            });
            if (response && response.data) {
                const {
                    data: {
                        getEvent: eventInfo }
                } = response;
                if (eventInfo) {
                    setEventDetails(eventInfo);
                }
            }
            setIsLoading(false);
        };
        fetchEvent();
    }, [id]);

    return (!isLoading && <EventCard
        id={eventDetails.id}
        color={eventDetails.type?.color}
        defaultPrice={eventDetails.type?.defaultPrice}
        type={eventDetails.type?.eventType}
        name={eventDetails.name}
        url={eventDetails.type?.url}
        description={eventDetails.description}
        isLive={eventDetails.isLive}
        isFull={eventDetails.isFull}
        details={[
            {
                icon: "fad fa-map-pin mr-1",
                ariaName: "Location",
                information: "Ilkley, West Yorkshire",
                show: true
            },
            {
                icon: "fad fa-calendar-alt",
                ariaName: "Date / Time",
                information: prettyDate(eventDetails.startDate, eventDetails.endDate),
                show: !!eventDetails.startDate,
            },
            {
                icon: "fad fa-flag",
                ariaName: "Number of Rounds",
                information: `${eventDetails.rounds} rounds`,
                show: !!eventDetails.rounds,
            },
            {
                icon: "fad fa-chess-clock",
                ariaName: "Time Control",
                information: `${eventDetails.type?.timeControl}`,
                show: !!eventDetails.type?.timeControl,
            },
            {
                icon: "fad fa-user-friends",
                ariaName: "Entries",
                information: `${eventDetails.entryCount} ${eventDetails.entryCount === 1 ? "entry" : "entries"
                    }`,
                show: !!eventDetails.entryCount,
            }
        ]} />)
}