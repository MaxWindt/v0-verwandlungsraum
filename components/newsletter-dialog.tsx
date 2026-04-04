'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function IframeWithSpinner({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full" style={{ height: '560px' }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin" />
        </div>
      )}
      <iframe
        loading="lazy"
        className={`w-full h-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        src={src}
        title={title}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

interface NewsletterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsletterDialog({ open, onOpenChange }: NewsletterDialogProps) {
  const { t } = useLanguage();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">
            {t('contact.newsletterDialogTitle')}
          </DialogTitle>
        </DialogHeader>
        <IframeWithSpinner
          src="https://newsletter.verwandlungsraum.de/subscription/form"
          title={t('contact.newsletterDialogTitle')}
        />
      </DialogContent>
    </Dialog>
  );
}
