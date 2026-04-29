'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="py-32 px-6 bg-ink-black border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-4 group" data-cursor="hover">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-tato-blue to-frozen-lake flex items-center justify-center p-0.5 group-hover:rotate-[360deg] transition-transform duration-1000 overflow-hidden">
                  <div className="relative w-full h-full bg-ink-black rounded-[14px] flex items-center justify-center overflow-hidden">
                    <Image 
                      src="https://lh3.googleusercontent.com/d/1gkUU4cmXI1rMSRs0FRcyRnDf-2BOfexB"
                      alt="Tato Logo"
                      fill
                      className="object-contain p-2"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="relative h-24 w-96 ml-1">
                  <Image 
                    src="https://lh3.googleusercontent.com/d/1qixjD_u3wHQm_fAzfFJeQR9NwIcRJ3xg"
                    alt="Tato Digital"
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </Link>
              <p className="text-2xl md:text-3xl text-grey font-medium leading-tight max-w-md">
                {t.footer.strategy}
              </p>
            </div>

              <div className="flex gap-6">
                <SocialLink href="#" icon={<Linkedin size={24} />} data-cursor="expand" />
                <SocialLink href="#" icon={<Instagram size={24} />} data-cursor="expand" />
                <SocialLink href={`mailto:${t.footer.contactEmail}`} icon={<Mail size={24} />} data-cursor="expand" />
              </div>
            </div>
  
            <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h4 className="text-[10px] font-mono font-black text-grey uppercase tracking-[0.4em]">{t.footer.navTitle}</h4>
                <div className="flex flex-col gap-4">
                  {['home', 'solutions', 'products', 'method', 'portfolio'].map((key) => (
                    <Link 
                      key={key} 
                      href={key === 'home' ? '/' : `#${key}`} 
                      data-cursor="hover"
                      className="text-lg font-display font-bold text-porcelain hover:text-frozen-lake transition-colors uppercase tracking-tight"
                    >
                      {t.nav[key]}
                    </Link>
                  ))}
                </div>
              </div>
  
              <div className="space-y-8">
                <h4 className="text-[10px] font-mono font-black text-grey uppercase tracking-[0.4em]">{t.footer.connectTitle}</h4>
                <div className="space-y-6">
                  <a 
                    href={`mailto:${t.footer.contactEmail}`} 
                    data-cursor="hover"
                    className="text-2xl font-display font-black text-white hover:text-frozen-lake transition-colors flex items-center gap-2 group"
                  >
                    {t.footer.contactEmail}
                    <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <div className="text-sm font-mono text-grey tracking-widest uppercase">
                  {t.footer.locations}
                </div>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 glass">
                  <div className="w-2 h-2 rounded-full bg-yellow-green animate-pulse" />
                  <span className="text-[10px] font-mono font-black text-frozen-lake uppercase tracking-widest">{t.footer.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-mono font-black text-grey uppercase tracking-widest">
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-8">
             <Link href="#" className="text-[10px] font-mono font-black text-grey hover:text-frozen-lake transition-colors uppercase tracking-widest">{t.footer.privacy}</Link>
             <Link href="#" className="text-[10px] font-mono font-black text-grey hover:text-frozen-lake transition-colors uppercase tracking-widest">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, ...props }: { href: string, icon: React.ReactNode, [key: string]: any }) {
  return (
    <a 
      href={href} 
      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-porcelain hover:bg-frozen-lake hover:text-ink-black hover:border-transparent transition-all duration-500 hover:-translate-y-1"
      {...props}
    >
      {icon}
    </a>
  );
}
