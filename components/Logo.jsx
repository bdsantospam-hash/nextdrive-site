export default function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="42" height="42" rx="9" fill="#3D5A6C" />
      <path d="M12 31V13" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M12 13L26 31" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 31V13" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="13" r="3" fill="#C9A66B" />
    </svg>
  );
}
