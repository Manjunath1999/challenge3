import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import SoundIcon from "../../images/sound_max_fill.svg"
import CopyIcon from "../../images/Copy.svg"
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Loader from "../Loader"
import { Menu, MenuItem } from '@mui/material';
import DropdownIcon from "../../images/Expand_down.svg"

export default function OutputCard(props) {
    const { langArray, selectedTwoLangText, selectedTwoLang, translatedText, loaderMadeTrue, loaderFlag } = props
    const [alertFlag, setAlertFlag] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [dropdownValue, setDropdownValue] = useState(langArray[3]);

    useEffect(() => {
        setTimeout(() => {
            setAlertFlag(false)
        }, 2000)
        if (translatedText.length > 0) {
            loaderMadeTrue()
        }
    }, [alertFlag, loaderFlag])

    const handleselectedTwoLangText = (b) => {
        selectedTwoLangText(b);
    }

    const handleTextToSpeech = () => {
        if (translatedText.length > 0) {
            const utterance = new SpeechSynthesisUtterance(translatedText);
            window.speechSynthesis.speak(utterance);
        }

    }

    const handleCopyText = () => {
        if (translatedText.length > 0) {
            navigator.clipboard.writeText(translatedText)
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
        handleselectedTwoLangText(b);
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
                            <p className="tp-each-language" key={b} style={{ backgroundColor: selectedTwoLang == b ? "#4D5562" : "", borderRadius: selectedTwoLang == b ? "5px" : "0px", color: selectedTwoLang == b ? "white" : "" }} onClick={() => handleselectedTwoLangText(b)}>{b}</p>
                        )
                    })}
                    {remainingLangs.length > 0 && (
                        <>
                            <p
                                className="tp-each-language"
                                key={dropdownValue}
                                style={{
                                    backgroundColor: selectedTwoLang === dropdownValue ? "#4D5562" : "",
                                    borderRadius: selectedTwoLang === dropdownValue ? "5px" : "0px",
                                    color: selectedTwoLang === dropdownValue ? "white" : ""
                                }}
                                onClick={handleClick}
                            >
                                {dropdownValue}
                                <img src={DropdownIcon} alt="icon" />
                            </p>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                {remainingLangs.map((b) => (
                                    <MenuItem key={b} onClick={() => handleDropdownSelect(b)}>
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
                    }} variant="standard" value={translatedText} />

                    {!loaderFlag && translatedText?.length == 0 && <Loader />}

                </CardContent>
                <CardActions className='translate-style'>
                    <div style={{ display: "flex" }}>
                        <div className="small-square small-square-space">
                            <img alt="soundIcon" className='box soundIcon' src={SoundIcon} onClick={handleTextToSpeech} />
                        </div>
                        <div className="small-square">
                            <img alt="soundIcon" className='box soundIcon' src={CopyIcon} onClick={handleCopyText} />
                        </div>


                    </div>
                </CardActions>
            </div>
            {alertFlag && <div className="alert-output-container">
                <Alert severity="success" onClose={() => setAlertFlag(false)}>
                    Copied to Clipboard
                </Alert>
            </div>}
        </Card>
    )
}
