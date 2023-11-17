import EventItem from "./event-item";

function EventList(props) {
    const { events } = props;
    return (
        <ul>
            {events.map(event => <EventItem />)}
        </ul>
    )
}

export default EventList;