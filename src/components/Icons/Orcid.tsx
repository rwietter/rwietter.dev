import React from 'react'

const Orcid = ({
  title = 'Orcid',
  desc = 'A organization that provides a persistent digital identifier that distinguishes you from every other researcher and, through integration in key research workflows such as manuscript and grant submission, supports automated linkages between you and your professional activities ensuring that your work is recognized.',
  color = 'var(--color-zinc-900)',
  size = 24,
  ...props
}) => {
  const uniqueTitleId = `title-${title}`
  const uniqueDescId = `desc-${desc}`

  return (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      shapeRendering='geometricPrecision'
      textRendering='geometricPrecision'
      imageRendering='optimizeQuality'
      aria-labelledby={`${uniqueTitleId} ${uniqueDescId}`}
      role='img'
      width={size}
      height={size}
      {...props}
    >
      <title id={uniqueTitleId}>{title}</title>
      <desc id={uniqueDescId}>{desc}</desc>
      <path
        stroke='1'
        fill={color}
        d='m16 3c-7.1678612 0-13 5.832144-13 13s5.8321388 13 13 13c7.167861 0 13-5.832144 13-13s-5.832139-13-13-13zm0 2c6.086982 0 11 4.9130223 11 11 0 6.086978-4.913018 11-11 11-6.0869817 0-11-4.913022-11-11 0-6.0869777 4.9130183-11 11-11zm-5 3a1 1 0 0 0 0 2 1 1 0 0 0 0-2zm-1 3v11h2v-11zm4 0v1 10h4.5c3.025577 0 5.5-2.474423 5.5-5.5s-2.474423-5.5-5.5-5.5zm2 2h2.5c1.944423 0 3.5 1.555577 3.5 3.5s-1.555577 3.5-3.5 3.5h-2.5z'
      />
    </svg>
  )
}

export default Orcid
