import assetsJson from "../content/assets.json";

export type AssetPath = string | null;

type AssetsJson = typeof assetsJson;

export type Assets = Omit<AssetsJson, "gallery"> & {
  gallery: string[];
};

export type ServiceId = keyof Assets["services"];
export type TeamId = keyof Assets["team"];

export const assets: Assets = {
  ...assetsJson,
  gallery: assetsJson.gallery as string[],
};

export function isAssetPath(value: AssetPath): value is string {
  return typeof value === "string" && value.length > 0;
}

export function serviceMedia(id: string): AssetPath {
  if (Object.prototype.hasOwnProperty.call(assets.services, id)) {
    return assets.services[id as ServiceId];
  }
  return null;
}

export function teamMedia(id: string): AssetPath {
  if (Object.prototype.hasOwnProperty.call(assets.team, id)) {
    return assets.team[id as TeamId];
  }
  return null;
}
