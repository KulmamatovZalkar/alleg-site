"use client";

import {
  Award,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  Check,
  Compass,
  Crown,
  Diamond,
  Flame,
  Gem,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  LineChart,
  Map,
  Medal,
  Mountain,
  Rocket,
  Search,
  Settings,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const REGISTRY: Record<string, LucideIcon> = {
  award: Award,
  brain: Brain,
  briefcase: Briefcase,
  building: Building2,
  chart: BarChart3,
  check: Check,
  compass: Compass,
  crown: Crown,
  diamond: Diamond,
  flame: Flame,
  gem: Gem,
  globe: Globe,
  graduation: GraduationCap,
  handshake: Handshake,
  landmark: Landmark,
  line: LineChart,
  map: Map,
  medal: Medal,
  mountain: Mountain,
  rocket: Rocket,
  search: Search,
  settings: Settings,
  sparkles: Sparkles,
  star: Star,
  target: Target,
  trending: TrendingUp,
  trophy: Trophy,
  users: Users,
  zap: Zap,
};

export default function Icon({
  name,
  size = 20,
  className,
}: {
  name?: string | null;
  size?: number;
  className?: string;
}) {
  const key = (name || "").toLowerCase().trim();
  const Cmp = REGISTRY[key] ?? Diamond;
  return <Cmp size={size} className={className} strokeWidth={1.6} />;
}

export const ICON_NAMES = Object.keys(REGISTRY);
