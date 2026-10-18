import json,unittest
from pathlib import Path
P=Path(__file__).resolve().parents[1]/'public'
class Catalog(unittest.TestCase):
 def test_all_products_and_series(self):
  c=json.loads((P/'catalog.json').read_text());self.assertEqual(len(c['pillars']),10)
  for p in c['pillars']:
   self.assertTrue((P/'pillars'/p['slug']/'index.html').exists());self.assertFalse(p['checkout_enabled'])
  self.assertFalse(c['series']['checkout_enabled']);self.assertTrue((P/'series/index.html').exists())
 def test_no_paid_assets_or_legacy_links(self):
  self.assertFalse(list(P.rglob('*.pdf')))
  for f in P.rglob('*.html'):
   s=f.read_text();self.assertNotIn('gumroad',s.lower());self.assertNotIn('SCROLL-DEMO',s);self.assertNotIn('buy.stripe.com',s)
 def test_observable_health(self):
  self.assertEqual(json.loads((P/'health.json').read_text())['status'],'ok')
 def test_no_chat_api_in_public_output(self):self.assertFalse((P/'api').exists())
if __name__=='__main__':unittest.main()
