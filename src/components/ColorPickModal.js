import { hsvaToRgbString } from "@uiw/color-convert";
import { Wheel } from "@uiw/react-color";
import { React, useState } from "react";
import "./PixelGrid.css";

const ColorPickerModal = () => {
       const [isModalOpen, setIsModalOpen] = useState(false);
       const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
       const closeModal = () => {
              setIsModalOpen(false);
       };

       return (
              <>
                     {isModalOpen && (
                            <div className="modal-overlay">
                                   <div className="modal">
                                          <button
                                                 className="modal-close-btn"
                                                 onClick={closeModal}>
                                                 Close
                                          </button>
                                          <div className="modal-content">
                                                 <Wheel
                                                        color={hsva}
                                                        onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
                                                 />
                                                 <div style={{ width: "100%", height: 34, marginTop: 20, background: hsvaToRgbString(hsva) }}></div>
                                          </div>
                                   </div>
                            </div>
                     )}
              </>
       );
};

export default ColorPickerModal;