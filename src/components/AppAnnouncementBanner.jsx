'use client';

import React, { useState, useEffect } from 'react';
import { X, Smartphone, Play, Info, CheckCircle2, MessageCircle, ExternalLink, ChevronRight, Bell, Sparkles, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

const AppAnnouncementBanner = ({ variant = 'global' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isClient || !isVisible) return null;

  const features = [
    { title: "Instant Temporary Email", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
    { title: "Real-time Inbox Updates", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
    { title: "Multiple Email Domains", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
    { title: "Auto OTP Detection", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
    { title: "Privacy Focused & Free", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
    { title: "Modern & Clean UI", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
  ];

  const steps = [
    { text: "Join WhatsApp Channel for updates", url: "https://whatsapp.com/channel/0029VbBkfHVHFxOxiD03Kr14", icon: <MessageCircle size={18} /> },
    { text: "Join ID2 Testers Google Group", url: "https://groups.google.com/g/od2-testers/", icon: <Info size={18} /> },
    { text: "Install App from Play Store", url: "https://play.google.com/store/apps/details?id=in.od2.tm_temp_mail", icon: <Download size={18} />, highlight: true },
    { text: "Submit Feedback & Review", url: "https://docs.google.com/forms/d/e/1FAIpQLSeT-utY3hk7blppdWQsDc9zx4m4qczcXcQLEryv3g8aktZwTg/viewform?usp=dialog", icon: <ExternalLink size={18} /> },
  ];

  return (
    <div className={`relative w-full ${variant === 'global' ? 'z-[60]' : 'mb-6'}`}>
      <div className={`
        relative overflow-hidden
        ${variant === 'global' ? 'bg-indigo-600' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl border border-white/10'}
        px-4 py-3 sm:px-6 lg:px-8
      `}>
        {/* Animated background element */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-white/20 blur-3xl transform -skew-x-12 animate-pulse"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-white/20 blur-3xl transform -skew-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20 hidden xs:flex">
              <Smartphone className="text-white h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="flex items-center gap-2">
                <p className="text-white font-bold text-sm sm:text-base leading-tight">
                  OD2 Temp Mail Android App is LIVE! 🎉
                </p>
                <span className="bg-emerald-400 text-[10px] font-black tracking-tighter text-emerald-950 px-1.5 py-0.5 rounded leading-none">V1.0</span>
              </span>
              <p className="text-indigo-100 text-[10px] sm:text-xs font-medium">
                Get Early Access today on Google Play Store
              </p>
            </div>
          </div>

          <div className="flex items-center  gap-3 w-full sm:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="w-full sm:w-auto bg-white hover:bg-white/90 text-indigo-700 font-bold border-0 shadow-lg group"
                >
                  Get Access
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 border-indigo-500/20 shadow-2xl z-[100]">
                <DialogHeader>
                  <DialogTitle className="flex flex-col items-center gap-4 text-center">
                    <div className="bg-indigo-600 p-4 rounded-3xl shadow-xl shadow-indigo-600/30">
                      <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl tracking-tight">
                        OD2 Temp Mail <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Early Access</span>
                      </h2>
                      <p className="text-slate-500 font-medium text-sm mt-1">Our app is now available for testing on Google Play!</p>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {/* Left Column: Features */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <Sparkles size={18} className="text-indigo-500" />
                      Key Features
                    </h3>
                    <div className="grid gap-2">
                      {features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5">
                          {f.icon}
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{f.title}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-500/10">
                      <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                        <Bell size={14} />
                        How Testing Works (16-Day Streak)
                      </p>
                      <ul className="text-[11px] space-y-1.5 text-indigo-900/70 dark:text-indigo-200/60 leading-relaxed list-disc pl-4">
                        <li>Install the app using the registered Google Group email</li>
                        <li>Maintain the app for a minimum of 16 days</li>
                        <li>Check temp mail daily in the specified format</li>
                        <li>Confirm your Checkin via the email link</li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Links */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <ExternalLink size={18} className="text-indigo-500" />
                      Important Links
                    </h3>
                    <div className="space-y-3">
                      {steps.map((step, i) => (
                        <a 
                          key={i} 
                          href={step.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`
                            flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group
                            ${step.highlight 
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/20' 
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/50'}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`${step.highlight ? 'bg-white/20' : 'bg-slate-100 dark:bg-indigo-900/30'} p-2 rounded-xl`}>
                              {step.icon}
                            </div>
                            <span className="text-sm font-bold truncate max-w-[150px] text-wrap sm:max-w-none">{step.text}</span>
                          </div>
                          <ChevronRight size={18} className={`${step.highlight ? 'text-white' : 'text-slate-400'} group-hover:translate-x-1 transition-transform`} />
                        </a>
                      ))}
                    </div>

                    <div className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5">
                      <p className="text-[11px] text-slate-400 font-medium mb-3 uppercase tracking-wider">Ready to Download?</p>
                      <a href="https://play.google.com/store/apps/details?id=in.od2.tm_temp_mail" target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center justify-center p-1 bg-black rounded-xl hover:opacity-90 transition-opacity cursor-pointer">
                          <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                            alt="Get it on Google Play" 
                            className="h-10 sm:h-12"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <p className="text-xs italic text-slate-400">— Team OD2</p>
                </div>
              </DialogContent>
            </Dialog>
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppAnnouncementBanner;
