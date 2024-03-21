import React, { useState } from "react";
import ColorPickerModal from "./ColorPickModal";
import "./PixelGrid.css";

const PixelGrid = () => {
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [selectedPixel, setSelectedPixel] = useState(null);
       const numRows = 10;
       const numCols = 70;

       const grid = Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => false));

       return (
              <>
                     <div className="pixel-grid">
                            {grid.map((row, rowIndex) => (
                                   <div
                                          className="row"
                                          key={rowIndex}>
                                          {row.map((col, colIndex) => (
                                                 <div
                                                        onClick={(row, col) => {
                                                               setSelectedPixel([rowIndex, colIndex]);
                                                               console.log(rowIndex, colIndex);
                                                        }}
                                                        className={`pixel ${col ? "active" : ""}${selectedPixel[0] === rowIndex && selectedPixel[1] === colIndex ? "selected" : ""}`}
                                                        key={`${rowIndex}-${colIndex}`}
                                                 />
                                          ))}
                                   </div>
                            ))}
                     </div>
                     <ColorPickerModal selectedPixel={selectedPixel} setSelectedPixel={setSelectedPixel}  />
              </>
       );
};

export default PixelGrid;
