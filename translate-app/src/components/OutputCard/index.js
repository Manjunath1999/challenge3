import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import SoundIcon from "../../images/sound_max_fill.svg"
import CopyIcon from "../../images/Copy.svg"
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

export default function OutputCard(props) {
    const { langArray, selectedTwoLangText, selectedTwoLang, translatedText } = props
    const [alertFlag, setAlertFlag] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setAlertFlag(false)
        }, 2000)
    }, [alertFlag])

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




    return (
        <Card className="tp-card">
            <div className="tp-sub-card">
                <div className="tp-language">
                    {langArray?.map((b) => {
                        return (
                            <p className="tp-each-language" key={b} style={{ backgroundColor: selectedTwoLang == b ? "#4D5562" : "", borderRadius: selectedTwoLang == b ? "5px" : "0px", color: selectedTwoLang == b ? "white" : "" }} onClick={() => handleselectedTwoLangText(b)}>{b}</p>
                        )
                    })}
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
                </CardContent>
                <CardActions className='translate-style'>
                    <div>
                        <img alt="soundIcon" className='box soundIcon' src={SoundIcon} onClick={handleTextToSpeech} />
                        <img alt="soundIcon" src={CopyIcon} onClick={handleCopyText} />
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
