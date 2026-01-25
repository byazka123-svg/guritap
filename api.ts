
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

interface StrapiProductAttributes {
    name: string;
    features: string[];
    plans: StrapiPlan[];
    category: string;
    iconIdentifier: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface StrapiProductData {
    id: number;
    attributes: StrapiProductAttributes;
}

interface StrapiResponse {
    data: StrapiProductData[];
}

// --- Icon Mapping ---
// Maps the 'iconIdentifier' string from Strapi to an actual React icon component
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

// Fallback icon in case an identifier is not found
const DefaultIcon = icons.OctopusIcon;

// --- Data Transformation ---
// Transforms a single product from the Strapi format to our app's internal format
const mapStrapiToProduct = (strapiProduct: StrapiProductData): Product => {
    const { id, attributes } = strapiProduct;
    return {
        id: id,
        name: attributes.name,
        icon: iconMap[attributes.iconIdentifier] || DefaultIcon,
        features: attributes.features || [],
        plans: attributes.plans || [],
        category: attributes.category,
    };
};

// --- API Fetch Function ---
// Fetches all products from Strapi and transforms them for the frontend
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        // We use 'populate=*' to ensure all related data (like plans) is included
        const response = await fetch(`${STRAPI_API_URL}/api/products?populate=*`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const json: StrapiResponse = await response.json();
        
        if (!json.data) {
            console.warn("Strapi response is missing 'data' array.", json);
            return [];
        }

        return json.data.map(mapStrapiToProduct);

    } catch (error) {
        console.error("Failed to fetch products from Strapi:", error);
        // Re-throw the error so the component can catch it and update the UI
        throw error;
    }
};
