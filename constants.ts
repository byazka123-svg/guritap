
import type { Product } from './types';
import { 
  NetflixIcon, SpotifyIcon, YoutubeIcon, CanvaIcon, CapcutIcon, VidioIcon,
  BstationIcon, CrunchyrollIcon, DisneyIcon, DrakorIdIcon, DramaboxIcon, HboMaxIcon, IqiyiIcon, LoklokIcon, PrimeVideoIcon, RctiPlusIcon, ShortmaxIcon, VisionPlusIcon, ViuIcon, WetvIcon, WibukuIcon,
  AlightMotionIcon, IbisPaintIcon, LightroomIcon, MeituIcon, PicsartIcon, ReminiIcon, VscoIcon, WinkProIcon,
  ChatGptIcon, GeminiAiIcon, PerplexityAiIcon,
  AppleMusicIcon,
  CamscannerIcon, DuolingoIcon, GrammarlyIcon, Microsoft365Icon, WpsOfficeIcon, ZoomIcon,
  FizzoIcon, ScribdIcon,
  ExpressVpnIcon, HmaVpnIcon, NordVpnIcon,
  GetcontactIcon, LinktreeIcon
} from './components/icons';

// You can change this URL to your deployed Strapi instance
export const STRAPI_API_URL = 'https://api.guritap.work';
export const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp Anda

// The categoryOrder array is now removed.
// The order will be fetched from the 'order' field in the Category collection type in Strapi.

export const categoryDisplayMap: { [key: string]: string } = {
  'Streaming Film & Hiburan': 'Streaming',
  'Desain & Editing': 'Desain',
  'Artificial Intelligence (AI)': 'AI',
  'Musik & Audio': 'Musik',
  'Produktivitas & Edukasi': 'Edukasi',
  'Buku & Literasi': 'Buku',
  'VPN & Keamanan Internet': 'VPN',
  'Utilitas & Sosial Media Tools': 'Utilitas',
};

// PRODUCTS array is now removed and will be fetched from Strapi