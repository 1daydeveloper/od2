import QRGeneratorClient from './QRGeneratorClient';

export const metadata = {
  title: 'OD2 Advanced QR Generator | Professional & Privacy-First',
  description: 'Generate high-quality, customizable QR codes with logos, gradients, and custom styles. 100% client-side and privacy-focused.',
};

export default function QRGeneratorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            OD2 Advanced QR Generator
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Enterprise-grade QR codes. 100% Client-Side. Privacy-First.
          </p>
          <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
            Powered by One Day Developers (OD2)
          </p>
        </div>

        <QRGeneratorClient />
      </div>
    </div>
  );
}
