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
            Last Updated: 2026
          </p>
          <p className="leading-7 text-[15px] text-gray-700">
            Art & Artist (“Art & Artist”, “we”, “our” or “us”) is committed to safeguarding the privacy and protection of personal data of its users. This Privacy Policy describes the manner in which we collect, use, store, disclose, and protect information obtained from users who access or use the Art & Artist website and mobile application (“Platform”).
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
                  Including but not limited to name, phone number, email address, profile photograph, location details, skills, portfolio, and resume.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">b. Account Information</h3>
                <p className="leading-7 text-[15px] text-gray-700">
                  Including username, encrypted password, user preferences, and subscription-related details.
                </p>
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
                  Including device type, IP address, operating system, application version, and related technical identifiers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Use of Information</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              The information collected is used for the following lawful purposes:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>To create, maintain, and manage user accounts</li>
              <li>To display user profiles to relevant recruiters, artists, or other users, subject to privacy settings</li>
              <li>To facilitate job matching, collaborations, and professional opportunities</li>
              <li>To process payments, subscriptions, and related transactions</li>
              <li>To improve the functionality, performance, and features of the Platform</li>
              <li>To send notifications, service-related communications, and important updates</li>
              <li>To detect, prevent, and address fraud, misuse, or unauthorized activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Disclosure and Sharing of Information</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist does not sell, rent, or trade users’ personal data. Information may be shared only in the following circumstances:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>With other users of the Platform, in accordance with the privacy controls selected by the user</li>
              <li>With third-party service providers engaged for hosting, payment processing, analytics, or operational support, subject to confidentiality obligations</li>
              <li>Where disclosure is required under applicable law, regulation, court order, or legal process</li>
              <li>Where necessary to protect the rights, safety, security, or property of Art & Artist, its users, or the public</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Data Storage and Security</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We implement reasonable and industry-standard technical and organizational security measures to protect personal data from unauthorized access, loss, misuse, or alteration. User passwords are stored in encrypted form.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Notwithstanding the foregoing, no electronic transmission or storage system can be guaranteed to be completely secure, and Art & Artist does not warrant absolute security of user data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. User Rights and Privacy Controls</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Users have the right to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Access, edit, or update their personal and profile information</li>
              <li>Control visibility of their profile and contact permissions</li>
              <li>Request a copy of their personal data</li>
              <li>Delete their personal data or deactivate/delete their account at any time, subject to applicable legal requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Cookies and Tracking Technologies</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist may use cookies and similar tracking technologies to enhance user experience, analyze usage patterns, and personalize content. Users may manage cookie preferences through device or browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Children’s Privacy</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              The Platform is not intended for individuals below the age of thirteen (13) years. Art & Artist does not knowingly collect personal data from children. If such data is inadvertently collected, it will be deleted upon becoming aware of the same.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Amendments to the Privacy Policy</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist reserves the right to modify or update this Privacy Policy at any time. Any changes shall be notified by posting the updated policy on the Platform and/or website. Continued use of the Platform after such changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Contact Information</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              For any questions, concerns, or requests regarding this Privacy Policy, users may contact us at:
            </p>
            <p className="mt-3 font-semibold text-gray-900">
              Email: tech@artonym.in
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
