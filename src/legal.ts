/*
 * Legal documents — Privacy Policy and Terms & Conditions.
 * Source: "PRIVACY POLICY & TERMS AND CONDITIONS.pdf" (Last Updated: 12 October 2026).
 *
 * Inline formatting: **bold**. Emails and the website are linked automatically.
 * Anything in [square brackets] is shown highlighted — it's a placeholder still to be filled in
 * (see GRIEVANCE below).
 */

export type Block =
  | { t: "p"; x: string }
  | { t: "h3"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "lines"; x: string[] };

export type LegalSection = { id: string; title: string; blocks: Block[] };

export type LegalDoc = {
  slug: string; // URL path
  title: string; // "Privacy Policy"
  updated: string;
  operator: string;
  intro: string[];
  sections: LegalSection[];
  closing?: string;
};

/* ---- fill these in once, they're used in both documents ---- */
export const GRIEVANCE = {
  name: "Akshay",
  address: "Plot No. 1774, Floor II, Venkata Ramana Colony, Gokul Plots, Kukatpally, Hyderabad - 500072, Telangana",
  email: "support@artonym.in",
};

const section = (n: number, title: string, blocks: Block[]): LegalSection => ({ id: `section-${n}`, title: `${n}. ${title}`, blocks });
const p = (x: string): Block => ({ t: "p", x });
const h3 = (x: string): Block => ({ t: "h3", x });
const ul = (...x: string[]): Block => ({ t: "ul", x });

/* =========================================================================================
   PRIVACY POLICY
   ========================================================================================= */
