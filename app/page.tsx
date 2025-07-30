"use client";

import GradientText from '@/components/gradientText'
import RockScissorsHand from "@/components/rockScissorsHand"
import Timer from "@/components/timer"
import {Button} from "@heroui/react";
import { useState } from 'react';

export default function Home() {
  const [startNewSession, setStartNewSession] = useState(false)
  const [playerSelectedIcon, setPlayerSelectedIcon] = useState('')
  const [timerStarted, setTimerStarted] = useState(false)
  const [playerPoints, setPlayerPoints] = useState(0)
  const [compPoints, setCompPoints] = useState(0)
  const [compSelectedIconIndex, setCompSelectedIconIndex] = useState(-1)
  const [winningCombinations, setWinningCombinations] = useState({
    scissors: "paper",
    paper: "rock",
    rock: "scissors"
  })
  return (
    <div className="flex flex-col items-center">
      <div className='flex flex-row'>
        <GradientText className="text-[50px] mb-[60px]">READY SET GO</GradientText>
        <Button className='ms-[400px] mt-4' onClick={() => {setStartNewSession(true)}}>START GAME</Button>
      </div>
      <Timer startNewSession={startNewSession}
      setStartNewSession={setStartNewSession}
      compSelectedIconIndex = {compSelectedIconIndex}
      setCompSelectedIconIndex = {setCompSelectedIconIndex}
      />
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center px-[150px]">
          <p>Points: {playerPoints}</p>
          <GradientText className="text-[35px]">You</GradientText>
          <RockScissorsHand 
            player="you" 
            startNewSession={startNewSession} 
            playerSelectedIcon={playerSelectedIcon} 
            setPlayerSelectedIcon={setPlayerSelectedIcon}/>
        </div>
        <span className="ml-[30px]">Player won this round</span>
        <div className="flex flex-col items-center px-[150px]">
          <p>Points: {compPoints}</p>
          <GradientText className="text-[35px]">Computer</GradientText>
          <RockScissorsHand 
            player="computer"
            compSelectedIconIndex={compSelectedIconIndex}
            />
        </div>
      </div>
    </div>
  );
}
