interface IProps {
  color?: string;
}

const ChatBlueSvg = ({ color }: IProps) => {
  return (
    <svg width={22} height={22} fill="none">
      <path
        fill="url(#a)"
        d="M22 11c0-6.075-4.925-11-11-11S0 4.925 0 11s4.925 11 11 11a10.956 10.956 0 0 0 5.244-1.328l4.529 1.288a.963.963 0 0 0 1.189-1.189l-1.288-4.53A10.954 10.954 0 0 0 22 11Zm-6.6-2.063c0 .38-.308.688-.688.688H7.288a.688.688 0 0 1 0-1.375h7.426c.379 0 .687.308.687.688Zm-.688 3.438a.687.687 0 1 1 0 1.375H9.489a.687.687 0 1 1 0-1.375h5.225Z"
      />
      <defs>
        <linearGradient id="a" x1={4} x2={21.5} y1={2.5} y2={21.5} gradientUnits="userSpaceOnUse">
          <stop stopColor={color ? color : '#7FB7BE'} />
          <stop offset={0.51} stopColor={color ? color : '#51858C'} />
          <stop offset={1} stopColor={color ? color : '#256772'} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ChatBlueSvg;
