export type SourceId = "inventory" | "catalog" | "rate";
export type PageId = "inbox" | "stock" | "customers" | "quotes" | "settings";
export type InquiryStatus = "open" | "replied";

export type SourceLink = {
  id: SourceId;
  label: string;
};

export type Chip = {
  id: string;
  label: string;
  answer: string;
  sourceId?: SourceId;
};

export type Inquiry = {
  id: string;
  customer: string;
  contact: string;
  subject: string;
  time: string;
  type: string;
  needsCheck: boolean;
  mail: string;
  resultItems: { label: string; value: string; warn?: boolean }[];
  resultNote: string;
  draft: string;
  sources: SourceLink[];
  chips: Chip[];
};

export const COMPANY = "青葉電材";
export const STAFF = "佐藤 健";
export const STAFF_ROLE = "営業";
export const TODAY = "2026年9月22日（火）";

export const INQUIRIES: Inquiry[] = [
  {
    id: "q1",
    customer: "北関東電設",
    contact: "田村様",
    subject: "AB-1200 の在庫と今週の出荷",
    time: "8:14",
    type: "在庫確認",
    needsCheck: true,
    mail: `佐藤様

いつもお世話になっております。北関東電設の田村です。

電磁接触器 AB-1200 は、今週10個ありますでしょうか。
現場の入れ替えが前倒しになったため、在庫と出荷の可否だけ先に教えてください。

よろしくお願いいたします。`,
    resultItems: [
      { label: "型番", value: "AB-1200（電磁接触器 200V）" },
      { label: "在庫", value: "本社倉庫 12個" },
      { label: "依頼数量", value: "10個" },
      { label: "引当", value: "なし" },
      { label: "出荷", value: "今週出荷可" },
    ],
    resultNote: "数量と倉庫は、在庫表の該当行と突き合わせてから返してください。",
    draft: `田村様

お問い合わせありがとうございます。青葉電材 佐藤です。

AB-1200 は本社倉庫に12個ございます。今週10個の出荷は可能です。
納品希望日が決まりましたら、ご連絡ください。

青葉電材株式会社
営業 佐藤`,
    sources: [
      { id: "inventory", label: "在庫表を開く" },
      { id: "catalog", label: "型番マスタを開く" },
    ],
    chips: [
      {
        id: "enough",
        label: "この数量で足りるか",
        answer:
          "本社倉庫の在庫は12個です。依頼の10個は足りています。引当は入っていない、という整理です。返す前に在庫表の該当行を確認してください。",
        sourceId: "inventory",
      },
      {
        id: "alt",
        label: "後継品はあるか",
        answer:
          "AB-1200 は現行品です。この問い合わせでは代替は不要です。廃番の確認が必要な場合は、型番マスタを開いてください。",
        sourceId: "catalog",
      },
      {
        id: "rate",
        label: "この得意先の掛け率は",
        answer:
          "北関東電設の掛け率は掛率表にあります。今回は在庫の有無を先に返す内容です。単価の確定はこのデモでは行いません。",
        sourceId: "rate",
      },
    ],
  },
  {
    id: "q2",
    customer: "城東工業",
    contact: "山本様",
    subject: "AB-980 は廃番ですか",
    time: "8:41",
    type: "型番問い合わせ",
    needsCheck: true,
    mail: `佐藤様

城東工業 山本です。

AB-980 を補充したいのですが、廃番と聞きました。
後継があれば型番を教えてください。数量は5個の予定です。`,
    resultItems: [
      { label: "問い合わせ", value: "AB-980" },
      { label: "状態", value: "廃番（2025年12月）", warn: true },
      { label: "後継", value: "AB-982" },
      { label: "AB-982 在庫", value: "本社倉庫 8個" },
    ],
    resultNote: "廃番と後継は、型番マスタと在庫表の両方を確認してから返してください。",
    draft: `山本様

お問い合わせありがとうございます。青葉電材 佐藤です。

AB-980 は廃番です。後継は AB-982 です。本社倉庫に8個ございます。
5個でしたら出荷は可能です。寸法の違いがあるため、図面が必要でしたらお送りします。

青葉電材株式会社
営業 佐藤`,
    sources: [
      { id: "catalog", label: "型番マスタを開く" },
      { id: "inventory", label: "在庫表を開く" },
    ],
    chips: [
      {
        id: "successor",
        label: "後継はどれか",
        answer: "AB-980 の後継は AB-982 です。型番マスタの廃番欄に記載があります。",
        sourceId: "catalog",
      },
      {
        id: "stock982",
        label: "後継の在庫は",
        answer: "AB-982 は本社倉庫に8個あります。5個の依頼には足りています。",
        sourceId: "inventory",
      },
    ],
  },
  {
    id: "q3",
    customer: "信越機工",
    contact: "高橋様",
    subject: "ABC-1200 の見積",
    time: "9:05",
    type: "見積依頼",
    needsCheck: true,
    mail: `佐藤様

信越機工 高橋です。

ABC-1200 を20個で見積をお願いします。
型番の表記が社内資料と違うかもしれません。`,
    resultItems: [
      { label: "問い合わせ", value: "ABC-1200" },
      { label: "該当", value: "AB-1200 の可能性が高い" },
      { label: "確認", value: "型番の表記ゆれ", warn: true },
      { label: "単価", value: "担当者が確認（このデモでは確定しない）" },
    ],
    resultNote: "型番が一致するか、マスタを見てから下書きを直してください。単価は人が決めます。",
    draft: `高橋様

お問い合わせありがとうございます。青葉電材 佐藤です。

ご指定の ABC-1200 は、当社では AB-1200（電磁接触器 200V）に該当すると見ております。
20個の見積は、型番の確認が取れ次第お送りします。相違があればご指摘ください。

青葉電材株式会社
営業 佐藤`,
    sources: [
      { id: "catalog", label: "型番マスタを開く" },
      { id: "rate", label: "掛率表を開く" },
    ],
    chips: [
      {
        id: "typo",
        label: "型番はどれか",
        answer:
          "ABC-1200 はマスタにありません。AB-1200 が最も近い現行品です。返す前に型番マスタを確認してください。",
        sourceId: "catalog",
      },
      {
        id: "price",
        label: "単価はどうするか",
        answer:
          "単価はこのデモでは自動で確定しません。掛率表を開いて、担当者が確認する項目として残します。",
        sourceId: "rate",
      },
    ],
  },
  {
    id: "q4",
    customer: "南関東電設",
    contact: "鈴木様",
    subject: "AB-210 の納期",
    time: "昨日 17:22",
    type: "納期確認",
    needsCheck: false,
    mail: `佐藤様

南関東電設 鈴木です。AB-210 の納期だけ教えてください。`,
    resultItems: [
      { label: "型番", value: "AB-210" },
      { label: "在庫", value: "本社倉庫 4個" },
      { label: "納期", value: "在庫品のため翌営業日" },
    ],
    resultNote: "この件は返信済みです。",
    draft: `鈴木様

AB-210 は在庫品です。翌営業日の出荷が可能です。

青葉電材株式会社
営業 佐藤`,
    sources: [{ id: "inventory", label: "在庫表を開く" }],
    chips: [],
  },
];

