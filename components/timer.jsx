"use client";

import { useState, useEffect } from "react";

export default function Timer (props) {
    // console.log("Render at", new Date().toISOString());

    const [timeLeft, setTimeLeft] = useState(5)
    const [timeLeftForNextSession, setTimeLeftForNextSession] = useState(3)
    const [roundNo, setRoundNo] = useState(1)
    const [startNewRound, setStartNewRound] = useState(false)
    // const [sessionResult, setSessionResult] = useState('')
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
            return "You did not pick an option! Computer won this round"
        }
        const foundPlayerSelection = Object.keys(props.winningCombinations).find(k => k === playerSelection)
        const foundCompSelection = Object.keys(props.winningCombinations).find(k => k === compSelection)
        if (foundPlayerSelection && props.winningCombinations[playerSelection] === compSelection) {
            // setSessionResult("You won this round!")
            return "You won this round!"
        } else if (foundCompSelection && props.winningCombinations[compSelection] === playerSelection) {
            // setSessionResult("The computer won this round!")
            return "The computer won this round!"
        }
        // setSessionResult("It's a draw!")
        return "It's a draw!"
    }

    useEffect(() => {
            if (!props.startNewSession) {
                return;
            }
            if (!startNewRound && props.startNewSession) {
                // console.log("before", timeLeft)
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
            } else if (roundNo <= props.bestOf && startNewRound && props.startNewSession) {
                const intervalId = setInterval(() => {
                    setTimeLeftForNextSession(prev => {
                        if ((prev - 1 <= 0) || (roundNo === 3)) {
                            // setStartNewRound(true)
                            clearInterval(intervalId)
                            return 0
                        }
                        return prev - 1
                    })
                }, 1000)
                // clearInterval(intervalId)

                const compIndex = Math.floor(Math.random() * 3)
                props.setCompSelectedIconIndex(compIndex)

                const sessionResult = scoreCalculation(props.playerSelectedIcon,  computerSelectionConversion(compIndex))

                if (sessionResult === "You won this round!") {
                    props.setPlayerPoints(prev => prev + 1)
                } else if (sessionResult === "The computer won this round!" || sessionResult === "You did not pick an option! Computer won this round") {
                    props.setCompPoints(prev => prev + 1)
                }
                props.setDisplayMsg(sessionResult)

                if (roundNo === 3) {
                    setTimeLeftForNextSession(0);
                }

                const timeoutId = setTimeout(() => {
                    setRoundNo(prev => prev + 1);
                    setStartNewRound(false);
                    if (roundNo <= 2) {
                        setTimeLeft(5);
                        setTimeLeftForNextSession(3);
                    } else {
                        clearTimeout(timeoutId);
                        // setTimeLeftForNextSession(0);
                    }

                    props.setCompSelectedIconIndex(-1);
                    if (roundNo === 3) { // change to if player points != comp points
                        console.log(roundNo, "3rd round")
                        props.setChangeSelectionBorder(false);
                    } else {
                        props.setChangeSelectionBorder(true);
                        props.setDisplayMsg('');
                    }
                    // props.setPlayerSelectedIcon('');
                    // console.log("Hello there")
                }, 3000)
                return () => clearTimeout(timeoutId)
            }
    }, [timeLeft, props.startNewSession, startNewRound])

    // useEffect(() => {
    //     if (props.setChangeSelectionBorder) {
    //         setSessionResult('')
    //     }

    // }, [props.setChangeSelectionBorder])

    // useEffect(() => {
    //     // console.log("timeLeftForNextSession", timeLeftForNextSession)
    //     // console.log("timeLeft", timeLeft)
    //     if (roundNo <= props.bestOf && timeLeftForNextSession > 0 && timeLeft === 0) {
    //         // setTimeLeftForNextSession(3)
    //         console.log("Here1")
    //         props.setChangeSelectionBorder(false)
    //         // console.log("here1after")
    //         const intervalId = setInterval(() => {setTimeLeftForNextSession(prev => prev - 1)}, 1000)

    //         return () => clearInterval(intervalId)
    //     }
    //     if (roundNo <= props.bestOf && timeLeftForNextSession === 0 && timeLeft === 0) {
    //         console.log("Here2")
    //         setTimeLeft(5)
    //         setTimeLeftForNextSession(3)
    //         // props.setStartNewSession(true)
    //         props.setChangeSelectionBorder(true)
    //     }

    //     // if (roundNo > props.bestOf) {
    //     //     if (props.playerPoints === props.compPoints) {
    //     //         // console.log("yessssssss")
    //     //         //Removed && timeLeft === 0 from if check
    //     //         if (timeLeftForNextSession > 0) {
    //     //             props.setChangeSelectionBorder(false)
    //     //             const intervalId = setInterval(() => {setTimeLeftForNextSession(prev => prev - 1)}, 1000)
    //     //             return () => clearInterval(intervalId)
    //     //         }
    //     //         //Removed && timeLeft === 0 from if check
    //     //         if ((timeLeftForNextSession === 0)) {
    //     //             setTimeLeft(5)
    //     //             setTimeLeftForNextSession(3)
    //     //             props.setStartNewSession(true)
    //     //             props.setChangeSelectionBorder(true)
    //     //         }

    //     //     }
    //     // }
    // }, [roundNo, timeLeftForNextSession, timeLeft])

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