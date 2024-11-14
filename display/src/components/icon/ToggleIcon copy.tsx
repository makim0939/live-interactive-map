const ToggleIcon = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#252528"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: '.1s', ...style }}
    >
      <mask
        id="mask0_9_432"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect x="24" width="24" height="24" transform="rotate(90 24 0)" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_9_432)">
        <path d="M22 12L3 23V1L22 12Z" />
      </g>
    </svg>
  );
};

export default ToggleIcon;
