import React from 'react';
import { FaCopyright } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-700 py-4 min-h-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <FaCopyright className="mr-2" />
          <span>{currentYear} 受験コンシェルジュ</span>
        </div>
        <div className="text-center mt-2">
          <span>お問い合わせ | プライバシーポリシー | 利用規約</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
