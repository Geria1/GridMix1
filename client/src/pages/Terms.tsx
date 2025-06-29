import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Globe, FileText, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Terms of Use</h1>
          </div>
          <div className="flex items-center space-x-6 text-green-100">
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
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Welcome to GridMix. These Terms of Use ("Terms") govern your access to and use of our website, services, data, and tools made available at <strong>www.gridmix.co.uk</strong> (the "Site"). By using the Site, you agree to be bound by these Terms.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 font-medium">
                If you do not agree with these Terms, please do not use our Site.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* About GridMix */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              1. About GridMix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              GridMix is a data platform offering real-time and historical information on the UK's electricity generation mix, carbon intensity, and related energy metrics. Our mission is to promote transparency and support climate-conscious decision-making through accessible, reliable energy data.
            </p>
          </CardContent>
        </Card>

        {/* Eligibility */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              2. Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You must be at least <strong>13 years old</strong> to use the Site. By using the Site, you affirm that you are legally able to enter into this agreement.
            </p>
          </CardContent>
        </Card>

        {/* Use of the Site */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              3. Use of the Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-green-900 dark:text-green-100">You agree to use the Site:</h4>
              </div>
              <ul className="list-disc list-inside space-y-2 text-green-700 dark:text-green-300">
                <li>In accordance with these Terms and applicable laws</li>
                <li>Only for lawful, personal, academic, or non-commercial informational purposes (unless otherwise agreed)</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h4 className="font-semibold text-red-900 dark:text-red-100">You agree not to:</h4>
              </div>
              <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
                <li>Interfere with the operation, security, or accessibility of the Site</li>
                <li>Attempt to gain unauthorised access to any part of the Site</li>
                <li>Use the data for misleading, illegal, or harmful purposes</li>
                <li>Reproduce or redistribute GridMix content or data for commercial use without permission</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              4. Intellectual Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All content and materials on GridMix, including text, graphics, visualisations, data processing tools, and code, are owned by or licensed to GridMix and are protected by UK and international copyright and intellectual property laws.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold text-green-900 dark:text-green-100">You may:</h4>
                </div>
                <ul className="list-disc list-inside space-y-2 text-green-700 dark:text-green-300">
                  <li>View and share content for personal, academic, or non-commercial use</li>
                  <li>Credit GridMix when using our data (e.g., "Source: GridMix.co.uk")</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h4 className="font-semibold text-red-900 dark:text-red-100">You may not:</h4>
                </div>
                <ul className="list-disc list-inside space-y-2 text-red-700 dark:text-red-300">
                  <li>Republish or commercially exploit our content without permission</li>
                  <li>Reverse engineer or create derivative works</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200">
                For permissions or licensing enquiries, contact: <strong>hello@gridmix.co.uk</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources and Accuracy */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              5. Data Sources and Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              GridMix uses data from trusted third-party providers, including but not limited to:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>National Grid ESO</li>
                <li>Elexon</li>
              </ul>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Department for Energy Security and Net Zero (DESNZ)</li>
                <li>Other licensed data providers and official public datasets</li>
              </ul>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We process and visualise this data to provide up-to-date insights into the UK's electricity grid and carbon intensity. Wherever possible, we use datasets made available under open licences, such as the <strong>Open Government Licence (OGL v3.0)</strong>.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-semibold text-amber-900 dark:text-amber-100">Important Disclaimer</h4>
              </div>
              <p className="text-amber-800 dark:text-amber-200">
                While we strive for accuracy, completeness, and real-time updates, GridMix provides this information "as is" and for informational purposes only. We do not guarantee the accuracy or availability of external data sources, and your use of the information is at your own risk.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Links */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              6. Third-Party Links and Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              GridMix may include links to third-party websites or services. These are provided for your convenience only. We do not endorse or accept responsibility for third-party content, practices, or privacy policies.
            </p>
          </CardContent>
        </Card>

        {/* Availability and Modifications */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              7. Availability and Modifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We aim to keep the Site operational at all times but do not guarantee uninterrupted access. We reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Update, modify, or discontinue any part of the Site without notice</li>
              <li>Revise these Terms at any time. Continued use after changes constitutes acceptance of the updated Terms</li>
            </ul>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              8. Termination
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may suspend or terminate your access to the Site at any time without notice if we reasonably believe you have violated these Terms or misused the Site.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              9. Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              To the fullest extent permitted by law, GridMix shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 mb-4">
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of data, profits, or business resulting from your use of, or reliance on, the Site or its data</li>
            </ul>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                You agree to use GridMix at your own discretion and risk.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              10. Governing Law
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms are governed by and interpreted in accordance with the <strong>laws of England and Wales</strong>. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </CardContent>
        </Card>

        {/* Contact Us */}
        <Card className="border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              11. Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              If you have any questions or concerns regarding these Terms, please contact:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:hello@gridmix.co.uk"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
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