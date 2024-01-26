//import { getAllEvents, getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

function HomePage(props) {
    return (
        <div>
            <h1>The Homepage</h1>
            <EventList events={props.events}/>
        </div>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage;