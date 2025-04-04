import * as React from "react"

const GoogleLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={20}
      height={20}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="#fff" d="M20 0H0v20h20V0Z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#4285F4"
        d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35Z"
      />
      <path
        fill="#34A853"
        d="M10 20c2.7 0 4.964-.896 6.619-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.596-4.123h-3.34v2.59A9.996 9.996 0 0 0 10 20Z"
      />
      <path
        fill="#FBBC04"
        d="M4.404 11.9c-.2-.6-.313-1.24-.313-1.9 0-.659.114-1.3.313-1.9V5.51h-3.34A9.997 9.997 0 0 0 0 10c0 1.614.386 3.141 1.064 4.491l3.34-2.59Z"
      />
      <path
        fill="#E94235"
        d="M10 3.977c1.469 0 2.787.505 3.824 1.496l2.868-2.869C14.96.991 12.696 0 10 0 6.09 0 2.71 2.24 1.064 5.51L4.405 8.1c.787-2.364 2.991-4.123 5.596-4.123Z"
      />
    </g>
  </svg>
)
export default GoogleLogo
