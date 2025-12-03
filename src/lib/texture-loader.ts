import * as THREE from "three";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";

let ktx2Loader: KTX2Loader | null = null;

/**
 * KTX2/Basis Texture Compression Utility
 * 
 * KTX2 with Basis Universal compression can reduce texture size by 75%+
 * while maintaining quality. Use this for any textures in 3D scenes.
 * 
 * HOW TO USE:
 * 1. Convert your PNG/JPG textures to KTX2 using: https://github.khronos.org/KTX-Software/ktxtools/toktx.html
 *    Command: toktx --t2 --bcmp output.ktx2 input.png
 * 
 * 2. Place .ktx2 files in public/textures/
 * 
 * 3. Load in your component:
 *    const texture = await loadCompressedTexture('/textures/myTexture.ktx2', gl);
 */

export const initKTX2Loader = (gl: THREE.WebGLRenderer): KTX2Loader => {
  if (!ktx2Loader) {
    ktx2Loader = new KTX2Loader();
    // Basis transcoder from CDN (or host locally in /public)
    ktx2Loader.setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/libs/basis/");
    ktx2Loader.detectSupport(gl);
  }
  return ktx2Loader;
};

export const loadCompressedTexture = async (
  url: string,
  gl: THREE.WebGLRenderer
): Promise<THREE.CompressedTexture> => {
  const loader = initKTX2Loader(gl);
  
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.needsUpdate = true;
        resolve(texture);
      },
      undefined,
      reject
    );
  });
};

/**
 * Example usage in a React Three Fiber component:
 * 
 * ```tsx
 * import { useThree } from "@react-three/fiber";
 * import { loadCompressedTexture } from "@/lib/texture-loader";
 * 
 * function TexturedMesh() {
 *   const { gl } = useThree();
 *   const [texture, setTexture] = useState<THREE.Texture | null>(null);
 * 
 *   useEffect(() => {
 *     loadCompressedTexture('/textures/myTexture.ktx2', gl)
 *       .then(setTexture)
 *       .catch(console.error);
 *   }, [gl]);
 * 
 *   if (!texture) return null;
 * 
 *   return (
 *     <mesh>
 *       <boxGeometry />
 *       <meshStandardMaterial map={texture} />
 *     </mesh>
 *   );
 * }
 * ```
 */

export const disposeKTX2Loader = () => {
  if (ktx2Loader) {
    ktx2Loader.dispose();
    ktx2Loader = null;
  }
};
