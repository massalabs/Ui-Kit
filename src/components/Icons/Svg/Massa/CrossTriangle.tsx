export function CrossTriangle({ ...props }) {
  return (
    <div className={`bg-primary w-fit rounded-full`} data-testid="svg-icon">
      <svg
        width={props.size}
        height={props.size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_35_1397)">
          <rect width="48" height="48" fill="#151A26" />
          <mask
            id="mask0_35_1397"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="48"
            height="48"
          >
            <path d="M48 0H0V48H48V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0_35_1397)">
            <path
              d="M23.9988 48V34.5526L0 23.9988H13.4475L23.9988 0V13.4475L48 23.9988H34.5526L23.9988 48Z"
              fill="#1AE19D"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_35_1397">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