export const PRIVACY: LegalDoc = {
  slug: "/privacypolicy",
  title: "Privacy Policy",
  updated: "12 October 2026",
  operator: "Artonym",
  intro: [
    'Art & Artist (the "App") is operated by Artonym ("Artonym", "we", "our" or "us"). This Privacy Policy explains what personal data we collect when you use the Art & Artist mobile application and related web pages, including shared profile and post links (together, the "Platform"), how we use and share that data, and the choices and rights you have.',
    "By creating an account or using the Platform, you confirm that you have read and understood this Privacy Policy. Where we rely on your consent, you may withdraw it at any time as described in Section 8.",
  ],
  sections: [
    section(1, "Information We Collect", [
      h3("a. Information you provide"),
      ul(
        "**Account details:** your email address and, if you sign up with email, a password. Passwords are handled by our authentication provider (Clerk). We never store your password in readable form.",
        "**Profile details:** full name, username, profile photo, cover image, role/designation, creative category and related selections, skills, bio, and social or showreel link. You can also add your phone number, city, state, country and PIN code.",
        "**Content:** posts, works/portfolio items, photos, videos, captions, blogs, likes, comments, ratings you give other users, job postings and job applications.",
        "**Messages:** chats with other users, including photos and videos you send. Messages are end-to-end encrypted (see Section 5).",
        "**Communications with us:** reports you submit about users or content, and any messages you send to our support team.",
      ),
      h3("b. Information from sign-in providers"),
      p("If you sign in with Google, Apple or Facebook, we receive basic information from that provider, such as your name, email address and profile picture, as allowed by your settings with that provider. We never receive your password for those services."),
      h3("c. Information collected automatically"),
      ul(
        "**Usage data:** app sessions (start and end), screens viewed, and actions such as creating posts, viewing jobs or blogs, sending connection requests and sending or receiving messages. We record that an action happened. We do not record the content of your encrypted messages.",
        "**Device data:** device model, operating system and version, app version, a random device identifier created by the App, and your push notification token.",
        "**Diagnostic data:** error and performance logs that we use to keep the App stable.",
        "**Network data:** IP address and related connection information that our servers receive when the App connects to them.",
      ),
      p("We do not collect your precise (GPS) location. The only location information on your profile is what you type in yourself."),
      h3("d. Payment information"),
      p("If you buy Art & Artist Pro, Razorpay processes the payment. We receive your order ID, payment ID and payment status. We do not receive or store your full card, UPI or bank account details."),
    ]),
    section(2, "Device Permissions", [
      p("The App asks only for the permissions below, and only when you use a feature that needs them:"),
      ul(
        "**Camera:** to take photos or record videos for your profile, posts or messages",
        "**Microphone:** to record audio when you capture a video",
        "**Photos / media library:** to choose images or videos to upload",
        "**Notifications:** to send you push notifications",
      ),
      p("You can deny or revoke these permissions at any time in your device settings. If you do, the feature that needs them will not work."),
    ]),
    section(3, "How We Use Your Information", [
      ul(
        "To create and manage your account and keep you signed in",
        "To show your profile, works and posts to other users and help people discover artists",
        "To enable follows, connections, ratings, messaging and collaborations",
        "To let you post jobs and apply for them, and to let job posters review applicants",
        "To process Pro payments and provide paid features",
        "To send push and email notifications about activity on your account. You can control these in Settings > Notification.",
        "To review reports, enforce our Terms & Conditions, and prevent fraud, spam, abuse and unauthorised access",
        "To understand how the App is used, fix bugs and improve features",
        "To comply with our legal obligations",
      ),
      p("We do not sell your personal data, and we do not use it for third-party advertising."),
    ]),
    section(4, "How Your Information Is Shared", [
      h3("a. With other users"),
      ul(
        "Other users of the Platform can see your profile: name, username, photos, role, category, skills, bio, links, follower/connection counts and average rating. They can also see your public posts and works.",
        'The "Contact Info" section of your profile shows your email address and the city, state and PIN code you entered to other users. Your phone number is not shown on your profile.',
        "You can mark posts as private to limit who sees them.",
        "When you apply for a job, the person who posted it can see your name, username, email address, profile photo, designation, category, city and state.",
        "Anyone with a shared link to a profile, post or work can open it, including people who do not use the App.",
      ),
      h3("b. With service providers"),
      p("We share information with trusted providers that process it for us, and only as much as they need to run the Platform:"),
      ul(
        "**Clerk:** account authentication and sign-in",
        "**Google, Apple and Facebook:** only if you choose to sign in with them",
        "**Razorpay:** payment processing",
        "**Google Firebase Cloud Messaging and Apple Push Notification service:** delivering push notifications",
        "**Novu:** delivering in-app, push and email notifications",
        "**Cloud hosting and storage providers:** hosting our servers, databases and uploaded media",
      ),
      p("These providers may use your data only to provide their services to us."),
      h3("c. Legal and safety reasons"),
      p("We may share information when the law, a court order or a government authority requires it. We may also share it when necessary to protect the rights, property or safety of Artonym, our users or the public, including to investigate fraud or abuse."),
      h3("d. Business transfers"),
      p("If Artonym is involved in a merger, acquisition or sale of assets, your information may be transferred as part of that deal. It will remain protected by this Privacy Policy."),
    ]),
    section(5, "Messaging and End-to-End Encryption", [
      p("Chats in the App are end-to-end encrypted. Your device encrypts messages and media before sending them, and only the devices of the people in the conversation can decrypt them. Your private encryption key stays in secure storage on your device (iOS Keychain / Android Keystore) and is never sent to our servers."),
      p("Our servers store messages in encrypted form, together with the details needed to deliver them, such as sender, recipient and time sent. We cannot read the content of your messages."),
    ]),
    section(6, "Data Storage, Security and International Transfers", [
      p("We use reasonable security measures to protect your data. These include encryption in transit (HTTPS), end-to-end encryption for messages, and secure on-device storage for sign-in tokens and encryption keys. The App also keeps a local copy of some data on your device so it runs faster. No system is completely secure, and we cannot guarantee absolute security."),
      p("Some of our service providers may store or process data on servers outside India. When this happens, we take steps to keep your data protected as applicable law requires."),
    ]),
    section(7, "Data Retention", [
      p("We keep your personal data for as long as your account is active. When you delete your account, we delete or anonymise your personal data within a reasonable time. We may keep some information where we need it to meet legal, tax or accounting obligations (for example, payment records), to resolve disputes or to enforce our Terms."),
      p("Messages you have sent may stay on the devices of the people you sent them to. We keep usage and diagnostic data only as long as we need it for the purposes described above."),
    ]),
    section(8, "Your Rights and Choices", [
      p("Subject to applicable law, including India's Digital Personal Data Protection Act, 2023, you have the right to:"),
      ul(
        "View and update your profile information at any time in the App",
        "Ask for a summary of the personal data we hold about you",
        "Ask us to correct or erase your personal data",
        "Withdraw your consent by deleting your account or contacting us. This does not affect processing we have already carried out.",
        "Delete your account in Settings > Sign in & Security > Delete my account, or by emailing us",
        "Control push and email notifications in Settings > Notification",
        "Block other users and report users or content",
        "Nominate another person to exercise these rights if you die or become incapacitated",
        "Raise a complaint with our Grievance Officer (Section 12) and, if it is not resolved, with the Data Protection Board of India",
      ),
      p(`To exercise any of these rights, email us at ${GRIEVANCE.email}. We may need to verify your identity before acting on your request.`),
    ]),
    section(9, "Age Requirement", [
      p("You must be 18 or older to use the Platform. We do not knowingly collect personal data from anyone under 18. If we learn that we have, we will delete it. If you believe a minor has given us personal data, please contact us."),
    ]),
    section(10, "Third-Party Links", [
      p("Profiles and posts may contain links to third-party websites or social platforms, such as a showreel link. We are not responsible for how those third parties handle your data."),
    ]),
    section(11, "Changes to This Privacy Policy", [
      p('We may update this Privacy Policy from time to time. If we make material changes, we will tell you in the App or by email and update the "Last Updated" date above. If you keep using the Platform after an update, you accept the revised policy.'),
    ]),
    section(12, "Contact Us and Grievance Officer", [
      p("For any question, request or complaint about this Privacy Policy or your personal data, contact:"),
      { t: "lines", x: ["**Artonym Grievance Officer:**", GRIEVANCE.name, `**Address:** ${GRIEVANCE.address}`, `**Email:** ${GRIEVANCE.email}`] },
      p("We will acknowledge your complaint within 24 hours and aim to resolve it within 15 days."),
    ]),
  ],
};

