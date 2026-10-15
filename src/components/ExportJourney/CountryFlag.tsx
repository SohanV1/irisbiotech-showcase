import React from 'react';

interface CountryFlagProps {
  code: string;
  className?: string;
  alt?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  code,
  className = 'w-5 h-3.5 object-cover rounded-xs shadow-xs inline-block',
  alt = '',
}) => {
  if (!code) return null;
  const c = code.toLowerCase().trim();
  const flagCode = c === 'uk' ? 'gb' : c;

  return (
    <img
      src={`https://flagcdn.com/${flagCode}.svg`}
      alt={alt || code}
      className={className}
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLElement).style.display = 'none';
      }}
    />
  );
};
