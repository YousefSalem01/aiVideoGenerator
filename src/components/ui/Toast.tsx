import React from 'react';
import { Toaster, toast as hotToast, ToastOptions } from 'react-hot-toast';

type ToastKind = 'success' | 'info' | 'warn' | 'danger' | 'error';

interface Options {
  duration?: number;
  id?: string;
  delay?: number;
  style?: React.CSSProperties;
}

const variantStyles: Record<Exclude<ToastKind, 'error'>, React.CSSProperties> = {
  success: {
    background: '#ecfdf5',
    color: '#065f46',
    border: '1px solid #d1fae5',
  },
  info: {
    background: '#eff6ff',
    color: '#1d4ed8',
    border: '1px solid #dbeafe',
  },
  warn: {
    background: '#fffbeb',
    color: '#92400e',
    border: '1px solid #fef3c7',
  },
  danger: {
    background: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fee2e2',
  },
};

const show = (kind: ToastKind, message: string, options?: Options) => {
  const { duration = 4000, id, delay = 0, style: customStyle } = options || {};
  const defaultStyle = variantStyles[kind === 'error' ? 'danger' : kind];
  const style = customStyle || defaultStyle;
  const toastFn = kind === 'success' ? hotToast.success
    : kind === 'info' ? hotToast
    : kind === 'warn' ? hotToast
    : hotToast.error;

  const toastOptions: ToastOptions = { id, duration, style };

  if (delay > 0) {
    setTimeout(() => toastFn(message, toastOptions), delay);
  } else {
    toastFn(message, toastOptions);
  }
};

export const Toast = {
  success: (msg: string, options?: Options) => show('success', msg, options),
  info: (msg: string, options?: Options) => show('info', msg, options),
  warn: (msg: string, options?: Options) => show('warn', msg, options),
  danger: (msg: string, options?: Options) => show('danger', msg, options),
  error: (msg: string, options?: Options) => show('error', msg, options),
};

export const ToastContainer = () => (
  <Toaster position="top-right" />
);

export default Toast;


