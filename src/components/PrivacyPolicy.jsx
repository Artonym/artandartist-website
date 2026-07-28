import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#f8f8f2] px-4 py-10 text-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <p className="font-courier-regular text-sm uppercase tracking-[0.3em] text-gray-500">
              Privacy Policy
            </p>
            <h1 className="mt-2 font-wasted-vindey text-3xl sm:text-4xl text-gray-900">
              Art & Artist App
            </h1>
          </div>
          <button
            onClick={() => navigate('/')}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-black hover:text-white"
          >
            Back to Home
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Last Updated: July 28, 2026
          </p>
          <p className="leading-7 text-[15px] text-gray-700">
            Art & Artist ("Art & Artist", "we", "our", or "us") is committed to safeguarding the privacy and protection of the personal data of its users. This Privacy Policy describes how we collect, use, store, disclose, and protect information obtained from users who access or use the Art & Artist website and mobile application ("Platform").
          </p>
          <p className="leading-7 text-[15px] text-gray-700">
            By accessing or using the Platform, you acknowledge that you have read, understood, and agreed to the terms of this Privacy Policy.
          </p>
        </div>

        <div className="space-y-5">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Information Collected</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We may collect and process the following categories of information:
            </p>
            <div className="mt-3 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">a. Personal Information</h3>
                <p className="leading-7 text-[15px] text-gray-700">
                  Including, but not limited to:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Profile photograph</li>
                  <li>Location details</li>
                  <li>Skills</li>
                  <li>Portfolio</li>
                  <li>Resume</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">b. Account Information</h3>
                <p className="leading-7 text-[15px] text-gray-700">
                  Including:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
                  <li>Username</li>
                  <li>Encrypted password</li>
                  <li>User preferences</li>
                  <li>Subscription-related details</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">c. Usage Information</h3>
                <p className="leading-7 text-[15px] text-gray-700">
                  Including activity logs, profile views, messages, interactions, and other usage data generated through your use of the Platform.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">d. Device and Technical Information</h3>
                <p className="leading-7 text-[15px] text-gray-700">
                  Including:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
                  <li>Device type</li>
                  <li>IP address</li>
                  <li>Operating system</li>
                  <li>Application version</li>
                  <li>Device identifiers and related technical information</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Use of Information</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              The information collected is used for the following purposes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>To create, maintain, and manage user accounts.</li>
              <li>To display user profiles to recruiters, artists, and other users according to the user's privacy settings.</li>
              <li>To facilitate job matching, collaborations, networking, and professional opportunities.</li>
              <li>To process payments, subscriptions, and related transactions.</li>
              <li>To improve the functionality, security, performance, and features of the Platform.</li>
              <li>To send notifications, service-related communications, and important updates.</li>
              <li>To detect, investigate, prevent, and address fraud, misuse, security incidents, or unauthorized activity.</li>
              <li>To comply with applicable legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Disclosure and Sharing of Information</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist does <strong>not</strong> sell, rent, or trade users' personal information.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Information may be shared only under the following circumstances:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>With other users of the Platform in accordance with the privacy settings selected by the user.</li>
              <li>With trusted third-party service providers for hosting, payment processing, analytics, cloud storage, customer support, or operational services, subject to appropriate confidentiality obligations.</li>
              <li>Where disclosure is required by applicable law, regulation, legal process, or governmental authority.</li>
              <li>Where necessary to protect the rights, safety, security, or property of Art & Artist, its users, or the public.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Data Storage and Security</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We implement reasonable administrative, technical, and organizational safeguards to protect personal information from unauthorized access, disclosure, alteration, misuse, or destruction.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              User passwords are stored using industry-standard encryption methods.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Although we strive to use commercially acceptable means to protect personal data, no method of electronic transmission or storage is completely secure. Therefore, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. User Rights and Privacy Controls</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Users have the right to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Access, edit, or update their personal information.</li>
              <li>Control the visibility of their profile and contact preferences.</li>
              <li>Request a copy of the personal data associated with their account.</li>
              <li>Request deletion of their account and personal data at any time through the application or our official website.</li>
            </ul>

            <h3 className="mt-4 font-semibold text-gray-900">Account Deletion</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Users may delete their account directly from the application by navigating to:
            </p>
            <p className="mt-2 font-semibold text-gray-900">
              Profile → Settings → Delete Account
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Upon submitting an account deletion request:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>The account will be immediately deactivated and inaccessible.</li>
              <li>The account will enter a 90-day pending deletion period.</li>
              <li>During this period, users may contact our support team to cancel the deletion request and restore their account.</li>
              <li>If no restoration request is received within the 90-day period, the account and associated personal data will be permanently deleted from our systems.</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              Certain information may be retained beyond the deletion period where required by applicable law or for legitimate business purposes, including:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Compliance with legal obligations</li>
              <li>Fraud prevention</li>
              <li>Security investigations</li>
              <li>Tax, accounting, or financial recordkeeping</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              Any retained information will be securely stored and used only for these purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Cookies and Tracking Technologies</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist may use cookies and similar technologies to improve user experience, analyze Platform usage, personalize content, and enhance application performance.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Users may control cookie preferences through their browser or device settings where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Children’s Privacy</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              The Platform is not intended for individuals under the age of 13 years.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We do not knowingly collect personal information from children. If we become aware that such information has been collected, we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Amendments to this Privacy Policy</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist reserves the right to modify or update this Privacy Policy at any time.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Any changes will be posted on the Platform and/or our official website. Continued use of the Platform after such modifications constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Contact Information</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, including account deletion requests, please contact us at:
            </p>
            <p className="mt-3 font-semibold text-gray-900">
              Art & Artist Support
            </p>
            <p className="mt-2 font-semibold text-gray-900">
              Email: tech@artonym.in
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
