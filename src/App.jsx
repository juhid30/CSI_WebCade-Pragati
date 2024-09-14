import "./index.css"; // Import tailwind styles
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./pages/home";
import ResumeUpload from "./components/ResumeUpload";
import DataCP from "./components/DataCP";
import logo from "./assets/logo.png";
import CalendarC from "../src/components/Calendar";

import styled from "styled-components";
import { gsap, CSSPlugin, Expo } from "gsap";
import Layout from "./components/layout";
import HeroSection from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import EmployerSection from "./components/employers";
import CTASection from "./components/calltoAction";
import Jobs from "./components/Jobs";
import ListJobs from "./components/ListJobs";
import AppliedToRecruiter from "./components/AppliedToRecruiter";
import Profile from "./pages/profile";
gsap.registerPlugin(CSSPlugin);

function App() {
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  useEffect(() => {
    const type = localStorage.getItem("studentRole");
    setRole(type);
  }, []);

  console.log(role);

  useEffect(() => {
    const count = setInterval(() => {
      setCounter((counter) =>
        counter < 100
          ? counter + 1
          : (clearInterval(count), setCounter(100), reveal())
      );
    }, 25);
  }, []);

  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        console.log("completed");
      },
    });
    t1.to(".follow", {
      width: "100%",
      ease: Expo.easeInOut,
      duration: 1.2,
      delay: 0.7,
    })
      .to(".hide", { opacity: 0, duration: 0.3 })
      .to(".hide", { display: "none", duration: 0.3 })
      .to(".follow", {
        height: "100%",
        ease: Expo.easeInOut,
        duration: 0.7,
        delay: 0.5,
      })
      .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0.7 })
      .to(".title-lines", { display: "block", duration: 0.1 })
      .to(".title-lines", {
        opacity: 1,
        stagger: 0.15,
        ease: Expo.easeInOut,
        duration: 0.6,
      });
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Loading>
                <Follow className="follow"></Follow>
                <ProgressBar
                  className="hide"
                  id="progress-bar"
                  style={{ width: counter + "%" }}
                ></ProgressBar>
                <Count id="count" className="hide">
                  {counter}%
                </Count>
              </Loading>
              <Content className="content w-full">
                <div className="bg-white text-black w-full">
                  <nav>
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        src={logo}
                        alt="Logo"
                        className="block h-12 w-auto"
                      />
                    </div>
                  </nav>
                  <HeroSection />
                  <FeaturesSection />
                  <EmployerSection />
                  <CTASection />
                </div>
              </Content>
            </>
          }
        />

        <Route path="/datacp" element={<Layout />}>
          <Route index element={<DataCP />} />
        </Route>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/upload-resume" element={<Layout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/calendar" element={<Layout />}>
          <Route index element={<CalendarC />} />
        </Route>
        <Route path="/jobs" element={<Layout />}>
          <Route index element={<Jobs />} />
        </Route>
        <Route path="/listjobs" element={<Layout />}>
          <Route index element={<ListJobs />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

styled.div`
  width: 100vw;
  height: 100vh;
  color: #000000;
  position: relative;
`;
const Loading = styled.div`
  height: 100%;
  width: 100%;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;
const Follow = styled.div`
  position: absolute;
  background-color: #f48049;
  height: 2px;
  width: 0;
  left: 0;
  z-index: 2;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  background-color: #fff;
  height: 2px;
  width: 0;
  transition: 0.4s ease-out;
`;

const Count = styled.p`
  position: absolute;
  font-size: 130px;
  color: #fff;
  transform: translateY(-15px);
  font-weight: 500;
`;

const Content = styled.div`
  height: full;
  width: 0;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #121212;
  padding: auto;

  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  color: #fff;

  p {
    text-align: center;
    font-size: 104px;
    opacity: 0;
    display: none;
    font-weight: 500;
    margin: 0;
  }
`;
