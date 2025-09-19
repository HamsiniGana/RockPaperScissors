"use client";

import GradientText from '../components/gradientText'
import RockScissorsHand from '../components/rockScissorsHand'
import Timer from '../components/timer';
import {Button} from "@heroui/react";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const [startNewSession, setStartNewSession] = useState(false)
  const [playerSelectedIcon, setPlayerSelectedIcon] = useState('')
  const [playerPoints, setPlayerPoints] = useState(0)
  const [compPoints, setCompPoints] = useState(0)
  const [compSelectedIconIndex, setCompSelectedIconIndex] = useState(-1)
  const [winningCombinations, setWinningCombinations] = useState({
    scissors: "paper",
    paper: "rock",
    rock: "scissors"
  })
  const [displayMsg, setDisplayMsg] = useState('')
  const [bestOf, setBestOf] = useState(3)
  const[changeSelectionBorder, setChangeSelectionBorder] = useState(false)
  const [startNewGameClicked, setStartNewGameClicked] = useState(false)

useEffect(() => {
  if (changeSelectionBorder) {
    setPlayerSelectedIcon('')
  }

}, [changeSelectionBorder])

useEffect(() => {
  let localStorageVal = JSON.parse(localStorage.getItem("startNewSession"))
  if (localStorageVal !== null) {
    setStartNewSession(localStorageVal)
  }

}, [])

  return (
    <div className="flex flex-col items-center">
      <div className='flex flex-row'>
        <GradientText className="text-[50px] mb-[60px]">READY SET GO</GradientText>
        <Button className='ms-[400px] mt-4 border-solid border-orange-300 border-3 bg-black text-orange-300 h-[50px]' onClick={() => {
          localStorage.setItem("startNewSession", "true");
          window.location.reload();
          }}>START NEW GAME</Button>
      </div>
      <Timer
        startNewSession={startNewSession}
        setStartNewSession={setStartNewSession}
        compSelectedIconIndex = {compSelectedIconIndex}
        setCompSelectedIconIndex = {setCompSelectedIconIndex}
        winningCombinations = {winningCombinations}
        playerSelectedIcon = {playerSelectedIcon}
        setPlayerPoints = {setPlayerPoints}
        setCompPoints = {setCompPoints}
        playerPoints={playerPoints}
        compPoints={compPoints}
        setDisplayMsg={setDisplayMsg}
        bestOf={bestOf}
        setStartNewGameClicked={setStartNewGameClicked}
        startNewGameClicked={setStartNewGameClicked}
        setChangeSelectionBorder = {setChangeSelectionBorder}
      />
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center px-[150px]">
          <p>Points: {playerPoints}</p>
          <GradientText className="text-[35px]">You</GradientText>
          <RockScissorsHand
            player="you"
            startNewSession={startNewSession}
            playerSelectedIcon={playerSelectedIcon}
            setPlayerSelectedIcon={setPlayerSelectedIcon}
            changeSelectionBorder = {changeSelectionBorder}
            />
        </div>
        <span className="ml-[30px] text-[18px] w-[250px] ml-[90px]">{displayMsg}</span>
        <div className="flex flex-col items-center px-[150px]">
          <p>Points: {compPoints}</p>
          <GradientText className="text-[35px]">Computer</GradientText>
          <RockScissorsHand
            player="computer"
            compSelectedIconIndex={compSelectedIconIndex}
            changeSelectionBorder = {changeSelectionBorder}
            />
        </div>
      </div>
    </div>
  );
}
