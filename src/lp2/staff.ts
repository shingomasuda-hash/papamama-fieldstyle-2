/**
 * 共通スタッフデータ（LP1/LP2 共通素材 staff-all.png を 586×816 で分割した原本カード）。
 * 並び順は指定どおり。並べ替え・追加はこの配列を編集するだけでスライドとドットに反映される。
 */
export type StaffMember = { src: string; name: string; kana: string };

export const STAFF_CARD_SIZE = { width: 586, height: 816 } as const;

export const STAFF: StaffMember[] = [
  { src: "/design/staff/staff-01.png", name: "森行 啓太", kana: "モリユキ ケイタ" },
  { src: "/design/staff/staff-02.png", name: "飯沼 蒼太郎", kana: "イイヌマ ソウタロウ" },
  { src: "/design/staff/staff-03.png", name: "後藤 朱里", kana: "ゴトウ アカリ" },
  { src: "/design/staff/staff-04.png", name: "高木 流星", kana: "タカギ リュウセイ" },
  { src: "/design/staff/staff-05.png", name: "山田 零音", kana: "ヤマダ レオト" },
  { src: "/design/staff/staff-06.png", name: "松浦 加奈", kana: "マツウラ カナ" },
];
