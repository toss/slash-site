import { useState, useRef, useEffect, useCallback } from "react";

type TypingEffectOptions = {
  /** 글자 지우는 속도 (ms per char) */
  eraseSpeed?: number;
  /** 글자 타이핑 속도 (ms per char) */
  typeSpeed?: number;
  /** 지운 후 다시 타이핑 시작 전 대기 시간 (ms) */
  pauseBetween?: number;
};

/**
 * 텍스트에 타이핑 애니메이션을 적용하는 훅.
 *
 * @example
 * ```tsx
 * const { displayText, isAnimating, trigger } = useTypingEffect("es toolkit");
 *
 * <h3 onMouseEnter={trigger}>{displayText}</h3>
 * ```
 *
 * @example 시퀀스 모드 — 여러 텍스트를 순서대로 타이핑
 * ```tsx
 * const { displayText, isAnimating, trigger } = useTypingEffect([
 *   "es toolkit",
 *   "fast & modern",
 * ]);
 * ```
 */
export function useTypingEffect(
  text: string | string[],
  options: TypingEffectOptions = {},
) {
  const { eraseSpeed = 30, typeSpeed = 60, pauseBetween = 100 } = options;

  const sequence = Array.isArray(text) ? text : [text];
  const initialText = sequence[0];

  const [displayText, setDisplayText] = useState(initialText);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const cleanup = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timeoutsRef.current.push(t);
    return t;
  }, []);

  const trigger = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    cleanup();

    let offset = 0;

    sequence.forEach((target, seqIndex) => {
      const current = seqIndex === 0 ? initialText : sequence[seqIndex - 1];
      const eraseChars = current.split("");
      const typeChars = target.split("");

      const shouldErase = sequence.length === 1 || seqIndex > 0;

      if (shouldErase) {
        eraseChars.forEach((_, i) => {
          schedule(
            () => {
              setDisplayText(current.slice(0, eraseChars.length - 1 - i));
            },
            offset + eraseSpeed * (i + 1),
          );
        });
        offset += eraseSpeed * eraseChars.length + pauseBetween;
      }

      typeChars.forEach((_, i) => {
        schedule(
          () => {
            setDisplayText(target.slice(0, i + 1));
          },
          offset + typeSpeed * (i + 1),
        );
      });
      offset += typeSpeed * typeChars.length + pauseBetween;
    });

    schedule(() => setIsAnimating(false), offset);
  }, [
    isAnimating,
    sequence,
    initialText,
    eraseSpeed,
    typeSpeed,
    pauseBetween,
    cleanup,
    schedule,
  ]);

  useEffect(() => cleanup, [cleanup]);

  return { displayText, isAnimating, trigger };
}
