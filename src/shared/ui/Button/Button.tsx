import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib';
import s from './Button.module.css';

type Variant = 'primary' | 'ghost' | 'light';

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type LinkProps = CommonProps & { href: string };
type NativeProps = CommonProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: LinkProps | NativeProps) {
  const { variant = 'primary', children, className } = props;
  const classes = cn(s.btn, s[variant], className);

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, children: _c, className: _cn, href: _h, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
