
import React from 'react';
import type { Product, ProductPlan, BannerContent } from './types';
import * as icons from './components/icons';

// Hardcoded API URL as per instruction.
const STRAPI_API_URL = "https://api.guritap.work";

/**
 * Custom error class to include HTTP status codes for better error handling.
 */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}


// --- New Type definitions for the FLAT Strapi API response ---

interface StrapiCategoryData {
  id: number;
  name: string;
  order: number;
}

interface StrapiProductData {
  id: number;
  name: string;
  iconIdentifier: string;
  features: string; // Comes as a single string with newlines
  plans: ProductPlan[];
  category: StrapiCategoryData | null;
  createdAt: string;
}

interface StrapiBannerData {
    id: number;
    title: string;
    description: string;
    subtitle?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface StrapiProductsResponse {
  data: StrapiProductData[];
}

interface StrapiCategoriesResponse {
  data: StrapiCategoryData[];
}

interface StrapiBannerResponse {
    data: StrapiBannerData;
}


// --- Icon Mapping ---
const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    NetflixIcon: icons.NetflixIcon,
    SpotifyIcon: icons.SpotifyIcon,
    YoutubeIcon: icons.YoutubeIcon,
    CanvaIcon: icons.CanvaIcon,
    CapcutIcon: icons.CapcutIcon,
    VidioIcon: icons.VidioIcon,
    BstationIcon: icons.BstationIcon,
    CrunchyrollIcon: icons.CrunchyrollIcon,
    DisneyIcon: icons.DisneyIcon,
    DrakorIdIcon: icons.DrakorIdIcon,
    DramaboxIcon: icons.DramaboxIcon,
    HboMaxIcon: icons.HboMaxIcon,
    IqiyiIcon: icons.IqiyiIcon,
    LoklokIcon: icons.LoklokIcon,
    PrimeVideoIcon: icons.PrimeVideoIcon,
    RctiPlusIcon: icons.RctiPlusIcon,
    ShortmaxIcon: icons.ShortmaxIcon,
    VisionPlusIcon: icons.VisionPlusIcon,
    ViuIcon: icons.ViuIcon,
    WetvIcon: icons.WetvIcon,
    WibukuIcon: icons.WibukuIcon,
    AlightMotionIcon: icons.AlightMotionIcon,
    IbisPaintIcon: icons.IbisPaintIcon,
    LightroomIcon: icons.LightroomIcon,
    MeituIcon: icons.MeituIcon,
    PicsartIcon: icons.PicsartIcon,
    ReminiIcon: icons.ReminiIcon,
    VscoIcon: icons.VscoIcon,
    WinkProIcon: icons.WinkProIcon,
    ChatGptIcon: icons.ChatGptIcon,
    GeminiAiIcon: icons.GeminiAiIcon,
    PerplexityAiIcon: icons.PerplexityAiIcon,
    AppleMusicIcon: icons.AppleMusicIcon,
    CamscannerIcon: icons.CamscannerIcon,
    DuolingoIcon: icons.DuolingoIcon,
    GrammarlyIcon: icons.GrammarlyIcon,
    Microsoft365Icon: icons.Microsoft365Icon,
    WpsOfficeIcon: icons.WpsOfficeIcon,
    ZoomIcon: icons.ZoomIcon,
    FizzoIcon: icons.FizzoIcon,
    ScribdIcon: icons.ScribdIcon,
    ExpressVpnIcon: icons.ExpressVpnIcon,
    HmaVpnIcon: icons.HmaVpnIcon,
    NordVpnIcon: icons.NordVpnIcon,
    GetcontactIcon: icons.GetcontactIcon,
    LinktreeIcon: icons.LinktreeIcon,
};

const DefaultIcon = icons.OctopusIcon;


// --- Data Transformation ---
const mapStrapiToProduct = (item: StrapiProductData): Product => {
  let safeFeatures: string[] = [];
  // Handle features string and split it into an array
  if (typeof item.features === 'string' && item.features.length > 0) {
    safeFeatures = item.features.split(/[\n,]/).map(f => f.trim()).filter(Boolean);
  }

  return {
    id: item.id,
    name: item.name,
    icon: iconMap[item.iconIdentifier] || DefaultIcon,
    features: safeFeatures,
    // Ensure plans is always an array
    plans: Array.isArray(item.plans) ? item.plans : [],
    // Safely access category name, default if null
    category: item.category?.name || 'Uncategorized',
  };
};


// --- API Fetch Functions ---
export const fetchProducts = async (): Promise<Product[]> => {
    const url = `${STRAPI_API_URL}/api/products?populate=*`;
    console.log('Attempting to fetch products from (flat structure):', url);

    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.error?.message || response.statusText;
        throw new ApiError(`API Error: ${message}`, response.status);
    }
    
    const json: StrapiProductsResponse = await response.json();
    console.log('Raw data received from Strapi (Products):', json);

    if (!json.data) {
        console.warn("Strapi response is missing 'data' array.", json);
        return [];
    }

    // Map directly on the flat data, no .attributes needed
    return json.data
        .filter(product => product) // Simple filter to ensure product object exists
        .map(mapStrapiToProduct);
};

export const fetchCategories = async (): Promise<string[]> => {
    const url = `${STRAPI_API_URL}/api/categories?sort=order:asc`;
    console.log('Attempting to fetch categories from (flat structure):', url);
    
    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.error?.message || response.statusText;
        throw new ApiError(`API Error: ${message}`, response.status);
    }

    const json: StrapiCategoriesResponse = await response.json();
    console.log('Raw data received from Strapi (Categories):', json);

    if(!json.data) {
        console.warn("Strapi categories response is missing 'data' array.", json);
        return [];
    }
    
    // Map directly on flat data, no .attributes needed
    return json.data
        .filter(cat => cat && cat.name)
        .map(cat => cat.name);
}

export const fetchBannerContent = async (): Promise<BannerContent> => {
    const url = `${STRAPI_API_URL}/api/banner`;
    console.log('Attempting to fetch banner content from:', url);

    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.error?.message || response.statusText;
        throw new ApiError(`API Error: ${message}`, response.status);
    }

    const json: StrapiBannerResponse = await response.json();
    console.log('Raw data received from Strapi (Banner):', json);
    
    if (!json.data || !json.data.title || !json.data.description) {
        console.error("Banner data is missing or incomplete from Strapi", json);
        throw new Error("Invalid banner data structure received from API.");
    }

    return {
        title: json.data.title,
        description: json.data.description,
        subtitle: json.data.subtitle,
    };
};