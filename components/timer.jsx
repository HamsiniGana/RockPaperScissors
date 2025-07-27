"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function Timer (props) {
    const [timeLeft, setTimeLeft] = useState(5)
    console.log(props)
    useEffect(() => {
        if (timeLeft != 0 && props.startGame) {
            console.log("here")
            setTimeout(() => {setTimeLeft(timeLeft - 1)}, 1000)
        }
    }, [timeLeft, props.startGame])

    return (
        <>
         <div className="flex flex-row gap-3 text-xl mb-[70px]">
            <p >Timer: </p>
            <p>{timeLeft}</p>
         </div>
        </>
    )
}