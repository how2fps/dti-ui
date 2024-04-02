import { useEffect, useRef, useState } from "react";
import "./App.css";
import PixelGrid from "./components/PixelGrid.js";
function App() {
       const containerRef = useRef(null);
       // const [canScrollUp, setCanScrollUp] = useState(false);
       // const [canScrollDown, setCanScrollDown] = useState(false);
       // const [canScrollLeft, setCanScrollLeft] = useState(false);
       // const [canScrollRight, setCanScrollRight] = useState(false);
       const [gridData, setGridData] = useState(Array(10).fill(Array(70).fill("")));

       useEffect(() => {
              async function fetchPixels() {
                     try {
                            const response = await fetch("http://localhost:3000/pixel");
                            const reader = response.body.getReader();
                            console.log(reader);
                            const chunks = [];
                            const consumeStream = async () => {
                                   try {
                                          while (true) {
                                                 const { done, value } = await reader.read();
                                                 if (done) {
                                                        break;
                                                 }
                                                 chunks.push(new TextDecoder().decode(value));
                                          }
                                   } catch (error) {
                                          console.error("Error reading stream:", error);
                                   } finally {
                                          reader.releaseLock(); // Release the lock when finished reading
                                   }
                            };

                            // Call the function to consume the stream
                            await consumeStream();
                            const pixelGridData = JSON.parse(chunks.join());
                            console.log(pixelGridData);
                            setGridData(pixelGridData);
                     } catch (e) {
                            console.log(e);
                     }
              }
              fetchPixels();
       }, []);

       // useEffect(() => {
       //        const container = containerRef.current;
       //        if (container) {
       //               const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = container;

       //               // Check if scrolling is possible in each direction
       //               setCanScrollUp(scrollTop > 0);
       //               setCanScrollDown(scrollTop < scrollHeight - clientHeight);
       //               setCanScrollLeft(scrollLeft > 0);
       //               setCanScrollRight(scrollLeft < scrollWidth - clientWidth);

       //               // Listen to scroll events to update scrolling status dynamically
       //               const handleScroll = () => {
       //                      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = container;
       //                      setCanScrollUp(scrollTop > 0);
       //                      setCanScrollDown(scrollTop < scrollHeight - clientHeight);
       //                      setCanScrollLeft(scrollLeft > 0);
       //                      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
       //               };

       //               window.addEventListener("scroll", handleScroll);
       //               return () => {
       //                      window.removeEventListener("scroll", handleScroll);
       //               };
       //        }
       // }, []); // Empty dependency array ensures useEffect runs only once on component mount

       // useEffect(() => {}, [canScrollRight]);
       // // Initialize Firebase

       return (
              <div className="App" ref={containerRef}>
                     <div className="header">
                            {/* {canScrollRight ? <div style={{ position: "absolute", fontSize: "1vw" }}>scroll right</div> : ""} */}
                            <h1 className="header-text">Pick A Pixel</h1>
                     </div>
                     <PixelGrid
                            gridData={gridData}
                            setGridData={setGridData}
                     />
              </div>
       );
}

export default App;
