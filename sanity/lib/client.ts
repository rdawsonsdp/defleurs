import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Only create a real client if projectId looks valid (a-z, 0-9, dashes)
const isConfigured = projectId && /^[a-z0-9-]+$/.test(projectId);

export const client = isConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
