import { Button, Modal, Typography } from "@mui/material";
import { hsvaToRgbString } from "@uiw/color-convert";
import { Wheel } from "@uiw/react-color";
import { React, useState } from "react";
import "./ColorPickerModal.css";

const ColorPickerModal = ({ selectedPixel, setSelectedPixel }) => {
       const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
       const closeModal = () => {
              setSelectedPixel(null);
       };

       const changePixelColor = async (selectedPixel) => {
              try {
                     const response = await fetch("http://localhost:3000/pixel", {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                   "Content-Type": "application/json",
                                   "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({ rgb: hsvaToRgbString(hsva) }),
                     });
                     console.log(response.status);
                     setSelectedPixel(null);
              } catch (error) {
                     console.error("Error fetching data:", error);
              }
              console.log(selectedPixel);
       };

       return (
              <Modal
                     open={selectedPixel}
                     onClose={closeModal}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description">
                     <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "50%" }}>
                            <Typography
                                   id="modal-modal-title"
                                   variant="h6"
                                   component="h2">
                                   Text in a modal
                            </Typography>
                            <Wheel
                                   color={hsva}
                                   onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
                            />
                            <Button onClick={() => changePixelColor(selectedPixel)}>wtf</Button>
                            <div style={{ width: "20%", height: 34, marginTop: 20, background: hsvaToRgbString(hsva) }}></div>
                     </div>
              </Modal>
       );
};

export default ColorPickerModal;
