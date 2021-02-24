import fontkit, { Font } from '@pdf-lib/fontkit';
import { FetchedFont, FetchFont } from 'src/font/types';

const readArrayBuffer = async (blob: Blob): Promise<Buffer> =>
  new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = (): void =>
      resolve(Buffer.from(reader.result as ArrayBuffer));
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });

export const loadFont = async (request: FetchFont): Promise<FetchedFont> => {
  let font: Font;
  try {
    const raw = await fetch(request.src),
      blob = await raw.blob(),
      buffer = await readArrayBuffer(blob);

    font = fontkit.create(buffer);
  } catch (e) {
    e.message = `Failed loading font from "${request.src}": ${e.message}`;
    throw e;
  }
  return { ...request, font };
};
