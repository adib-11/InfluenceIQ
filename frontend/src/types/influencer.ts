export type ScorePayloadKnownFields = {
  overall_fake_risk?: number;
  overall_risk_category?: string;
  confidence?: number | string;
  positive_reasons?: string[];
  negative_reasons?: string[];
  requires_human_review?: boolean;
  risk_score?: number;
  score_explanations?: string[] | Record<string, unknown>;
  source_confidence?: number | string;
  citation_count?: number;
  brand_safety_state?: string;
  brand_safety?: string | { state?: string; status?: string; flags?: string[] };
  trust_score?: number;
  final_score?: number;
};

export type InfluencerRecommendation = {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagementRate: number;
  matchScore: number;
  trustGrade: "A+" | "A" | "B" | "C" | "D";
  brandSafetyFlags: string[];
  citations: string[];
  rate: string;
  subScores: Record<string, number>;
  scorePayload: ScorePayloadKnownFields & Record<string, unknown>;
  sourcePayload: Record<string, unknown>;
};
