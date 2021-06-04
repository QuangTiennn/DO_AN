import React from 'react';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

toast.configure({
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export const Toastify = ({ msg = '', type }) => {
  return toast[type](msg);
};
