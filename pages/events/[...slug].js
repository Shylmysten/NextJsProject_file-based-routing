import { useRouter } from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";

function FilteredEventsPage() {
    const router = useRouter();

    const filterData = router.query.slug;

    if(!filterData) {
        return <p className='center'>Loading...</p>;
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    // The + operator is used to convert the string values of filteredYear and filteredMonth to numbers. This is necessary because the filteredYear and filteredMonth variables are expected to contain numeric values, not strings.
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return <p>Invalid filter. Please adjust your values.</p>
    }


    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    if(!filteredEvents || filteredEvents.length === 0) {
        return <p>No events found for the selected dates.</p>
    }

    return (
        <div>
            <EventList  events={filteredEvents}/>
        </div>
    )
}

export default FilteredEventsPage;