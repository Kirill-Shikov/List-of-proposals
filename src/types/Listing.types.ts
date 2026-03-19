export interface EtsyMainImage {
  url_570xN: string;
}

export interface EtsyItem {
  listing_id: number;
  url: string;
  MainImage?: EtsyMainImage;
  title: string;
  currency_code: string;
  price: string;
  quantity: number;
}

export interface ListingProps {
  items?: EtsyItem[];
}