/**
 * Componente personalizado para renderizar Portable Text de Sanity
 * Soporta diferentes estilos de bloques, listas, y decoradores
 */

const PortableText = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  const renderBlock = (block, index) => {
    const { _type, style, children, listItem, level, marks = [] } = block;

    // Renderizar bloques de texto
    if (_type === 'block') {
      const textContent = renderChildren(children);

      // Estilos de encabezados
      if (style === 'h1') {
        return (
          <h1 key={index} className="text-4xl font-bold mb-4 text-white">
            {textContent}
          </h1>
        );
      }

      if (style === 'h2') {
        return (
          <h2 key={index} className="text-3xl font-bold mb-3 text-white">
            {textContent}
          </h2>
        );
      }

      if (style === 'h3') {
        return (
          <h3 key={index} className="text-2xl font-semibold mb-3 text-white">
            {textContent}
          </h3>
        );
      }

      if (style === 'h4') {
        return (
          <h4 key={index} className="text-xl font-semibold mb-2 text-white">
            {textContent}
          </h4>
        );
      }

      if (style === 'blockquote') {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-300"
          >
            {textContent}
          </blockquote>
        );
      }

      // Listas
      if (listItem === 'bullet') {
        return (
          <li key={index} className="ml-6 mb-2 text-gray-300 list-disc">
            {textContent}
          </li>
        );
      }

      if (listItem === 'number') {
        return (
          <li key={index} className="ml-6 mb-2 text-gray-300 list-decimal">
            {textContent}
          </li>
        );
      }

      // Párrafo normal
      return (
        <p key={index} className="mb-4 text-gray-300 leading-relaxed">
          {textContent}
        </p>
      );
    }

    // Manejar otros tipos de bloques (imágenes, etc.)
    if (_type === 'image') {
      return (
        <div key={index} className="my-6">
          <img
            src={block.asset?.url || ''}
            alt={block.alt || 'Image'}
            className="rounded-lg w-full"
          />
          {block.caption && (
            <p className="text-sm text-gray-400 mt-2 text-center">{block.caption}</p>
          )}
        </div>
      );
    }

    // Bloque desconocido - retornar null
    return null;
  };

  const renderChildren = (children) => {
    if (!children || !Array.isArray(children)) {
      return null;
    }

    return children.map((child, index) => {
      const { _type, text, marks = [] } = child;

      if (_type === 'span' && text) {
        let renderedText = text;

        // Aplicar decoradores (strong, em, code, etc.)
        if (marks && marks.length > 0) {
          marks.forEach((mark) => {
            switch (mark) {
              case 'strong':
                renderedText = (
                  <strong key={`${index}-strong`} className="font-bold text-white">
                    {renderedText}
                  </strong>
                );
                break;
              case 'em':
                renderedText = (
                  <em key={`${index}-em`} className="italic">
                    {renderedText}
                  </em>
                );
                break;
              case 'code':
                renderedText = (
                  <code
                    key={`${index}-code`}
                    className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-400"
                  >
                    {renderedText}
                  </code>
                );
                break;
              case 'underline':
                renderedText = (
                  <u key={`${index}-underline`}>{renderedText}</u>
                );
                break;
              case 'strike-through':
                renderedText = (
                  <s key={`${index}-strike`} className="line-through">
                    {renderedText}
                  </s>
                );
                break;
              default:
                break;
            }
          });
        }

        return <span key={index}>{renderedText}</span>;
      }

      return null;
    });
  };

  // Agrupar items de lista
  const groupedContent = [];
  let currentList = null;

  content.forEach((block, index) => {
    if (block.listItem) {
      if (!currentList || currentList.type !== block.listItem) {
        currentList = {
          type: block.listItem,
          items: [],
        };
        groupedContent.push(currentList);
      }
      currentList.items.push(block);
    } else {
      currentList = null;
      groupedContent.push(block);
    }
  });

  return (
    <div className="portable-text">
      {groupedContent.map((item, index) => {
        // Si es una lista agrupada
        if (item.items) {
          const ListTag = item.type === 'bullet' ? 'ul' : 'ol';
          return (
            <ListTag key={index} className="my-4">
              {item.items.map((listItem, listIndex) =>
                renderBlock(listItem, `${index}-${listIndex}`)
              )}
            </ListTag>
          );
        }

        // Si es un bloque individual
        return renderBlock(item, index);
      })}
    </div>
  );
};

export default PortableText;
