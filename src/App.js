import { useEffect, useRef, useState } from "react";
import WebSocket from "websocket";
import "./App.css";
import PixelGrid from "./components/PixelGrid.js";
function App() {
       const containerRef = useRef(null);
       const [gridData, setGridData] = useState(Array(10).fill(Array(70).fill("")));
       const [busArrived, setBusArrived] = useState(false);
       useEffect(() => {
              const ws = new WebSocket.w3cwebsocket("ws://localhost:8080");

              ws.onopen = () => {
                     console.log("WebSocket connected");
              };

              ws.onmessage = (message) => {
                     if (message.data === "bus_arrives") {
                            setBusArrived(true);
                     }
                     if (message.data === "bus_left") {
                            setBusArrived(false);
                     }
                     console.log("received:", message.data);
                     // Handle received message from server
              };

              return () => {
                     ws.close();
              };
       }, []);
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

       return (
              <div
                     className="App"
                     ref={containerRef}>
                     {!busArrived ? (
                            <div className="header">
                                   <h1 className="header-text">Add your touch by changing a pixel!</h1>
                            </div>
                     ) : (
                            <div className="arrive-header">
                                   <h1 className="arrive-header-text">Bus 187 has arrived</h1>
                            </div>
                     )}
                     <PixelGrid
                            gridData={gridData}
                            setGridData={setGridData}
                     />
              </div>
       );
}

export default App;
