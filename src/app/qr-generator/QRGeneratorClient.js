'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import Head from 'next/head';
import {
  Type, Link, Mail, Phone, MessageSquare, Wifi, MapPin,
  User, Calendar, AppWindow, Database, Download,
  Settings, Image as ImageIcon, Palette, ShieldCheck,
  RefreshCcw, Copy, Share2, AlertCircle, CheckCircle2,
  DownloadCloud, Smartphone, Layout, Pipette, Check, ImagePlus,
  Maximize, CornerUpRight, FileJson, Info, Globe, ChevronRight,
  Zap, Sparkles, Layers, Loader2,
} from 'lucide-react';
import JSZip from 'jszip';
import { trackQRGeneration, trackQRExport, trackEvent } from '@/lib/analytics';

const QR_TYPES = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'text', label: 'Text', icon: Type },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'vcard', label: 'vCard', icon: User },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'event', label: 'Event', icon: Calendar },
  { id: 'app', label: 'App Stores', icon: AppWindow },
  { id: 'raw', label: 'Raw Data', icon: Database },
];

const ERROR_CORRECTION_LEVELS = ['L', 'M', 'Q', 'H'];
const DOT_STYLES = ['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'];
const CORNER_SQUARE_STYLES = ['dot', 'square', 'extra-rounded'];
const CORNER_DOT_STYLES = ['dot', 'square'];

