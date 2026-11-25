# SparKanone homepage changes

## Navigation and hero

- Rebuilt the navbar as a full-width cream header that blends into the hero and scrolls away with the page.
- Enlarged the logo, navigation labels, and mobile menu icon. The four links lead to Sparvorteile, Gewinnspiele, So geht’s, and FAQ.
- Desktop links turn green and lift slightly on hover. The mobile menu opens beneath the header.
- The hero cannon fires 20 banknotes per burst while visible. A separate green cursor glow crosses the navbar and hero as one continuous trail.

## Homepage animations

- **Drei Arten zu sparen** — The title fades in, and the three card icons swing briefly as they come into view.
- **Gutschein, Supermarkt, and Kassenbon** — The full panels slide in from the right, left, and right respectively.
- **Was steckt im Lostopf?** — The card scales in, the photo enters from the left, and the heading rises in. The questions enter from the right with a 0.15-second stagger and a 0.75-second reveal per question. The photo zooms slightly on hover.
- **Was kostet der Kurztrip insgesamt?** — The card scales in, the traveler photo rotates into place, and the four cost items appear in sequence as their dividers draw across. The icons swing gently after the reveal. The items have no hover highlight or zoom.
- Scroll reveals play once. The new motion effects accommodate the system’s reduced-motion preference.

## Dein Sparpotenzial

- Added an interactive calculator above the final CTA and tightened its spacing below the FAQ.
- Visitors can choose monthly spending from 500 € to 5.000 € and an example cashback rate of 3% or 5%. The annual estimate updates live. The default is 720 € at 2.000 € per month and 3%.
- The lime slider fill follows the dark green thumb. The remaining track is muted gray-green.
- The calculator uses German euro formatting, provides keyboard-accessible controls, and labels the estimate as illustrative.

## Git handoff

Commit `5c67eef` on `homepage-updates` contains the earlier homepage update. To include edits made afterward, copy the current changes into the Git clone, review the diff, and create a second commit before pushing the branch.