/* =========================================================================================
   TERMS AND CONDITIONS
   ========================================================================================= */
export const TERMS: LegalDoc = {
  slug: "/terms",
  title: "Terms & Conditions",
  updated: "12 October 2026",
  operator: "Artonym",
  intro: [
    'Please read these Terms and Conditions ("Terms") carefully before using Art & Artist. They form a binding agreement between you and Artonym ("Artonym", "we", "our" or "us"), the operator of the Art & Artist mobile application and related web pages (the "App").',
  ],
  sections: [
    section(1, "Acceptance of Terms", [
      p("By creating an account, or by downloading, accessing or using the App, you agree to these Terms and to our Privacy Policy. If you do not agree, please do not use the App."),
    ]),
    section(2, "Description of Service", [
      p("Art & Artist is a professional networking platform for artists and creative professionals. Using the App, you can:"),
      ul(
        "Create a profile and showcase your works and portfolio",
        "Share posts, photos, videos and blogs",
        "Follow, connect with, rate and message other users",
        "Post jobs, browse jobs and apply for them",
        "Get notifications about activity relevant to you",
      ),
      p("We may add, change or remove features from time to time."),
    ]),
    section(3, "Eligibility and Accounts", [
      p("**3.1** You must be at least 18 years old to use the App."),
      p("**3.2** You can sign up with your email address, or sign in with Google, Apple or Facebook. If you use a third-party sign-in, that provider's terms also apply to how you use their service."),
      p("**3.3** You agree to give accurate, current and complete information and to keep your profile up to date."),
      p("**3.4** You are responsible for keeping your login details secure and for everything that happens in your account. If you suspect unauthorised use, tell us immediately."),
      p("**3.5** You may hold only one personal account. You must not create an account for anyone else without their permission."),
    ]),
    section(4, "User Conduct and Content Policy", [
      h3("4.1 Zero Tolerance for Objectionable Content"),
      p("Art & Artist has zero tolerance for objectionable or abusive content and behaviour. You must not post, share or send any content that:"),
      ul(
        "Is offensive, hateful, discriminatory, defamatory or harassing",
        "Contains sexually explicit material, child sexual abuse material, or graphic or gratuitous violence",
        "Promotes illegal activities or breaks any applicable law",
        "Infringes anyone's copyright, trademark, privacy or other rights",
        "Is fraudulent, deceptive or misleading, including fake job postings or fake profiles",
        "Contains malware, or links to phishing or other harmful websites",
      ),
      h3("4.2 Prohibited Conduct"),
      p("You must not:"),
      ul(
        "Bully, harass, threaten or intimidate other users",
        "Send spam, chain messages or unsolicited commercial messages",
        "Pretend to be another person or entity, or misrepresent your connection with one",
        "Collect other users' personal data (for example, email addresses) to use outside the App",
        "Try to get unauthorised access to the App, our systems or other users' accounts",
        "Scrape, reverse-engineer or disrupt the App, or interfere with how it works",
      ),
      h3("4.3 Reporting, Blocking and Moderation"),
      ul(
        'Use the in-app "Report" option to flag objectionable users or content',
        'Use the in-app "Block" option to stop a user from interacting with you',
        "We review reports and may remove content, restrict features, or suspend or terminate accounts that break these Terms",
        "We act on reports and valid legal requests within the timelines applicable law requires",
      ),
    ]),
    section(5, "Your Content and Intellectual Property", [
      p("**5.1** You keep ownership of the content you create and post on Art & Artist."),
      p("**5.2** By posting content, you give Artonym a worldwide, non-exclusive, royalty-free licence to host, store, reproduce, display and distribute it. We use this licence only to operate and provide the App, including showing your content in feeds and in featured sections, and through links you or other users share. The licence ends when you delete the content or your account, except for copies that others have already shared, and copies we must keep for legal reasons."),
      p("**5.3** You confirm that you own, or have permission to use, all content you post, and that it does not infringe anyone else's rights."),
      p("**5.4** The App's name, logo, design and code belong to Artonym. You may not copy or reuse them without our written permission."),
      p("**5.5** If you believe content on the App infringes your rights, contact us at the email address below."),
    ]),
    section(6, "Jobs, Collaborations and Ratings", [
      p("**6.1** Art & Artist is only a platform that connects users. We are not an employer, recruiter or agent. We are not a party to any job, contract, collaboration or payment between users."),
      p("**6.2** We do not verify job postings, profiles or ratings. Before you share sensitive information, make payments or agree to work, check the details yourself."),
      p("**6.3** When you apply for a job, the person who posted it can see your profile details and email address, as explained in our Privacy Policy."),
      p("**6.4** Ratings must be honest and based on genuine experience. We may remove ratings that are abusive or manipulated."),
    ]),
    section(7, "Messaging", [
      p("Chats are end-to-end encrypted, so we cannot read the content of your messages. You are responsible for what you send. If someone sends you abusive messages, block or report them."),
    ]),
    section(8, "Privacy", [p("Our Privacy Policy explains how we collect, use and share your personal data. It forms part of these Terms.")]),
    section(9, "Art & Artist Pro (Paid Features)", [
      p("**9.1** Some features may be available only with a paid Art & Artist Pro plan. The App shows the price and the access period (for example, Rs 99 for one month) before you pay."),
      p("**9.2** Razorpay processes payments securely. We do not store your card, UPI or bank details."),
      p("**9.3** Pro access lasts for the period you paid for. It does not renew automatically unless the App clearly tells you otherwise before you pay. If you don't want to continue, don't make another payment."),
      p("**9.4** Payments are non-refundable, except where applicable law requires a refund or where you were charged by mistake. For payment problems, contact us within 7 days of the transaction."),
      p("**9.5** We may change prices or Pro features in the future. Any change will not affect a period you have already paid for."),
    ]),
    section(10, "Suspension and Termination", [
      p("**10.1** If you break these Terms, or if we need to protect users or comply with the law, we may remove content, or suspend or terminate your account. Where reasonable, we will tell you."),
      p("**10.2** You can delete your account at any time in Settings > Sign in & Security > Delete my account, or by emailing us. The Privacy Policy explains what happens to your data after deletion."),
    ]),
    section(11, "Disclaimer of Warranties", [
      p('The App is provided "as is" and "as available", without warranties of any kind, express or implied. These include warranties of merchantability, fitness for a particular purpose and non-infringement. We do not guarantee that the App will be uninterrupted or error-free, or that any user, job or opportunity will turn out as expected.'),
    ]),
    section(12, "Limitation of Liability", [
      p("To the fullest extent the law allows, Artonym will not be liable for:"),
      ul("Any indirect, incidental, special, consequential or punitive damages", "Loss of data, profits or opportunities", "Any dispute between users"),
      p("Any of these that arise from your use of the App are excluded. Our total liability for any claim relating to the App will not exceed the amount you paid us in the 12 months before the claim."),
    ]),
    section(13, "Indemnity", [
      p("You agree to indemnify Artonym against any claims, losses or expenses (including reasonable legal fees) that arise from your content, your use of the App, or your breach of these Terms."),
    ]),
    section(14, "Changes to These Terms", [
      p("We may update these Terms from time to time. If we make material changes, we will tell you in the App or by email. If you keep using the App after the changes take effect, you accept the revised Terms."),
    ]),
    section(15, "Governing Law and Disputes", [
      p("These Terms are governed by the laws of India, without regard to conflict-of-law principles. The competent courts in India have jurisdiction over any disputes."),
    ]),
    section(16, "Contact and Grievance Officer", [
      p("For questions, complaints or reports about these Terms or the App, contact:"),
      { t: "lines", x: [`**Artonym Grievance Officer:** ${GRIEVANCE.name}`, `**Address:** ${GRIEVANCE.address}`, `**Email:** ${GRIEVANCE.email}`] },
      p("We will acknowledge complaints within 24 hours and aim to resolve them within 15 days."),
    ]),
  ],
  closing: "By using Art & Artist, you confirm that you have read and understood these Terms and Conditions and agree to them.",
};

export const DOCS = [PRIVACY, TERMS];

/** URL aliases that should open each document */
export const DOC_PATHS: Record<string, LegalDoc> = {
  "/privacypolicy": PRIVACY,
  "/privacy-policy": PRIVACY,
  "/privacy": PRIVACY,
  "/terms": TERMS,
  "/termsandconditions": TERMS,
  "/terms-and-conditions": TERMS,
  "/terms-conditions": TERMS,
};
