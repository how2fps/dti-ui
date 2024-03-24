import { Button, Modal, Typography } from "@mui/material";
import { hsvaToRgbString } from "@uiw/color-convert";
import { Wheel } from "@uiw/react-color";
import { React, useState } from "react";
import "./ColorPickerModal.css";

const ColorPickerModal = ({ selectedPixel, setSelectedPixel, setGridData }) => {
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
                     setGridData((prevGridData) => {
                            prevGridData[selectedPixel[0]][selectedPixel[1]] = hsvaToRgbString(hsva);
                            console.log(prevGridData);
                            console.log(selectedPixel);
                            return prevGridData;
                     });
                     setSelectedPixel(null);
              } catch (error) {
                     console.error("Error fetching data:", error);
              }
       };

       return (
              <Modal
                     open={!!selectedPixel}
                     onClose={closeModal}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description">
                     <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", background: "rgba(255,255,255,0.2)" }}>
                            <Typography
                                   id="modal-modal-title"
                                   variant="h6"
                                   component="h2">
                                   PICK COLOUR
                            </Typography>
                            <Wheel
                                   color={hsva}
                                   onChange={(color) => {
                                          setHsva({ ...hsva, ...color.hsva });
                                   }}
                            />

                            <div style={{ width: "20%", height: 31, marginTop: 5, marginBottom: 5, background: hsvaToRgbString(hsva) }}></div>
                            <Button
                                   variant="contained"
                                   onClick={() => changePixelColor(selectedPixel)}>
                                   Select this colour
                            </Button>
                     </div>
              </Modal>
       );
};

export default ColorPickerModal;
