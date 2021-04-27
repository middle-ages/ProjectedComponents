export type FaceKey3D = typeof FaceKeys3D[number];

export type FaceKey = 'front' | FaceKey3D;

export const FaceKeys3D = ['back', 'top', 'bottom', 'left', 'right'] as const,
  FaceKeys = ['front', ...FaceKeys3D] as FaceKey[];
