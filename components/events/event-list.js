import EventItem from "./event-item";
import styles from './event-list.module.css';

function EventList(props) {
    const { events } = props;

    return (
        <ul className={styles.list}>
            {events.map(event => (
                <EventItem 
                    key={event.id} 
                    id={event.id} 
                    title={event.title} 
                    image={event.image} 
                    date={event.date} 
                    location={event.location}
                />
            ))}
        </ul>
    )
}

export default EventList;