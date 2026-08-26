import type { LegalBundle } from './types'

export const en: LegalBundle = {
  terms: {
    metaTitle: 'Terms of Service — MLightCAD',
    metaDescription:
      'Terms of service for MLightCAD websites, open-source projects, and commercial software licenses sold through Paddle.',
    eyebrow: 'Legal',
    title: 'Terms of Service',
    updated: 'Last updated: August 24, 2026',
    intro:
      'These Terms of Service ("Terms") govern your access to MLightCAD websites, documentation, open-source software, and paid commercial licenses (including the Proprietary DWG Parser). By using our sites or purchasing a license, you agree to these Terms.',
    sections: [
      {
        title: '1. Who we are',
        paragraphs: [
          'MLightCAD ("we", "us", "our") provides open-source CAD infrastructure for the web and commercial software licenses for business customers. Our primary website is https://mlightcad.com.',
          'For licensing, billing, or support questions, contact support@mlightcad.com.',
        ],
      },
      {
        title: '2. Open-source software',
        paragraphs: [
          'Open-source components published by MLightCAD (for example cad-viewer and related packages on GitHub) are licensed under their respective open-source licenses shown in each repository. Nothing in these Terms limits those license terms.',
        ],
      },
      {
        title: '3. Commercial licenses',
        paragraphs: [
          'Paid products, including the Proprietary DWG Parser (@mlight-cad/dwg-converter), are sold as commercial software licenses to businesses and organizations. A separate license agreement applies to each purchase and defines permitted use, restrictions, delivery, and support scope.',
          'Unless expressly stated in writing, commercial licenses do not include source code. You may not redistribute or resell the proprietary parser as a standalone library or SDK.',
        ],
      },
      {
        title: '4. Orders and payment',
        paragraphs: [
          'Commercial licenses may be purchased through our checkout provider, Paddle, which acts as Merchant of Record for applicable transactions. Prices, taxes, and currency are shown at checkout.',
          'Access to licensed packages is provided digitally after successful payment. Delivery instructions are sent to the email address supplied at checkout.',
        ],
      },
      {
        title: '5. Acceptable use',
        paragraphs: ['You agree not to:'],
        list: [
          'Use our services for unlawful purposes or in violation of export, sanctions, or intellectual-property laws.',
          'Attempt to reverse engineer, decompile, or extract source code from proprietary packages except where applicable law expressly permits.',
          'Interfere with the security or availability of our websites, checkout, or delivery systems.',
          'Misrepresent your affiliation with MLightCAD or resell proprietary packages outside the scope of your license.',
        ],
      },
      {
        title: '6. Disclaimer of warranties',
        paragraphs: [
          'Our websites and software are provided "as is" and "as available" to the fullest extent permitted by law. We disclaim all warranties, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
          'CAD parsing and rendering depend on drawing content and deployment environment. You are responsible for validating suitability for your production use case.',
        ],
      },
      {
        title: '7. Limitation of liability',
        paragraphs: [
          'To the fullest extent permitted by law, MLightCAD will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for loss of profits, data, or business opportunity, arising from your use of our sites or software.',
          'Our aggregate liability for any claim relating to a commercial license purchase is limited to the amount you paid to us for that license in the twelve (12) months before the event giving rise to the claim, except where such limitation is prohibited by law.',
        ],
      },
      {
        title: '8. Changes',
        paragraphs: [
          'We may update these Terms from time to time. The "Last updated" date above indicates the latest revision. Material changes will be posted on this page. Continued use of our services after changes become effective constitutes acceptance of the revised Terms.',
        ],
      },
      {
        title: '9. Governing law',
        paragraphs: [
          'These Terms are governed by the laws applicable to MLightCAD as seller, without regard to conflict-of-law rules. Mandatory consumer protections in your jurisdiction remain unaffected where applicable.',
        ],
      },
      {
        title: '10. Contact',
        paragraphs: ['Questions about these Terms: support@mlightcad.com'],
      },
    ],
  },
  privacy: {
    metaTitle: 'Privacy Policy — MLightCAD',
    metaDescription:
      'How MLightCAD collects, uses, and protects personal information on its websites and during commercial license checkout.',
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: August 24, 2026',
    intro:
      'This Privacy Policy explains how MLightCAD ("we", "us", "our") handles personal information when you visit our websites, request a trial license, or purchase a commercial software license.',
    sections: [
      {
        title: '1. Information we collect',
        paragraphs: ['Depending on how you interact with us, we may collect:'],
        list: [
          'Contact details such as name, company name, work email address, and country or region.',
          'Billing and transaction information processed by our payment provider (Paddle), including order status, amount paid, and tax-related data required for invoicing.',
          'Technical data such as IP address, browser type, device information, and pages visited, collected through standard server logs or analytics tools.',
          'Support communications and trial-license application details you choose to send us by email or form.',
        ],
      },
      {
        title: '2. How we use information',
        paragraphs: ['We use personal information to:'],
        list: [
          'Provide, deliver, and support commercial software licenses.',
          'Process payments and fulfill orders.',
          'Respond to support requests and trial-license applications.',
          'Send transactional messages related to purchases, access, or account issues.',
          'Improve our websites, documentation, and products.',
          'Comply with legal, tax, and accounting obligations.',
        ],
      },
      {
        title: '3. Payment processing',
        paragraphs: [
          'Commercial checkout is handled by Paddle.com Market Limited and its affiliates ("Paddle"), which act as Merchant of Record for applicable transactions. When you purchase a license, Paddle collects payment and customer information needed to complete the order.',
          'Paddle processes personal data under its own privacy policy. We receive order and customer details needed to deliver your license and provide support.',
        ],
      },
      {
        title: '4. Sharing of information',
        paragraphs: ['We do not sell personal information. We may share information with:'],
        list: [
          'Service providers that help us operate our websites, deliver software access, or provide support (for example hosting, email, or package distribution via GitHub/npm).',
          'Paddle and related payment, tax, and fraud-prevention providers for checkout and invoicing.',
          'Authorities when required by law or to protect our rights, users, or the public.',
        ],
      },
      {
        title: '5. Data retention',
        paragraphs: [
          'We retain information for as long as needed to fulfill the purposes described in this policy, including license delivery, support, tax records, and dispute resolution, unless a longer retention period is required by law.',
        ],
      },
      {
        title: '6. Security',
        paragraphs: [
          'We use reasonable administrative, technical, and organizational measures to protect personal information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        title: '7. Your rights',
        paragraphs: [
          'Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal information, or to object to certain processing. To exercise these rights, contact support@mlightcad.com. We may need to verify your identity before responding.',
        ],
      },
      {
        title: '8. International transfers',
        paragraphs: [
          'We and our service providers may process information in countries other than your own. Where required, we rely on appropriate safeguards for cross-border transfers.',
        ],
      },
      {
        title: '9. Children',
        paragraphs: [
          'Our commercial products and checkout are intended for businesses and organizations. We do not knowingly collect personal information from children.',
        ],
      },
      {
        title: '10. Changes and contact',
        paragraphs: [
          'We may update this Privacy Policy from time to time by posting a revised version on this page. Questions: support@mlightcad.com.',
        ],
      },
    ],
  },
  refund: {
    metaTitle: 'Refund Policy — MLightCAD',
    metaDescription:
      'Refund policy for MLightCAD commercial software licenses purchased through Paddle, including perpetual licenses and annual update packages.',
    eyebrow: 'Legal',
    title: 'Refund Policy',
    updated: 'Last updated: August 24, 2026',
    intro:
      'This Refund Policy applies to commercial software licenses sold by MLightCAD through Paddle, including the Proprietary DWG Parser perpetual license and annual update packages.',
    sections: [
      {
        title: '1. Digital products',
        paragraphs: [
          'Our paid products are digital software licenses delivered electronically (for example via npm package access and email instructions). No physical goods are shipped.',
        ],
      },
      {
        title: '2. General policy',
        paragraphs: [
          'Because licenses grant immediate access to proprietary software, all sales are generally final once access has been delivered or activated, except where a refund is required by applicable law or expressly approved by us in writing.',
          'If you believe a purchase was made in error, contact support@mlightcad.com within fourteen (14) days of purchase and before substantial use or deployment. We review refund requests case by case.',
        ],
      },
      {
        title: '3. Perpetual license',
        paragraphs: [
          'The perpetual license is a one-time purchase that grants ongoing use of the licensed package version subject to the applicable license terms. Refunds may be considered if access has not yet been provisioned or if a duplicate charge occurred.',
        ],
      },
      {
        title: '4. Annual update packages',
        paragraphs: [
          'Annual update packages provide access to new upgrade releases for an additional year. You may continue using the version already licensed without purchasing updates.',
          'If you cancel or request a refund for an annual update package, access to future update releases may end for that subscription period. Fees for completed billing periods are generally non-refundable unless required by law.',
        ],
      },
      {
        title: '5. How to request a refund',
        paragraphs: ['Email support@mlightcad.com with:'],
        list: [
          'Your company name and contact email used at checkout.',
          'Paddle order or transaction reference, if available.',
          'Product purchased (perpetual license or annual updates).',
          'Reason for the request.',
        ],
      },
      {
        title: '6. Chargebacks',
        paragraphs: [
          'If you have a billing concern, please contact us before initiating a chargeback so we can help resolve the issue. Unauthorized or abusive chargebacks may result in suspension of license access while the dispute is investigated.',
        ],
      },
      {
        title: '7. Contact',
        paragraphs: ['Refund questions: support@mlightcad.com'],
      },
    ],
  },
}
