
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { useSpring, animated } from 'react-spring';
import { Icon } from 'antd';
import classnames from 'classnames';

import styles from './index.module.less';
/**
 * @name Fullscreen
 * @description 全屏组件
 */
const Fullscreen = ({ children }) => {
  const boxRef = useRef();
  const [boxRect, setBoxRect] = useState({});
  const [isFull, setIsFull] = useState(false);
  const [running, setRunning] = useState(false);
  // 计算容器尺寸
  const measureDomSize = useCallback(node => {
    const rect = node.getBoundingClientRect();
    setBoxRect({
      left: rect.left,
      top: rect.top,
      right: document.documentElement.clientWidth - rect.right,
      bottom: document.documentElement.clientHeight - rect.bottom,
      width: rect.width,
      height: rect.height,
    });
  }, []);
  const bindBoxRef = useCallback(
    node => {
      if (node) {
        boxRef.current = node;
        measureDomSize(node);
      }
    },
    [measureDomSize]
  );

  const openMax = () => {
    measureDomSize(boxRef.current);
    setRunning(true);
    setIsFull(true);
  };
  const closeMax = () => {
    setRunning(true);
    setIsFull(false);
  };
  // 全屏状态时 overflow hidden
  useEffect(() => {
    document.body.style.overflow = isFull ? 'hidden' : '';
    const candelFull = function(e) {
      if (e.code == 'Escape') {
        closeMax();
      }
    };
    isFull && document.addEventListener('keyup', candelFull);
    return () => {
      document.removeEventListener('keyup', candelFull);
    };
  }, [isFull]);

  const originSize = useMemo(
    () => ({
      left: boxRect.left || 0,
      right: boxRect.right || 0,
      top: boxRect.top || 0,
      bottom: boxRect.bottom || 0,
    }),
    [boxRect]
  );
  const maxSize = useMemo(() => ({ left: 0, top: 0, right: 0, bottom: 0 }), []);
  const animatedFrom = isFull ? originSize : maxSize;
  const animatedTo = isFull ? maxSize : originSize;
  const animatedProps = useSpring({
    from: { ...animatedFrom },
    to: async next => {
      await next({ ...animatedTo, opacity: running ? 0.5 : 1 });
      await new Promise(reslove => setTimeout(reslove, 30));
      setRunning(false);
      await new Promise(reslove => setTimeout(reslove, 100));
      await next({ opacity: 1 });
    },
    onRest: () => {
      setRunning(false);
    },
    config: { duration: 200 },
  });
  const style = {
    ...animatedProps,
    ...(isFull ? { zIndex: 100 } : {}),
    ...(isFull ? { padding: '16px' } : {}),
    position: running || isFull ? 'fixed' : 'static',
    backgroundColor: '#fff',
    height: '100%',
  };
  return (
    <>
      {(running || isFull) && (
        <div style={{ width: boxRect.width, height: boxRect.height }}></div>
      )}
      <animated.div style={style}>
        <div
          ref={bindBoxRef}
          className={classnames(styles.scaleableBox, {
            [styles.isFull]: isFull,
          })}
        >
          {/* {isFull ? (
            <a
              className={styles.optBtn}
              onClick={closeMax}
              title="Exit Fullscreen"
            >
              <Icon type="fullscreen-exit" />
            </a>
          ) : (
            <a
              className={classnames(styles.optBtn)}
              onClick={openMax}
              title="Start Fullscreen"
            >
              <Icon type="fullscreen" />
            </a>
          )} */}
          {children({ isFull, running, openMax, closeMax })}
        </div>
      </animated.div>
    </>
  );
};

export default Fullscreen;
