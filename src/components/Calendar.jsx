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

//   let user = JSON.parse(localStorage.getItem('user'));
//   console.log(user)
//   let events = user.testData;
//   console.log(events)

    const events = {
        "title": "Math Exam",
        "start": "2024-09-04T15:00:00",
        "end": "2024-09-04T17:20:00"
      }

  return (
    <div className="w-[100%]">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        height={"100%"}
        widt
        events={events}

      
      />
    </div>
  );
}
