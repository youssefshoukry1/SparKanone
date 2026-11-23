# SparKanone.de homepage plan

**Progress:** Steps 1–5 have a working local review build. The production build passed with strict TypeScript checks. Chrome checks passed at 320, 390, 768 and 1440 pixels, including anchor destinations, menu dismissal, focus restoration and keyboard FAQ interaction. Step 6 lists the outstanding client inputs.

## 1. Establish the customer journey

The client brief positions SparKanone as a German consumer savings brand. The working audience is German-speaking shoppers who want to understand the benefit and its conditions before committing. Membership, eligibility, fees, partners, rewards and payment channels need first-party confirmation. The client's website could not be inspected during research. [Client website](https://sparkanone.de/)

Cashfreude describes code-based onboarding, an online shopping portal, receipt submission, travel bookings and member competitions. These findings describe the competitor. SparKanone's own onboarding and commercial model remain open. [Competitor's service description](https://cashfreude.de/)

The review homepage introduces savings concepts and directs visitors to an on-page guide. Once the client supplies an actual customer journey, use that journey for the main action and the three steps. Keep project communication in English and visitor copy in formal German.

## 2. Set the visual system

Use forest green (#0B2F1D) for type and the closing panel, medium green (#477850) for details, lime (#ADD266) for highlights, soft cream (#F8F7E9) for the page and white for cards. Pair Manrope headings with Inter body text. Use an eight-pixel spacing rhythm, rounded buttons, generous section margins and visible keyboard focus.

The supplied cannon-and-wordmark logo appears in the header, hero and footer. Two transparent WebP sizes preserve the proportions and retain the internal cream highlights.


## 3. Build the eight homepage sections

| Section | Desktop composition | Small-screen behavior and content |
| --- | --- | --- |
| Header and hero | Wordmark, section links and a two-column hero. “Mehr sparen. Mehr erleben.” leads to “SparKanone kennenlernen”. | Collapsible navigation. Text and CTA precede the illustration. |
| Explainer | Written introduction beside a branded 16:9 video cover. | Stack both. Mark the video as in preparation and keep the written explanation accessible. |
| Benefits | Three editorial cards explain savings concepts until the client approves specific benefits. | Stack cards. Keep the distinction between a general explanation and an actual offer visible. |
| How it works | Three numbered steps for assessing a savings opportunity. | Vertical reading order. Replace with verified onboarding and redemption steps after confirmation. |
| Why SparKanone | One concrete example showing how to compare final prices. | Keep the calculation and its explanation together. |
| FAQ | Keyboard-accessible disclosure rows. | Entire question opens the answer. Add contractual answers only from approved terms. |
| Final action | Dark green panel with a lime action leading to the guide. | Single prominent link. Adopt the approved commercial destination when supplied. |
| Footer | Brand, section navigation and approved operator links. | Wrap links. Add contact, Impressum and Datenschutz when the client supplies real destinations. |

## 4. Implement in the existing repository

Use Next.js App Router, React, TypeScript and Tailwind. Keep layout navigation separate from the home route, reusable content in a typed German content module and the illustrated video cover independent from a future player. Use server-rendered sections and limit client state to mobile navigation. Prefer responsive CSS and native disclosures.

## 5. Verify the review build

Run a production build and inspect the homepage, anchor destinations, mobile menu, FAQ, keyboard focus, wrapping and reduced-motion behavior. Check that every interactive control has a working destination and that the video cover is static.

## 6. Prepare for client launch

- [x] Integrate the supplied SparKanone logo and mascot.
- [ ] Confirm benefits, eligibility, fees, terms, enrollment and fulfillment.
- [ ] Approve German copy, the main CTA and its destination.
- [ ] Supply operator information, support channel, Impressum and Datenschutz.
- [ ] Supply the explainer and German captions for the later video release.
