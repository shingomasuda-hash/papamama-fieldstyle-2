import { resolveFv } from "@/lp2/config";
import { Lp2Page } from "@/lp2/Lp2Page";

/**
 * LP2 本番ページ。`?fv=2` で FV 画像のみ差し替え（未指定・未知の値は FV1）。
 * 環境変数 `LP2_FV` で `?fv=` 未指定時の FV を指定できる（LP2-2 の Vercel プロジェクトは `LP2_FV=2`）。
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { fv } = await searchParams;
  return <Lp2Page fv={resolveFv(fv ?? process.env.LP2_FV)} />;
}
