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
              Art & Artist
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
            Last Updated: August 1, 2026
          </p>
          <p className="leading-7 text-[15px] text-gray-700">
            Art & Artist (&quot;Art & Artist&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy, security, and personal information of every user. This Privacy Policy explains how we collect, use, store, disclose, and safeguard information when you access or use the Art & Artist website, mobile application, and related services (collectively, the &quot;Platform&quot;).
          </p>
          <p className="leading-7 text-[15px] text-gray-700">
            By accessing or using the Platform, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
          </p>
        </div>

        <div className="space-y-5">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We may collect and process the following categories of information.
            </p>
            <div className="mt-3 space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">a. Personal Information</h3>
                <p className="leading-7 text-[15px] text-gray-700">
                  This may include:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Profile photograph</li>
                  <li>Location information</li>
                  <li>Skills</li>
                  <li>Portfolio</li>
                  <li>Resume</li>
                  <li>Professional details provided by the user</li>
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
                  <li>Subscription information</li>
                  <li>Account settings</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">c. Usage Information</h3>
                <p className="leading-7 text-[15px] text-gray-700">
                  We automatically collect information regarding how you use the Platform, including:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
                  <li>Activity logs</li>
                  <li>Profile views</li>
                  <li>Messages</li>
                  <li>Job applications</li>
                  <li>User interactions</li>
                  <li>Search history within the Platform</li>
                  <li>Feature usage</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">d. Device &amp; Technical Information</h3>
                <p className="leading-7 text-[15px] text-gray-700">
                  Including:
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
                  <li>Device type</li>
                  <li>IP address</li>
                  <li>Operating system</li>
                  <li>Browser type</li>
                  <li>App version</li>
                  <li>Device identifiers</li>
                  <li>Diagnostic information</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We use the information we collect for purposes including:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Creating and managing user accounts.</li>
              <li>Displaying user profiles according to privacy settings.</li>
              <li>Connecting artists, recruiters, organizations, and creative professionals.</li>
              <li>Facilitating job opportunities, collaborations, networking, and communication.</li>
              <li>Processing subscriptions and payments.</li>
              <li>Providing customer support.</li>
              <li>Improving Platform functionality and user experience.</li>
              <li>Personalizing content and recommendations.</li>
              <li>Sending service notifications and important updates.</li>
              <li>Detecting fraud, abuse, unauthorized activity, or security incidents.</li>
              <li>Enforcing our Terms of Service.</li>
              <li>Complying with legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. Sharing and Disclosure of Information</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist does <strong>not</strong> sell, rent, or trade users&apos; personal information.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Information may be shared only in the following situations:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>With other users according to your profile visibility and privacy settings.</li>
              <li>With trusted third-party service providers for cloud hosting, payment processing, analytics, customer support, security, and operational services.</li>
              <li>When required by law, court order, or governmental authority.</li>
              <li>To protect the rights, safety, security, property, or legal interests of Art & Artist, its users, or the public.</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              All third-party providers are required to maintain appropriate confidentiality and security measures.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Data Storage and Security</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We implement reasonable administrative, technical, and organizational safeguards to protect your information from unauthorized access, disclosure, alteration, misuse, or destruction.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Security measures include:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Encrypted password storage</li>
              <li>Secure server infrastructure</li>
              <li>Access controls</li>
              <li>Industry-standard security practices</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              While we strive to protect personal information, no internet transmission or electronic storage system is completely secure. Therefore, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. User Rights and Privacy Controls</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Users may:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Access their personal information.</li>
              <li>Update or edit account details.</li>
              <li>Control profile visibility.</li>
              <li>Manage communication preferences.</li>
              <li>Request a copy of their personal information.</li>
              <li>Request deletion of their account and associated personal data.</li>
            </ul>

            <h3 className="mt-4 font-semibold text-gray-900">Account Deletion</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Users may delete their account by navigating to:
            </p>
            <p className="mt-2 font-semibold text-gray-900">
              Profile → Settings → Delete Account
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              When an account deletion request is submitted:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>The account is immediately deactivated.</li>
              <li>The account enters a 90-day pending deletion period.</li>
              <li>During this period, users may contact our support team to restore their account.</li>
              <li>If no restoration request is received within 90 days, the account and associated personal information are permanently deleted.</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              Certain information may be retained where required by applicable law or legitimate business purposes, including:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Legal compliance</li>
              <li>Fraud prevention</li>
              <li>Security investigations</li>
              <li>Tax and accounting obligations</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              Retained information is securely stored and used only for those purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Cookies and Similar Technologies</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist may use cookies and similar technologies to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Improve user experience</li>
              <li>Analyze Platform usage</li>
              <li>Remember user preferences</li>
              <li>Personalize content</li>
              <li>Enhance application performance</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              Users may manage cookie preferences through their browser or device settings where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Child Privacy Policy</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist is committed to protecting the privacy and safety of children.
            </p>

            <h3 className="mt-4 font-semibold text-gray-900">Age Requirement</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Art & Artist is designed for artists, creative professionals, recruiters, and individuals seeking networking and career opportunities.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Our Services are <strong>not intended for children under the age of 13</strong>, or the minimum digital age required by applicable law in the user&apos;s country.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We do <strong>not knowingly collect, use, or store personal information from children under 13 years of age.</strong>
            </p>

            <h3 className="mt-4 font-semibold text-gray-900">If a Child Creates an Account</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              If we become aware that a child under the age of 13 has created an account or provided personal information without verified parental consent, we will take appropriate action, including:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Suspending or removing the account.</li>
              <li>Deleting the child&apos;s personal information from our systems within a reasonable period, unless we are legally required to retain certain information.</li>
              <li>Taking reasonable steps to prevent further collection of the child&apos;s information.</li>
            </ul>

            <h3 className="mt-4 font-semibold text-gray-900">Parental Rights</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              If you are a parent or legal guardian and believe your child has provided personal information through Art & Artist, you may contact us to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Request deletion of your child&apos;s account.</li>
              <li>Request deletion of your child&apos;s personal information.</li>
              <li>Request information regarding what data has been collected, if any.</li>
              <li>Raise concerns regarding your child&apos;s privacy.</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              We will review and respond to verified parental requests in accordance with applicable law.
            </p>

            <h3 className="mt-4 font-semibold text-gray-900">Content Uploaded by Children</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              If content uploaded by a child below the permitted minimum age is identified, we reserve the right to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-[15px] text-gray-700">
              <li>Remove the content.</li>
              <li>Suspend or terminate the associated account.</li>
              <li>Delete associated personal information where appropriate.</li>
            </ul>
            <p className="mt-3 leading-7 text-[15px] text-gray-700">
              These actions may be taken without prior notice where necessary to protect children&apos;s privacy or comply with legal obligations.
            </p>

            <h3 className="mt-4 font-semibold text-gray-900">Reporting Underage Users</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Users who believe an account belongs to a child below the minimum permitted age may report the account through the Help &amp; Support section within the Platform.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We review such reports and take appropriate action where necessary.
            </p>

            <h3 className="mt-4 font-semibold text-gray-900">International Users</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Where local laws require a higher minimum age or verified parental consent, Art & Artist will comply with the applicable legal requirements of the relevant jurisdiction.
            </p>

            <h3 className="mt-4 font-semibold text-gray-900">Updates to Child Privacy Policy</h3>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We may update this Child Privacy Policy from time to time.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Material changes will be communicated through the App and/or our official website. Continued use of the Platform following such updates constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Changes to this Privacy Policy</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              We may update or modify this Privacy Policy at any time.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Any revisions will be posted on our Platform and/or official website. The &quot;Last Updated&quot; date at the top of this Privacy Policy will indicate when changes were made.
            </p>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              Your continued use of the Platform after updates become effective constitutes your acceptance of the revised Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">9. Contact Us</h2>
            <p className="mt-2 leading-7 text-[15px] text-gray-700">
              If you have any questions, concerns, requests, or complaints regarding this Privacy Policy, the Child Privacy Policy, your personal information, or account deletion, please contact us.
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
