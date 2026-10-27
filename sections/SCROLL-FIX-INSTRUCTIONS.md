# C2DG scroll bridge — test build

## What was repaired
The supplied HTML pages calculated progress from their **own iframe** scroll positions. Since Wix scrolls the outer document, that progress stayed at zero. `hero.html`, `design-flipbook.html`, and `drone.html` now accept `SCROLL_PROGRESS` messages, with a fallback to their original standalone scroll behavior.

## Deploy
1. Upload the full contents of this folder to `/wix-animations/sections/` on GitHub Pages, preserving `models/` and `images/`.
2. In Wix Studio, use one HTML component per section pointing to the corresponding GitHub page. Set the IDs to `heroHtml`, `designHtml`, `droneHtml` (or edit the controller).
3. Add the contents of `WIX-VELO-SCROLL-CONTROLLER.js` to the **homepage page code**, not the global site code.
4. Publish and test on the actual Wix page, not only inside the editor. Confirm the browser console has no model 404s.
5. Keep Contact and Footer native Wix and connect menu links to Wix anchors.

## Important limitations / calibration
- This is a first-pass bridge, not a verified browser-tested integration. Wix viewport-enter events only estimate the top of an element. Entering while scrolling upward or after a jump may cause inaccurate offsets; calibrate `top` values for production.
- For book and drone, the Wix section needs **scroll travel**. A 100vh HTML component gives `travel=1`, effectively skipping animation. Make the relevant Wix HTML component taller than the viewport (for example 250–350vh) while testing, or adapt the controller to use a taller section's height and a sticky/pinned iframe. The iframe itself should not scroll.
- The controller's `.height` measures the HTML component, not its Wix section. If the HTML component stays 100vh and the section is taller, use the section's actual height in the controller.
- The HTML files currently load Three.js independently. This package does not rewrite all visual transitions or optimize multi-iframe GPU usage.
- Use the Wix preview/live test to tune timing and ensure cross-frame messages are received. The GitHub page can still be tested standalone using its own scroll events.
