"use client";

import rock from "../assets/rock.png"
import scissors from "../assets/scissors.png"
import paper from "../assets/paper.png"
import Image from "next/image";
import {Button} from "@heroui/react";

export default function RockScissorsHand () {
    return (
        <div className="flex flex-col">
          <Button className="gradient-border my-5 h-[80px] w-[80px]"><Image src={rock} alt="rock-icon"className="m-2"/></Button>
          <Button className="gradient-border my-5 h-[80px] w-[80px]"><Image src={scissors} alt="scissors-icon" className="m-2"/></Button>
          <Button className="gradient-border my-5 h-[80px] w-[80px]"><Image src={paper} alt="paper-icon" className="m-3"/></Button>
        </div>
    )
}