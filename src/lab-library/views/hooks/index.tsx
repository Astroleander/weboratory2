import React, { useState, useEffect } from 'react'
import Alert from '@/common/components/fallbacks/Alert';
import Loading from '@/common/components/fallbacks/Loading'
import { Replayable } from './ReplayableContainer';
import { useLazyLoading } from '@/common/hooks/useLazyLoading'
import { useSimpleGameController } from '@/common/hooks/useSimpleGameController';
import { useHashRouter } from '@/common/hooks/useRouter';
import { useErrorBoundary } from '@/common/hooks/useCrudeErrorBoundary';
import { Block } from '@/common/components/skeleton/Block';
import { Container as BlockContainer } from '@/common/components/skeleton/Container';

type HookSample = ({ hook }: { hook?: Function }) => React.ReactElement

const ErrorBoundarySample: HookSample = () => {
  const ErrorBoundary = useErrorBoundary();
  const [isThrow, setIsThrow] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  let SubComponent = ({ isThrow }) => {
    if (isThrow) { throw new SyntaxError('[boundary] This Component Throw a SyntaxError'); }
    return <Block>Normal Component in ErrorBoundary</Block>
  };

  return <>
    <div>
      <input type="checkbox" defaultChecked={isThrow} onClick={(e) => { e.stopPropagation(); }} onChange={() => setIsThrow(v => !v)} />
      <label>has error</label>
      <input type="checkbox" defaultChecked={isFallback} onClick={(e) => { e.stopPropagation(); }} onChange={() => setIsFallback(v => !v)}/>
      <label>has fallback</label>
    </div>
    <BlockContainer>
      <ErrorBoundary
        onDidCatch={() => { console.log('[error]') }}
        fallback={isFallback ? e => <Alert type="error">This is custom boundary</Alert> : undefined}
      >
        <SubComponent isThrow={isThrow}></SubComponent>
      </ErrorBoundary>
    </BlockContainer>
  </>
}

const LazyLoadingSample: HookSample = ({ hook }) => {
  const fakeImport = new Promise((resolve, reject) => {
    const component = () => <Block><Block /></Block>
    setTimeout(() => {
      resolve(component)
    }, 5000)
  });
  const P = useLazyLoading(fakeImport, <Loading />)
  return <BlockContainer>
    {P}
  </BlockContainer>;
}

const SimpleGameControllerSample: HookSample = ({ hook }) => {
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

const HashRouterSample: HookSample = ({ hook }) => {
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
      <ErrorBoundarySample hook={useErrorBoundary} />
    </Replayable>
  )
}

export default Index;