export const INVENTORY_ROWS = [
  { sku: "AB-120", name: "電磁接触器 100V", warehouse: "本社倉庫", qty: 3, status: "現行" },
  { sku: "AB-210", name: "電磁接触器 100V 大容量", warehouse: "本社倉庫", qty: 4, status: "現行" },
  { sku: "AB-980", name: "電磁接触器 旧型", warehouse: "本社倉庫", qty: 0, status: "廃番" },
  { sku: "AB-982", name: "電磁接触器 後継", warehouse: "本社倉庫", qty: 8, status: "現行" },
  { sku: "AB-1200", name: "電磁接触器 200V", warehouse: "本社倉庫", qty: 12, status: "現行" },
  { sku: "TB-40", name: "端子台 40A", warehouse: "北関東倉庫", qty: 40, status: "現行" },
];

export const CATALOG_ROWS = [
  { sku: "AB-980", name: "電磁接触器 旧型", note: "2025年12月廃番。後継は AB-982" },
  { sku: "AB-982", name: "電磁接触器 後継", note: "AB-980 の後継。取付寸法が一部異なる" },
  { sku: "AB-1200", name: "電磁接触器 200V", note: "現行。別名表記 ABC-1200 の問い合わせあり" },
  { sku: "AB-210", name: "電磁接触器 100V 大容量", note: "現行" },
];

export const RATE_ROWS = [
  { customer: "北関東電設", rate: "85%", note: "標準。特価は都度確認" },
  { customer: "城東工業", rate: "88%", note: "年間契約" },
  { customer: "信越機工", rate: "82%", note: "担当確認。このデモでは単価を確定しない" },
  { customer: "南関東電設", rate: "85%", note: "標準" },
];

export const CUSTOMERS = [
  { name: "北関東電設", area: "北関東", owner: "佐藤", last: "本日 8:14" },
  { name: "城東工業", area: "南関東", owner: "佐藤", last: "本日 8:41" },
  { name: "信越機工", area: "信越", owner: "佐藤", last: "本日 9:05" },
  { name: "南関東電設", area: "南関東", owner: "高橋", last: "昨日 17:22" },
];

export const QUOTE_ROWS = [
  { no: "Q-2411", customer: "城東工業", sku: "TB-40", qty: 20, state: "下書き" },
  { no: "Q-2410", customer: "南関東電設", sku: "AB-210", qty: 4, state: "確認待ち" },
  { no: "Q-2408", customer: "北関東電設", sku: "AB-1200", qty: 6, state: "送付済み" },
];
