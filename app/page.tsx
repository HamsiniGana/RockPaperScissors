"use client";

import GradientText from '@/components/gradientText'
import RockScissorsHand from "@/components/rockScissorsHand"
import Timer from "@/components/timer"
import {Button} from "@heroui/react";
import { useState } from 'react';
export default function Home() {
  const [startGame, setStartGame] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <div className='flex flex-row'>
        <GradientText className="text-[50px] mb-[60px]">READY SET GO</GradientText>
        <Button className='ms-[400px] mt-4' onClick={() => {setStartGame(true)}}>START GAME</Button>
      </div>
      <Timer startGame={startGame} setStartGame={setStartGame}/>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center px-[150px]">
          <p>Points:</p>
          <GradientText className="text-[35px]">You</GradientText>
          <RockScissorsHand player="you" startGame={startGame} />
        </div>
        <span className="ml-[30px]">Player won this round</span>
        <div className="flex flex-col items-center px-[150px]">
          <p>Points:</p>
          <GradientText className="text-[35px]">Computer</GradientText>
          <RockScissorsHand player="computer"/>
        </div>
      </div>
    </div>
  );
}
