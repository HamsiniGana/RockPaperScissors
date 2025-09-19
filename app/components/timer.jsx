"use client";

import { useState, useEffect } from "react";

export default function Timer (props) {
    const [timeLeft, setTimeLeft] = useState(5)
    const [timeLeftForNextSession, setTimeLeftForNextSession] = useState(3)
    const [roundNo, setRoundNo] = useState(1)
    const [startNewRound, setStartNewRound] = useState(false)

    /**
     * Description - Converts the 'indexSelected' value passed to the corresponding icon name
     * @param {int} indexSelected - The index of the computer's selection
     * @returns {string} - The name of the icon: "rock", "scissors", or "paper"
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
     * @param {string} playerSelection - The icon chosen by the player
     * @param {string} compSelection - The icon chosen by the computer
     * @returns {string} - Result of the round: win, lose, or draw message
    */
    const scoreCalculation = (playerSelection, compSelection) => {
        console.log("playerSelection:", playerSelection, "compSelection:", compSelection)
        if (playerSelection === '') {
            return "You did not pick an option! Computer won this round"
        }
        const foundPlayerSelection = Object.keys(props.winningCombinations).find(k => k === playerSelection)
        const foundCompSelection = Object.keys(props.winningCombinations).find(k => k === compSelection)
        if (foundPlayerSelection && props.winningCombinations[playerSelection] === compSelection) {
            return "You won this round!"
        } else if (foundCompSelection && props.winningCombinations[compSelection] === playerSelection) {
            return "The computer won this round!"
        }
        return "It's a draw!"
    }

    /**
     * Calculates the immediate updated scores based on the result of the round.
     * Does not update state directly, just returns the updated values.
     * @param {string} result - The result message of the round
     * @returns {number[]} - Array with [playerPoints, compPoints] after this round
    */
    const immediateScoreCalculation = (result) => {
         if (result === "You won this round!") {
            return [props.playerPoints + 1, props.compPoints]
        } else if (result === "The computer won this round!" || result === "You did not pick an option! Computer won this round") {
            return [props.playerPoints, props.compPoints + 1]
        } else if (result === "It's a draw!") {
            return [props.playerPoints, props.compPoints]
        }
    }

    /**
     * Updates the React state scores for player/computer based on the session result.
     * @param {string} sessionResultPassed - The result message of the current round
    */
    const updateScores = (sessionResultPassed) => {
        if (sessionResultPassed === "You won this round!") {
            props.setPlayerPoints(prev => prev + 1)
        } else if (sessionResultPassed === "The computer won this round!" || sessionResultPassed === "You did not pick an option! Computer won this round") {
            props.setCompPoints(prev => prev + 1)
        }
    }

    useEffect(() => {
            if (!props.startNewSession) {
                return;
            }

            // Countdown for the current round
            if (!startNewRound && props.startNewSession) {
                const intervalId = setInterval(() => {
                    setTimeLeft(prev => {
                        if (prev - 1 <= 0) {
                            setStartNewRound(true)
                            props.setChangeSelectionBorder(false);
                            clearInterval(intervalId)
                            return 0
                        }
                        return prev - 1
                    })
                }, 1000)
                return () => clearInterval(intervalId)
            }

            const compIndex = Math.floor(Math.random() * 3)
            props.setCompSelectedIconIndex(compIndex)
            const sessionResult = scoreCalculation(props.playerSelectedIcon,  computerSelectionConversion(compIndex))
            let immediateResults = immediateScoreCalculation(sessionResult);

            if (roundNo > 3 && immediateResults[0] !== immediateResults[1]) {
                updateScores(sessionResult)
                setTimeLeftForNextSession(0)
                props.setStartNewSession(false)
                localStorage.setItem("startNewSession", false)

                if (immediateResults[0] > immediateResults[1]) {
                    props.setDisplayMsg(sessionResult + " \n" + "YOU WON THE GAME!")
                } else {
                    props.setDisplayMsg(sessionResult + " \n" + "COMPUTER WON THE GAME :(")
                }
            }

            if (roundNo <= props.bestOf && startNewRound && props.startNewSession || immediateResults[0] === immediateResults[1]) {
                const intervalId = setInterval(() => {
                    setTimeLeftForNextSession(prev => {
                        if ((prev - 1 <= 0)) {
                            clearInterval(intervalId)
                            return 0
                        }
                        return prev - 1
                    })
                }, 1000)

                updateScores(sessionResult)
                if (roundNo === 3 && immediateResults[0] !== immediateResults[1]) {
                    if (immediateResults[0] > immediateResults[1]) {
                            props.setDisplayMsg(sessionResult + " \n" + "YOU WON THE GAME!")
                    } else {
                            props.setDisplayMsg(sessionResult + " \n" + "COMPUTER WON THE GAME :(")
                    }
                    setTimeLeftForNextSession(0);
                    props.setStartNewSession(false);
                    localStorage.setItem("startNewSession", false);
                } else {
                    props.setDisplayMsg(sessionResult)
                }
                const timeoutId = setTimeout(() => {
                    if ((roundNo <= 2) || (roundNo >= 3 && immediateResults[0] === immediateResults[1])) {
                        setRoundNo(prev => prev + 1);
                        setStartNewRound(false);
                    }

                    if (roundNo <= 2 || (immediateResults[0] === immediateResults[1])) {
                        setTimeLeft(5);
                        setTimeLeftForNextSession(3);

                    } else {
                        clearTimeout(timeoutId);
                        setTimeLeftForNextSession(0);
                        setTimeLeft(0);
                    }

                    props.setCompSelectedIconIndex(-1);
                    if (roundNo >= 3) {
                        if (immediateResults[0] === immediateResults[1]) {
                            props.setChangeSelectionBorder(true);

                        } else {
                            props.setChangeSelectionBorder(false);
                            props.setStartNewSession(false)
                            localStorage.setItem("startNewSession", false)
                        }
                        props.setDisplayMsg('');
                    }
                    else {
                        props.setChangeSelectionBorder(true);
                        props.setDisplayMsg('');
                    }
                }, 3000)
                return () => clearTimeout(timeoutId)
            }
    }, [timeLeft, props.startNewSession, startNewRound])

    return (
        <>
         <div className="flex flex-row gap-3 text-xl mb-[70px]">
            <p>{timeLeft === 0 ? "Time left for next session: " : "Timer: "}</p>
            <p>{timeLeft === 0 ? timeLeftForNextSession : timeLeft}</p>
         </div>
        </>
    )
}