import React from "react";
import NavigationButton from "@components/buttons/NavigationButton";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10"></div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-500/5 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <NavigationButton
              to="/"
              className="inline-flex items-center px-4 py-2 bg-slate-800/70 hover:bg-slate-700/70 border border-slate-600/50 hover:border-indigo-500/50 rounded-lg text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Home
            </NavigationButton>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="px-6 py-8 sm:px-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-8 text-center">
                Privacy Policy
              </h1>

              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  <strong className="text-white">Last updated:</strong>{" "}
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    1. Information We Collect
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We collect information you provide directly to us, such as
                      when you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Upload resumes or documents for analysis</li>
                      <li>Use our AI chat and career guidance features</li>
                      <li>Create an account or contact us</li>
                      <li>Participate in surveys or feedback</li>
                    </ul>
                    <p>
                      This may include personal information such as your name,
                      email address, and professional information contained in
                      uploaded documents.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    2. How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide our AI-powered career guidance services</li>
                      <li>
                        Analyze resumes and provide career recommendations
                      </li>
                      <li>Improve our AI models and service quality</li>
                      <li>Communicate with you about our services</li>
                      <li>Ensure security and prevent fraud</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    3. Data Security
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We implement appropriate technical and organizational
                      measures to protect your personal information against
                      unauthorized access, alteration, disclosure, or
                      destruction. These measures include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security audits and updates</li>
                      <li>Access controls and authentication</li>
                      <li>Secure data processing practices</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    4. Data Sharing and Disclosure
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties without your consent, except
                      as described in this policy:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Service Providers:</strong> We may share data
                        with trusted third-party service providers who assist in
                        operating our platform
                      </li>
                      <li>
                        <strong>Legal Requirements:</strong> We may disclose
                        information if required by law or to protect our rights
                      </li>
                      <li>
                        <strong>Business Transfers:</strong> In the event of a
                        merger or acquisition, your data may be transferred
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    5. Cookies and Tracking
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We use cookies and similar technologies to enhance your
                      experience and analyze usage patterns. You can control
                      cookie preferences through your browser settings or our
                      cookie consent banner.
                    </p>
                    <p>
                      <strong>Essential Cookies:</strong> Required for basic
                      site functionality
                    </p>
                    <p>
                      <strong>Analytics Cookies:</strong> Help us understand how
                      you use our site (with your consent)
                    </p>
                    <p>
                      <strong>Marketing Cookies:</strong> Used for personalized
                      advertising (with your consent)
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    6. Data Retention
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We retain your personal information only as long as
                      necessary for the purposes outlined in this policy, unless
                      a longer retention period is required by law. Uploaded
                      documents and analysis results are typically retained for
                      your session and deleted shortly thereafter unless you
                      choose to save them.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    7. Your Rights
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access the personal information we hold about you</li>
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Delete your personal information</li>
                      <li>Object to or restrict processing of your data</li>
                      <li>Data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                    <p>
                      To exercise these rights, please contact us using the
                      information provided below.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    8. International Data Transfers
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Your information may be transferred to and processed in
                      countries other than your own. We ensure appropriate
                      safeguards are in place to protect your data during such
                      transfers.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    9. Children's Privacy
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Our services are not intended for children under 13 years
                      of age. We do not knowingly collect personal information
                      from children under 13. If we become aware that we have
                      collected personal information from a child under 13, we
                      will take steps to delete such information.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    10. Changes to This Policy
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We may update this privacy policy from time to time. We
                      will notify you of any changes by posting the new policy
                      on this page and updating the "Last updated" date.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    11. Contact Us
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      If you have any questions about this privacy policy or our
                      data practices, please contact us:
                    </p>
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                      <p>
                        <strong className="text-white">Email:</strong>{" "}
                        privacy@jobpsych.com
                      </p>
                      <p>
                        <strong className="text-white">Address:</strong>{" "}
                        JobPsych Privacy Team
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
