import { useLocale } from '@/hooks/useLocale';
import Link from 'next/link';

interface ButtonProps {
  label: string;
  url?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, url, disabled = false, className = '', onClick }) => {
    const {language} = useLocale();

    if (url) {
        url = `/${language}${url}`;
    }

    return (
        <button
        className={`p-3 font-bold rounded-[50px] w-full 
            ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-active hover:bg-excited text-content_b'}
            ${className ? className : ""}
            `}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            >
            {url && !disabled && (
                <Link className="w-full block text-content_b" href={url}>{label}</Link>
            )}
            {(!url || disabled) && <span className="w-full block text-content_b">{label}</span>}
        </button>
    );
};

export default Button;
