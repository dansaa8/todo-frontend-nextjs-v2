export default function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M8.5 2A6.5 6.5 0 1015 8.5 6.507 6.507 0 008.5 2zm0 12A5.5 5.5 0 1114 8.5 5.506 5.506 0 018.5 14zm4-5.5a.5.5 0 01-.5.5H8.5a.5.5 0 01-.5-.5V5a.5.5 0 111 0v3h3a.5.5 0 01.5.5z"
          fill="currentColor" // Use currentColor to inherit the color from parent
        />
      </svg>
    );
  }
  