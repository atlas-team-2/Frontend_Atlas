type CostumeCardProps = {
  imageSrc: string;
  alt: string;
  placeholder: string;
};

function CostumeCard({ imageSrc, alt, placeholder }: CostumeCardProps) {
  return (
    <div className="costume-item">
      {imageSrc ? (
        <img src={imageSrc} alt={alt} loading="lazy" width={400} height={533} decoding="async" />
      ) : (
        <div className="costume-item__placeholder">{placeholder}</div>
      )}
    </div>
  );
}

export default CostumeCard;
