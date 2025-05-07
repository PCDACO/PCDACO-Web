import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import Image from 'next/image';

interface Props {
  src: string;
  open: boolean;
  onClose: () => void;
}

const ImageModal = ({ src, open, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className='min-w-[1000] min-h-[750] max-w-[1000] max-h-[750] opacity-90'>
        <Image
          src={src}
          alt="Preview"
          fill
          className='max-h-[700] mx-auto my-auto object-contain py-4'
        />
      </DialogContent>
    </Dialog>
  );
}

export default ImageModal;
