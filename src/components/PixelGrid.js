import React, { useState } from "react";
import ColorPickerModal from "./ColorPickerModal.js";
import "./PixelGrid.css";

const letters = 'ABCDEFGHIJ';

const PixelGrid = ({ gridData, setGridData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPixel, setSelectedPixel] = useState(null);

  const alphabetArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <>
      <div className="pixel-grid">
        <div className = "row-legend">
          {[undefined, ...Array(gridData[0].length).keys()].map((i, index) => (
            <div key={index} className="columnIndicator">
              {i !== undefined ? i + 1 : ""}
            </div>
          ))}
        </div>
        {gridData.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            <div key={rowIndex} className="rowIndicator">
              {letters[rowIndex]}
            </div>
            {row.map((col, colIndex) => (
              <div
                className={`pixel ${selectedPixel && selectedPixel[0] === rowIndex && selectedPixel[1] === colIndex ? "selected" : ""}`}
                style={
                  gridData && gridData[rowIndex][colIndex].length > 0
                    ? { background: gridData[rowIndex][colIndex] }
                    : { background: "white" }
                }
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