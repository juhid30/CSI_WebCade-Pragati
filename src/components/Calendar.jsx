import React, { useState, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Import your Firestore instance

function CalendarComponent() {
  const [events, setEvents] = useState([]); // State to hold events

  // Fetch events from Firestore on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Query to fetch one document from the calendarData collection
        const q = query(
          collection(db, "calendarData"),
          limit(1) // Limit to only one document
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]; // Get the first document
          const routineArray = doc.data().routineArray || []; // Get the routineArray or default to an empty array

          // Convert routineArray to FullCalendar event format
          const fetchedEvents = routineArray.map((routine) => ({
            id: routine.id || Math.random().toString(36).substr(2, 9), // Use a unique ID
            title: routine.title,
            start: routine.start,
            end: routine.end
          }));

          setEvents(fetchedEvents); // Update the events state with fetched data
        } else {
          console.log("No documents found");
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="w-[100%]">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"100%"}
        events={events} // Use the fetched events here
      />
    </div>
  );
}

export default CalendarComponent;
