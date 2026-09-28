import { useState, useCallback } from 'react';

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'INR (₹)' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, label: 'EUR (€)' },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.044, label: 'AED (د.إ)' }
};

/**
 * Custom hook for currency selection, conversion, and formatting
 */
export function useCurrency(initialCode = 'INR') {
  const [currencyCode, setCurrencyCode] = useState(initialCode);

  const currentCurrency = CURRENCIES[currencyCode] || CURRENCIES.INR;

  const convertPrice = useCallback((inrAmount) => {
    return Math.round(inrAmount * currentCurrency.rate);
  }, [currentCurrency]);

  const formatPrice = useCallback((inrAmount) => {
    const converted = Math.round(inrAmount * currentCurrency.rate);
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  }, [currentCurrency]);

  return {
    currencyCode,
    setCurrencyCode,
    currentCurrency,
    availableCurrencies: Object.values(CURRENCIES),
    convertPrice,
    formatPrice
  };
}
