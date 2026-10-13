import type { Metadata } from "next";

/** `/lp2` は `/` と同じ LP2 ページのエイリアス */
export { default } from "../page";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
