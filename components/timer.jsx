"use client";

import { useState, useEffect } from "react";

export default function Timer (props) {
    // console.log("Render at", new Date().toISOString());

    const [timeLeft, setTimeLeft] = useState(5)
    const [timeLeftForNextSession, setTimeLeftForNextSession] = useState(3)
    const [roundNo, setRoundNo] = useState(1)
    /**
     * Description - Converts the 'indexSelected' value passed to the corresponding icon name
     * @param {*} indexSelected 
     * @returns 
     */
    const computerSelectionConversion = (indexSelected) => {
        if (indexSelected === 0) {
            return "rock"
        } else if (indexSelected === 1) {
            return "scissors"
        } else if (indexSelected === 2) {
            return "paper"
        }
    }

    /**
     * Description - Checks whether the icons selected by the player and the computer are a winning match for a session
     * @param {*} playerSelection 
     * @param {*} compSelection 
     * @returns 
     */
    const scoreCalculation = (playerSelection, compSelection) => {
        // console.log(Object.keys(props.winningCombinations))
        // console.log("playerSelection:", playerSelection, "compSelection:", compSelection)
        // console.log(props.winningCombinations[playerSelection])
        // console.log(props.winningCombinations[compSelection])
        // console.log(compSelection in Object.keys(props.winningCombinations))
        if (playerSelection === '') {
            return "You did not pick an option!"
        }
        const foundPlayerSelection = Object.keys(props.winningCombinations).find(k => k === playerSelection)
        const foundCompSelection = Object.keys(props.winningCombinations).find(k => k === compSelection)
        if (foundPlayerSelection && props.winningCombinations[playerSelection] === compSelection) {
            return "player won"
        } else if (foundCompSelection && props.winningCombinations[compSelection] === playerSelection) {
            return "computer won"
        }
        return "draw"
    }

    useEffect(() => {
        // for (let i = 0; i < props.bestOf; i++) {
            // console.log("i", i)
            if (timeLeft > 0 && props.startNewSession) {
            // console.log("here")
                const intervalId = setInterval(() => {setTimeLeft(prev => prev - 1)}, 1000)
                return () => clearInterval(intervalId)
            }
            if (timeLeft == 0 && props.startNewSession) {
                props.setStartNewSession(false)

                const compIndex = Math.floor(Math.random() * 3)
                props.setCompSelectedIconIndex(compIndex)

                const sessionResult = scoreCalculation(props.playerSelectedIcon,  computerSelectionConversion(compIndex))
                // console.log("RESULT:", scoreCalculation(props.playerSelectedIcon,  computerSelectionConversion(compIndex)) )
                if (sessionResult === "player won") {
                    props.setPlayerPoints(prev => prev + 1)
                    props.setDisplayMsg('You won this round!')
                } else if (sessionResult === "computer won") {
                    props.setCompPoints(prev => prev + 1)
                    props.setDisplayMsg('Computer won this round!')
                } else if (sessionResult === "draw") {
                    props.setDisplayMsg("It's a draw!")
                } else if (sessionResult === "You did not pick an option!") {
                    props.setDisplayMsg(sessionResult)
                }
                // console.log(timeLeftForNextSession)

                setRoundNo(prev => prev + 1)
            }
            // console.log("before")
            // console.log("startNewSession:", props.startNewSession)
            // console.log("timeLeft:", timeLeft)
            // console.log("timeLeftForNextSession:", timeLeftForNextSession)
            // if (roundNo <= 3 && props.startNewSession === true && timeLeft === 0 && timeLeftForNextSession === 0) {
            //     // console.log("startNewSession:", props.startNewSession)
            //     // console.log("timeLeft:", timeLeft)
            //     // console.log("timeLeftForNextSession:", timeLeftForNextSession)
            //     setTimeLeft(5)
            //     props.setStartNewSession (true)
            // }
    }, [timeLeft, props.startNewSession])

    // useEffect(() => {
    //     if (roundNo)
    // }, [roundNo])

    useEffect(() => {
        // console.log("TLNS:", timeLeftForNextSession)
        if (roundNo <= props.bestOf && timeLeftForNextSession > 0 && timeLeft === 0) {
            // setTimeLeftForNextSession(3)
            props.setChangeCompSelectionBorder(false)
            const intervalId = setInterval(() => {setTimeLeftForNextSession(prev => prev - 1)}, 1000)
            return () => clearInterval(intervalId)
            
        }
        if (roundNo <= props.bestOf && timeLeftForNextSession === 0 && timeLeft === 0) {
            setTimeLeft(5)
            // if (roundNo === 3) {
            //     setTimeLeftForNextSession(0)
            // } else {
            setTimeLeftForNextSession(3)
            // }
            
            props.setStartNewSession(true)
            props.setChangeCompSelectionBorder(true)
        }
        // if (timeLeft == 0 && props.startNewSession && timeLeftForNextSession === 0) {
        //     props.setRoundNo(prev => prev + 1)
        // }
    }, [roundNo, timeLeftForNextSession, timeLeft])

    return (
        <>
         <div className="flex flex-row gap-3 text-xl mb-[70px]">
            <p>{timeLeft === 0 ? "Time left for next session: " : "Timer: "}</p>
            <p>{timeLeft === 0 ? timeLeftForNextSession : timeLeft}</p>
         </div>
        {console.log("round:", roundNo)}
        </>
    )
}