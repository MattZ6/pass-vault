import { useCallback, useEffectEvent, useRef, useState } from "react";

import { useCountdownController } from "@/hooks/interactions/use-countdown-controller";

async function fakeBiometric() {
  await new Promise((r) => setTimeout(r, 2000));
  return true;
}

type Input = {
  duration: number;
};

export function useRevealPassword({ duration }: Input) {
  const isTriggeredRef = useRef(false);
  const [visible, setVisible] = useState(false);

  const onStart = useEffectEvent(() => {
    setVisible(true);
  });

  const onFinish = useEffectEvent(() => {
    isTriggeredRef.current = false;
    setVisible(false);
  });

  const countdown = useCountdownController({
    duration,
    onStart,
    onFinish,
  });

  const reveal = useCallback(async () => {
    if (isTriggeredRef.current) {
      return;
    }

    isTriggeredRef.current = true;

    const ok = await fakeBiometric();

    if (!ok) {
      return;
    }

    countdown.start();
  }, [countdown.start]);

  return {
    visible,
    reveal,
    progress: countdown.progress,
    pause: countdown.pause,
    resume: countdown.resume,
    reset: countdown.reset,
  };
}