const BRAND_LOGOS = [
  { id: 'none', label: 'No Logo', color: '#000000', logo: null },
  { id: 'whatsapp', label: 'WhatsApp', color: '#25D366', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
  { id: 'instagram', label: 'Instagram', color: '#E4405F', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg' },
  { id: 'linkedin', label: 'LinkedIn', color: '#0077B5', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg' },
  { id: 'google', label: 'Google', color: '#4285F4', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' },
  { id: 'apple', label: 'Apple', color: '#000000', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
];

const DESIGN_PRESETS = [
  {
    id: 'midnight',
    name: 'Midnight',
    desc: 'Deep blues & purples',
    type: 'gradient',
    dotsOptions: {
      type: 'rounded',
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [{ offset: 0, color: '#3b82f6' }, { offset: 1, color: '#8b5cf6' }]
      }
    },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { type: 'extra-rounded', color: '#3b82f6' },
    cornersDotOptions: { type: 'dot', color: '#8b5cf6' }
  },
  {
    id: 'lush',
    name: 'Lush',
    desc: 'Fresh greens',
    type: 'gradient',
    dotsOptions: {
      type: 'dots',
      gradient: {
        type: 'linear',
        rotation: 120,
        colorStops: [{ offset: 0, color: '#10b981' }, { offset: 1, color: '#059669' }]
      }
    },
    backgroundOptions: { color: '#f0fdf4' },
    cornersSquareOptions: { type: 'extra-rounded', color: '#059669' },
    cornersDotOptions: { type: 'dot', color: '#10b981' }
  },
  {
    id: 'fire',
    name: 'Fire',
    desc: 'Warm oranges & reds',
    type: 'gradient',
    dotsOptions: {
      type: 'classy',
      gradient: {
        type: 'linear',
        rotation: 0,
        colorStops: [{ offset: 0, color: '#f97316' }, { offset: 1, color: '#ef4444' }]
      }
    },
    backgroundOptions: { color: '#fff7ed' },
    cornersSquareOptions: { type: 'extra-rounded', color: '#ef4444' },
    cornersDotOptions: { type: 'dot', color: '#f97316' }
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Timeless black & white',
    type: 'solid',
    dotsOptions: { color: '#000000', type: 'square', gradient: null },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { type: 'square', color: '#000000' },
    cornersDotOptions: { type: 'square', color: '#000000' }
  },
  {
    id: 'social',
    name: 'Social',
    desc: 'Vibrant social tones',
    type: 'solid',
    dotsOptions: { color: '#E4405F', type: 'rounded', gradient: null },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { type: 'extra-rounded', color: '#E4405F' },
    cornersDotOptions: { type: 'dot', color: '#25D366' }
  },
];

export default function QRGeneratorClient() {
  const [activeType, setActiveType] = useState('url');
  const [qrData, setQrData] = useState({
    url: 'https://od2.in',
    text: '',
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    email: { address: '', subject: '', body: '' },
    phone: '',
    sms: { countryCode: '91', phone: '', message: '' },
    whatsapp: { countryCode: '91', phone: '', message: '' },
    location: { lat: '', lng: '' },
    vcard: { firstName: '', lastName: '', phone: '', email: '', company: '', jobTitle: '', website: '' },
    event: { title: '', description: '', location: '', start: '', end: '' },
    app: { ios: '', android: '' },
    raw: '',
  });

  const [options, setOptions] = useState({
    width: 1000,
    height: 1000,
    margin: 20,
    type: 'svg',
    data: 'https://od2.in',
    image: null,
    dotsOptions: {
      color: '#000000',
      type: 'square',
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 15,
      hideBackgroundDots: true,
      imageSize: 0.20,
    },
    cornersSquareOptions: {
      color: '#000000',
      type: 'square',
    },
    cornersDotOptions: {
      color: '#000000',
      type: 'square',
    },
    qrOptions: {
      errorCorrectionLevel: 'M',
      typeNumber: 0,
    },
  });

  const [qrCode, setQrCode] = useState(null);
  const qrRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isAutoH, setIsAutoH] = useState(false);
  const [contrastWarning, setContrastWarning] = useState(false);
  // const [isRendering, setIsRendering] = useState(false); // Removed per user request
  const [renderTimeout, setRenderTimeout] = useState(null);
  const [errors, setErrors] = useState({});
  const [colorMode, setColorMode] = useState('solid'); // 'solid' | 'gradient'
  const [downloadSettings, setDownloadSettings] = useState({
    transparentBg: false,
    quality: 'hd' // 'hd' | 'uhd'
  });

  const validateField = (type, value) => {
    let error = '';
    if (!value) return '';

    switch (type) {
      case 'url':
        if (!/^https?:\/\/.*/i.test(value)) error = 'Must start with http:// or https://';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
        break;
      case 'phone':
      case 'whatsapp':
        if (!/^\d{5,15}$/.test(value.replace(/\D/g, ''))) error = 'Invalid phone number';
        break;
    }
    return error;
  };

  const checkContrast = (color1, color2) => {
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const getLuminance = (rgb) => {
      const a = [rgb.r, rgb.g, rgb.b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) return true;

    const l1 = getLuminance(rgb1);
    const l2 = getLuminance(rgb2);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return ratio > 3.0; // Minimal readable ratio
  };

  const handleDataChange = (field, value) => {
    let fieldToValidate = typeof field === 'string' ? activeType : Object.keys(field)[0];
    let valueToValidate = typeof field === 'string' ? value : Object.values(field)[0];

    const error = validateField(fieldToValidate, valueToValidate);
    setErrors(prev => ({ ...prev, [fieldToValidate]: error }));

    if (typeof field === 'string') {
      setQrData(prev => ({ ...prev, [activeType]: value }));
    } else {
      setQrData(prev => ({
        ...prev,
        [activeType]: { ...prev[activeType], ...field }
      }));
    }
  };

  const handleApplyPreset = (preset) => {
    setOptions(prev => ({
      ...prev,
      dotsOptions: { ...prev.dotsOptions, ...preset.dotsOptions },
      backgroundOptions: { ...prev.backgroundOptions, ...preset.backgroundOptions },
      cornersSquareOptions: { ...prev.cornersSquareOptions, ...preset.cornersSquareOptions },
      cornersDotOptions: { ...prev.cornersDotOptions, ...preset.cornersDotOptions },
    }));
    setColorMode(preset.type === 'gradient' ? 'gradient' : 'solid');
    trackEvent('preset_applied', { preset: preset.name });
  };

  const handleLogoChange = (logoUrl, label) => {
    if (!logoUrl) {
      removeLogo();
      return;
    }
    const brand = BRAND_LOGOS.find(b => b.logo === logoUrl);
    if (!brand) return;

    setOptions(prev => ({
      ...prev,
      image: logoUrl,
      qrOptions: { ...prev.qrOptions, errorCorrectionLevel: 'H' },
      dotsOptions: { ...prev.dotsOptions, color: brand.color },
      cornersSquareOptions: { ...prev.cornersSquareOptions, color: brand.color },
      cornersDotOptions: { ...prev.cornersDotOptions, color: brand.color },
      imageOptions: { ...prev.imageOptions, hideBackgroundDots: true }
    }));
    setIsAutoH(true);
    trackEvent('brand_logo_applied', { brand: label });
  };

  useEffect(() => {
    const isReadable = checkContrast(options.dotsOptions.color, options.backgroundOptions.color);
    setContrastWarning(!isReadable);
  }, [options.dotsOptions.color, options.backgroundOptions.color]);

  // Initialize QR Code Styling once
  useEffect(() => {
    if (typeof window !== 'undefined' && qrRef.current) {
      const qrElement = new QRCodeStyling(options);
      qrRef.current.innerHTML = '';
      qrElement.append(qrRef.current);
      setQrCode(qrElement);
    }
  }, []);

  // Update QR Code for option changes
  useEffect(() => {
    if (qrCode) {
      if (renderTimeout) clearTimeout(renderTimeout);

      const timeout = setTimeout(async () => {
        try {
          await qrCode.update(options);
        } catch (e) {
          console.error("QR Render Error", e);
        }
      }, 300); // Debounce rendering for performance
      setRenderTimeout(timeout);
    }
  }, [qrCode, options]);

  // Rebuild QR when image or image sizing changes to match download rendering
  useEffect(() => {
    if (qrRef.current && typeof window !== 'undefined') {
      const rebuilt = new QRCodeStyling(options);
      qrRef.current.innerHTML = '';
      rebuilt.append(qrRef.current);
      setQrCode(rebuilt);
    }
  }, [options.image, options.imageOptions.imageSize]);

  // Update data based on active type
  useEffect(() => {
    let finalData = '';
    const d = qrData;

    switch (activeType) {
      case 'url': finalData = d.url; break;
      case 'text': finalData = d.text; break;
      case 'wifi': finalData = `WIFI:T:${d.wifi.encryption};S:${d.wifi.ssid};P:${d.wifi.password};;`; break;
      case 'email': finalData = `MATMSG:TO:${d.email.address};SUB:${d.email.subject};BODY:${d.email.body};;`; break;
      case 'phone': finalData = `tel:${d.phone}`; break;
      case 'sms':
        const smsPhone = `${d.sms.countryCode}${d.sms.phone.replace(/\D/g, '')}`;
        finalData = `SMSTO:${smsPhone}:${d.sms.message}`;
        break;
      case 'whatsapp':
        const waPhone = `${d.whatsapp.countryCode}${d.whatsapp.phone.replace(/\D/g, '')}`;
        finalData = `https://wa.me/${waPhone}?text=${encodeURIComponent(d.whatsapp.message)}`;
        break;
      case 'location': finalData = `geo:${d.location.lat},${d.location.lng}`; break;
      case 'vcard':
        finalData = `BEGIN:VCARD\nVERSION:3.0\nN:${d.vcard.lastName};${d.vcard.firstName}\nFN:${d.vcard.firstName} ${d.vcard.lastName}\nORG:${d.vcard.company}\nTITLE:${d.vcard.jobTitle}\nTEL:${d.vcard.phone}\nEMAIL:${d.vcard.email}\nURL:${d.vcard.website}\nEND:VCARD`;
        break;
      case 'event':
        finalData = `BEGIN:VEVENT\nSUMMARY:${d.event.title}\nDESCRIPTION:${d.event.description}\nLOCATION:${d.event.location}\nDTSTART:${d.event.start}\nDTEND:${d.event.end}\nEND:VEVENT`;
        break;
      case 'app':
        finalData = d.app.ios || d.app.android;
        break;
      case 'raw': finalData = d.raw; break;
      default: finalData = '';
    }

    setOptions(prev => ({ ...prev, data: finalData || ' ' }));

    // Track detailed QR generation meta-data
    if (finalData && finalData.trim().length > 0) {
      trackQRGeneration(activeType, {
        length: finalData.length,
        has_logo: !!options.image,
        error_correction: options.qrOptions.errorCorrectionLevel
      });
    }
  }, [activeType, qrData]);


  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      trackEvent('custom_logo_upload', { size: file.size, type: file.type });

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setLogoPreview(result);
        setOptions(prev => ({
          ...prev,
          image: result,
          qrOptions: {
            ...prev.qrOptions,
            errorCorrectionLevel: 'H'
          }
        }));
        setIsAutoH(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setOptions(prev => ({
      ...prev,
      image: null,
      qrOptions: {
        ...prev.qrOptions,
        errorCorrectionLevel: 'M'
      }
    }));
    setIsAutoH(false);
  };

  const handleGradientUpdate = (type, value) => {
    setOptions(prev => {
      const currentGradient = prev.dotsOptions.gradient || {
        type: 'linear',
        rotation: 45,
        colorStops: [{ offset: 0, color: prev.dotsOptions.color }, { offset: 1, color: prev.dotsOptions.color }]
      };

      let newGradient;
      if (type === 'startColor') {
        const newStops = [...currentGradient.colorStops];
        newStops[0] = { ...newStops[0], color: value };
        newGradient = { ...currentGradient, colorStops: newStops };
      } else if (type === 'endColor') {
        const newStops = [...currentGradient.colorStops];
        newStops[1] = { ...newStops[1], color: value };
        newGradient = { ...currentGradient, colorStops: newStops };
      } else if (type === 'rotation') {
        newGradient = { ...currentGradient, rotation: parseInt(value) };
      }

      return {
        ...prev,
        dotsOptions: { ...prev.dotsOptions, gradient: newGradient }
      };
    });
  };

  const handleDownload = async (format) => {
    if (!qrCode) return;

    // Determine size based on quality setting
    const size = downloadSettings.quality === 'uhd' ? 4096 : 2048;

    trackQRExport(format, size);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `OD2_QR_${timestamp}_${activeType}`;

    // Create a fresh QR instance with high-resolution size and current options
    const downloadOptions = {
      ...options,
      width: size,
      height: size,
      backgroundOptions: {
        ...options.backgroundOptions,
        color: downloadSettings.transparentBg ? 'transparent' : options.backgroundOptions.color
      }
    };

    const downloadQR = new QRCodeStyling(downloadOptions);

    // Wait for render to complete
    await new Promise(resolve => setTimeout(resolve, 300));

    if (format === 'webp' || format === 'jpg') {
      const pngBlob = await downloadQR.getRawData('png');
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Handle transparency or background fill
        if (!downloadSettings.transparentBg || format === 'jpg') {
          ctx.fillStyle = options.backgroundOptions.color;
          ctx.fillRect(0, 0, size, size);
        }

        ctx.drawImage(img, 0, 0);
        const mimeType = format === 'webp' ? 'image/webp' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, 1.0);
        const link = document.createElement('a');
        link.download = `${filename}.${format}`;
        link.href = dataUrl;
        link.click();
      };
      img.src = URL.createObjectURL(pngBlob);
      return;
    }

    if (format === 'zip') {
      const zip = new JSZip();
      const pngBlob = await downloadQR.getRawData('png');
      zip.file(`${filename}.png`, pngBlob);
      const svgBlob = await downloadQR.getRawData('svg');
      zip.file(`${filename}.svg`, svgBlob);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      await downloadQR.download({
        name: filename,
        extension: format
      });
    }
  };

  return (
    <>

      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Mobile Category Dropdown - Modern Horizontal Scroll */}
        {/* Mobile Category Dropdown - Visible only on small screens */}
        <div className="lg:hidden mb-4 sm:mb-6">
          <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3 px-1">Choose QR Type</label>
          <div className="relative">
            <select
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 font-bold text-gray-900 dark:text-white shadow-sm focus:border-blue-500 outline-none appearance-none cursor-pointer pr-12"
            >
              {QR_TYPES.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <ChevronRight className="w-5 h-5 rotate-90" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">

          {/* Modern Sidebar Navigation - Hidden on mobile */}
          <aside className="hidden lg:block w-64 xl:w-72 sticky top-8 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center">
                  <Layout className="w-4 h-4 mr-2" />
                  QR Categories
                </h3>
              </div>
              <nav className="p-2 space-y-1">
                {QR_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${activeType === type.id
                      ? 'bg-blue-600 text-white shadow-blue-200 dark:shadow-none shadow-lg translate-x-1'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:translate-x-1'
                      }`}
                  >
                    <div className="flex items-center">
                      <type.icon className={`w-5 h-5 mr-3 transition-colors ${activeType === type.id ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
                        }`} />
                      {type.label}
                    </div>
                    {activeType === type.id && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </nav>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 mt-2">
                <div className="flex items-center text-blue-700 dark:text-blue-400 mb-1">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span className="text-xs font-bold uppercase tracking-tighter">Privacy First</span>
                </div>
                <p className="text-[10px] text-blue-600/80 dark:text-blue-400/80 leading-relaxed">
                  Generation is 100% client-side. Your data never leaves your device.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Configuration Area */}
          <main className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 min-w-0 w-full">

            {/* 1. Content Input Panel */}
            <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <Settings className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600" />
                      Configure Content
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Enter the data you want to encode in the QR code</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {activeType === 'url' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Website URL</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                          type="url"
                          value={qrData.url}
                          onChange={(e) => handleDataChange('url', e.target.value)}
                          placeholder="https://example.com"
                          className="w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-lg font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {activeType === 'text' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                      <textarea
                        value={qrData.text}
                        onChange={(e) => handleDataChange('text', e.target.value)}
                        placeholder="Type anything here..."
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all min-h-[160px] text-lg"
                      />
                    </div>
                  )}

                  {activeType === 'whatsapp' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Code</label>
                        <input
                          type="text"
                          value={qrData.whatsapp.countryCode}
                          onChange={(e) => handleDataChange({ countryCode: e.target.value })}
                          placeholder="+91"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-lg font-bold text-center"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={qrData.whatsapp.phone}
                          onChange={(e) => handleDataChange({ phone: e.target.value })}
                          placeholder="9876543210"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-lg font-medium tracking-wider"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Pre-filled Message (Optional)</label>
                        <textarea
                          value={qrData.whatsapp.message}
                          onChange={(e) => handleDataChange({ message: e.target.value })}
                          placeholder="Hello! I'm interested in..."
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 min-h-[100px]"
                        />
                      </div>
                    </div>
                  )}

                  {activeType === 'wifi' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Network Name (SSID)</label>
                        <input
                          type="text"
                          value={qrData.wifi.ssid}
                          onChange={(e) => handleDataChange({ ssid: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Security</label>
                        <select
                          value={qrData.wifi.encryption}
                          onChange={(e) => handleDataChange({ encryption: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-bold"
                        >
                          <option value="WPA">WPA/WPA2 (Most Common)</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">No Password</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                          type="text"
                          value={qrData.wifi.password}
                          onChange={(e) => handleDataChange({ password: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono tracking-widest"
                        />
                      </div>
                    </div>
                  )}

                  {activeType === 'vcard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                        <input
                          type="text"
                          value={qrData.vcard.firstName}
                          onChange={(e) => handleDataChange({ firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                        <input
                          type="text"
                          value={qrData.vcard.lastName}
                          onChange={(e) => handleDataChange({ lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          value={qrData.vcard.phone}
                          onChange={(e) => handleDataChange({ phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={qrData.vcard.email}
                          onChange={(e) => handleDataChange({ email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                    </div>
                  )}

                  {activeType === 'sms' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Code</label>
                        <input
                          type="text"
                          value={qrData.sms.countryCode}
                          onChange={(e) => handleDataChange({ countryCode: e.target.value })}
                          placeholder="+91"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center font-bold"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={qrData.sms.phone}
                          onChange={(e) => handleDataChange({ phone: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                        <textarea
                          value={qrData.sms.message}
                          onChange={(e) => handleDataChange({ message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 min-h-[100px]"
                        />
                      </div>
                    </div>
                  )}

                  {activeType === 'email' && (
                    <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={qrData.email.address}
                          onChange={(e) => handleDataChange({ address: e.target.value })}
                          placeholder="contact@example.com"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subject (Optional)</label>
                        <input
                          type="text"
                          value={qrData.email.subject}
                          onChange={(e) => handleDataChange({ subject: e.target.value })}
                          placeholder="Email subject"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message (Optional)</label>
                        <textarea
                          value={qrData.email.body}
                          onChange={(e) => handleDataChange({ body: e.target.value })}
                          placeholder="Email message"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 min-h-[100px]"
                        />
                      </div>
                    </div>
                  )}

                  {activeType === 'phone' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={qrData.phone}
                        onChange={(e) => handleDataChange('phone', e.target.value)}
                        placeholder="+919876543210"
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-lg font-medium tracking-wider"
                      />
                    </div>
                  )}

                  {activeType === 'location' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Latitude</label>
                        <input
                          type="text"
                          value={qrData.location.lat}
                          onChange={(e) => handleDataChange({ lat: e.target.value })}
                          placeholder="37.7749"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Longitude</label>
                        <input
                          type="text"
                          value={qrData.location.lng}
                          onChange={(e) => handleDataChange({ lng: e.target.value })}
                          placeholder="-122.4194"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {activeType === 'event' && (
                    <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Event Title</label>
                        <input
                          type="text"
                          value={qrData.event.title}
                          onChange={(e) => handleDataChange({ title: e.target.value })}
                          placeholder="Annual Tech Conference"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                        <textarea
                          value={qrData.event.description}
                          onChange={(e) => handleDataChange({ description: e.target.value })}
                          placeholder="Event details..."
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 min-h-[80px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                        <input
                          type="text"
                          value={qrData.event.location}
                          onChange={(e) => handleDataChange({ location: e.target.value })}
                          placeholder="Convention Center, City"
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Start Date & Time</label>
                          <input
                            type="datetime-local"
                            value={qrData.event.start}
                            onChange={(e) => handleDataChange({ start: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">End Date & Time</label>
                          <input
                            type="datetime-local"
                            value={qrData.event.end}
                            onChange={(e) => handleDataChange({ end: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeType === 'app' && (
                    <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">iOS App Store Link</label>
                        <input
                          type="url"
                          value={qrData.app.ios}
                          onChange={(e) => handleDataChange({ ios: e.target.value })}
                          placeholder="https://apps.apple.com/app/..."
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Android Play Store Link</label>
                        <input
                          type="url"
                          value={qrData.app.android}
                          onChange={(e) => handleDataChange({ android: e.target.value })}
                          placeholder="https://play.google.com/store/apps/..."
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                    </div>
                  )}

                  {activeType === 'raw' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Raw Data</label>
                      <textarea
                        value={qrData.raw}
                        onChange={(e) => handleDataChange('raw', e.target.value)}
                        placeholder="Any text or data..."
                        className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all min-h-[160px] text-lg font-mono"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 2. Visual Design Panel */}
            <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center mb-6 sm:mb-8">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-purple-500" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Professional Design</h2>
                </div>

                <div className="space-y-10">
                  {/* Brand Selection */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Center Logo</label>
                      {options.image && (
                        <button onClick={removeLogo} className="text-[10px] font-bold text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg transition-colors">REMOVE LOGO</button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {BRAND_LOGOS.map((brand) => (
                        <button
                          key={brand.id}
                          onClick={() => handleLogoChange(brand.logo, brand.label)}
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 p-2 rounded-2xl border-2 transition-all flex items-center justify-center bg-gray-50/50 dark:bg-gray-900/50 ${options.image === brand.logo ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-600'
                            }`}
                          title={brand.label}
                        >
                          {brand.logo ? (
                            <img src={brand.logo} alt={brand.label} className="w-full h-full object-contain pointer-events-none" />
                          ) : (
                            <div className="flex flex-col items-center">
                              <CheckCircle2 className="w-5 h-5 text-gray-400" />
                              <span className="text-[8px] font-bold mt-0.5 text-gray-400">NONE</span>
                            </div>
                          )}
                          {options.image === brand.logo && <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"><Check className="w-3 h-3" /></div>}
                        </button>
                      ))}
                      <label className="cursor-pointer w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-400 flex flex-col items-center justify-center text-gray-400 transition-colors">
                        <ImagePlus className="w-5 h-5 mb-0.5" />
                        <span className="text-[8px] font-bold uppercase tracking-tighter">Custom</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      </label>
                    </div>

                    {options.image && (
                      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center">
                            <Maximize className="w-3.5 h-3.5 mr-2 text-blue-500" />
                            Logo Scale factor
                          </label>
                          <span className="text-[11px] font-black text-blue-600 dark:text-blue-400 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            {Math.round(options.imageOptions.imageSize * 100)}%
                          </span>
                        </div>
                        <input
                          type="range" min="0.10" max="0.40" step="0.02"
                          value={options.imageOptions.imageSize}
                          onChange={(e) => setOptions(prev => ({ ...prev, imageOptions: { ...prev.imageOptions, imageSize: parseFloat(e.target.value) } }))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <div className="flex justify-between mt-2 text-[9px] text-gray-400 font-bold">
                          <span>Compact</span>
                          <span>Balanced</span>
                          <span>Large</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Styled Color Palette */}
                  <div className="pt-8 border-t border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 gap-10">
                      {/* Color Studio */}
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.18em]">Color Studio</label>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">Design perfectly colored QR codes</p>
                          </div>
                        </div>

                        {/* Mode Switcher */}
                        <div className="flex p-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl w-full max-w-xs">
                          <button
                            onClick={() => {
                              setColorMode('solid');
                              setOptions(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, gradient: null } }));
                            }}
                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${colorMode === 'solid' ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            Solid Color
                          </button>
                          <button
                            onClick={() => {
                              setColorMode('gradient');
                              // Initialize gradient if needed
                              if (!options.dotsOptions.gradient) {
                                setOptions(prev => ({
                                  ...prev,
                                  dotsOptions: {
                                    ...prev.dotsOptions,
                                    gradient: {
                                      type: 'linear',
                                      rotation: 45,
                                      colorStops: [{ offset: 0, color: prev.dotsOptions.color }, { offset: 1, color: '#3b82f6' }]
                                    }
                                  }
                                }));
                              }
                            }}
                            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${colorMode === 'gradient' ? 'bg-white dark:bg-gray-800 shadow-sm text-purple-600 dark:text-purple-400' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            Gradient
                          </button>
                        </div>

                        {/* Color Pickers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Main Dots Color */}
                          <div className="relative p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                                {colorMode === 'gradient' ? 'Gradient Start' : 'QR Pattern Color'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-600 shadow-sm group">
                                <input
                                  type="color"
                                  value={colorMode === 'gradient' ? (options.dotsOptions.gradient?.colorStops[0]?.color || '#000000') : options.dotsOptions.color}
                                  onChange={(e) => {
                                    if (colorMode === 'gradient') {
                                      handleGradientUpdate('startColor', e.target.value);
                                    } else {
                                      setOptions(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, color: e.target.value } }));
                                    }
                                  }}
                                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                                />
                              </div>
                              <span className="text-xs font-mono text-gray-500 uppercase">
                                {colorMode === 'gradient' ? (options.dotsOptions.gradient?.colorStops[0]?.color) : options.dotsOptions.color}
                              </span>
                            </div>
                          </div>

                          {colorMode === 'gradient' && (
                            <div className="relative p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">Gradient End</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-600 shadow-sm">
                                  <input
                                    type="color"
                                    value={options.dotsOptions.gradient?.colorStops[1]?.color || '#3b82f6'}
                                    onChange={(e) => handleGradientUpdate('endColor', e.target.value)}
                                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                                  />
                                </div>
                                <span className="text-xs font-mono text-gray-500 uppercase">
                                  {options.dotsOptions.gradient?.colorStops[1]?.color}
                                </span>
                              </div>
                            </div>
                          )}

                          {colorMode === 'gradient' && (
                            <div className="col-span-full">
                              <label className="text-[10px] font-bold text-gray-500 mb-2 block">Gradient Rotation: {options.dotsOptions.gradient?.rotation}°</label>
                              <input
                                type="range" min="0" max="360"
                                value={options.dotsOptions.gradient?.rotation || 0}
                                onChange={(e) => handleGradientUpdate('rotation', e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                          )}

                          {/* Secondary Colors */}
                          <div className="relative p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">Corners (Eyes)</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-600 shadow-sm">
                                <input
                                  type="color"
                                  value={options.cornersSquareOptions.color}
                                  onChange={(e) => setOptions(prev => ({
                                    ...prev,
                                    cornersSquareOptions: { ...prev.cornersSquareOptions, color: e.target.value },
                                    cornersDotOptions: { ...prev.cornersDotOptions, color: e.target.value }
                                  }))}
                                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                                />
                              </div>
                              <span className="text-xs font-mono text-gray-500 uppercase">{options.cornersSquareOptions.color}</span>
                            </div>
                          </div>

                          <div className="relative p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300">Background</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-600 shadow-sm">
                                <input
                                  type="color"
                                  value={options.backgroundOptions.color}
                                  onChange={(e) => setOptions(prev => ({ ...prev, backgroundOptions: { color: e.target.value } }))}
                                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0"
                                />
                              </div>
                              <span className="text-xs font-mono text-gray-500 uppercase">{options.backgroundOptions.color}</span>
                            </div>
                          </div>
                        </div>

                        {/* Trending Palettes (New) */}
                        <div className="pt-4">
                          <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-3">Trending Palettes</label>
                          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                            {DESIGN_PRESETS.map((palette) => (
                              <button
                                key={palette.id}
                                onClick={() => handleApplyPreset(palette)}
                                className="flex-shrink-0 group relative flex flex-col items-center gap-2"
                              >
                                <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-blue-400 transition-all p-0.5">
                                  <div className="w-full h-full rounded-full shadow-sm" style={{
                                    background: palette.type === 'gradient'
                                      ? `linear-gradient(${palette.dotsOptions.gradient.rotation}deg, ${palette.dotsOptions.gradient.colorStops[0].color}, ${palette.dotsOptions.gradient.colorStops[1].color})`
                                      : palette.dotsOptions.color
                                  }} />
                                </div>
                                <span className="text-[9px] font-bold text-gray-500 group-hover:text-blue-600">{palette.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Dot Styles Selection with Visual Preview */}
                      <div className="space-y-6">
                        <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">QR Pattern Style</label>
                        <div className="space-y-6">
                          {/* Pattern with Mini Preview */}
                          <div>
                            <p className="text-[9px] text-gray-500 dark:text-gray-400 font-bold mb-3 uppercase tracking-wider">Dot Pattern</p>
                            <div className="flex flex-wrap gap-3">
                              {['rounded', 'dots', 'classy', 'square', 'extra-rounded'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setOptions(prev => ({ ...prev, dotsOptions: { ...prev.dotsOptions, type } }))}
                                  className={`group relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all border-2 ${options.dotsOptions.type === type
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border-blue-600'
                                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                    }`}
                                >
                                  <div className="w-8 h-8 grid grid-cols-2 gap-1" style={{ color: options.dotsOptions.type === type ? 'white' : options.dotsOptions.color }}>
                                    {[...Array(4)].map((_, i) => (
                                      <div key={i} className={`w-full h-full ${type === 'rounded' ? 'rounded-md' :
                                        type === 'dots' ? 'rounded-full' :
                                          type === 'classy' ? 'rounded-sm' :
                                            type === 'extra-rounded' ? 'rounded-lg' :
                                              ''
                                        }`} style={{ backgroundColor: 'currentColor' }} />
                                    ))}
                                  </div>
                                  <span className="text-[9px] font-black uppercase tracking-tighter">{type}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                          {/* Corners with Mini Preview */}
                          <div>
                            <p className="text-[9px] text-gray-500 dark:text-gray-400 font-bold mb-3 uppercase tracking-wider">Corner Style</p>
                            <div className="flex flex-wrap gap-3">
                              {['square', 'dot', 'rounded'].map(type => (
                                <button
                                  key={type}
                                  onClick={() => setOptions(prev => ({
                                    ...prev,
                                    cornersSquareOptions: { ...prev.cornersSquareOptions, type },
                                    cornersDotOptions: { ...prev.cornersDotOptions, type }
                                  }))}
                                  className={`group relative flex flex-col items-center gap-2 px-5 py-3 rounded-xl transition-all border-2 ${options.cornersSquareOptions.type === type
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 border-purple-600'
                                    : 'bg-gray-50 dark:bg-gray-900 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                                    }`}
                                >
                                  <div className={`w-8 h-8 border-4 ${type === 'rounded' ? 'rounded-lg' :
                                    type === 'dot' ? 'rounded-full' :
                                      ''
                                    }`} style={{ borderColor: options.cornersSquareOptions.type === type ? 'white' : options.dotsOptions.color }} />
                                  <span className="text-[9px] font-black uppercase tracking-tighter">{type}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </section>
          </main>

          {/* Sticky Preview Sidebar */}
          <aside className="w-full lg:w-80 xl:w-96 lg:sticky lg:top-8 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8 text-center">
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                  <div className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center">
                    <Smartphone className="w-3.5 h-3.5 mr-2" />
                    HD PREVIEW
                  </div>
                  <div className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                    LIVE
                  </div>
                </div>

                {/* QR Container with Pro Styles */}
                <div className="relative mb-6 sm:mb-8 group mx-auto max-w-[320px] sm:max-w-none">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
                  <div className="relative bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-xl border border-gray-100 aspect-square flex items-center justify-center overflow-hidden">
                    <div id="qr-code-container" ref={qrRef} className="w-full h-full flex items-center justify-center [&>svg]:!w-full [&>svg]:!h-full [&>svg]:max-w-full [&>svg]:max-h-full [&>canvas]:!w-full [&>canvas]:!h-full [&>canvas]:max-w-full [&>canvas]:max-h-full" />

                    {/* Loading Interface Overlay - Only show when no QR code is present (initial load) */}
                    {!qrCode && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-in fade-in duration-200">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Generating...</span>
                      </div>
                    )}
                  </div>
                </div>

                {contrastWarning && (
                  <div className="flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl mb-6 animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold">Contrast Issue Detected</span>
                  </div>
                )}

                {/* Download Settings */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 mb-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-black text-gray-400">Export Settings</span>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors">Transparent Background</span>
                      <input
                        type="checkbox"
                        checked={downloadSettings.transparentBg}
                        onChange={(e) => setDownloadSettings(prev => ({ ...prev, transparentBg: e.target.checked }))}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors">Ultra HD Quality (4K)</span>
                      <input
                        type="checkbox"
                        checked={downloadSettings.quality === 'uhd'}
                        onChange={(e) => setDownloadSettings(prev => ({ ...prev, quality: e.target.checked ? 'uhd' : 'hd' }))}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                </div>

                {/* High-Resolution Action Buttons */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      onClick={() => handleDownload('png')}
                      className="flex items-center justify-center px-3 sm:px-4 py-3 sm:py-3.5 bg-blue-600 text-white rounded-xl sm:rounded-2xl hover:bg-blue-700 transition-all font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PNG
                    </button>
                    <button
                      onClick={() => handleDownload('svg')}
                      className="flex items-center justify-center px-3 sm:px-4 py-3 sm:py-3.5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl sm:rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all font-bold text-xs sm:text-sm border border-gray-100 dark:border-gray-700"
                    >
                      <FileJson className="w-4 h-4 mr-2 text-purple-500" />
                      SVG
                    </button>
                  </div>

                  <button
                    onClick={() => handleDownload('zip')}
                    className="w-full relative overflow-hidden group flex items-center justify-center px-4 sm:px-8 py-3.5 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl sm:rounded-2xl transition-all hover:scale-[1.02] active:scale-95 font-black text-xs sm:text-sm shadow-xl"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                    <DownloadCloud className="w-5 h-5 mr-3" />
                    GENERATE ASSET BUNDLE (ZIP)
                  </button>

                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700 px-2 space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
                      <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-left text-amber-800 dark:text-amber-400 font-medium leading-relaxed">
                        This QR is <strong>pre-verified</strong> for compliance. The ZIP bundle includes 2000px assets optimized for printing on banners and business cards.
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 opacity-40">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Enterprise Privacy Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 px-6 text-center">
              <div className="text-[10px] text-gray-400 dark:text-gray-500 space-y-1">
                <p>©  One Day Developers • Professional Series</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <section className="mt-16 sm:mt-24 pb-16 sm:pb-24 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto m-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
              The World&apos;s Best Free QR Code Generator
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
              Create professionally designed QR codes for your business, events, and personal use.
              Zero fees. No sign-up required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">100% Free & Private</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Unlike other generators, we don&apos;t charge you for high-quality downloads.
                All processing happens in your browser—your data never leaves your device.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fully Customizable</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add your brand logo, choose custom gradients, and select unique shapes.
                Make a QR code that truly represents your identity.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center mb-4">
                <DownloadCloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Vector & 4K Export</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Download in vector SVG format for print or high-resolution PNG (up to 4096px)
                for digital displays. Transparent backgrounds supported.
              </p>
            </div>
          </div>

          {/* Use Cases Grid */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">Perfect For Every Use Case</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QR_TYPES.map((type, i) => {
                // Descriptive text map for SEO
                const descriptions = {
                  url: 'Link to your website, portfolio, or landing page.',
                  text: 'Share plain text messages or codes instantly.',
                  wifi: 'Let guests connect to Wi-Fi with a single scan.',
                  vcard: 'Digital business cards for instant contact saving.',
                  whatsapp: 'Start a WhatsApp chat with a pre-filled message.',
                  email: 'Send emails with pre-filled subject and body.',
                  phone: 'Direct dial phone numbers for easy calling.',
                  sms: 'Send SMS messages with pre-defined content.',
                  location: 'Share exact Google Maps coordinates and pins.',
                  event: 'Share calendar events with time and location.',
                  app: 'Universal links for iOS and Android app stores.',
                  raw: 'Encode raw data strings for custom applications.'
                };

                return (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <type.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{type.label}</h4>
                      <p className="text-xs text-gray-500 mt-1">{descriptions[type.id] || 'Generate specialized QR codes.'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
