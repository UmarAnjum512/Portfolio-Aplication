// Chhote inline SVG icons (koi extra package nahi chahiye)
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const make = (children, extra = {}) =>
  function Icon({ size = 20, ...props }) {
    return (
      <svg {...base} {...extra} width={size} height={size} {...props}>
        {children}
      </svg>
    );
  };

export const GithubIcon = make(
  <path d="M12.001 2C6.476 2 2.001 6.475 2.001 12c0 4.425 2.863 8.163 6.838 9.488.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.287-.6-1.175-1.025-1.412-.35-.188-.85-.65-.012-.663.787-.012 1.35.725 1.537 1.025.9 1.512 2.338 1.087 2.913.825.087-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.087.387-1.987 1.025-2.687-.1-.25-.45-1.275.1-2.65 0 0 .837-.263 2.75 1.025a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.113 2.5.338 1.912-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-9.999-10Z" fill="currentColor" stroke="none" />
);
export const LinkedinIcon = make(
  <path d="M18.336 18.339h-2.665v-4.177c0-.996-.02-2.278-1.389-2.278-1.39 0-1.602 1.084-1.602 2.205v4.25H10.014V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715ZM7.004 8.575a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096Zm1.336 9.764H5.667V9.75H8.34v8.589ZM19.67 3H4.329C3.595 3 3.001 3.58 3.001 4.297v15.406C3.001 20.42 3.595 21 4.329 21h15.338c.734 0 1.334-.58 1.334-1.297V4.297C21.001 3.58 20.401 3 19.667 3h.003Z" fill="currentColor" stroke="none" />
);
export const MailIcon = make(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </>
);
export const PhoneIcon = make(
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
);
export const WhatsappIcon = make(
  <>
    <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21Z" />
    <path d="M9 10c.5 2 2 3.5 4 4l1.2-1.2a.8.8 0 0 1 .8-.2l1.6.6c.3.1.5.4.4.7-.3 1-1.2 1.6-2.2 1.5C10.7 15 8.1 12.4 7.6 9.4c-.1-1 .5-1.9 1.5-2.2.3-.1.6.1.7.4l.6 1.6c.1.3 0 .6-.2.8L9 10Z" />
  </>
);
export const DownloadIcon = make(
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </>
);
export const ExternalIcon = make(
  <>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </>
);
export const ArrowRightIcon = make(
  <>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </>
);
export const MapPinIcon = make(
  <>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>
);
export const BriefcaseIcon = make(
  <>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </>
);
export const CapIcon = make(
  <>
    <path d="m22 10-10-5L2 10l10 5 10-5Z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </>
);
export const AwardIcon = make(
  <>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
  </>
);
export const CodeIcon = make(
  <>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
  </>
);
export const DatabaseIcon = make(
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </>
);
export const LayoutIcon = make(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </>
);
export const RocketIcon = make(
  <>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.9 12.9 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2Z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </>
);
export const CheckIcon = make(<path d="M20 6 9 17l-5-5" />);
export const EyeIcon = make(
  <>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </>
);
export const GlobeIcon = make(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
  </>
);
export const HomeIcon = make(
  <>
    <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" />
    <path d="M9 21V12h6v9" />
  </>
);
export const UserIcon = make(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </>
);
export const FolderIcon = make(
  <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" />
);
export const SendIcon = make(
  <>
    <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    <path d="M22 2 11 13" />
  </>
);
export const FileIcon = make(
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
    <path d="M14 2v6h6" />
  </>
);
