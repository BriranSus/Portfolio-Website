export const FLOOR_RX = -Math.PI / 1.6;

export function getTerrainElevation(x: number, localY: number): number {
  const h1 = Math.sin(x * 0.035 + localY * 0.025) * 5.0;
  const h2 = Math.cos(x * 0.08 - localY * 0.06) * 3.5;
  const h3 = Math.sin(x * 0.15 + localY * 0.12) * 1.8;
  const h4 = Math.sin(x * 0.018) * Math.cos(localY * 0.022) * 5.5;
  return h1 + h2 + h3 + h4;
}

export function getFloorHeight(x: number, z: number): { y: number; z: number; elev: number } {
  const localY = z / 0.92388;
  const elev = getTerrainElevation(x, localY);
  const baseFloorY = -26 + Math.tan(Math.PI * 0.125) * z;
  const worldY = baseFloorY + elev * 0.92388;
  const worldZ = z - elev * 0.38268;
  return { y: worldY, z: worldZ, elev };
}
