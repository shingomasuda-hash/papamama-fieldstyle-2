"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { STAFF_AREA } from "./config";
import { STAFF, STAFF_CARD_SIZE } from "./staff";
import s from "./StaffSlider.module.css";

const A = STAFF_AREA;
const u = (px: number) => `calc(${px} * var(--u))`;

/** 選択中カードの左端を原本と同じ x=65 に揃える */
const align = (viewSize: number) => (viewSize * A.cardLeft) / A.w;

/**
 * STAFF の横スライド（6名・ループ）。
 * - 描画は原本カード PNG のみ。枝・葉は原本画素の前面レイヤーで固定し、カードだけが動く
 * - タッチスワイプ / マウスドラッグ / トラックパッド横スクロール / ←→キー / ドットで操作
 * - 自動再生なし
 */
export function StaffSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align, duration: 28 });
  const [selected, setSelected] = useState(0);
  const [announce, setAnnounce] = useState("");
  const viewportEl = useRef<HTMLDivElement | null>(null);

  const setViewport = useCallback(
    (el: HTMLDivElement | null) => {
      viewportEl.current = el;
      emblaRef(el);
    },
    [emblaRef],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const i = emblaApi.selectedScrollSnap();
      setSelected(i);
      setAnnounce(`${i + 1}人目 / ${STAFF.length}人：${STAFF[i].name}`);
    };
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // トラックパッドの横スクロール（縦スクロールはページに任せる）
  useEffect(() => {
    const el = viewportEl.current;
    if (!emblaApi || !el) return;
    let acc = 0;
    let lockedUntil = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) return;
      acc += e.deltaX;
      if (Math.abs(acc) > 40) {
        if (acc > 0) emblaApi.scrollNext();
        else emblaApi.scrollPrev();
        acc = 0;
        lockedUntil = now + 450;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [emblaApi]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      emblaApi?.scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  const n = STAFF.length;

  return (
    <section
      className={s.area}
      aria-roledescription="carousel"
      aria-label="スタッフ紹介"
      style={{ left: u(A.x), top: u(A.y), width: u(A.w), height: u(A.h), background: A.background }}
    >
      <div
        ref={setViewport}
        className={s.viewport}
        tabIndex={0}
        aria-label="スタッフ紹介（左右キー・スワイプで切り替え）"
        onKeyDown={onKeyDown}
      >
        <div
          className={s.container}
          // JS 初期化前（SSR）も原本と同じ位置に描画する。初期化後は embla が上書き
          style={{ transform: `translate3d(${(A.cardLeft / A.w) * 100}%, 0, 0)` }}
        >
          {STAFF.map((m, i) => (
            <div
              key={m.src}
              className={s.slide}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${n}：${m.name}`}
              aria-hidden={i !== selected}
              style={{
                flexBasis: `${(A.pitch / A.w) * 100}%`,
                // 末尾カードを先頭の左隣に置き、SSR 時点でも左端のカードを原本どおり覗かせる
                transform: i === n - 1 ? `translate3d(${-n * 100}%, 0, 0)` : undefined,
              }}
            >
              {/* 原本画素を再圧縮せずに表示するため next/image は使わない */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                width={STAFF_CARD_SIZE.width}
                height={STAFF_CARD_SIZE.height}
                alt={`${m.name}（${m.kana}）`}
                className={s.card}
                style={{ width: `${(A.cardWidth / A.pitch) * 100}%` }}
                draggable={false}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 枝・葉（原本画素）。ロープが枝の下をくぐるようカードの前面に固定 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={A.front.src}
        width={A.front.width}
        height={A.front.height}
        alt=""
        aria-hidden="true"
        className={s.front}
        style={{ width: u(A.front.width) }}
      />

      <div className={s.dots}>
        {STAFF.map((m, i) => {
          const cx = A.dots.centerX + (i - (n - 1) / 2) * A.dots.pitch - A.x;
          return (
            <button
              key={m.src}
              type="button"
              className={s.dot}
              aria-label={`${i + 1}人目：${m.name}を表示`}
              aria-current={i === selected ? "true" : undefined}
              onClick={() => emblaApi?.scrollTo(i)}
              style={{
                left: u(cx - A.dots.pitch / 2),
                top: u(A.dots.centerY - A.y - A.dots.pitch / 2),
                width: u(A.dots.pitch),
                height: u(A.dots.pitch),
                ["--dot-size" as string]: u(A.dots.size),
                ["--dot-color" as string]: i === selected ? A.dots.activeColor : A.dots.color,
              }}
            />
          );
        })}
      </div>

      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {announce}
      </p>
    </section>
  );
}
