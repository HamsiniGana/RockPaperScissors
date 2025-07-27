import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import GradientText from '@/components/gradientText'
import RockScissorsHand from "@/components/rockScissorsHand"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <GradientText className="text-[50px] mb-[60px]">READY SET GO</GradientText>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center px-[150px]">
          <p>Points:</p>
          <GradientText className="text-[35px]">You</GradientText>
          <RockScissorsHand player="you"/>
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
