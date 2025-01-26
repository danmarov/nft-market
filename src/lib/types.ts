export interface GiftItem {
  gift_id: number;
  name: string;
  properties: {
    model: string;
    symbol: string;
    backdrop: string;
  };
  availabilityIssued: number;
  availabilityTotal: number;
  colors: {
    edge: string;
    center: string;
  };
  price: number;
  status: string;
  limited: boolean;
  patternImage: string;
  tgs: string;
  timestamp: string;
  gift_num?: number;
  customEmojiId?: string;
  nftPreviewLink?: string;
}

export type CatalogData = GiftItem[];

export interface TgsPlayerElement extends HTMLElement {
  play: () => void;
  stop: () => void;
  seek: (time: number) => void;
}

export interface SelectedItem {
  value: string;
  label: string;
  tgs?: string;
}

export interface FilterItem {
  value: string;
  label: string;
  tgs?: string;
}
