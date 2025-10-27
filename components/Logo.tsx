import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ className = '', isScrolled = false }: { className?: string; isScrolled?: boolean }) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/logo.svg"
        alt="361 Degustation Logo"
        width={50}
        height={50}
        className="hover:scale-110 transition-transform duration-300"
        priority
      />
      <div className="hidden md:block">
        <div className={`font-display text-xl font-bold transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}>
          361<span className="text-accent-gold">°</span>
        </div>
        <div className={`text-xs -mt-1 transition-colors ${isScrolled ? 'text-gray-600' : 'text-gray-300'}`}>Degustation</div>
      </div>
    </Link>
  );
}

