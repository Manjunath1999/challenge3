import React , { useState , useEffect, useCallback } from 'react'
import InputCard from "../InputCard";
import OutputCard from "../OutputCard"

export default function Translate() {
    const [cardoneLangArray, setCardOneLangArray] = useState(["Detect Language", "English","French","Spanish"]);
    const [cardtwoLangArray, setCardTwoLangArray] = useState(["English","French","Spanish", "Hindi"]);
    const [translatedText, setTranslatedText] = useState("");
    const [selectedOneLang, setSelectedOneLang] = useState("English")
    const [selectedTwoLang, setSelectedTwoLang] = useState("French")


    var rfcLangObj = [
        {
            id: 1,
            value: "English",
            rfcValue: "en-US"
        },
        {
            id: 2,
            value: "French",
            rfcValue: "fr-FR"
        },
        {
            id: 3,
            value: "Spanish",
            rfcValue: "es-ES"
        },
        {
            id: 4,
            value: "Hindi",
            rfcValue: "hi"
        },
    ]

    const convertText = (e) => {
        setTranslatedText(e)
    }

    const selectedOneLangText = (e) => {
        setSelectedOneLang(e)
    }

    const selectedTwoLangText = (e) => {
        setSelectedTwoLang(e)
        let rfcSelectedLang = rfcLangObj.filter((r) => r.value == e)
        console.log("..........................", rfcSelectedLang[0]?.rfcValue)
        localStorage.setItem("value",JSON.stringify(rfcSelectedLang[0]?.rfcValue))
    }


    return (
        <div className='tp-portal'>
            <div className='tp-sub-portal'>
                <InputCard  langArray={cardoneLangArray} selectedOneLangText={selectedOneLangText} rfcLangObj={rfcLangObj} selectedOneLang={selectedOneLang} convertText={convertText}/>
                <OutputCard langArray={cardtwoLangArray} selectedTwoLangText={selectedTwoLangText} rfcLangObj={rfcLangObj} selectedTwoLang={selectedTwoLang} translatedText={translatedText}/>
            </div>
        </div>
    )
}
