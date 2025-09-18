"use client";

import rock from "../assets/rock.png"
import scissors from "../assets/scissors.png"
import paper from "../assets/paper.png"
import Image from "next/image";
import {Button} from "@heroui/react";
import { useState } from "react";
import { useEffect } from "react";

export default function RockScissorsHand (props) {
  const [ring, setRing] = useState({
    rockStyle: "gradient-border my-5 h-[80px] w-[80px]",
    scissorsStyle: "gradient-border my-5 h-[80px] w-[80px]",
    paperStyle: "gradient-border my-5 h-[80px] w-[80px]"
  })

  const [disableButtons, setDisableButtons] = useState(false)

  useEffect(() => {
    if (props.playerSelectedIcon === "rock") {
      setRing({
        scissorsStyle: "gradient-border my-5 h-[80px] w-[80px]",
        paperStyle: "gradient-border my-5 h-[80px] w-[80px]",
        rockStyle: "gradient-border-on-click my-5 h-[80px] w-[80px]"
      });
    } else if (props.playerSelectedIcon === "scissors") {
      setRing({
        paperStyle: "gradient-border my-5 h-[80px] w-[80px]",
        scissorsStyle: "gradient-border-on-click my-5 h-[80px] w-[80px]",
        rockStyle: "gradient-border my-5 h-[80px] w-[80px]"}); 
    } else if (props.playerSelectedIcon === "paper") {
      setRing({
        rockStyle: "gradient-border my-5 h-[80px] w-[80px]",
        paperStyle: "gradient-border-on-click my-5 h-[80px] w-[80px]",
        scissorsStyle: "gradient-border my-5 h-[80px] w-[80px]"}); 
    }
  }, [props.playerSelectedIcon])


  useEffect(() => {
    if (props.compSelectedIconIndex === 0) {
      setRing({
        scissorsStyle: "gradient-border my-5 h-[80px] w-[80px]",
        paperStyle: "gradient-border my-5 h-[80px] w-[80px]",
        rockStyle: "gradient-border-on-click my-5 h-[80px] w-[80px]"
      });
    } else if (props.compSelectedIconIndex === 1) {
      setRing({
        paperStyle: "gradient-border my-5 h-[80px] w-[80px]",
        scissorsStyle: "gradient-border-on-click my-5 h-[80px] w-[80px]",
        rockStyle: "gradient-border my-5 h-[80px] w-[80px]"}); 
    } else if (props.compSelectedIconIndex === 2) {
      setRing({
        rockStyle: "gradient-border my-5 h-[80px] w-[80px]",
        paperStyle: "gradient-border-on-click my-5 h-[80px] w-[80px]",
        scissorsStyle: "gradient-border my-5 h-[80px] w-[80px]"}); 
    }
  }, [props.compSelectedIconIndex])

  useEffect(() => {
    // if (props.compSelectedIconIndex) {
    //   console.log("props.changeSelectionBorder for comp",props.changeSelectionBorder)
    // }

    // if (props.playerSelectedIcon) {
    //   console.log("props.changeSelectionBorder for player",props.changeSelectionBorder)
    // }
    
    if (props.changeSelectionBorder) {
      setRing({
      rockStyle: "gradient-border my-5 h-[80px] w-[80px]",
      scissorsStyle: "gradient-border my-5 h-[80px] w-[80px]",
      paperStyle: "gradient-border my-5 h-[80px] w-[80px]"
      });
    }
  }, [props.changeSelectionBorder])

  // useEffect(() => {
  //   if (props.startNewSession) {
  //     setDisableButtons(false)
  //   } else {
  //     setDisableButtons(true)
  //   }
  // }, [props.startNewSession])

    return (
      <>
       {props.player === "you" ?
        <div className="flex flex-col">
          <Button isDisabled={disableButtons} className={ring.rockStyle} onClick={() => {props.setPlayerSelectedIcon("rock")}}>
            <Image src={rock} alt="rock-icon" className="m-2"/>
          </Button>
          <Button isDisabled={disableButtons} className={ring.scissorsStyle} onClick={() => {props.setPlayerSelectedIcon("scissors")}}>
            <Image src={scissors} alt="scissors-icon" className="m-2"/>
          </Button>
          <Button isDisabled={disableButtons} className={ring.paperStyle} onClick={() => {props.setPlayerSelectedIcon("paper")}}>
            <Image src={paper} alt="paper-icon" className="m-3"/>
          </Button>

        </div> :
         <div className="flex flex-col">
          <Button className={ring.rockStyle}>
            <Image src={rock} alt="rock-icon" className="m-2"/>
          </Button>
          <Button className={ring.scissorsStyle} >
            <Image src={scissors} alt="scissors-icon" className="m-2"/>
          </Button>
          <Button className={ring.paperStyle}>
            <Image src={paper} alt="paper-icon" className="m-3"/>
          </Button>
        </div>
        }
      </>
    )
}
