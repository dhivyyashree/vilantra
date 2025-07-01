// components/AnimatedVilantraLogo.tsx
export default function AnimatedVilantraLogo() {
    return (
      <svg
        width="190"
        height="50"
        viewBox="0 0 240 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          .stroke-path {
            stroke: #E89CA7;
            stroke-width: 5;
            fill: none;
            stroke-linecap: round;
            stroke-dasharray: 150;
            stroke-dashoffset: 150;
            animation: draw 2s forwards;
          }
          .text {
            font-family: 'Playfair Display', serif;
            font-size: 46px;
            fill: #333333;
            font-weight: 600;
            opacity: 0;
            animation: fadeIn 1.5s forwards;
            animation-delay: 0.7s;
          }
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}</style>
  
        <text className="text" x="40" y="55">
          Vilantra
        </text>
        <path
          className="stroke-path"
          d="M25 40 C30 10, 50 10, 55 40 S65 70, 40 60"
        />
      </svg>
    );
  }
  