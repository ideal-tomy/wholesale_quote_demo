export type Camera = readonly [number, number, number];
export type DeviceId = "list" | "desk";

export const scenes: {
  title: string;
  caption: string;
  motion: string;
  duration: number;
  camera: Camera;
  stars: readonly DeviceId[];
}[] = [
  {
    title: "問い合わせを開く",
    caption: "届いた型番の問い合わせが、今日の机に並びます。",
    motion: "問い合わせを開く",
    duration: 5000,
    camera: [158, 176, 1.22],
    stars: ["list"],
  },
  {
    title: "下書きが並ぶ",
    caption: "開くと、確認結果と返信下書きが並びます。",
    motion: "下書きが並ぶ",
    duration: 4500,
    camera: [306, 176, 0.96],
    stars: ["list", "desk"],
  },
  {
    title: "数字を見る",
    caption: "数字は出ています。根拠の表を見てから返します。",
    motion: "数字を見る",
    duration: 5500,
    camera: [454, 176, 1.18],
    stars: ["desk"],
  },
  {
    title: "在庫表を見る",
    caption: "在庫表の該当行と、下書きの数字を突き合わせます。",
    motion: "在庫表を見る",
    duration: 5500,
    camera: [454, 176, 1.2],
    stars: ["desk"],
  },
  {
    title: "人が返す",
    caption: "返す内容は、担当者が決めます。送信はしません。",
    motion: "人が返す",
    duration: 5500,
    camera: [454, 176, 1.15],
    stars: ["desk"],
  },
];

export const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);

export function storyFrame(time: number) {
  let elapsed = ((time % totalDuration) + totalDuration) % totalDuration;
  let index = 0;
  while (index < scenes.length - 1 && elapsed >= scenes[index].duration) {
    elapsed -= scenes[index++].duration;
  }
  const previous = scenes[index === 0 ? 0 : index - 1];
  const next = scenes[index];
  const t = Math.min(1, elapsed / 1200);
  const ease = t * t * (3 - 2 * t);
  const camera = next.camera.map(
    (value, i) => previous.camera[i] + (value - previous.camera[i]) * ease,
  ) as unknown as Camera;
  return { index, elapsed, camera, stars: next.stars, previousStars: previous.stars, ease };
}
