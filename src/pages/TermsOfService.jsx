import React from "react";
import NavigationButton from "@components/buttons/NavigationButton";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const TermsOfService = () => {
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
                Terms of Service
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
                    1. Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      By accessing and using JobPsych ("the Service"), you
                      accept and agree to be bound by the terms and provisions
                      of this agreement. If you do not agree to these Terms of
                      Service, please do not use the Service.
                    </p>
                    <p>
                      We reserve the right to modify these terms at any time.
                      Your continued use of the Service after changes are posted
                      constitutes your acceptance of the modified terms.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    2. Description of Service
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      JobPsych provides AI-powered career development tools,
                      including but not limited to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Career role suggestions and matching</li>
                      <li>Resume analysis and ATS optimization</li>
                      <li>Interview preparation and practice</li>
                      <li>AI-powered career guidance and coaching</li>
                      <li>Recruitment tools for HR professionals (HireDisk)</li>
                    </ul>
                    <p>
                      The Service is provided "as is" and we reserve the right
                      to modify, suspend, or discontinue any aspect of the
                      Service at any time without notice.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    3. User Accounts and Registration
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      To access certain features of the Service, you may be
                      required to create an account. You agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Provide accurate, current, and complete information
                        during registration
                      </li>
                      <li>
                        Maintain and promptly update your account information
                      </li>
                      <li>
                        Maintain the security of your password and account
                      </li>
                      <li>
                        Accept all responsibility for activities under your
                        account
                      </li>
                      <li>
                        Notify us immediately of any unauthorized use of your
                        account
                      </li>
                    </ul>
                    <p>
                      You are prohibited from using another user's account
                      without permission. We reserve the right to terminate
                      accounts that violate these terms.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    4. User Content and Conduct
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      You retain ownership of any content you submit to the
                      Service, including resumes, documents, and personal
                      information. By submitting content, you grant us a license
                      to use, store, and process it to provide the Service.
                    </p>
                    <p>You agree not to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Upload or transmit viruses, malware, or malicious code
                      </li>
                      <li>
                        Use the Service for illegal purposes or fraudulent
                        activities
                      </li>
                      <li>
                        Attempt to gain unauthorized access to our systems or
                        networks
                      </li>
                      <li>Interfere with or disrupt the Service or servers</li>
                      <li>
                        Impersonate any person or entity or misrepresent your
                        affiliation
                      </li>
                      <li>
                        Scrape, harvest, or collect data from the Service
                        without permission
                      </li>
                      <li>
                        Use automated systems to access the Service without
                        authorization
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    5. Intellectual Property Rights
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      All content, features, and functionality of the Service,
                      including but not limited to text, graphics, logos, icons,
                      images, audio clips, digital downloads, data compilations,
                      and software, are the exclusive property of JobPsych or
                      its licensors.
                    </p>
                    <p>
                      The Service and its original content, features, and
                      functionality are protected by international copyright,
                      trademark, patent, trade secret, and other intellectual
                      property laws.
                    </p>
                    <p>
                      You may not reproduce, distribute, modify, create
                      derivative works, publicly display, or exploit any part of
                      the Service without our express written permission.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    6. AI Services and Limitations
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Our AI-powered features are designed to assist in career
                      development but should not be considered as professional
                      career counseling or legal advice. You acknowledge that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        AI recommendations are generated by algorithms and may
                        not always be accurate
                      </li>
                      <li>
                        Resume analysis and suggestions are for informational
                        purposes only
                      </li>
                      <li>
                        Interview preparation tools are practice aids and do not
                        guarantee interview success
                      </li>
                      <li>
                        You are responsible for verifying all information and
                        making your own decisions
                      </li>
                      <li>
                        We do not guarantee employment outcomes or job placement
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    7. Payment and Subscription Terms
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Certain features of the Service may require payment. By
                      purchasing a subscription or service, you agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Pay all fees associated with your subscription or
                        purchase
                      </li>
                      <li>Provide accurate and current billing information</li>
                      <li>
                        Authorize us to charge your payment method for all fees
                      </li>
                      <li>
                        Accept that subscriptions automatically renew unless
                        cancelled
                      </li>
                    </ul>
                    <p>
                      <strong>Refund Policy:</strong> Refunds are provided on a
                      case-by-case basis. Contact our support team within 14
                      days of purchase to request a refund. We reserve the right
                      to deny refunds for services already rendered.
                    </p>
                    <p>
                      <strong>Cancellation:</strong> You may cancel your
                      subscription at any time. Cancellations take effect at the
                      end of the current billing period.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    8. Privacy and Data Protection
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Your privacy is important to us. Our collection and use of
                      personal information is governed by our{" "}
                      <NavigationButton
                        to="/privacy-policy"
                        className="text-indigo-400 hover:text-indigo-300 underline inline cursor-pointer"
                      >
                        Privacy Policy
                      </NavigationButton>
                      , which is incorporated into these Terms by reference.
                    </p>
                    <p>
                      By using the Service, you consent to the collection,
                      processing, and storage of your data as described in our
                      Privacy Policy.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    9. Third-Party Services and Links
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      The Service may contain links to third-party websites or
                      services that are not owned or controlled by JobPsych. We
                      have no control over and assume no responsibility for the
                      content, privacy policies, or practices of third-party
                      websites or services.
                    </p>
                    <p>
                      You acknowledge and agree that we shall not be responsible
                      or liable for any damage or loss caused by or in
                      connection with the use of any third-party services.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    10. Disclaimers and Limitations of Liability
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      <strong>Service Disclaimer:</strong> The Service is
                      provided "AS IS" and "AS AVAILABLE" without warranties of
                      any kind, either express or implied, including but not
                      limited to implied warranties of merchantability, fitness
                      for a particular purpose, or non-infringement.
                    </p>
                    <p>
                      <strong>Limitation of Liability:</strong> To the maximum
                      extent permitted by law, JobPsych shall not be liable for
                      any indirect, incidental, special, consequential, or
                      punitive damages, including without limitation loss of
                      profits, data, use, goodwill, or other intangible losses.
                    </p>
                    <p>
                      Our total liability shall not exceed the amount you paid
                      us in the twelve (12) months preceding the claim, or $100,
                      whichever is greater.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    11. Indemnification
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      You agree to defend, indemnify, and hold harmless
                      JobPsych, its affiliates, and their respective officers,
                      directors, employees, and agents from any claims, damages,
                      obligations, losses, liabilities, costs, or expenses
                      arising from:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your use of the Service</li>
                      <li>Your violation of these Terms</li>
                      <li>Your violation of any third-party rights</li>
                      <li>Any content you submit to the Service</li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    12. Termination
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We may terminate or suspend your account and access to the
                      Service immediately, without prior notice or liability,
                      for any reason, including but not limited to breach of
                      these Terms.
                    </p>
                    <p>
                      Upon termination, your right to use the Service will
                      immediately cease. All provisions of these Terms that by
                      their nature should survive termination shall survive,
                      including ownership provisions, warranty disclaimers,
                      indemnity, and limitations of liability.
                    </p>
                    <p>
                      You may terminate your account at any time by contacting
                      our support team or through your account settings.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    13. Dispute Resolution and Arbitration
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Any disputes arising from these Terms or your use of the
                      Service shall be resolved through binding arbitration,
                      except that either party may seek injunctive relief in
                      court for intellectual property infringement.
                    </p>
                    <p>
                      You agree to waive your right to participate in class
                      actions or class-wide arbitration. All disputes must be
                      brought on an individual basis.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    14. Governing Law
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      These Terms shall be governed by and construed in
                      accordance with the laws of the jurisdiction in which
                      JobPsych operates, without regard to its conflict of law
                      provisions.
                    </p>
                    <p>
                      Our failure to enforce any right or provision of these
                      Terms will not be considered a waiver of those rights.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    15. Changes to Terms
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      We reserve the right to modify or replace these Terms at
                      any time at our sole discretion. If a revision is
                      material, we will provide at least 30 days' notice before
                      new terms take effect.
                    </p>
                    <p>
                      What constitutes a material change will be determined at
                      our sole discretion. By continuing to access or use the
                      Service after revisions become effective, you agree to be
                      bound by the revised terms.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    16. Severability
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      If any provision of these Terms is held to be invalid or
                      unenforceable, the remaining provisions will continue in
                      full force and effect. The invalid or unenforceable
                      provision will be replaced with a valid provision that
                      most closely matches the intent of the original provision.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    17. Contact Information
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      If you have any questions about these Terms of Service,
                      please contact us:
                    </p>
                    <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                      <p>
                        <strong className="text-white">Email:</strong>{" "}
                        legal@jobpsych.com
                      </p>
                      <p>
                        <strong className="text-white">Support:</strong>{" "}
                        support@jobpsych.com
                      </p>
                      <p>
                        <strong className="text-white">Address:</strong>{" "}
                        JobPsych Legal Team
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-6">
                    <p className="text-gray-300">
                      <strong className="text-white">Acknowledgment:</strong> By
                      using JobPsych, you acknowledge that you have read,
                      understood, and agree to be bound by these Terms of
                      Service.
                    </p>
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

export default TermsOfService;
