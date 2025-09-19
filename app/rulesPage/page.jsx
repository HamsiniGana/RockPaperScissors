"use client";
import FadeContent from '../components/fade';

export default function Home() {
    const rules = ["The game is played as a best of 3 rounds",
                    "If the score is tied after 3 rounds, extra rounds will be played automatically until one player takes the lead",
                    "The choices are:\n\t\t- Rock beats Scissors (Rock crushes Scissors)\n\t\t- Scissors beat Paper (Scissors cut Paper)\n\t\t- Paper beats Rock (Paper covers Rock)",
                    "If both players choose the same option, the round is a draw and no points are awarded",
                    "The first player to win more rounds than the other is declared the winner"]
    return (
        <div className="flex flex-col items-center min-h-full min-w-full">
        <FadeContent className='text-purple-600 text-[50px] mt-[50px] mb-[30px]'>Rules</FadeContent>
        <ul>
            {rules.map(rule => {
                return <FadeContent>
                            <li className='text-[20px] m-5 text-orange-400 whitespace-pre'>{"-> "+rule}</li>
                        </FadeContent>
            })}
        </ul>
        </div>
    )
}
