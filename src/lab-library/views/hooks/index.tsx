import React, { useState, useEffect } from 'react'
import Loading from '@/common/components/fallbacks/Loading'
import { Replayable } from './ReplayableContainer';
import { useLazyLoading } from '@/common/hooks/useLazyLoading'
import { useSimpleGameController } from '@/common/hooks/useSimpleGameController';
import { useHashRouter } from '@/common/hooks/useRouter';

const LazyLoadingSample = ({ hook }: { hook?: Function } = { hook: useLazyLoading }) => {
  const fakeImport = new Promise((resolve, reject) => {
    const component = () => <>Fake Component</>
    setTimeout(() => {
      resolve(component)
    }, 3000)
  });
  const P = useLazyLoading(fakeImport, <Loading />)
  return <>
    {P}
  </>;
}

const SimpleGameControllerSample = ({ hook }) => {
  const [input, addInput] = useState<string[]>([]);
  let [setLeft, setRight, setUp, setDown] = useSimpleGameController()
  useEffect(() => {
    setLeft  (() => addInput(v => v.concat('👈')))
    setRight (() => addInput(v => v.concat('👉')))
    setUp    (() => addInput(v => v.concat('👆')))
    setDown  (() => addInput(v => v.concat('👇')))
  }, [])

  return <>
    <div>Press <kbd>w</kbd><kbd>s</kbd><kbd>a</kbd><kbd>d</kbd> or <kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd> to test! ❤</div>
    <span>{input.map((each, i, arr) => i !== arr.length - 1 ? `${each}, ` : each)}</span>
  </>
}

const HashRouterSample = ({ hook }) => {
  const [router] = useHashRouter();
  const SwitchButton = () => <button onClick={() => location.hash = ''}>Change Hash</button>
  return <>
    <div>Hash Path:<code>{location.hash}</code></div>
    <SwitchButton />
  </>
}

const Index = () => {
  return (
    <Replayable>
      <LazyLoadingSample hook={useLazyLoading} />
      <SimpleGameControllerSample hook={useSimpleGameController} />
      <HashRouterSample hook={useHashRouter} />
    </Replayable>
  )
}

export default Index;