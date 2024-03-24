import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import PixelGrid from "./components/PixelGrid";
function App() {
       const containerRef = useRef(null);
       const [canScrollUp, setCanScrollUp] = useState(false);
       const [canScrollDown, setCanScrollDown] = useState(false);
       const [canScrollLeft, setCanScrollLeft] = useState(false);
       const [canScrollRight, setCanScrollRight] = useState(false);

       useEffect(() => {
              const container = containerRef.current;
              if (container) {
                     const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = container;

                     // Check if scrolling is possible in each direction
                     setCanScrollUp(scrollTop > 0);
                     setCanScrollDown(scrollTop < scrollHeight - clientHeight);
                     setCanScrollLeft(scrollLeft > 0);
                     setCanScrollRight(scrollLeft < scrollWidth - clientWidth);

                     // Listen to scroll events to update scrolling status dynamically
                     const handleScroll = () => {
                            const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = container;
                            setCanScrollUp(scrollTop > 0);
                            console.log("hi");
                            setCanScrollDown(scrollTop < scrollHeight - clientHeight);
                            setCanScrollLeft(scrollLeft > 0);
                            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
                     };

                     window.addEventListener("scroll", handleScroll);
                     return () => {
                            window.removeEventListener("scroll", handleScroll);
                     };
              }
       }, []); // Empty dependency array ensures useEffect runs only once on component mount

       const firebaseConfig = {
              apiKey: "AIzaSyCdDsg6x19bzJAokeCqtfdBYpv4aoQUH64",
              authDomain: "dti-ui.firebaseapp.com",
              projectId: "dti-ui",
              storageBucket: "dti-ui.appspot.com",
              messagingSenderId: "283041040161",
              appId: "1:283041040161:web:de955f8da2c49742492060",
              measurementId: "G-BTYJBZYSYT",
       };

       useEffect(() => {
              console.log(canScrollRight);
       }, [canScrollRight]);
       // Initialize Firebase
       const app = initializeApp(firebaseConfig);
       const db = getFirestore(app);

       return (
              <div
                     className="App"
                     ref={containerRef}>
                     <div className="header">
                            {canScrollRight ? <div>scroll right</div> : ""}
                            <h1 className="header-text">Pick A Pixel</h1>
                     </div>
                     <PixelGrid db={db} />
              </div>
       );
}

export default App;
