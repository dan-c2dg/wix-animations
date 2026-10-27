// C2DG Wix Studio homepage page code
// Set the actual HTML component IDs below in Wix Properties & Events.
// The components must be HTML embeds (Embed a Site works with Wix postMessage).
import wixWindowFrontend from 'wix-window-frontend';

const ITEMS = [
  {id:'#heroHtml', key:'hero'},
  {id:'#designHtml', key:'design'},
  {id:'#droneHtml', key:'drone'}
];
const CHANNEL = 'c2dg-animation-v1';
const metrics = {};
let lastY = null;

$w.onReady(async function () {
  for (const item of ITEMS) {
    const el = $w(item.id);
    if (!el) continue;
    metrics[item.key] = {el, top:null, height:el.height, ready:false};
    el.onMessage(event => {
      if (event.data?.channel === CHANNEL && event.data?.type === 'READY') {
        metrics[item.key].ready = true;
        sendProgress(item.key);
      }
    });
    // Approximate document top when element first enters viewport.
    // For pixel-perfect timing, replace with a calibrated top position.
    el.onViewportEnter(async () => {
      const r = await wixWindowFrontend.getBoundingRect();
      const m = metrics[item.key];
      if (m.top === null) m.top = r.scroll.y + r.window.height;
      sendProgress(item.key, r);
    });
  }
  // Wix's outer page scrolls, not the embedded document. Polling the page scroll
  // avoids relying on an unsupported iframe scroll event.
  setInterval(async () => {
    try {
      const r = await wixWindowFrontend.getBoundingRect();
      if (r.scroll.y === lastY) return;
      lastY = r.scroll.y;
      for (const item of ITEMS) sendProgress(item.key, r);
    } catch (e) { console.warn('C2DG scroll controller', e); }
  }, 40);
});

async function sendProgress(key, rect) {
  const m = metrics[key];
  if (!m || !m.ready || m.top === null) return;
  const r = rect || await wixWindowFrontend.getBoundingRect();
  // 0 at the section's top; 1 when its scroll travel has completed.
  // Use taller Wix sections for drone/book; HTML component itself should be
  // sticky/pinned or span the section depending on your Wix layout.
  const travel = Math.max(1, m.height - r.window.height);
  const progress = Math.max(0, Math.min(1, (r.scroll.y - m.top) / travel));
  m.el.postMessage({channel:CHANNEL,type:'SCROLL_PROGRESS',progress});
}
