import React, { useState, useEffect, useCallback } from 'react'
import InputCard from "../InputCard";
import OutputCard from "../OutputCard"

export default function Translate() {
    const [cardoneLangArray, setCardOneLangArray] = useState(["English", "French", "Spanish", "Telugu", "Tamil", "Kannada", "Sanskrit", "Hindi"]);
    const [cardtwoLangArray, setCardTwoLangArray] = useState(["English", "French", "Spanish", "Hindi","Kannada","Telugu"]);
    const [translatedText, setTranslatedText] = useState(" ");
    const [selectedOneLang, setSelectedOneLang] = useState("English")
    const [selectedTwoLang, setSelectedTwoLang] = useState("French")
    const [loaderFlag, setLoaderFlag] = useState(true)


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
        {
            id: 5,
            value: "Telugu",
            rfcValue: "te"
        },
        {
            id: 6,
            value: "Tamil",
            rfcValue: "ta"
        },
        {
            id: 7,
            value: "Kannada",
            rfcValue: "kan"
        },
        {
            id: 8,
            value: "Sanskrit",
            rfcValue: "sa"
        },
    ]

    useEffect(() => {
        window.onload = function() {
            localStorage.clear();
        };
    },[])

    const convertText = useCallback((e) => {
        setTranslatedText(e)
    }, [translatedText])

    const selectedOneLangText = (e) => {
        setSelectedOneLang(e)
    }

    const loaderMadeTrue = () => {
        setLoaderFlag(true)
    }

    const loaderMadeFalse = (e) => {
        setLoaderFlag(false)
    }

    const selectedTwoLangText = (e) => {
        setSelectedTwoLang(e)
        let rfcSelectedLang = rfcLangObj.filter((r) => r.value == e)
        localStorage.setItem("value", JSON.stringify(rfcSelectedLang[0]?.rfcValue))
    }


    return (
        <div className='tp-portal'>
            <div className='tp-sub-portal'>
                <InputCard langArray={cardoneLangArray} selectedOneLangText={selectedOneLangText} rfcLangObj={rfcLangObj} selectedOneLang={selectedOneLang} selectedTwoLang={selectedTwoLang} convertText={convertText} loaderMadeFalse={loaderMadeFalse} />
                <OutputCard langArray={cardtwoLangArray} selectedTwoLangText={selectedTwoLangText} rfcLangObj={rfcLangObj} selectedTwoLang={selectedTwoLang} translatedText={translatedText} loaderMadeTrue={loaderMadeTrue} loaderFlag={loaderFlag} />
            </div>
        </div>
    )
}
