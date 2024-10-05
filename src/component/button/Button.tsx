import { useLocale } from '@/hooks/useLocale';
import Link from 'next/link';

interface ButtonProps {
  label: string;
  url?: string;
  type?: 'primary' | 'danger';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, url, type = 'primary', disabled = false, className = '', onClick }) => {
    const {language} = useLocale();

    if (url) {
        url = `/${language}${url}`;
    }

    return (
        <button
        className={`p-3 font-bold rounded-[50px] w-full 
            ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-active hover:bg-excited text-content_b'}
            ${type === 'danger' ? 'bg-danger text-white' : 'bg-active hover:bg-excited'}
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
