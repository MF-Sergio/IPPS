export function ImagemPublic({ nomeImagem }) {
  const imgUrl = new URL(`../../assets/img/${nomeImagem}`, import.meta.url)
    .href;

  return (
    <img src={imgUrl} alt={`Imagem ${nomeImagem}`} className=" object-cover" />
  );
}

export default ImagemPublic;
