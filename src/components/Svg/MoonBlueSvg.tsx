interface IProps {
  color?: string;
}

const MoonBlueSvg = ({ color }: IProps) => {
  return (
    <svg width={22} height={22} fill="none">
      <path
        fill="url(#a)"
        fillRule="evenodd"
        d="M7.906.238a.815.815 0 0 1 .176.89 9.744 9.744 0 0 0-.75 3.762 9.777 9.777 0 0 0 9.778 9.777 9.743 9.743 0 0 0 3.762-.75.815.815 0 0 1 1.066 1.065A11.41 11.41 0 0 1 11.407 22C5.107 22 0 16.893 0 10.593 0 5.848 2.897 1.781 7.018.063a.815.815 0 0 1 .888.175Z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient id="a" x1={11} x2={11} y1={0} y2={22} gradientUnits="userSpaceOnUse">
          <stop stopColor={color ? color : '#7FB7BE'} />
          <stop offset={0.505} stopColor={color ? color : '#51858C'} />
          <stop offset={1} stopColor={color ? color : '#256772'} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default MoonBlueSvg;
