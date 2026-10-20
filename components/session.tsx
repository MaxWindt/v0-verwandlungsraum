'use client';

import { useLanguage } from '@/contexts/language-context';
import { RichText, hasRichText } from '@/lib/richtext';
import type { RichTextData, SiteContent } from '@/lib/content-types';

const BULLET_LIST = 'list-disc list-inside space-y-2 bg-transparent p-0';

function Block({ value, fallback }: { value: RichTextData | null | undefined; fallback: React.ReactNode }) {
  if (hasRichText(value)) {
    return <RichText data={value} lists={{ bullet: BULLET_LIST }} />;
  }
  return <>{fallback}</>;
}

export default function Session({ siteContent: ss }: { siteContent: SiteContent }) {
  const { t } = useLanguage();

  return (
    <section id="session" className="py-[0]">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto content-box">
          {/* Rahmenbedingungen und Preise Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mb-4">{t('session.title')}</h2>
          </div>

          <div className="relative mb-12 sm:mb-16">
            {/* Kein Hintergrund für Preise-Tabelle */}
            <div className="relative rounded-3xl p-0 sm:p-0 md:p-0 lg:p-0">
              <div className="max-w-5xl mx-auto text-base sm:text-lg leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Left Column */}
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">
                        {ss.sessionPricesTitle || t('session.pricesTitle')}
                      </h3>
                      <Block
                        value={ss.sessionPricesContent}
                        fallback={
                          <>
                            <p>{t('session.price1')}</p>
                            <p>{t('session.price2')}</p>
                            <p>{t('session.starterPackage')}</p>
                            <p>{t('session.priceNote')}</p>
                          </>
                        }
                      />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">
                        {ss.sessionBillingTitle || t('session.billingTitle')}
                      </h3>
                      <Block
                        value={ss.sessionBillingContent}
                        fallback={
                          <>
                            <p>{t('session.billing1')}</p>
                            <p className="text-left">{t('session.billing2')}</p>
                            <p className="text-left">{t('session.billing3')}</p>
                          </>
                        }
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">
                        {ss.sessionAdvantagesTitle || t('session.advantagesTitle')}
                      </h3>
                      <Block
                        value={ss.sessionAdvantagesContent}
                        fallback={
                          <ul className={BULLET_LIST}>
                            <li>{t('session.advantage1')}</li>
                            <li>{t('session.advantage2')}</li>
                            <li>{t('session.advantage3')}</li>
                            <li>{t('session.advantage4')}</li>
                          </ul>
                        }
                      />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">
                        {ss.sessionCancellationTitle || t('session.cancellationTitle')}
                      </h3>
                      <Block
                        value={ss.sessionCancellationContent}
                        fallback={
                          <>
                            <p>{t('session.cancellation1')}</p>
                            <p className="text-left">{t('session.cancellation2')}</p>
                          </>
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Disclaimer – full width, small and muted */}
                <div className="text-xs text-muted-foreground mt-8 leading-relaxed">
                  <span className="font-semibold">
                    {ss.sessionDisclaimerTitle || t('session.disclaimerTitle')}:
                  </span>{' '}
                  <Block
                    value={ss.sessionDisclaimerContent}
                    fallback={<span>{t('session.disclaimerText')}</span>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
