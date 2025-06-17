import React from 'react'

const Substack = ({
  title = 'Substack',
  desc = 'A newsletter platform',
  color = 'var(--color-zinc-900)',
  size = 24,
  ...props
}) => {
  const uniqueTitleId = `title-${title}`
  const uniqueDescId = `desc-${desc}`

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      shapeRendering='geometricPrecision'
      textRendering='geometricPrecision'
      imageRendering='optimizeQuality'
      fillRule='evenodd'
      clipRule='evenodd'
      viewBox='0 0 448 511.471'
      aria-labelledby={`${uniqueTitleId} ${uniqueDescId}`}
      role='img'
      width={size}
      height={size}
      {...props}
    >
      <title id={uniqueTitleId}>{title}</title>
      <desc id={uniqueDescId}>{desc}</desc>
      <path
        fill={color}
        d='M0 0h448v62.804H0V0zm0 229.083h448v282.388L223.954 385.808 0 511.471V229.083zm0-114.542h448v62.804H0v-62.804z'
      />
    </svg>
  )
}

export default Substack
