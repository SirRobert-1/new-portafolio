import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "./sanity";

/**
 * Builder de URLs para imágenes de Sanity
 * Permite generar URLs optimizadas con diferentes transformaciones
 */
const builder = imageUrlBuilder(sanityClient);

/**
 * Genera una URL base para una imagen de Sanity
 * @param {Object} source - Objeto de imagen de Sanity (puede incluir asset, hotspot, crop, etc)
 * @returns {ImageUrlBuilder} - Builder de URL con métodos de transformación encadenables
 *
 * @example
 * urlFor(project.imagenPrincipal).width(800).height(600).url()
 */
export function urlFor(source) {
  return builder.image(source);
}

/**
 * Genera una URL optimizada para imágenes de proyectos (tarjetas)
 * @param {Object|string} imageSource - Objeto de imagen de Sanity o URL string
 * @param {number} width - Ancho deseado (default: 600)
 * @param {number} height - Alto deseado (default: 400)
 * @returns {string} - URL de la imagen optimizada
 */
export function getProjectCardImageUrl(imageSource, width = 600, height = 400) {
  if (!imageSource) return null;

  // Si es un string (URL normal o placeholder), retornarlo directamente
  if (typeof imageSource === 'string') {
    return imageSource;
  }

  // Si es un objeto de Sanity, usar el builder
  return urlFor(imageSource)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .quality(85)
    .url();
}

/**
 * Genera una URL optimizada para imágenes de galería de proyectos
 * @param {Object|string} imageSource - Objeto de imagen de Sanity o URL string
 * @param {number} width - Ancho deseado (default: 1200)
 * @returns {string} - URL de la imagen optimizada
 */
export function getGalleryImageUrl(imageSource, width = 1200) {
  if (!imageSource) return null;

  // Si es un string (URL normal o placeholder), retornarlo directamente
  if (typeof imageSource === 'string') {
    return imageSource;
  }

  // Si es un objeto de Sanity, usar el builder
  return urlFor(imageSource)
    .width(width)
    .fit("max")
    .auto("format")
    .quality(90)
    .url();
}

/**
 * Genera una URL optimizada para iconos de tecnologías
 * @param {Object} imageSource - Objeto de imagen de Sanity
 * @param {number} size - Tamaño del icono (default: 64)
 * @returns {string} - URL de la imagen optimizada
 */
export function getTechnologyIconUrl(imageSource, size = 64) {
  if (!imageSource) return null;

  return urlFor(imageSource)
    .width(size)
    .height(size)
    .fit("crop")
    .auto("format")
    .quality(90)
    .url();
}

/**
 * Genera una URL base simple para una imagen
 * Útil cuando solo necesitas la URL sin transformaciones específicas
 * @param {Object} imageSource - Objeto de imagen de Sanity
 * @returns {string} - URL de la imagen
 */
export function getImageUrl(imageSource) {
  if (!imageSource) return null;

  return urlFor(imageSource).url();
}

/**
 * Genera una URL optimizada para imágenes con placeholder blur
 * @param {Object} imageSource - Objeto de imagen de Sanity
 * @param {number} width - Ancho deseado
 * @param {number} quality - Calidad de la imagen (1-20 para blur)
 * @returns {string} - URL de la imagen placeholder
 */
export function getBlurImageUrl(imageSource, width = 20, quality = 10) {
  if (!imageSource) return null;

  return urlFor(imageSource)
    .width(width)
    .blur(50)
    .quality(quality)
    .auto("format")
    .url();
}

/**
 * Obtiene las dimensiones de una imagen
 * @param {Object} imageSource - Objeto de imagen de Sanity
 * @returns {Object|null} - Objeto con width y height, o null si no hay imagen
 */
export function getImageDimensions(imageSource) {
  if (!imageSource || !imageSource.asset) return null;

  const { width, height } = imageSource.asset.metadata?.dimensions || {};

  return width && height ? { width, height } : null;
}

/**
 * Verifica si una imagen tiene configurado hotspot
 * El hotspot permite enfocar en un punto específico al hacer crop
 * @param {Object} imageSource - Objeto de imagen de Sanity
 * @returns {boolean} - true si tiene hotspot configurado
 */
export function hasHotspot(imageSource) {
  return !!(imageSource && imageSource.hotspot);
}

/**
 * Genera una URL respetando el hotspot si existe
 * @param {Object} imageSource - Objeto de imagen de Sanity
 * @param {number} width - Ancho deseado
 * @param {number} height - Alto deseado
 * @returns {string} - URL de la imagen optimizada
 */
export function getImageWithHotspot(imageSource, width, height) {
  if (!imageSource) return null;

  const baseBuilder = urlFor(imageSource);

  // Si tiene hotspot, lo usa automáticamente en el crop
  if (hasHotspot(imageSource)) {
    return baseBuilder
      .width(width)
      .height(height)
      .fit("crop")
      .crop("focalpoint")
      .auto("format")
      .quality(85)
      .url();
  }

  // Si no tiene hotspot, usa crop normal centrado
  return baseBuilder
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .quality(85)
    .url();
}

export default urlFor;
