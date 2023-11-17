import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

function HomePage() {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <h1>The Homepage</h1>
            <EventList events={featuredEvents}/>
        </div>
    )
}

export default HomePage;