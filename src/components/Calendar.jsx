import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function CalendarC() {
  return (
    <div className="h-[100vh]">
      {/* <Navbar /> */}
      <div className="flex h-[90%]">
        <div className="w-[7.5%] flex flex-col ">
          {/* <Sidebar /> */}
        </div>
        <div className="bg-[] w-[92.5%] h-full p-9 flex">
          <CalendarComponent />
        </div>
      </div>
    </div>
  );
}

export default CalendarC;

function CalendarComponent() {
  // Define a temporary event
  const events = [
    {
      id: '1',
      title: 'Sample Event',
      start: '2024-09-15T10:00:00', // Start time of the event
      end: '2024-09-15T12:00:00'    // End time of the event
    }
  ];

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
        events={events}
      />
    </div>
  );
}
