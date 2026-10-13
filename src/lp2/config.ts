/**
 * LP2（PAPAMAMACARS FIELDSTYLE 2026）の素材・座標・リンク先の台帳。
 *
 * 座標はすべて「ボディ画像 lp2-body.png（原本 reference/lp2-full.jpg の y=1118 以降）」の
 * 原寸ピクセル（幅517px）。表示時は `--u`（= 表示幅 / 517）を掛けて比例拡縮するため、
 * FV を差し替えてもボディ上のリンク・スライダー位置はずれない。
 */

/* ---------- リンク先（一字一句変更しないこと） ---------- */
export const CONSULTATION_URL = "https://s.lmes.jp/landing-qr/2007227107-GgA3P6zw?uLand=hxg1Jo";
export const PAINT_URL = "https://s.lmes.jp/landing-qr/2007227107-GgA3P6zw?uLand=WvWa0c";
export const INSTAGRAM_URL = "https://s.lmes.jp/landing-qr/2007227107-GgA3P6zw?uLand=pxS26L";

/* ---------- デザイン原寸 ---------- */
export const DESIGN_WIDTH = 517;

export type FvKey = "1" | "2";

/** FV 画像（原本ファイルをそのまま配信。幅517px表示に縮小、縦横比は維持） */
export const FV_IMAGES: Record<FvKey, { src: string; width: number; height: number }> = {
  "1": { src: "/design/lp2-fv-1.jpg", width: 594, height: 1544 },
  "2": { src: "/design/lp2-fv-2.jpg", width: 596, height: 1554 },
};

/** `?fv=` の値から FV を決定。クエリなし・未知の値は FV1 */
export function resolveFv(value: string | string[] | undefined): FvKey {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "2" ? "2" : "1";
}

export const BODY_IMAGE = {
  png: "/design/lp2-body.png",
  /** PNG と画素完全一致の WebP（ロスレス）。対応ブラウザではこちらを使用し転送量を削減 */
  webp: "/design/lp2-body.webp",
  width: 517,
  height: 13136,
  /**
   * 表示する高さ。原本 y=14116 以降（ボディ y=12998 以降）はフッター下の白いキャンバス余白
   * （#FFFFFF 単色 138px + 境界 1px）のため表示しない。画像ファイル自体は無加工。
   */
  visibleHeight: 12997,
} as const;

/* ---------- 透明リンク（ボディ画像座標） ---------- */
export type CtaKind = "consultation" | "paint" | "instagram";

export const CTA_HREF: Record<CtaKind, string> = {
  consultation: CONSULTATION_URL,
  paint: PAINT_URL,
  instagram: INSTAGRAM_URL,
};

export type CtaArea = {
  id: string;
  kind: CtaKind;
  label: string;
  /** ボディ画像上の x, y, w, h（ボタン本体＋ドロップシャドウ） */
  x: number;
  y: number;
  w: number;
  h: number;
};

export const CTA_AREAS: CtaArea[] = [
  { id: "hero-consultation", kind: "consultation", label: "相談予約", x: 44, y: 100, w: 203, h: 56 },
  { id: "hero-paint", kind: "paint", label: "塗装体験予約", x: 274, y: 100, w: 203, h: 56 },
  { id: "middle-explain", kind: "consultation", label: "まずは説明を聞く（相談予約）", x: 44, y: 1284, w: 433, h: 56 },
  { id: "middle-reserve", kind: "consultation", label: "相談予約をする", x: 44, y: 1367, w: 433, h: 56 },
  { id: "paint-line", kind: "paint", label: "LINEから予約（塗装体験予約）", x: 41, y: 5307, w: 435, h: 58 },
  { id: "footer-consultation", kind: "consultation", label: "相談予約", x: 41, y: 12038, w: 203, h: 56 },
  { id: "footer-paint", kind: "paint", label: "塗装体験予約", x: 271, y: 12038, w: 203, h: 56 },
  { id: "footer-instagram", kind: "instagram", label: "Instagram", x: 109, y: 12812, w: 76, h: 75 },
];

/* ---------- STAFF スライダー（ボディ画像座標） ---------- */
export const STAFF_AREA = {
  /** 静止カードと既存ドットを覆う黒地の範囲。x=516 の1px縁線（原本）は覆わない */
  x: 0,
  y: 8075,
  w: 516,
  h: 622,
  /** 背景色（原本の STAFF 背景は #000000） */
  background: "#000",
  /** カード（586×816 の原本 PNG）表示幅・中央カード左端・カード間ピッチ */
  cardWidth: 380.5,
  cardLeft: 65,
  pitch: 420.5,
  /** 枝・葉の前面レイヤー（原本画素の切り出し）。ロープが枝の下をくぐるように重ねる */
  front: { src: "/design/staff/staff-branch-front.png", width: 516, height: 32 },
  /** ドット（原本: 直径約10.4px / 間隔31.2px / 中心 y=8669.2 / 群の中心 x=254.3） */
  dots: {
    centerX: 254.3,
    centerY: 8669.2,
    pitch: 31.2,
    size: 10.4,
    color: "#6c6c6c",
    activeColor: "#fff",
  },
} as const;
