
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
export const STRAPI_API_URL = 'http://localhost:1337';
export const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp Anda

export const categoryOrder = [
  'Streaming Film & Hiburan',
  'Desain & Editing',
  'Artificial Intelligence (AI)',
  'Musik & Audio',
  'Produktivitas & Edukasi',
  'Buku & Literasi',
  'VPN & Keamanan Internet',
  'Utilitas & Sosial Media Tools',
];

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
