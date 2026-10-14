/* 原本画素を再圧縮せずにそのまま表示するため、本ページでは next/image を使わない */
/* eslint-disable @next/next/no-img-element */
import { BODY_IMAGE, CTA_AREAS, CTA_HREF, DESIGN_WIDTH, FV_IMAGES, type FvKey } from "./config";
import { StaffSlider } from "./StaffSlider";
import s from "./Lp2Page.module.css";

const u = (px: number) => `calc(${px} * var(--u))`;

/**
 * LP2 本体。上から FV 画像 + ボディ画像を継ぎ目なく連結し、
 * ボディ上に透明リンクと STAFF スライダーを重ねる。FV の差し替えはボディに影響しない。
 */
export function Lp2Page({ fv }: { fv: FvKey }) {
  const fvImage = FV_IMAGES[fv];

  return (
    <main className={s.page} style={{ ["--design-width" as string]: `${DESIGN_WIDTH}px` }}>
      <div className={s.inner}>
        <h1 className="visually-hidden">
          PAPAMAMA CAR&apos;S FIELDSTYLE 2026 出店決定！ 2026年11月14日(土)〜15日(日) 愛知国際展示場
        </h1>

        <img
          className={s.fv}
          src={fvImage.src}
          width={fvImage.width}
          height={fvImage.height}
          alt={fvImage.alt}
          fetchPriority="high"
          decoding="async"
          data-fv={fv}
        />

        <div className={s.body} style={{ aspectRatio: `${BODY_IMAGE.width} / ${BODY_IMAGE.visibleHeight}` }}>
          <picture>
            <source srcSet={BODY_IMAGE.webp} type="image/webp" />
            <img
              className={s.bodyImage}
              src={BODY_IMAGE.png}
              width={BODY_IMAGE.width}
              height={BODY_IMAGE.height}
              alt=""
              decoding="async"
            />
          </picture>

          {CTA_AREAS.map((a) => (
            <a
              key={a.id}
              className={s.hotspot}
              href={CTA_HREF[a.kind]}
              aria-label={a.label}
              data-cta={a.kind}
              data-cta-position={a.id}
              style={{ left: u(a.x), top: u(a.y), width: u(a.w), height: u(a.h) }}
            />
          ))}

          <StaffSlider />
        </div>

        {/* 画像内テキストの要約（スクリーンリーダー・検索エンジン向け。画面には表示しない） */}
        <div className="visually-hidden">
          <h2>何を相談できるの？（WHAT WE CAN）</h2>
          <p>購入・乗り換え・カスタム・家族利用・支払い</p>
          <h2>会場相談のメリット（MERIT）</h2>
          <p>その場で質問 / 実車でわかる / その場で比べられる / 同伴相談 / 現地で下取り査定</p>
          <h2>実際に塗装体験！イベント開催中</h2>
          <p>安心安全なインク。実際の車に。親子の思い出作りにも最適。相談予約には塗装体験が含まれており、塗装体験のみの予約も承っております。</p>
          <h2>イベント概要（ABOUT）</h2>
          <p>
            開催日：2026年11月14日(土)〜15日(日) 09:00〜17:00(ブースOPEN)。会場：AICHI SKY EXPO 愛知国際展示場
            〒479-0881 愛知県常滑市セントレア5丁目。
          </p>
          <h2>スタッフ紹介（STAFF）</h2>
          <h2>予約から来場までの流れ（Flow）</h2>
          <p>01 日時送信 / 02 LINE追加 / 03 当日案内</p>
          <h2>よくある質問（FAQ）</h2>
          <p>Q1.話だけでも可能か A1.もちろん可能です。Q2.同伴可能か A2.可能です。中学生以下は無料です。</p>
          <p>Q3.特典受け取り方法 A3.LINE追加後、相談予約まで完了いただけましたら当日入口にて担当者からチケットをお渡しします。</p>
          <h2>店舗</h2>
          <p>ららぽーと堺店：大阪府堺市美原区黒山 22-1 営業時間 10:00〜21:00</p>
          <p>ららぽーと湘南平塚店：神奈川県平塚市天沼 10-1-15130 営業時間 10:00〜21:00</p>
        </div>
      </div>
    </main>
  );
}
