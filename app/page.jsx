"use client";

import SplitText from './components/splitText'
import FadeContent from './components/fade'
import AnimatedContent from './components/animatedText'
import { Button } from '@heroui/button';
import { Link } from "@heroui/link";

export default function Home() {

  return (
    <div className='flex flex-col items-center justify-center min-h-full min-w-full'>
      <SplitText text="Ready to play?" className='text-orange-400 text-[80px] font-semibold'/>
      <Link href='/gamePage'>
        <AnimatedContent>
          <Button
          onClick={() => {}}
          className='bg-black m-3 p-5 text-[28px] h-[70px] text-orange-400 border-solid rounded-xl border-orange-400 border-2'>Click here!
          </Button>
          </AnimatedContent>
      </Link>
    </div>
  );
}
