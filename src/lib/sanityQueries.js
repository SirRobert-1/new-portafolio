/**
 * GROQ Queries para Sanity CMS
 * Contiene todas las queries necesarias para obtener datos del CMS
 */

/**
 * Obtiene todas las tecnologías ordenadas por categoría y nombre
 * Retorna: Array de objetos de tecnología con todos sus campos
 */
export const getTechnologiesQuery = `
  *[_type == "tecnologia"] | order(categoria asc, nombre asc) {
    _id,
    nombre,
    "icono": icono.asset->url,
    categoria,
    color,
    descripcion
  }
`;

/**
 * Obtiene todos los proyectos destacados ordenados por orden
 * Incluye referencias a tecnologías expandidas
 * Retorna: Array de objetos de proyecto con tecnologías relacionadas
 */
export const getFeaturedProjectsQuery = `
  *[_type == "proyecto" && destacado == true] | order(orden asc) {
    _id,
    titulo,
    descripcionCorta,
    descripcionLarga,
    imagenPrincipal,
    galeria,
    "tecnologias": tecnologias[]{
      _key,
      color,
      "nombre": tecnologia->nombre,
      "_id": tecnologia->_id,
      "icono": tecnologia->icono.asset->url,
      "categoria": tecnologia->categoria
    },
    linkDemo,
    linkGitHub,
    fechaParticipacion,
    orden,
    destacado
  }
`;

/**
 * Obtiene un proyecto específico por su ID
 * @param {string} id - El ID del proyecto (_id)
 * Retorna: Objeto de proyecto individual con tecnologías expandidas
 */
export const getProjectByIdQuery = (id) => `
  *[_type == "proyecto" && _id == "${id}"][0] {
    _id,
    titulo,
    descripcionCorta,
    descripcionLarga,
    imagenPrincipal,
    galeria,
    "tecnologias": tecnologias[]{
      _key,
      color,
      "nombre": tecnologia->nombre,
      "_id": tecnologia->_id,
      "icono": tecnologia->icono.asset->url,
      "categoria": tecnologia->categoria
    },
    linkDemo,
    linkGitHub,
    fechaParticipacion,
    orden,
    destacado
  }
`;

/**
 * Obtiene todas las tecnologías agrupadas por categoría
 * Útil para mostrar tecnologías organizadas por tipo
 * Retorna: Array de tecnologías con categorías
 */
export const getTechnologiesByCategoryQuery = `
  *[_type == "tecnologia"] | order(categoria asc, nombre asc) {
    _id,
    nombre,
    "icono": icono.asset->url,
    categoria,
    color,
    descripcion
  }
`;

/**
 * Obtiene todos los proyectos (destacados y no destacados)
 * Útil para vista de portafolio completo
 * Retorna: Array de todos los proyectos
 */
export const getAllProjectsQuery = `
  *[_type == "proyecto"] | order(orden asc, fechaParticipacion desc) {
    _id,
    titulo,
    descripcionCorta,
    descripcionLarga,
    imagenPrincipal,
    galeria,
    "tecnologias": tecnologias[]{
      _key,
      color,
      "nombre": tecnologia->nombre,
      "_id": tecnologia->_id,
      "icono": tecnologia->icono.asset->url,
      "categoria": tecnologia->categoria
    },
    linkDemo,
    linkGitHub,
    fechaParticipacion,
    orden,
    destacado
  }
`;

/**
 * Cuenta el número total de proyectos
 * Retorna: Número total de proyectos
 */
export const getProjectsCountQuery = `
  count(*[_type == "proyecto"])
`;

/**
 * Cuenta el número total de tecnologías
 * Retorna: Número total de tecnologías
 */
export const getTechnologiesCountQuery = `
  count(*[_type == "tecnologia"])
`;
