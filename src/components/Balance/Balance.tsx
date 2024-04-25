// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { ReactNode } from 'react';

import { ComponentPropsWithoutRef } from 'react';
import { MassaLogo } from '../Icons/Svg/Massa/MassaLogo';

export interface BalanceProps extends ComponentPropsWithoutRef<'div'> {
  size?: 'xs' | 'md' | 'lg' | undefined;
  amount: string;
  symbol?: string;
  icon?: ReactNode;
  equal?: string;
  customClass?: string;
}

export function Balance(props: BalanceProps) {
  const {
    size = 'lg',
    amount,
    symbol,
    icon: iconProps,
    equal,
    customClass = '',
  } = props;

  const isLg = size === 'lg';
  const isMd = size === 'md';
  const sizeClass = isLg
    ? 'mas-banner mb-1'
    : isMd
    ? 'mas-banner text-2xl mb-1'
    : 'mas-buttons mb-0.5';
  const iconClass = isLg || isMd ? 'mr-2' : 'mr-1';
  const logoClass = isLg || isMd ? 32 : 16;

  let icon = iconProps;
  if (!iconProps) {
    icon = <MassaLogo size={logoClass} className={iconClass} />;
  }

  return (
    <div
      data-testid="balance"
      className={`flex items-center w-fit ${customClass}`}
    >
      {icon}
      <label
        data-testid="balance-amount"
        className={`${sizeClass} text-f-primary`}
      >
        {amount} {symbol}
      </label>
      {equal ? (
        <label
          data-testid="balance-equal"
          className="ml-2 mt-3 body2 text-info"
        >
          ≈ {equal}
        </label>
      ) : null}
    </div>
  );
}
