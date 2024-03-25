import React, { useEffect, useState } from "react";
import ColorPickerModal from "./ColorPickerModal";
import "./PixelGrid.css";

const PixelGrid = () => {
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [selectedPixel, setSelectedPixel] = useState(null);
       const [gridData, setGridData] = useState(Array(10).fill(Array(70).fill("")));

       useEffect(() => {
              console.log(gridData);
       }, [gridData]);

       useEffect(() => {
              console.log(selectedPixel);
       }, [selectedPixel]);

       return (
              <>
                     <div className="pixel-grid">
                            {gridData.map((row, rowIndex) => (
                                   <div
                                          className="row"
                                          key={rowIndex}>
                                          {row.map((col, colIndex) => (
                                                 <div
                                                        className={`pixel ${selectedPixel && selectedPixel[0] === rowIndex && selectedPixel[1] === colIndex ? "selected" : ""}`}
                                                        style={gridData && gridData[rowIndex][colIndex].length > 0 ? { background: gridData[rowIndex][colIndex] } : { background: "white" }}
                                                        onClick={() => {
                                                               setSelectedPixel([rowIndex, colIndex]);
                                                        }}
                                                        key={`${rowIndex}-${colIndex}`}
                                                 />
                                          ))}
                                   </div>
                            ))}
                     </div>
                     <ColorPickerModal
                            setGridData={setGridData}
                            selectedPixel={selectedPixel}
                            setSelectedPixel={setSelectedPixel}
                     />
              </>
       );
};

export default PixelGrid;
