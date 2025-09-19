"use client";

import SplitText from './components/splitText'
import FadeContent from './components/fade'
import { Button } from '@heroui/button';
import { Link } from "@heroui/link";

export default function Home() {

  return (
    <div className='flex flex-col items-center justify-center min-h-full min-w-full'>
      <SplitText text="Ready to play?" className='text-orange-300 text-[80px] font-semibold'/>
      <Link href='/gamePage'>
        <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
          <Button
          onClick={() => {}}
          className='bg-black m-3 p-5 text-[28px] h-[70px] text-orange-300 border-solid rounded-xl border-orange-300 border-2'>Click here!
          </Button>
          </FadeContent>
      </Link>
    </div>
  );
}
