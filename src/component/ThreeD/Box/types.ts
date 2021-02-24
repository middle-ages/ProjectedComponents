export type ThreeDFace = typeof ThreeDFaces[number];

export type Face = 'front' | ThreeDFace;

export const ThreeDFaces = ['back', 'top', 'bottom', 'left', 'right'] as const,
  Faces = ['front', ...ThreeDFaces] as Face[];
