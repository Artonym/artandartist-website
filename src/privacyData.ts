/* Privacy Policy content — carried over verbatim from the current artandartist.co.in/privacypolicy */

export type Block =
  | { t: "p"; x: string }
  | { t: "h3"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "path"; x: string }
  | { t: "lines"; x: string[] };

export type PolicySection = { id: string; title: string; blocks: Block[] };

export const POLICY_META = {
  operator: "Artonym Pvt. Ltd.",
  updated: "August 25, 2026",
  intro: [
    'Art & Artist ("Art & Artist", "we", "our", or "us"), operated by Artonym Pvt. Ltd., is committed to protecting the privacy, security, and personal information of every user and maintaining a safe environment for everyone using our Platform.',
    'This Privacy Policy explains how we collect, use, store, disclose, protect, and otherwise process information when you access or use the Art & Artist website, mobile application, and related services (collectively, the "Platform").',
    "By accessing or using the Platform, you acknowledge that you have read, understood, and agreed to this Privacy Policy.",
  ],
  copyright: "© 2026 Artonym Pvt. Ltd. All Rights Reserved.",
};

export const POLICY: PolicySection[] = [
  {
    id: "section-1",
    title: "1. Information We Collect",
    blocks: [
      { t: "p", x: "We may collect and process the following categories of information." },
      { t: "h3", x: "a. Personal Information" },
      { t: "p", x: "This may include:" },
      {
        t: "ul",
        x: [
          "Full name",
          "Phone number",
          "Email address",
          "Profile photograph",
          "Location information",
          "Skills",
          "Portfolio",
          "Resume",
          "Professional details provided by the user",
          "Other information voluntarily provided by the user",
        ],
      },
      { t: "h3", x: "b. Account Information" },
      { t: "p", x: "Including:" },
      {
        t: "ul",
        x: [
          "Username",
          "Encrypted password",
          "User preferences",
          "Subscription information",
          "Account settings",
          "Age or date-of-birth information where required for safety, eligibility, or legal compliance",
        ],
      },
      { t: "h3", x: "c. Usage Information" },
      { t: "p", x: "We automatically collect or process information regarding how you use the Platform, including:" },
      {
        t: "ul",
        x: [
          "Activity logs",
          "Profile views",
          "Messages",
          "Job applications",
          "User interactions",
          "Search history within the Platform",
          "Feature usage",
          "Reports and complaints submitted through the Platform",
          "Safety-related interactions and enforcement actions",
        ],
      },
      { t: "h3", x: "d. Device & Technical Information" },
      { t: "p", x: "Including:" },
      {
        t: "ul",
        x: [
          "Device type",
          "IP address",
          "Operating system",
          "Browser type",
          "App version",
          "Device identifiers",
          "Diagnostic information",
          "Log and security information",
        ],
      },
    ],
  },
  {
    id: "section-2",
    title: "2. How We Use Your Information",
    blocks: [
      { t: "p", x: "We use the information we collect for purposes including:" },
      {
        t: "ul",
        x: [
          "Creating and managing user accounts.",
          "Displaying user profiles according to privacy settings.",
          "Connecting artists, recruiters, organizations, and creative professionals.",
          "Facilitating job opportunities, collaborations, networking, and communication.",
          "Processing subscriptions and payments.",
          "Providing customer support.",
          "Improving Platform functionality and user experience.",
          "Personalizing content and recommendations.",
          "Sending service notifications and important updates.",
          "Detecting fraud, abuse, unauthorized activity, or security incidents.",
          "Detecting, preventing, and responding to child-safety violations and other prohibited conduct.",
          "Reviewing reports concerning CSAE, CSAM, grooming, exploitation, or other safety concerns.",
          "Enforcing our Terms of Service, Community Guidelines, and safety policies.",
          "Preserving information where legally permitted or required.",
          "Cooperating with law enforcement and competent authorities where legally required or permitted.",
          "Complying with legal and regulatory obligations.",
        ],
      },
    ],
  },
  {
    id: "section-3",
    title: "3. Sharing and Disclosure of Information",
    blocks: [
      { t: "p", x: "Art & Artist does not sell, rent, or trade users' personal information." },
      { t: "p", x: "Information may be shared only in the following situations:" },
      {
        t: "ul",
        x: [
          "With other users according to your profile visibility and privacy settings.",
          "With trusted third-party service providers for cloud hosting, payment processing, analytics, customer support, security, and operational services.",
          "When required by law, court order, or governmental authority.",
          "To protect the rights, safety, security, property, or legal interests of Art & Artist, its users, or the public.",
          "Where necessary to investigate or respond to suspected unlawful activity, child sexual abuse or exploitation, CSAM, grooming, trafficking, or other serious safety concerns.",
        ],
      },
      { t: "p", x: "All third-party providers are expected to maintain appropriate confidentiality and security measures." },
    ],
  },
  {
    id: "section-4",
    title: "4. Data Storage and Security",
    blocks: [
      {
        t: "p",
        x: "We implement reasonable administrative, technical, and organizational safeguards to protect your information from unauthorized access, disclosure, alteration, misuse, or destruction.",
      },
      { t: "p", x: "Security measures may include:" },
      {
        t: "ul",
        x: [
          "Encrypted password storage",
          "Secure server infrastructure",
          "Access controls",
          "Industry-standard security practices",
          "Security monitoring and abuse-prevention measures",
        ],
      },
      {
        t: "p",
        x: "While we strive to protect personal information, no internet transmission or electronic storage system is completely secure. Therefore, we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: "section-5",
    title: "5. User Rights and Privacy Controls",
    blocks: [
      { t: "p", x: "Users may:" },
      {
        t: "ul",
        x: [
          "Access their personal information.",
          "Update or edit account details.",
          "Control profile visibility.",
          "Manage communication preferences.",
          "Request a copy of their personal information.",
          "Request deletion of their account and associated personal data.",
        ],
      },
      { t: "h3", x: "Account Deletion" },
      { t: "p", x: "Users may delete their account by navigating to:" },
      { t: "path", x: "Profile -> Settings -> Delete Account" },
      { t: "p", x: "When an account deletion request is submitted:" },
      {
        t: "ul",
        x: [
          "The account is immediately deactivated.",
          "The account enters a 90-day pending deletion period.",
          "During this period, users may contact our support team to restore their account.",
          "If no restoration request is received within 90 days, the account and associated personal information are permanently deleted.",
        ],
      },
      {
        t: "p",
        x: "Certain information may be retained where required by applicable law or legitimate business purposes, including:",
      },
      {
        t: "ul",
        x: [
          "Legal compliance",
          "Fraud prevention",
          "Security investigations",
          "Child-safety investigations",
          "Enforcement of our policies",
          "Tax and accounting obligations",
          "Cooperation with lawful requests from authorities",
        ],
      },
      { t: "p", x: "Retained information is securely stored and used only for those purposes." },
    ],
  },
  {
    id: "section-6",
    title: "6. Cookies and Similar Technologies",
    blocks: [
      { t: "p", x: "Art & Artist may use cookies and similar technologies to:" },
      {
        t: "ul",
        x: [
          "Improve user experience",
          "Analyze Platform usage",
          "Remember user preferences",
          "Personalize content",
          "Enhance application performance",
          "Maintain security and prevent abuse",
        ],
      },
      { t: "p", x: "Users may manage cookie preferences through their browser or device settings where applicable." },
    ],
  },
  {
    id: "section-7",
    title: "7. Child Privacy and Age Requirements",
    blocks: [
      {
        t: "p",
        x: "Art & Artist is designed for artists, creative professionals, recruiters, organizations, and individuals seeking networking and career opportunities.",
      },
      {
        t: "p",
        x: "Our Services are not intended for children under the age of 13, or the minimum digital age required by applicable law in the user's country.",
      },
      {
        t: "p",
        x: "We do not knowingly collect, use, or store personal information from children under 13 years of age without the legally required parental consent.",
      },
      {
        t: "p",
        x: "Where local law requires a higher minimum age or additional parental consent requirements, Art & Artist will comply with the applicable legal requirements.",
      },
      { t: "h3", x: "If a Child Creates an Account" },
      {
        t: "p",
        x: "If we become aware that a child below the applicable minimum age has created an account or provided personal information without legally required parental consent, we may take appropriate action, including:",
      },
      {
        t: "ul",
        x: [
          "Suspending or removing the account.",
          "Deleting the child's personal information from our systems within a reasonable period, unless we are legally required to retain certain information.",
          "Taking reasonable steps to prevent further collection of the child's information.",
        ],
      },
      { t: "h3", x: "Parental Rights" },
      {
        t: "p",
        x: "If you are a parent or legal guardian and believe your child has provided personal information through Art & Artist, you may contact us to:",
      },
      {
        t: "ul",
        x: [
          "Request deletion of your child's account.",
          "Request deletion of your child's personal information.",
          "Request information regarding what data has been collected, where legally permitted.",
          "Raise concerns regarding your child's privacy or safety.",
        ],
      },
      { t: "p", x: "We will review and respond to verified parental requests in accordance with applicable law." },
    ],
  },
  {
    id: "section-8",
    title: "8. CHILD SAFETY STANDARDS & CSAE POLICY",
    blocks: [
      { t: "h3", x: "8.1 Our Commitment to Child Safety" },
      {
        t: "p",
        x: "Art & Artist, operated by Artonym Pvt. Ltd., is committed to protecting children and maintaining a safe environment for everyone using our Platform.",
      },
      {
        t: "p",
        x: "Art & Artist has zero tolerance for Child Sexual Abuse and Exploitation (CSAE), Child Sexual Abuse Material (CSAM), child grooming, sexual exploitation of children, or any other form of sexual abuse or exploitation involving minors.",
      },
      {
        t: "p",
        x: "Any content, account, communication, behavior, or activity that facilitates, promotes, depicts, encourages, or attempts to facilitate the sexual abuse or exploitation of children is strictly prohibited on Art & Artist.",
      },
    ],
  },
  {
    id: "section-9",
    title: "9. Prohibited Child Sexual Abuse and Exploitation",
    blocks: [
      { t: "p", x: "Art & Artist strictly prohibits:" },
      {
        t: "ul",
        x: [
          "Child Sexual Abuse and Exploitation (CSAE)",
          "Child Sexual Abuse Material (CSAM)",
          "Sexual exploitation of minors",
          "Sexualization of children",
          "Grooming or attempting to groom a child",
          "Soliciting sexual images or content from a child",
          "Requesting or encouraging sexual activity involving a child",
          "Sexual communication with children",
          "Offering money, employment, gifts, services, opportunities, or other benefits in exchange for sexual content involving a child",
          "Trafficking or exploitation of children",
          "Facilitating contact between children and individuals for the purpose of sexual exploitation",
          "Uploading, sharing, requesting, distributing, or promoting CSAM",
          "Directing users to external locations containing CSAM or content facilitating CSAE",
          "Creating, manipulating, or distributing sexualized images or representations of minors",
          "Using Art & Artist to facilitate any form of child sexual exploitation",
          "Attempting to circumvent or evade these rules",
        ],
      },
    ],
  },
  {
    id: "section-10",
    title: "10. Zero-Tolerance Policy",
    blocks: [
      { t: "p", x: "Art & Artist maintains a zero-tolerance approach to CSAE and CSAM." },
      {
        t: "p",
        x: "We may take immediate action against accounts or content suspected of violating this policy, including:",
      },
      {
        t: "ul",
        x: [
          "Removing prohibited content",
          "Restricting or terminating accounts",
          "Preventing users from creating additional accounts",
          "Restricting messaging or communication capabilities",
          "Preserving relevant information where legally permitted or required",
          "Reporting suspected illegal activity to appropriate authorities",
          "Cooperating with law enforcement and relevant authorities",
          "Taking other measures necessary to protect children and users of the Platform",
        ],
      },
      { t: "p", x: "We do not permit users to use Art & Artist to facilitate or promote child sexual abuse or exploitation." },
    ],
  },
  {
    id: "section-11",
    title: "11. Reporting Child Safety Concerns",
    blocks: [
      {
        t: "p",
        x: "Users can report suspected CSAE, CSAM, grooming, exploitation, or other child-safety concerns through the reporting functionality available within Art & Artist.",
      },
      { t: "p", x: "Child Safety / CSAE Reporting Email: tech@artonym.in" },
      {
        t: "p",
        x: "When submitting a report, users should provide as much relevant information as reasonably possible, including:",
      },
      {
        t: "ul",
        x: [
          "Username or profile involved",
          "Relevant content or communication",
          "Description of the suspected violation",
          "Date and approximate time of the incident",
          "Relevant links or identifying information",
        ],
      },
      {
        t: "p",
        x: "Do not email, download, copy, or otherwise redistribute suspected CSAM unnecessarily. Provide identifying information or links where appropriate and safe to do so.",
      },
    ],
  },
  {
    id: "section-12",
    title: "12. Our Response to Child Safety Reports",
    blocks: [
      { t: "p", x: "Art & Artist will review reports concerning child safety and CSAE as a priority." },
      { t: "p", x: "Depending on the circumstances, we may:" },
      {
        t: "ul",
        x: [
          "Review the reported account, content, or activity.",
          "Remove or restrict violating content.",
          "Suspend or terminate accounts.",
          "Restrict communication or other Platform functionality.",
          "Preserve relevant information where permitted or required by law.",
          "Escalate serious matters to appropriate authorities.",
          "Cooperate with lawful requests from law enforcement or other competent authorities.",
        ],
      },
      {
        t: "p",
        x: "We may take action even when a report does not result in a formal finding of illegal activity if we determine that the activity presents a significant safety risk.",
      },
    ],
  },
  {
    id: "section-13",
    title: "13. Cooperation With Law Enforcement",
    blocks: [
      {
        t: "p",
        x: "Art & Artist will cooperate with law enforcement and other competent authorities regarding suspected child sexual abuse, exploitation, CSAM, grooming, trafficking, or other unlawful activity involving children, to the extent required or permitted by applicable law.",
      },
      {
        t: "p",
        x: "Where legally required, we may report suspected CSAE or CSAM to appropriate authorities or relevant organizations.",
      },
      {
        t: "p",
        x: "We may preserve relevant account, content, communication, technical, or other information where legally permitted or required for investigations, legal proceedings, or safety purposes.",
      },
    ],
  },
  {
    id: "section-14",
    title: "14. Prohibition on Child Grooming",
    blocks: [
      { t: "p", x: "Art & Artist strictly prohibits grooming behavior." },
      {
        t: "p",
        x: "Grooming includes attempts to establish, manipulate, or maintain a relationship with a child for the purpose of sexual exploitation or abuse. This may include:",
      },
      {
        t: "ul",
        x: [
          "Building trust with a child for sexual purposes",
          "Requesting private or sexual photographs",
          "Moving conversations to external platforms for sexual purposes",
          "Offering gifts, money, employment, opportunities, or other benefits to facilitate sexual exploitation",
          "Threatening or blackmailing a child to obtain sexual content",
          "Encouraging secrecy about inappropriate interactions",
          "Arranging meetings with a child for sexual purposes",
        ],
      },
      {
        t: "p",
        x: "Such conduct may result in immediate account termination and reporting to appropriate authorities where required or appropriate.",
      },
    ],
  },
  {
    id: "section-15",
    title: "15. Child Sexual Abuse Material",
    blocks: [
      {
        t: "p",
        x: "Art & Artist strictly prohibits the creation, upload, possession, request, sharing, distribution, promotion, or facilitation of Child Sexual Abuse Material (CSAM).",
      },
      { t: "p", x: "Users must never upload or share such material on Art & Artist." },
      {
        t: "p",
        x: "We may remove content and take appropriate enforcement action when we identify or receive reports concerning suspected CSAM.",
      },
    ],
  },
  {
    id: "section-16",
    title: "16. Artificially Generated or Manipulated Content",
    blocks: [
      {
        t: "p",
        x: "Art & Artist also prohibits the use of artificial intelligence, image-generation systems, image manipulation, editing, or other technologies to create, modify, sexualize, or depict children in sexually exploitative or abusive contexts.",
      },
      {
        t: "p",
        x: "The use of technology does not make otherwise prohibited child sexual abuse or exploitation content acceptable.",
      },
      {
        t: "p",
        x: "Any attempt to use generated, edited, manipulated, synthetic, or altered content to facilitate CSAE or CSAM is strictly prohibited.",
      },
    ],
  },
  {
    id: "section-17",
    title: "17. Child Safety and Creative Content",
    blocks: [
      {
        t: "p",
        x: "Art & Artist is a platform for artists, actors, filmmakers, photographers, designers, performers, and other creative professionals.",
      },
      {
        t: "p",
        x: "Creative, educational, documentary, journalistic, or artistic context does not permit sexual exploitation of children.",
      },
      {
        t: "p",
        x: "Any content involving minors must comply with applicable laws, our Terms of Service, Community Guidelines, and child-safety requirements.",
      },
      {
        t: "p",
        x: "Where content presents a child-safety risk, Art & Artist may restrict or remove the content regardless of the user's stated artistic, educational, documentary, or creative purpose.",
      },
    ],
  },
  {
    id: "section-18",
    title: "18. Account Enforcement",
    blocks: [
      { t: "p", x: "Users who violate this policy may face:" },
      {
        t: "ul",
        x: [
          "Content removal",
          "Warning where appropriate",
          "Temporary suspension",
          "Permanent account termination",
          "Restrictions on creating new accounts",
          "Restrictions on communication features",
          "Reporting to appropriate authorities where required or appropriate",
        ],
      },
      { t: "p", x: "Serious CSAE or CSAM violations may result in immediate permanent termination without prior warning." },
      {
        t: "p",
        x: "Art & Artist may also take preventive action when necessary to protect children, users, or the integrity of the Platform.",
      },
    ],
  },
  {
    id: "section-19",
    title: "19. Protecting Personal Information of Children",
    blocks: [
      { t: "p", x: "Art & Artist takes additional precautions regarding information involving children." },
      { t: "p", x: "Users must not publicly share a child's:" },
      {
        t: "ul",
        x: [
          "Home address",
          "Precise location",
          "Personal telephone number",
          "Personal email address",
          "School location",
          "Sensitive personal information",
          "Private photographs or videos without appropriate authorization",
        ],
      },
      {
        t: "p",
        x: "Users should obtain appropriate permission before uploading identifiable photographs, videos, or other personal information involving children.",
      },
      {
        t: "p",
        x: "The presence of a child in legitimate creative, educational, documentary, or artistic content does not remove the responsibility to protect the child's privacy and safety.",
      },
    ],
  },
  {
    id: "section-20",
    title: "20. Age and Platform Safety",
    blocks: [
      { t: "p", x: "Art & Artist may apply age-related restrictions and safety measures to protect minors." },
      {
        t: "p",
        x: "Certain features, including professional networking, messaging, employment opportunities, or other interactions, may be restricted based on age and applicable legal requirements.",
      },
      { t: "p", x: "Users must provide accurate information where age verification is required." },
      {
        t: "p",
        x: "Attempting to bypass age-related safety controls or providing false information for the purpose of accessing restricted features is prohibited.",
      },
    ],
  },
  {
    id: "section-21",
    title: "21. Reporting Underage Users",
    blocks: [
      {
        t: "p",
        x: "Users who believe an account belongs to a child below the minimum permitted age may report the account through the Help & Support or reporting functionality within the Platform.",
      },
      {
        t: "p",
        x: "We review such reports and may take appropriate action where necessary, including account restriction, suspension, removal, or deletion of personal information where appropriate and legally permitted.",
      },
    ],
  },
  {
    id: "section-22",
    title: "22. International Users",
    blocks: [
      { t: "p", x: "Art & Artist may be accessed by users from different countries and jurisdictions." },
      {
        t: "p",
        x: "Where local laws require a higher minimum age, additional parental consent, age verification, reporting obligations, or other child-safety protections, Art & Artist will take reasonable steps to comply with applicable legal requirements.",
      },
    ],
  },
  {
    id: "section-23",
    title: "23. Child Safety Contact",
    blocks: [
      {
        t: "p",
        x: "For child-safety concerns, including suspected CSAE, CSAM, grooming, exploitation, trafficking, or inappropriate interactions involving minors, contact:",
      },
      {
        t: "lines",
        x: [
          "Art & Artist / Artonym Pvt. Ltd.",
          "Child Safety / CSAE Email: tech@artonym.in",
          "General Support Email: tech@artonym.in",
          "Website: www.artandartist.co.in",
        ],
      },
      { t: "p", x: "Company: Artonym Pvt. Ltd." },
      {
        t: "p",
        x: "We encourage users, parents, guardians, and other concerned individuals to report child-safety concerns promptly.",
      },
    ],
  },
  {
    id: "section-24",
    title: "24. Updates to the Child Safety Policy",
    blocks: [
      {
        t: "p",
        x: "Art & Artist may update this Child Safety Standards & CSAE Policy periodically to reflect changes to:",
      },
      {
        t: "ul",
        x: ["The Platform", "Applicable laws", "Safety practices", "Regulatory requirements", "Industry standards"],
      },
      { t: "p", x: "The latest version will be published on this webpage." },
      { t: "p", x: "Material changes may also be communicated through the Platform and/or our official website." },
    ],
  },
  {
    id: "section-25",
    title: "25. Changes to this Privacy Policy",
    blocks: [
      { t: "p", x: "We may update or modify this Privacy Policy at any time." },
      {
        t: "p",
        x: 'Any revisions will be posted on our Platform and/or official website. The "Last Updated" date at the top of this Privacy Policy will indicate when changes were made.',
      },
      {
        t: "p",
        x: "Where appropriate, material changes may be communicated through the Platform or other reasonable means.",
      },
      {
        t: "p",
        x: "Your continued use of the Platform after updates become effective constitutes your acceptance of the revised policy, to the extent permitted by applicable law.",
      },
    ],
  },
  {
    id: "section-26",
    title: "26. Contact Us",
    blocks: [
      {
        t: "p",
        x: "If you have any questions, concerns, requests, or complaints regarding this Privacy Policy, the Child Privacy Policy, Child Safety Standards & CSAE Policy, your personal information, or account deletion, please contact us.",
      },
      { t: "lines", x: ["Art & Artist Support", "Email: tech@artonym.in"] },
      {
        t: "p",
        x: "For child-safety or CSAE-related concerns, please use the dedicated child-safety contact listed in Section 23.",
      },
    ],
  },
  {
    id: "declaration",
    title: "Declaration",
    blocks: [
      {
        t: "p",
        x: "Art & Artist, operated by Artonym Pvt. Ltd., expressly prohibits Child Sexual Abuse and Exploitation (CSAE), Child Sexual Abuse Material (CSAM), child grooming, and all forms of sexual exploitation or abuse involving children.",
      },
      {
        t: "p",
        x: "We are committed to maintaining a safe Platform, taking appropriate enforcement action against violations, providing mechanisms for users to report child-safety concerns, protecting children's personal information, and cooperating with relevant authorities where required or permitted by applicable law.",
      },
    ],
  },
];
