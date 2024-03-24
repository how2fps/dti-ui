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
                                                        onClick={() => {
                                                               setSelectedPixel([rowIndex, colIndex]);
                                                        }}
                                                        className={`pixel ${col ? "active" : ""}${selectedPixel && selectedPixel[0] === rowIndex && selectedPixel[1] === colIndex ? "selected" : ""}`}
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
