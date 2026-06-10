import type { InfluencerRecommendation } from "@/types/influencer";

export type SupportedPlatform = "instagram" | "youtube" | "tiktok" | "facebook";

export const normalizePlatform = (value: string): SupportedPlatform => {
  const lowered = value.toLowerCase();
  if (lowered === "youtube" || lowered === "tiktok" || lowered === "facebook") {
    return lowered;
  }
  return "instagram";
};

export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const asFiniteNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const normalizePercentish = (value: unknown) => {
  const numeric = asFiniteNumber(value);
  if (numeric === null) return null;
  return numeric <= 1 ? Math.round(numeric * 100) : Math.round(numeric);
};

const asStringList = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];

export const titleize = (value: string) =>
  value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const avatarFromName = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "IQ";

export const estimateViews = (followers: number, engagementRate: number) =>
  Math.max(0, Math.round(followers * Math.max(engagementRate, 1) * 0.04));

export const tierFromFollowers = (followers: number) => {
  if (followers >= 500_000) return "Premium";
  if (followers >= 50_000) return "Established";
  return "Rising";
};

export const gradientByPlatform: Record<SupportedPlatform, string> = {
  instagram: "linear-gradient(135deg,#6a4cff,#c054ff)",
  youtube: "linear-gradient(135deg,#ef4444,#f97316)",
  tiktok: "linear-gradient(135deg,#111827,#06b6d4)",
  facebook: "linear-gradient(135deg,#2563eb,#60a5fa)",
};

export const hostLabel = (rawUrl: string) => {
  try {
    return new URL(rawUrl).hostname.replace(/^www\./, "");
  } catch {
    return rawUrl;
  }
};

export const extractTags = (item: InfluencerRecommendation) => {
  const tags: string[] = [];
  tags.push(titleize(item.platform));
  Object.entries(item.subScores)
    .filter(([key, value]) => key !== "data_source_count" && value >= 75)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .forEach(([key]) => tags.push(titleize(key)));
  if (!item.brandSafetyFlags.length) {
    tags.push("Brand safe");
  }
  item.citations.slice(0, 2).forEach((citation) => tags.push(hostLabel(citation)));
  return Array.from(new Set(tags)).slice(0, 4);
};

export const extractCategory = (item: InfluencerRecommendation) => {
  const metadata = item.sourcePayload.metadata;
  if (typeof metadata === "object" && metadata && typeof (metadata as Record<string, unknown>).category === "string") {
    return String((metadata as Record<string, unknown>).category);
  }
  const tags = extractTags(item);
  return tags.slice(0, 2).join(" · ") || "Creator";
};

export const extractLocation = (item: InfluencerRecommendation) => {
  const sourcePayload = item.sourcePayload;
  const directLocation = sourcePayload.location;
  if (typeof directLocation === "string" && directLocation.trim()) {
    return directLocation;
  }

  const identity = sourcePayload.identity;
  if (typeof identity === "object" && identity && typeof (identity as Record<string, unknown>).location === "string") {
    return String((identity as Record<string, unknown>).location);
  }

  return "Location unavailable";
};

export const estimateRateNumber = (item: InfluencerRecommendation) => {
  if (typeof item.rate === "string") {
    const numeric = Number.parseInt(item.rate.replace(/[^0-9]/g, ""), 10);
    if (Number.isFinite(numeric)) {
      return numeric;
    }
  }
  return Math.max(250, Math.round(item.followers * 0.01));
};

export const getRiskCategory = (item: InfluencerRecommendation) => {
  const category = item.scorePayload.overall_risk_category;
  if (typeof category === "string" && category.trim()) {
    return titleize(category);
  }

  const risk = normalizePercentish(item.scorePayload.overall_fake_risk ?? item.scorePayload.risk_score);
  if (risk === null) return "Risk unavailable";
  if (risk >= 70) return "High risk";
  if (risk >= 40) return "Medium risk";
  return "Low risk";
};

export const getConfidenceLabel = (item: InfluencerRecommendation) => {
  const confidence = normalizePercentish(item.scorePayload.confidence);
  return confidence === null ? "Confidence unavailable" : `${confidence}% confidence`;
};

export const getHumanReviewFlag = (item: InfluencerRecommendation) =>
  item.scorePayload.requires_human_review === true ? "Human review required" : "No human review flag";

export const getPositiveReasons = (item: InfluencerRecommendation) => {
  const reasons = asStringList(item.scorePayload.positive_reasons);
  if (reasons.length) return reasons;

  const explanations = item.scorePayload.score_explanations;
  if (Array.isArray(explanations)) return asStringList(explanations).slice(0, 3);
  return ["Strong match signals were found for this campaign."];
};

export const getNegativeReasons = (item: InfluencerRecommendation) => {
  const reasons = asStringList(item.scorePayload.negative_reasons);
  if (reasons.length) return reasons;
  if (item.brandSafetyFlags.length) return item.brandSafetyFlags;
  return ["No major negative scoring reasons were returned."];
};

export const getSourceConfidence = (item: InfluencerRecommendation) => {
  const confidence = normalizePercentish(item.scorePayload.source_confidence);
  if (confidence !== null) return `${confidence}% source confidence`;

  const citationCount = asFiniteNumber(item.scorePayload.citation_count) ?? item.citations.length;
  return `${citationCount} citation${citationCount === 1 ? "" : "s"}`;
};

export const getRole5TrustScore = (item: InfluencerRecommendation) => {
  const score =
    normalizePercentish(item.scorePayload.final_score) ??
    normalizePercentish(item.scorePayload.trust_score) ??
    normalizePercentish(item.scorePayload.risk_score) ??
    Math.round(item.matchScore);
  return Math.max(0, Math.min(100, score));
};

export const getFakeRiskLabel = (item: InfluencerRecommendation) => {
  const risk = normalizePercentish(item.scorePayload.overall_fake_risk ?? item.scorePayload.risk_score);
  return risk === null ? "Fake-risk unavailable" : `${risk}% fake-risk`;
};

export const getBrandSafetyState = (item: InfluencerRecommendation) => {
  const direct = item.scorePayload.brand_safety_state;
  if (typeof direct === "string" && direct.trim()) return titleize(direct);

  const nested = item.scorePayload.brand_safety;
  if (typeof nested === "string" && nested.trim()) return titleize(nested);
  if (nested && typeof nested === "object") {
    const record = nested as Record<string, unknown>;
    const state = record.state ?? record.status;
    if (typeof state === "string" && state.trim()) return titleize(state);
  }

  return item.brandSafetyFlags.length ? "Review flags" : "Brand safe";
};
