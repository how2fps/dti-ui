import React, { useState } from "react";
import ColorPickerModal from "./ColorPickerModal";
import "./PixelGrid.css";

const PixelGrid = ({ gridData, setGridData }) => {
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [selectedPixel, setSelectedPixel] = useState(null);

       const alphabetArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

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
