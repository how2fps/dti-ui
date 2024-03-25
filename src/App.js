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
                            setCanScrollDown(scrollTop < scrollHeight - clientHeight);
                            setCanScrollLeft(scrollLeft > 0);
                            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
                            console.log(container.clientHeight);
                            console.log(container.getBoundingClientRect());
                     };

                     window.addEventListener("scroll", handleScroll);
                     return () => {
                            window.removeEventListener("scroll", handleScroll);
                     };
              }
       }, []); // Empty dependency array ensures useEffect runs only once on component mount

       useEffect(() => {}, [canScrollRight]);
       // Initialize Firebase

       return (
              <div
                     className="App"
                     ref={containerRef}>
                     <div className="header">
                            {canScrollRight ? <div style={{ position: "absolute", fontSize: "1vw" }}>scroll right</div> : ""}
                            <h1 className="header-text">Pick A Pixel</h1>
                     </div>
                     <PixelGrid />
              </div>
       );
}

export default App;
