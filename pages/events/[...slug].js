import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState();
    const router = useRouter();

    const filterData = router.query.slug;
    const url = 'https://nextjs-events-app-1779c-default-rtdb.firebaseio.com/events.json';
    const fetcher = (url) => fetch(url).then(response => response.json()).then(data => {
        const events = [];
        for (const key in data) {
            events.push({
                id: key,
                ...data[key]
            });
        }
        return events
    });

    const { data, error } = useSWR('https://nextjs-events-app-1779c-default-rtdb.firebaseio.com/events.json', fetcher);

    useEffect(() => {
        if(data) {
            console.log(data);
            setLoadedEvents(data);
        }
    }, [data]);

    if(!loadedEvents) {
        return (
            <p className="center">Loading...</p>
        );
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    // The + operator is used to convert the string values of filteredYear and filteredMonth to numbers. This is necessary because the filteredYear and filteredMonth variables are expected to contain numeric values, not strings.
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    // For serverside props
    //if(props.hasError) {
    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });



    // for serverside props
    //const filteredEvents = props.events;


    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the selected dates.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </Fragment>
        )
    }
    // for serverside props
    //const date = new Date(props.date.year, props.date.month - 1);
    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList  events={filteredEvents}/>
        </Fragment>
    )
}

//export async function getServerSideProps(context) {
//    const { params } = context;

//    const filterData = params.slug;

//    const filteredYear = filterData[0];
//    const filteredMonth = filterData[1];

//    // The + operator is used to convert the string values of filteredYear and filteredMonth to numbers. This is necessary because the filteredYear and filteredMonth variables are expected to contain numeric values, not strings.
//    const numYear = +filteredYear;
//    const numMonth = +filteredMonth;

//    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//        return {
//            props: { hasError: true }
//            //notFound: true,
//            //redirect: {
//            //    destination: '/error'
//            //}
//        }
//    }


//    const filteredEvents = await getFilteredEvents({
//        year: numYear,
//        month: numMonth,
//    });




//    return {
//        props: {
//            events: filteredEvents,
//            date: {
//                year: numYear,
//                month: numMonth
//            }
//        }
//    }
//}

export default FilteredEventsPage;