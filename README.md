# PAPAMAMACARS FIELDSTYLE 2026 / LP2

完成デザイン画像（幅517px）をそのまま表示し、その上に透明リンクと STAFF の横スライダーを重ねた LP2 単体プロジェクト。

- Next.js 16（App Router）/ TypeScript / CSS Modules（デザインを変える UI ライブラリは不使用。スライダーはヘッドレスの embla-carousel）
- 画像は再圧縮しないよう `next/image` を使わず、`/public/design/` の原本をそのまま配信

## URL

| URL | 内容 |
| --- | --- |
| `/` | LP2 本番（FV1） |
| `/lp2` | `/` と同じページのエイリアス（canonical は `/`） |
| `/?fv=2` | FV 画像のみ `lp2-fv-2.jpg` に差し替え（下層・リンク・スライダーは同一） |
| `/?fv=1`・未知の値 | FV1 |

## 開発

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # 本番ビルド
npx tsc --noEmit  # 型チェック
npm run lint
```

## 構成

| パス | 内容 |
| --- | --- |
| `asset-manifest.json` | 素材台帳（原本の出所・サイズ・用途） |
| `reference/lp2-full.jpg` | 全長の完成デザイン（517×14254。QA 比較用、配信しない） |
| `public/design/` | 配信素材（FV1/FV2・ボディ・スタッフカード・枝の前面レイヤー） |
| `src/lp2/config.ts` | リンク URL・FV 定義・CTA 座標・STAFF 座標（すべてボディ画像の原寸 px） |
| `src/lp2/staff.ts` | 共通スタッフデータ（6名・並び順） |
| `src/lp2/Lp2Page.tsx` | ページ本体（FV + ボディ + 透明リンク） |
| `src/lp2/StaffSlider.tsx` | STAFF スライダー |
| `src/app/page.tsx` / `src/app/lp2/page.tsx` | ルート |

## レイアウト

- 表示幅は `min(画面幅, 517px)`。517px を超える画面は原寸を中央配置（左右は `#000`）。独自の PC 版はなし。
- FV は縦長原画像を全体表示（トリミングなし）。FV とボディは同じ表示幅で縦に連結。
- 座標はボディ画像の原寸 px で管理し、`--u = 表示幅 / 517` を掛けて拡縮（コンテナクエリ単位 `cqw`）。FV の高さが変わってもボディ上の座標はずれない。
- ボディ画像はフッター下の白いキャンバス余白（原本 y=14116 以降）を表示しない（ファイルは無加工、表示領域を高さ 12997px で切っている）。

## CTA（透明リンク）

すべて `<a>`（キーボードフォーカス可・`aria-label` 付き、フォーカス時のみ白枠表示）。GTM 計測用に `data-cta` / `data-cta-position` を付与。

| data-cta-position | 表示文言 | リンク先 |
| --- | --- | --- |
| `hero-consultation` | 相談予約 | CONSULTATION_URL |
| `hero-paint` | 塗装体験予約 | PAINT_URL |
| `middle-explain` | まずは説明を聞く | CONSULTATION_URL |
| `middle-reserve` | 相談予約をする | CONSULTATION_URL |
| `paint-line` | LINEから予約（塗装概要の下） | PAINT_URL |
| `footer-consultation` | 相談予約 | CONSULTATION_URL |
| `footer-paint` | 塗装体験予約 | PAINT_URL |
| `footer-instagram` | Instagram アイコン | INSTAGRAM_URL（https://www.instagram.com/papamamacars/） |
| `footer-facebook` | Facebook アイコン | FACEBOOK_URL（https://www.facebook.com/papamamacars/?locale=ja_JP） |

### 未設定のリンク（遷移先が支給されていないため創作していない）

- フッター Follow Us の **LINE アイコン**（原本 x=328〜404, y=13928〜14004）

遷移先が決まったら `src/lp2/config.ts` の `CTA_AREAS` に追加する。

## STAFF スライダー

- 6名（森行 → 飯沼 → 後藤 → 高木 → 山田 → 松浦）。カードは原本 PNG（586×816）をそのまま縮小表示。
- 原本の静止カードと 5 個のドットの範囲（ボディ y=8075〜8697）だけを原本と同じ `#000` で覆い、その上にスライダーを配置。見出し・枝・葉は原本画素のまま。枝・葉は前面レイヤー（原本画素の切り出し）でカードの上に固定し、ロープが枝の下をくぐる。
- 操作：タッチスワイプ／マウスドラッグ／トラックパッド横スクロール／←→キー（スライダーにフォーカス時）／ドットクリック。ループあり、自動再生なし。
- ARIA：`aria-roledescription="carousel"` / 各スライド `group`、ドットに `aria-current`、切替時に `aria-live` で読み上げ。
- ドットは原本のサイズ・色・上下位置（直径10.4px、#6c6c6c / 選択中 #fff、間隔31.2px）で **6 個**（原本は 5 個）。6 名全員へアクセスできることを優先した変更。

## Vercel 公開手順

1. このリポジトリを GitHub に push する。
2. https://vercel.com/new で「Import Git Repository」→ このリポジトリを選択。
3. Framework Preset は自動で **Next.js**。Build Command `next build`、Output は既定のまま。環境変数は不要。
4. 「Deploy」。完了後、発行された URL で `/`・`/lp2`・`/?fv=2` を確認。
5. 独自ドメインは Project → Settings → Domains で追加。

`/` は `?fv=` を読むためリクエスト時レンダリング（ƒ Dynamic）になる。
