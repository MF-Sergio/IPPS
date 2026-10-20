// Recebe a imagem já importada: caminho dinâmico fazia o Vite empacotar todo o assets/img.
export function ImagemPublic({ src, srcSet, sizes, alt, width, height }) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="h-auto w-full object-cover"
    />
  );
}

export default ImagemPublic;
