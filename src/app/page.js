"use client";
import {
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "./globals.css";
import { useState } from "react";

export default function Home() {
  const [enteryLang, setEnteryLang] = useState("en");
  const [translatedLang, setTranslatedLang] = useState("fa")
  const [text, setText] = useState("");
  const [charLength, setCharlength] = useState(0);
  const maxLength = 500;

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setEnteryLang(newAlignment);
    }
  };

  const handleTranslatedLang = (lang) => {
    if (lang !== null) {
      setTranslatedLang(lang)
    }
  }

  const swap = () => {
    const hold = translatedLang
    setTranslatedLang(enteryLang)
    setEnteryLang(hold)
  }

  const handleInput = (event) => {
    let words = event.target.value;
    if (words.length > maxLength) {
      words = words.slice(0, maxLength);
    }
    if (words.length <= maxLength) {
      setText(words);
      setCharlength(words.length);
    }
  };

  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const readHandler = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = enteryLang === "en" ? "en-US" : 
                     enteryLang === "fr" ? "fr-FR" : 
                     enteryLang === "fa" ? "fa-IR" : 
                     enteryLang === "sp" ? "es-ES" : "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="background">
      <div className="main_background">
        <img className="bc" src="hero_img.jpg" alt="background" />
        <div className="main_container">
          <div className="container_header">
            <h1 className="header">
              <img src="/logo.svg" alt="Logo" />
            </h1>
          </div>
          <div className="container_boxes">
            <div className="boxes_box">
              <div className="box_header">
                <ToggleButtonGroup
                  className="toggle-button-group"
                  value={enteryLang}
                  exclusive
                  onChange={handleAlignment}
                >
                  <ToggleButton className="toggle-button" value="en">
                    English
                  </ToggleButton>
                  <ToggleButton className="toggle-button" value="fr">
                    French
                  </ToggleButton>
                  <ToggleButton className="toggle-button" value="fa">
                    Farsi
                  </ToggleButton>
                  <ToggleButton className="toggle-button" value="sp">
                    Spanish
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="box_main">
                <TextField
                  className="main_input"
                  rows={20}
                  multiline
                  fullWidth
                  placeholder="hello, how are you"
                  onChange={handleInput}
                  value={text}
                />
                <div className="box_footer">
                  <div className="buttons">
                    <button className="footer_button" variant="outlined" onClick={copyHandler}>
                      <img src="./Copy.svg" alt="Copy" />
                    </button>
                    <button className="footer_button" variant="outlined" onClick={readHandler}>
                      <img src="./sound_max_fill.svg" alt="Read Aloud" />
                    </button>
                  </div>
                  <div>
                    <Typography className="footer_counter">
                      {charLength}/500
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div className="boxes_box" style={{background: "#121826cc"}}>
              <div className="box_header">
                <ToggleButtonGroup
                  className="toggle-button-group"
                  value={translatedLang}
                  exclusive
                  onChange={handleTranslatedLang}
                >
                  <ToggleButton className="toggle-button" value="en">
                    English
                  </ToggleButton>
                  <ToggleButton className="toggle-button" value="fr">
                    French
                  </ToggleButton>
                  <ToggleButton className="toggle-button" value="fa">
                    Farsi
                  </ToggleButton>
                  <ToggleButton className="toggle-button" value="sp">
                    Spanish
                  </ToggleButton>
                </ToggleButtonGroup>
                <button className="header_swapButton" onClick={swap}>
                  <img src="./Horizontal_top_left_main.svg" alt="Swap"/>
                </button>
              </div>
              <div className="box_main">
                <Typography className="main_translated">
                  {text.trim() !== "" ? text : "translated"}
                </Typography>
                <div className="box_footer">
                  <div className="buttons">
                    <button className="footer_button" variant="outlined" onClick={copyHandler}>
                      <img src="./Copy.svg" alt="Copy" />
                    </button>
                    <button className="footer_button" variant="outlined" onClick={readHandler}>
                      <img src="./sound_max_fill.svg" alt="Read Aloud" />
                    </button>
                  </div>
                  <div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
