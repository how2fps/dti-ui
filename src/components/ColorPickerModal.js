import { Button, Modal, Typography } from "@mui/material";
import { hsvaToRgbString } from "@uiw/color-convert";
import { Wheel } from "@uiw/react-color";
import { React } from "react";
import "./ColorPickerModal.css";

const ColorPickerModal = ({ selectedPixel, setSelectedPixel, setGridData, hsva, setHsva }) => {
       const closeModal = () => {
              setSelectedPixel(null);
              setHsva({ h: 0, s: 0, v: 100, a: 1 });
       };

       const changePixelColor = async (selectedPixel) => {
              try {
                     let newGridData;
                     setGridData((prevGridData) => {
                            newGridData = prevGridData.slice().map((element) => (Array.isArray(element) ? element.slice() : element));
                            newGridData[selectedPixel[0]][selectedPixel[1]] = hsvaToRgbString(hsva);
                            return newGridData;
                     });
                     await fetch("http://localhost:3000/pixel", {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                   "Content-Type": "application/json",
                                   "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({ rgb: hsvaToRgbString(hsva), coordinates: selectedPixel, newGridData: newGridData }),
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
                     <div style={{ outline: "none", marginTop: "20vh", marginLeft: "40vw", display: "flex", width: "fit-content", justifyContent: "center", flexDirection: "column", alignItems: "center", right: "50%", border: "none" }}>
                            <Typography
                                   id="modal-modal-title"
                                   variant="h6"
                                   style={{ textShadow: "-1px -1px 0 #000, 0 -1px 0 #000, 1px -1px 0 #000, 1px 0 0 #000, 1px 1px 0 #000, 0 1px 0 #000, -2px 2px 0 #000, -2px 0 0 #000", color: "white", fontSize: "42px", fontWeight: "bold", marginBottom: "2px", lineHeight: "2" }}
                                   component="h2">
                                   PICK A COLOUR
                            </Typography>
                            <Wheel
                                   color={hsva}
                                   onChange={(color) => {
                                          setHsva({ ...hsva, ...color.hsva });
                                   }}
                            />

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                   <Button
                                          color="success"
                                          style={{ marginTop: "20px" }}
                                          variant="contained"
                                          size="large"
                                          onClick={() => changePixelColor(selectedPixel)}>
                                          Select this colour
                                   </Button>
                                   <Button
                                          color="error"
                                          style={{ marginTop: "10px" }}
                                          variant="contained"
                                          size="large"
                                          onClick={() => closeModal()}>
                                          Cancel
                                   </Button>
                            </div>
                     </div>
              </Modal>
       );
};

export default ColorPickerModal;
