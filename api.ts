
import React from 'react';
import type { Product } from './types';
import * as icons from './components/icons';
import { STRAPI_API_URL } from './constants';

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
    features: string[] | string; // Can be an array or a string from the API
    plans: StrapiPlan[];
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

    // The 'features' field is of type JSON in Strapi. This can lead to malformed data
    // if the user doesn't input a valid JSON array. This logic makes the parsing robust.
    let safeFeatures: string[] = [];
    if (Array.isArray(attributes.features)) {
        // The best case: data is already a valid array.
        safeFeatures = attributes.features.filter(f => typeof f === 'string');
    } else if (typeof attributes.features === 'string') {
        // The user might have entered a stringified JSON array or plain text.
        const trimmedFeatures = attributes.features.trim();
        if (trimmedFeatures.startsWith('[') && trimmedFeatures.endsWith(']')) {
            // Looks like a JSON array string. Let's try to parse it.
            try {
                const parsed = JSON.parse(trimmedFeatures);
                if (Array.isArray(parsed)) {
                    safeFeatures = parsed.filter(f => typeof f === 'string');
                }
            } catch (e) {
                console.warn(`Could not parse 'features' JSON string for product "${attributes.name}".`, e);
            }
        } else if (trimmedFeatures.length > 0) {
            // It's likely plain text. Let's split by newline or comma.
            safeFeatures = trimmedFeatures.split(/[\n,]/).map(f => f.trim()).filter(Boolean);
        }
    }

    return {
        id: id,
        name: attributes.name,
        icon: iconMap[attributes.iconIdentifier] || DefaultIcon,
        features: safeFeatures,
        plans: attributes.plans || [],
        category: attributes.category?.data?.attributes?.name || 'Uncategorized',
    };
};

// --- API Fetch Functions ---
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        // Using 'populate=*' which is the standard Strapi v4 way to populate 1st level relations.
        // This avoids the "Bad Request" error if 'strapi-plugin-populate-deep' isn't installed.
        const response = await fetch(`${STRAPI_API_URL}/api/products?populate=*`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const json: StrapiProductsResponse = await response.json();
        
        if (!json.data) {
            console.warn("Strapi response is missing 'data' array.", json);
            return [];
        }

        // Filter out any products that are null or don't have an 'attributes' property
        // before attempting to map them. This prevents the "reading 'features' of undefined" error.
        return json.data
            .filter(product => product && product.attributes)
            .map(mapStrapiToProduct);

    } catch (error) {
        console.error("Failed to fetch products from Strapi:", error);
        throw error;
    }
};

export const fetchCategories = async (): Promise<string[]> => {
    try {
        // Fetch categories and sort them by the 'order' field
        const response = await fetch(`${STRAPI_API_URL}/api/categories?sort=order:asc`);
        if(!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const json: StrapiCategoriesResponse = await response.json();

        if(!json.data) {
            console.warn("Strapi categories response is missing 'data' array.", json);
            return [];
        }
        // Filter out any malformed entries before mapping to prevent crashes.
        return json.data
            .filter(cat => cat && cat.attributes && cat.attributes.name)
            .map(cat => cat.attributes.name);
    } catch (error) {
        console.error("Failed to fetch categories from Strapi:", error);
        throw error;
    }
}
