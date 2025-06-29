import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Globe, Shield, Clock, FileText } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <div className="flex items-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Effective: 29 June 2025</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Last updated: 29 June 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Introduction */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              GridMix ("we", "our", "us") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website <strong>www.gridmix.co.uk</strong> and related services.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              We adhere to the <strong>UK General Data Protection Regulation (UK GDPR)</strong>, the <strong>Data Protection Act 2018</strong>, and other applicable privacy laws.
            </p>
          </CardContent>
        </Card>

        {/* Who We Are */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <span>1. Who We Are</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              GridMix is a platform that provides live and historical data about electricity generation, energy mix, and carbon intensity in the UK. Our aim is to promote energy awareness, transparency, and sustainable decision-making through accessible data.
            </p>
          </CardContent>
        </Card>

        {/* What Information We Collect */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              2. What Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300">We collect two types of data:</p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  a. Personal Data (Only if You Provide It)
                </h4>
                <p className="text-blue-800 dark:text-blue-200 mb-3">
                  We only collect personally identifiable information if you choose to provide it. For example, if you:
                </p>
                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300 mb-3">
                  <li>Sign up for updates or a newsletter</li>
                  <li>Contact us through a form or email</li>
                </ul>
                <p className="text-blue-800 dark:text-blue-200 mb-2">This may include:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Organisation (if applicable)</li>
                  <li>Any other details you choose to submit</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  b. Non-Personal Data (Automatically Collected)
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  When you visit GridMix, we may automatically collect certain information using analytics tools and cookies, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Device and operating system</li>
                  <li>Referring website</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 mt-3">
                  This data is aggregated and used to improve site performance, diagnose issues, and understand user behaviour.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              3. How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use your data only when necessary, including to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
              <li>Respond to your enquiries</li>
              <li>Provide services or updates you request</li>
              <li>Improve and optimise the website</li>
              <li>Monitor usage patterns and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="font-semibold text-green-800 dark:text-green-200">
                We do not sell your personal data.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              4. Cookies and Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              GridMix uses cookies to enhance user experience and measure website performance. Cookies are small files stored on your device. You can control or delete cookies through your browser settings.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-3">We may use:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
              <li><strong>Essential cookies</strong> – Required for basic functionality</li>
              <li><strong>Analytics cookies</strong> – To track usage (e.g., Google Analytics)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              We do not use cookies for advertising or marketing purposes.
            </p>
          </CardContent>
        </Card>

        {/* Lawful Basis */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              5. Lawful Basis for Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Under the UK GDPR, our lawful bases for processing personal data may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>Consent</strong> – When you give us permission (e.g., for newsletter sign-up)</li>
              <li><strong>Legitimate interest</strong> – For site functionality and improvement</li>
              <li><strong>Legal obligation</strong> – If required by law</li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              6. Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              We retain personal data only as long as necessary for the purposes described above or as required by law. Non-personal data may be stored indefinitely for statistical purposes.
            </p>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              7. Data Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate technical and organisational measures to protect your data, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
              <li>Secure servers and encrypted connections (HTTPS)</li>
              <li>Access controls and authentication</li>
              <li>Regular security reviews</li>
            </ul>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200">
                However, no internet transmission is 100% secure. Use the site at your own risk.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              8. Third-Party Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may use trusted third-party services such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
              <li>Analytics providers (e.g., Google Analytics)</li>
              <li>Cloud hosting (e.g., AWS or UK/EU-based providers)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              These providers are required to comply with relevant privacy standards.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              9. Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Under UK data protection law, you have rights including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
              <li>The right to access your data</li>
              <li>The right to rectify inaccurate data</li>
              <li>The right to request deletion ("right to be forgotten")</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                To exercise your rights, please contact us at: <strong>hello@gridmix.co.uk</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              10. Children's Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              GridMix is not intended for use by children under 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal information, please contact us immediately.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              11. Changes to This Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. Where required, we'll notify users directly of significant changes.
            </p>
          </CardContent>
        </Card>

        {/* Contact Us */}
        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              12. Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              If you have any questions or concerns about this Privacy Policy or your data, contact:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:hello@gridmix.co.uk"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hello@gridmix.co.uk</span>
              </a>
              <a 
                href="https://www.gridmix.co.uk"
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span>www.gridmix.co.uk</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}