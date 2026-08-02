/**
 * A drop-in image placeholder. Pass `src` + `alt` to show a real image;
 * without a src it renders a labelled, dashed placeholder so the layout is
 * complete and it's obvious what asset goes where.
 */
export default function ImageSlot({
  src,
  alt = '',
  label = 'Image',
  className = '',
  rounded = 'rounded-2xl',
  height = 'h-[380px]',
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full object-cover ${rounded} ${height} ${className}`}
      />
    )
  }
  return (
    <div
      role="img"
      aria-label={`${label} (placeholder)`}
      className={`flex items-center justify-center border border-dashed border-line bg-card text-center ${rounded} ${height} ${className}`}
    >
      <span className="px-6 font-mono text-xs text-faint2">{label}</span>
    </div>
  )
}
