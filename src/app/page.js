"use client";
import {
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "./globals.css";
import { useState, useCallback, useEffect } from "react";

const fetchTranslation = async (enteryWords, eLang, Tlang) => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${enteryWords}&langpair=${eLang}|${Tlang}`
    );
    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Server error: ", error);
    return "";
  }
};

export default function Home() {
  const [enteryLang, setEnteryLang] = useState("en");
  const [translatedLang, setTranslatedLang] = useState("fa");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [charLength, setCharlength] = useState(0);
  const maxLength = 500;

  const translate = useCallback(async () => {
    if (text.trim()) {
      const translated = await fetchTranslation(
        text,
        enteryLang,
        translatedLang
      );
      setTranslatedText(translated);
    }
  }, [text, enteryLang, translatedLang]);

  const handleInput = useCallback((event) => {
    let inputText = event.target.value.slice(0, maxLength);
    setText(inputText);
    setCharlength(inputText.length);
  }, []);

  useEffect(() => {
    translate();
  }, [text, enteryLang, translatedLang, translate]);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment) setEnteryLang(newAlignment);
  };

  const handleTranslatedLang = (event, newLang) => {
    if (newLang) setTranslatedLang(newLang);
  };

  const swapLanguages = () => {
    setEnteryLang(translatedLang);
    setTranslatedLang(enteryLang);
  };

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const readText = (content, lang) => {
    const langMapping = {
      en: "en-US",
      fr: "fr-FR",
      fa: "fa-IR",
      sp: "es-ES",
    };
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = langMapping[lang] || "en-US";
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
            {/* Original Text Box */}
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
                  <ToggleButton className="toggle-button" value="it">
                    Italian
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
                    <button
                      className="footer_button"
                      variant="outlined"
                      onClick={() => copyToClipboard(text)}
                    >
                      <img src="./Copy.svg" alt="Copy" />
                    </button>
                    <button
                      className="footer_button"
                      variant="outlined"
                      onClick={() => readText(text, enteryLang)}
                    >
                      <img src="./sound_max_fill.svg" alt="Read Aloud" />
                    </button>
                  </div>
                  <Typography className="footer_counter">
                    {charLength}/500
                  </Typography>
                </div>
              </div>
            </div>

            {/* Translated Text Box */}
            <div className="boxes_box" style={{ background: "#121826cc" }}>
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
                  <ToggleButton className="toggle-button" value="it">
                    Italian
                  </ToggleButton>
                </ToggleButtonGroup>
                <button className="header_swapButton" onClick={swapLanguages}>
                  <img src="./Horizontal_top_left_main.svg" alt="Swap" />
                </button>
              </div>
              <div className="box_main">
                <Typography className="main_translated">
                  {text.trim() ? translatedText : "translated"}
                </Typography>
                <div className="box_footer" style={{ marginTop: "2.5rem" }}>
                  <div className="buttons">
                    <button
                      className="footer_button"
                      variant="outlined"
                      onClick={() => copyToClipboard(translatedText)}
                    >
                      <img src="./Copy.svg" alt="Copy" />
                    </button>
                    <button
                      className="footer_button"
                      variant="outlined"
                      onClick={() => readText(translatedText, translatedLang)}
                    >
                      <img src="./sound_max_fill.svg" alt="Read Aloud" />
                    </button>
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
