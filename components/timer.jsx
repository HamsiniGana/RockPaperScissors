"use client";

import { useState, useEffect } from "react";

export default function Timer (props) {
    const [timeLeft, setTimeLeft] = useState(5)
    console.log(props)
    useEffect(() => {
        if (timeLeft != 0 && props.startNewSession) {
            // console.log("here")
            setTimeout(() => {setTimeLeft(timeLeft - 1)}, 1000)
        }
        if (timeLeft == 0) {
            props.setStartNewSession(false)
            props.setCompSelectedIconIndex(Math.floor(Math.random() * 3))
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