# C2DG: separate Wix Studio section embeds

This package is derived from the previously generated **individual-section** pages and uses optimized image resources from the later native-menu package. It is NOT a byte-for-byte split of the latest live GitHub index.html. Test the 3D transitions and galleries before replacing your working single embed.

## Files
- hero.html
- our-work.html
- branding.html
- design-flipbook.html
- drone.html
- photography.html
- videography.html
- our-story.html
- our-mission.html
- images/ (WebP and SVG assets)
- models/ (GLB models)

The Contact and Footer are NOT included. Keep both as native Wix sections. The Wix global native navigation is not included in the embeds.

## GitHub upload
1. In GitHub, create a backup branch or download your existing site.
2. Locate the GitHub Pages publishing root (repository `dan-c2dg.github.io`, based on your current URL). Keep your current `/wix-animations/index.html` unchanged during testing.
3. Create `/wix-animations/sections/` and upload the nine HTML files there.
4. Upload the `images/` and `models/` directories **inside that sections directory**, keeping the relative paths.
5. Commit; wait for Pages deployment.
6. Test a direct URL such as `https://dan-c2dg.github.io/wix-animations/sections/hero.html`.

## Wix Studio setup
1. Duplicate the Wix homepage as a backup.
2. Hide or remove the old single HTML embed ONLY on the duplicate/test page.
3. Add nine Wix native sections in the desired order. Add one HTML Embed component in each section.
4. Use **Embed a Site** with each HTTPS GitHub Pages section URL, or an HTML wrapper iframe if you need message forwarding.
5. Set each Wix section and embed height deliberately: start at 100vh for hero/work/branding/story/mission; allow extra scroll space for the book and drone (often 180–300vh), then test on mobile. Do not let an iframe scroll independently if you expect Wix scrolling to control its 3D timeline.
6. Put native Contact and Footer after the last embedded section.
7. Keep the native Wix global navigation in the header; do not add another navigation in the HTML files.

## Navigation: native Wix anchors
Since each section is now a real Wix section, use native Wix anchors instead of sending SCROLL_TO messages into an iframe.
- Add a Wix anchor to each Wix section and name it `hero`, `our-work`, `branding`, `design-flipbook`, `drone`, `photography`, `videography`, `our-story`, `our-mission`.
- Set native menu/footer links to the matching homepage anchor (Wix Page/Anchor link settings).
- For other pages, link to the homepage's Wix anchor via the editor rather than an iframe ID.
- Link Let's Elevate directly to the native Wix Contact anchor.

## Important scroll-driven animation caveat
Splitting into independent iframes changes how scroll events are delivered. Browser scrolling in Wix does NOT automatically produce scroll events inside each embedded iframe. The older standalone design/drone HTML pages may therefore not advance their scroll-controlled animation correctly. A production-quality split needs each section to receive parent-page scroll progress via Wix Velo `$w(...).postMessage()` and to apply it to its animation timeline. Do not delete your working full-site embed until you confirm the split works. The gallery/lightbox also needs mobile testing for iframe clipping.

## Performance
Separate embeds do not guarantee faster PageSpeed scores: nine iframes can cost more than one, especially if each loads Three.js. Consider testing hero-only first and lazy-loading other sections.
