interface IProps {
  color?: string;
}

const PeopleBlueSvg = ({ color }: IProps) => {
  return (
    <svg width={20} height={22} fill="none">
      <path
        fill="url(#a)"
        d="M10 11c-1.285 0-2.527-.574-3.5-1.615-.945-1.016-1.522-2.37-1.624-3.813-.11-1.538.36-2.953 1.32-3.985C7.158.557 8.5 0 10 0c1.49 0 2.836.566 3.794 1.595.967 1.039 1.437 2.451 1.329 3.977-.105 1.444-.682 2.798-1.625 3.812C12.528 10.426 11.286 11 10 11Zm8.24 11H1.761a1.732 1.732 0 0 1-1.375-.667 1.889 1.889 0 0 1-.329-1.612c.527-2.113 1.83-3.865 3.77-5.067C5.55 13.588 7.742 13 10 13c2.303 0 4.438.563 6.17 1.628 1.944 1.196 3.25 2.958 3.773 5.097a1.892 1.892 0 0 1-.333 1.611 1.73 1.73 0 0 1-1.37.664Z"
      />
      <defs>
        <linearGradient id="a" x1={2} x2={19.5} y1={0.5} y2={22} gradientUnits="userSpaceOnUse">
          <stop stopColor={color ? color : '#7FB7BE'} />
          <stop offset={0.516} stopColor={color ? color : '#51858C'} />
          <stop offset={1} stopColor={color ? color : '#256772'} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PeopleBlueSvg;
