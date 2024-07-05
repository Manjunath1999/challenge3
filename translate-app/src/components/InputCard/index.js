import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SoundIcon from "../../images/sound_max_fill.svg"
import CopyIcon from "../../images/Copy.svg"
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Menu, MenuItem } from '@mui/material';
import DropdownIcon from "../../images/Expand_down.svg"

export default function InputCard(props) {
    const { langArray, selectedOneLangText, selectedOneLang, rfcLangObj, convertText, loaderMadeFalse } = props
    const [inputText, setInputText] = useState("")
    const [langApi, setLangApi] = useState("")
    const [alertFlag, setAlertFlag] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [dropdownValue, setDropdownValue] = useState(langArray[3]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    const handleTranslate = () => {
        handleTranslateApi();
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertFlag(false)
        }, 2000)
    }, [alertFlag])

    const handleTranslateApi = async () => {
        const outputCard = localStorage.getItem("value")
        let parsedValue = outputCard ? JSON.parse(outputCard) : ""
        try {
            loaderMadeFalse();
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${inputText}&langpair=${selectedOneLang}|${parsedValue}`)
            const resJson = await res.json()
            console.log("...........resJson" , resJson)
            console.log("...........selectedOneLang" , selectedOneLang)
            console.log("...........parsedValue" , parsedValue)
            console.log("....................", resJson?.responseData?.translatedText)
            convertText(resJson?.matches[1]?.translation);
        }
        catch (err) {
            console.log(err)
        }

    }

    const handleselectedOneLangText = (b) => {
        selectedOneLangText(b)
        let rfcSelectedLang = rfcLangObj.filter((r) => r.value == b)
        setLangApi(rfcSelectedLang[0]?.rfcValue)
    }

    const handleTextToSpeech = () => {
        if (inputText.length > 0) {
            const utterance = new SpeechSynthesisUtterance(inputText);
            window.speechSynthesis.speak(utterance);
        }

    }

    const handleCopyText = () => {
        if (inputText.length > 0) {
            navigator.clipboard.writeText(inputText)
                .then(() => {
                    setAlertFlag(true)
                })
                .catch((err) => {
                    console.error("Could not copy text: ", err);
                });
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDropdownSelect = (b) => {
        setAnchorEl(null);
        handleselectedOneLangText(b);
        setDropdownValue(b);
    };

    const firstThreeLangs = langArray.slice(0, 3);
    const remainingLangs = langArray.slice(3);


    return (
        <Card className="tp-card">
            <div className="tp-sub-card">
                <div className="tp-language">
                    {firstThreeLangs?.map((b) => {
                        return (
                            <p className="tp-each-language" key={b} style={{ backgroundColor: selectedOneLang == b ? "#4D5562" : "", borderRadius: selectedOneLang == b ? "5px" : "0px", color: selectedOneLang == b ? "white" : "" }} onClick={() => handleselectedOneLangText(b)}>{b}</p>
                        )
                    })}
                    {remainingLangs.length > 0 && (
                        <>
                            <p
                                className="tp-each-language"
                                key={dropdownValue}
                                style={{
                                    backgroundColor: selectedOneLang === dropdownValue ? "#4D5562" : "",
                                    borderRadius: selectedOneLang === dropdownValue ? "5px" : "0px",
                                    color: selectedOneLang === dropdownValue ? "white" : ""
                                }}
                                onClick={handleClick}
                            >
                                {dropdownValue}
                                <img src={DropdownIcon} alt="icon" /> 
                            </p>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                {remainingLangs.map((b) => (
                                    <MenuItem key={b}  onClick={() => handleDropdownSelect(b)}>
                                        {b}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    )}

                </div>
                <hr className='horizontal-line' />
                <CardContent sx={{ padding: "0rem", height: "10rem" }}>
                    <TextField id="standard-basic" fullWidth sx={{
                        '& .MuiInput-input': {
                            color: "white !important",
                        },
                        '& .MuiInput-underline:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiInput-underline:hover:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottom: 'none',
                        },
                        '& .MuiInputBase-root': {
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }} variant="standard" value={inputText} onChange={handleInputChange} />
                </CardContent>
                <CardActions className='translate-style'>
                    <div>
                        <img alt="soundIcon" className='box soundIcon' src={SoundIcon} onClick={handleTextToSpeech} />
                        <img alt="soundIcon" src={CopyIcon} onClick={handleCopyText} />
                    </div>
                    <Button size="small" variant="contained" sx={{ textTransform: "none" }} onClick={handleTranslate} disabled={inputText.length <= 0}>Translate</Button>
                </CardActions>
            </div>
            {alertFlag && <div className="alert-container">
                <Alert severity="success" onClose={() => setAlertFlag(false)}>
                    Copied to Clipboard
                </Alert>
            </div>}
        </Card>
    )
}
