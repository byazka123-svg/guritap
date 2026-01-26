
import React from 'react';
import type { Product } from './types';
import * as icons from './components/icons';

// Hardcoded API URL as per instruction to bypass environment variable issues.
const STRAPI_API_URL = "https://api.guritap.work";

// --- Type definitions for the Strapi API response ---
interface StrapiPlan {
    id: number;
    duration: string;
    price: number;
}

interface StrapiCategory {
    id: number;
    attributes: {
        name: string;
        order: number;
    };
}

interface StrapiProductAttributes {
    name: string;
    features: string[] | string;
    plans: StrapiPlan[]; // This matches the repeatable component structure
    category: {
        data: StrapiCategory | null;
    };
    iconIdentifier: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface StrapiProductData {
    id: number;
    attributes: StrapiProductAttributes;
}

interface StrapiProductsResponse {
    data: StrapiProductData[];
}

interface StrapiCategoriesResponse {
    data: StrapiCategory[];
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
const mapStrapiToProduct = (strapiProduct: StrapiProductData): Product => {
    const { id, attributes } = strapiProduct;

    let safeFeatures: string[] = [];
    if (typeof attributes.features === 'string' && attributes.features.length > 0) {
        safeFeatures = attributes.features.split(/[\n,]/).map(f => f.trim()).filter(Boolean);
    }

    return {
        id: id,
        name: attributes.name,
        icon: iconMap[attributes.iconIdentifier] || DefaultIcon,
        features: safeFeatures,
        // Ensure plans is always an array, even if it's missing from the API response
        plans: attributes.plans || [],
        category: attributes.category?.data?.attributes?.name || 'Uncategorized',
    };
};

// --- API Fetch Functions ---
export const fetchProducts = async (): Promise<Product[]> => {
    const url = `${STRAPI_API_URL}/api/products?populate=*`;
    // Debug log as requested
    console.log('Attempting to fetch products from:', url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const json: StrapiProductsResponse = await response.json();
        
        // Debug log as requested
        console.log('Raw data received from Strapi:', json);

        if (!json.data) {
            console.warn("Strapi response is missing 'data' array.", json);
            return [];
        }

        return json.data
            .filter(product => product && product.attributes)
            .map(mapStrapiToProduct);

    } catch (error) {
        console.error("Failed to fetch products from Strapi:", error);
        throw error;
    }
};

export const fetchCategories = async (): Promise<string[]> => {
    const url = `${STRAPI_API_URL}/api/categories?sort=order:asc`;
     // Debug log
    console.log('Attempting to fetch categories from:', url);
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const json: StrapiCategoriesResponse = await response.json();

        if(!json.data) {
            console.warn("Strapi categories response is missing 'data' array.", json);
            return [];
        }
        return json.data
            .filter(cat => cat && cat.attributes && cat.attributes.name)
            .map(cat => cat.attributes.name);
    } catch (error) {
        console.error("Failed to fetch categories from Strapi:", error);
        throw error;
    }
}
