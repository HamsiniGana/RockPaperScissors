"use client";

import { useState, useEffect } from "react";

export default function Timer (props) {
    const [timeLeft, setTimeLeft] = useState(5)

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
        console.log("playerSelection:", playerSelection, "compSelection:", compSelection)
        // console.log(props.winningCombinations[playerSelection])
        // console.log(props.winningCombinations[compSelection])
        // console.log(compSelection in Object.keys(props.winningCombinations))

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
        if (timeLeft != 0 && props.startNewSession) {
            // console.log("here")
            setTimeout(() => {setTimeLeft(timeLeft - 1)}, 1000)
        }
        if (timeLeft == 0) {
            props.setStartNewSession(false)

            const compIndex = Math.floor(Math.random() * 3)
            props.setCompSelectedIconIndex(compIndex)

            const sessionResult = scoreCalculation(props.playerSelectedIcon,  computerSelectionConversion(compIndex))
            console.log("RESULT:", scoreCalculation(props.playerSelectedIcon,  computerSelectionConversion(compIndex)) )
            if (sessionResult === "player won") {
                props.setPlayerPoints(props.playerPoints + 1)
            } else if (sessionResult === "computer won") {
                props.setCompPoints(props.compPoints + 1)
            }
        }
    }, [timeLeft, props.startNewSession])

    return (
        <>
         <div className="flex flex-row gap-3 text-xl mb-[70px]">
            <p >Timer: </p>
            <p>{timeLeft}</p>
         </div>
        </>
    )
}