/* eslint-disable */

// export interface ProductProps {
//     id: number;
//     productName: string;
//     price: number;
//     warranty: number;
//     quantity: number;
//     category: string;
//     manufacturer: string;
//     countryOfManufacture: string;
//     totalSale: number;
//     image: string;
//     created_at: string;
//     updated_at: string;
//     detail: string;
//     discount: number | undefined | null;
//     active:number;
// }[]

export interface Product {
  sortQty(arg0: string, sortQty: any): unknown
  id: number
  productName: string
  price: number
  warranty: number
  quantity: number
  category: string
  manufacturer: string
  countryOfManufacture: string
  totalSale: number
  image: string
  created_at: string
  updated_at: string
  detail: string
  discount: number
  cost: number
  active: number
}

export type ProductList = Product[];

export interface Root {
    current_page: number
    data: Daum[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }
  
  export interface Daum {
    id: number
    productName: string
    price: string
    warranty: number
    quantity: number
    category: string
    manufacturer: string
    countryOfManufacture: string
    totalSale: number
    image: string
    created_at: string
    updated_at: string
    detail: string
    discount: number
    cost: string
    active: number
  }
  
  export interface Link {
    url?: string
    label: string
    active: boolean
  }
  