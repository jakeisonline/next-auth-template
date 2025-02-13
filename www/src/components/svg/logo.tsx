import { SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="url(#a)"
      stroke="url(#b)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={4}
        x2={20}
        y1={2}
        y2={22}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#55B0FA" />
        <stop offset={1} stopColor="#AD6DF4" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={4}
        x2={20}
        y1={2}
        y2={22}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#55B0FA" />
        <stop offset={1} stopColor="#AD6DF4" />
      </linearGradient>
    </defs>
  </svg>
)
const Memo = memo(SvgComponent)
export default Memo
