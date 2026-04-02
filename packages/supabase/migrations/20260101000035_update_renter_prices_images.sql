-- Migration 035: Update renter product prices and images from AliExpress research
-- Generated: 2026-03-24T17:11:01.770Z
-- Target margin: 45% | HST: 13% | Shipping est: $3.00 CAD
-- Prices are RETAIL (pre-tax) in CAD cents

-- 2-Tier Suction Cup Shower Caddy
UPDATE shop_products SET
  price_cents = 2499,
  compare_at_cents = 4399,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/Sf6bc84afa19f41b7949d28ac1aa89208H.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S157757610da2495aab1b67e8c55ffce8z.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sdf73c6051a3844268eb8a4abd0a96a7dD.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S6e2ab17daa754220bcbc5a6e640c7379O.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S536b667bf09c4aef9a522ebb32e7e32a0.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sda63c30e8a6f47f28e4491061f72434d0.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/Sf6bc84afa19f41b7949d28ac1aa89208H.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005009356608648.html?pdp_npi=6%40dis%21CAD%2122.30%2110.48%21%21%21109.39%2151.41%21%4021413d5a17743722095221694ec3dd%2112000048853500162%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'suction-cup-shower-caddy-2-tier';

-- Self-Adhesive Towel Bar
UPDATE shop_products SET
  price_cents = 3899,
  compare_at_cents = 3899,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/H7dc9988c23ed40b09e20d61845600019F.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Hbbb9aaa613ec4de8ac2c57841f4476f3x.jpg','https://ae-pic-a1.aliexpress-media.com/kf/H6724013c4e424a36a8a0db5701c5e048X.jpg','https://ae-pic-a1.aliexpress-media.com/kf/H00a223e57ce24403991490f859881d25q.jpg','https://ae-pic-a1.aliexpress-media.com/kf/H0d08e3f1a0da4fcfac61612f336d6613s.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Ha7c2700ff1e24893bab11405d75cce17Q.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/H7dc9988c23ed40b09e20d61845600019F.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005002184249800.html?pdp_npi=6%40dis%21CAD%2119.85%2118.28%21%21%2114.11%2112.99%21%4021413d5a17743722122521709ec3dd%2112000027979095051%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'adhesive-towel-bar-stainless-steel';

-- Suction Cup Razor Holder
UPDATE shop_products SET
  price_cents = 1649,
  compare_at_cents = 2299,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S16f7b329632c47faa817e15151a8d420O.png','https://ae-pic-a1.aliexpress-media.com/kf/S8026452084f642d78b18df628c64a4acG.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S625da481268d417b8f292617c689d9080.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Saecd2f669fea4b0681e923afc7db2b4ek.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S040cf26579c446ae9058c7e6acde0623r.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd73ffb877429421485758c2324f5389bO.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S16f7b329632c47faa817e15151a8d420O.png',
  alibaba_url = 'https://www.aliexpress.com/item/1005010179045004.html?pdp_npi=6%40dis%21CAD%2110.86%216.19%21%21%2153.26%2130.36%21%4021413d5a17743722143671717ec3dd%2112000051417791114%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'suction-cup-razor-holder-shower';

-- Adhesive Toilet Paper Holder
UPDATE shop_products SET
  price_cents = 1349,
  compare_at_cents = 1149,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S8fb5e44e9dc64123add7fefa09d369f12.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S69dc7b8ef32c4bb2a95cc342706cbc52Z.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S7009f610f4c74a94a3e792b06d70e1e0t.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S4fad6f80f75146cb9001f6540913a39eY.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S680bc4157fe14309898a6f8cb2dc6368E.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S743f0e5eb70f467d94e4d340702c635aY.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S8fb5e44e9dc64123add7fefa09d369f12.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005008289633607.html?pdp_npi=6%40dis%21CAD%214.63%214.40%21%21%213.29%213.13%21%4021413d5a17743722159691723ec3dd%2112000044496277892%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'adhesive-toilet-paper-holder-matte-black';

-- Over-Door Towel Rack 3 Bars (manual price — AE search returned wrong product)
-- Comparable: $12-18 CAD on AE, retail ~$29.99 for 45% margin
UPDATE shop_products SET
  price_cents = 2999,
  compare_at_cents = 3999,
  updated_at = now()
WHERE slug = 'over-door-towel-rack-3-bar';

-- 10x Magnifying Mirror
UPDATE shop_products SET
  price_cents = 1549,
  compare_at_cents = 2499,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S81b9cd1994d34798b5fc6355c85ddf354.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S98919c74cfbf403ea56116dfa2322974R.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S7d23b4f8ea2e466f9ed55f6044cb001ff.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sbe6c8685c03f441eb3224c7d4c32b154v.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sddf3c2c0be9d4710ac810b26d8dc7021o.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd0cb58d82cd44a1da0485dd36e19ef7dC.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S81b9cd1994d34798b5fc6355c85ddf354.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005001524205536.html?pdp_npi=6%40dis%21CAD%2112.20%215.49%21%21%2159.83%2126.92%21%4021413d5a17743722206671773ec3dd%2112000016466261151%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'suction-cup-magnifying-mirror-10x';

-- Adhesive Toothbrush Holder
UPDATE shop_products SET
  price_cents = 1799,
  compare_at_cents = 3099,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S55d956b21a66434aadf7b5b9e53b953fz.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S51f3af2ba9884c7c8483661c097b16a2O.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S6830d2d80643407fa785499f56d4d2fdl.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S902d773d386f4a08b0db8f2bc95533c6C.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S8358a70eb6e14e14a4a88eee12d5d3c9h.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S4318ace2dd0f42f9a79adebe86c48124Q.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S55d956b21a66434aadf7b5b9e53b953fz.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005008144979187.html?pdp_npi=6%40dis%21CAD%2115.31%216.89%21%21%2175.09%2133.79%21%4021413d5a17743722222971778ec3dd%2112000043981408193%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'adhesive-toothbrush-holder-4-slot';

-- Shower Glass Door Hooks 6-Pack
UPDATE shop_products SET
  price_cents = 2299,
  compare_at_cents = 4399,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S8c69e994d28c49e49982d4c636f5d5bdI.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S5be19d1d30794e2a8c7fdda3f7c2fdd4X.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S31450ac9a16648ffa67012831477a1b9g.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S6a19a3ea69a84eaa8287f90539d4d0d1x.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S3803875eae8d4c3586a93176248c3c05w.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sdef558f7378c4c558b5465b89e559d54x.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S8c69e994d28c49e49982d4c636f5d5bdI.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005010153458319.html?pdp_npi=6%40dis%21CAD%2122.81%219.58%21%21%21111.87%2146.99%21%4021413d5a17743722243361811ec3dd%2112000051336121010%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'shower-door-hooks-stainless-6-pack';

-- Magnetic Knife Strip
UPDATE shop_products SET
  price_cents = 10999,
  compare_at_cents = 13499,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S6f0c9a76b59f4caf853b3d11d60b3ae16.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S0d27c3ae154f45258684251487f19982R.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Saa8e19d1436b4c509901cbcb7b054b73e.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sa6b9bfc0f09a410c87d110a6908b910dF.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S90f7dea1ae7c4fbca5159a15a549c3336.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sa8e9eb08048c4f39b7a945e32f9de1dbe.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S6f0c9a76b59f4caf853b3d11d60b3ae16.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005003950717059.html?pdp_npi=6%40dis%21CAD%2171.27%2156.38%21%21%2150.67%2140.08%21%4021413d5a17743722263091816ec3dd%2112000027544059762%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'magnetic-knife-strip-adhesive-16-inch';

-- Over-Cabinet Door Hooks 6-Pack (manual price — AE search returned wrong product)
-- Comparable: $5-8 CAD on AE, retail ~$14.99 for 45% margin
UPDATE shop_products SET
  price_cents = 1499,
  compare_at_cents = 1999,
  updated_at = now()
WHERE slug = 'over-cabinet-hooks-stainless-6-pack';

-- Adhesive Spice Rack
UPDATE shop_products SET
  price_cents = 7499,
  compare_at_cents = 12999,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/Sacee722da5fd4629addbc75411d0c3028.jpeg','https://ae-pic-a1.aliexpress-media.com/kf/Sb74ec5e85571461ca585ca31fadfc5dfK.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S38cb4033c624428591144e2727f69288G.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sfd95c4f4c4a345a39a4281b2a31b4c92h.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S8b666bc7a4f740008de447d3fbca5c63e.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/Sacee722da5fd4629addbc75411d0c3028.jpeg',
  alibaba_url = 'https://www.aliexpress.com/item/1005009099142132.html?pdp_npi=6%40dis%21CAD%2170.68%2139.58%21%21%2150.25%2128.14%21%4021413d5a17743722298841852ec3dd%2112000047910676844%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'adhesive-spice-rack-cabinet-door';

-- Under-Cabinet Paper Towel Holder
UPDATE shop_products SET
  price_cents = 2499,
  compare_at_cents = 6499,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S34963d1b13324ace9d6985aa0ddae644J.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Seb6bea91e40d40298e4f0fc8abe5d0c58.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sa05f640015aa4c54b84f44bdbeedd242n.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd095828ef4da4c7185e656857a5574cfH.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S39320deb774241d3b4650914918e27ebI.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S4038ee16f6694800a2a2c01b8e559e5aL.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S34963d1b13324ace9d6985aa0ddae644J.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005007242705277.html?pdp_npi=6%40dis%21CAD%2132.75%2110.48%21%21%21160.62%2151.40%21%4021413d5a17743722314821856ec3dd%2112000039924998197%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'under-cabinet-paper-towel-holder-adhesive';

-- Kitchen Sink Sponge Holder
UPDATE shop_products SET
  price_cents = 4099,
  compare_at_cents = 7499,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S0b7bf4c5e063410c988480b81fe22e837.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S6534ba7eb4f34abd8784a596edffef494.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd22c17cbd3c444cf9771c8d6125e14ddD.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S908e73a9b43849589427f2f39e6f6749k.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sec96d868d6ba459599ac17fec91f28082.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S904b774cef99492c8ca20ff9f643c6302.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S0b7bf4c5e063410c988480b81fe22e837.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005007010501236.html?pdp_npi=6%40dis%21CAD%2138.96%2119.48%21%21%21191.07%2195.53%21%4021413d5a17743722331431869ec3dd%2112000056141213025%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'suction-cup-sponge-holder-sink';

-- Magnetic Fridge Side Shelf
UPDATE shop_products SET
  price_cents = 4999,
  compare_at_cents = 13499,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S82beef09864b4668ba52e585c1f5e412M.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S002741573cd549e9b5f65fdf6b070a056.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sc5d138f31d36402e83df01bb0558c8ecj.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S90c67fa2f2034f6b839b209d4f6b0ed49.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sba068df77b564ffe97c1e423b6ba1048h.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sb0cf58c8b2484c3e8da38cdf6235f582b.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S82beef09864b4668ba52e585c1f5e412M.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005007562924295.html?pdp_npi=6%40dis%21CAD%2172.29%2124.58%21%21%21354.54%21120.55%21%4021413d5a17743722351971896ec3dd%2112000041308435467%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'magnetic-fridge-side-shelf-spice-rack';

-- Over-Sink Dish Drying Rack
UPDATE shop_products SET
  price_cents = 11499,
  compare_at_cents = 22499,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S17743c9554f74d9ab150659341c1ff29x.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S813a7bc0c64b437692e1ac571079f272T.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sec2982788696455e824699203e1eb112D.png','https://ae-pic-a1.aliexpress-media.com/kf/S30147141096e4211a95045d25b07fe5ek.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sa937ab3be7db4aae8de95fa5e6b7a8eeP.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sf7cfb56b870940d585e81a3e7f3324e1M.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S17743c9554f74d9ab150659341c1ff29x.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005010139812623.html?pdp_npi=6%40dis%21CAD%21123.22%2160.38%21%21%21604.32%21296.13%21%4021413d5a17743722372321923ec3dd%2112000051291668647%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'over-sink-dish-drying-rack-adjustable';

-- Tension Rod Closet Shelf
UPDATE shop_products SET
  price_cents = 4699,
  compare_at_cents = 6499,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/Sd35a5f5b611740e9a20aa6e606cd8706v.png','https://ae-pic-a1.aliexpress-media.com/kf/S3bfc7cdbd8e043d4868d2a3a79bccf1fI.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sbd9260a1c9074eb687aa605f29e5394dV.png','https://ae-pic-a1.aliexpress-media.com/kf/S72a30c29b5d34b89a1d698f860410c87e.png','https://ae-pic-a1.aliexpress-media.com/kf/S6c1b183ba3ff4cec9555540d74ba2091i.png','https://ae-pic-a1.aliexpress-media.com/kf/S5e9439dff5884d789ef6c752148a87556.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/Sd35a5f5b611740e9a20aa6e606cd8706v.png',
  alibaba_url = 'https://www.aliexpress.com/item/1005009540325071.html?pdp_npi=6%40dis%21CAD%2134.74%2122.58%21%21%21170.38%21110.74%21%4021413d5a17743722389731928ec3dd%2112000049408942562%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'tension-rod-closet-shelf-expandable';

-- Over-Door Hook Rack 6 Hooks
UPDATE shop_products SET
  price_cents = 4399,
  compare_at_cents = 11499,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S926056806f994a54958b005bc3739e99h.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd42d8d4a67b949d3af9a9652aae55e88z.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sbef8eee352d84e2eafd9f9d9a71d72f7C.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S6519b97ca2c44cf3b33ad5f75851d7b3v.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S44bac31f64f0463f8335ff86e98894d5k.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Se3ee0fff47714272ab135d06f5ffb189j.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S926056806f994a54958b005bc3739e99h.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005007007295060.html?pdp_npi=6%40dis%21CAD%2161.09%2121.38%21%21%21299.61%21104.86%21%4021413d5a17743722410471948ec3dd%2112000039038515759%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'over-door-hook-rack-6-hooks';

-- Adhesive Cable Clips 20-Pack
UPDATE shop_products SET
  price_cents = 1199,
  compare_at_cents = 1799,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/Sdd44a9782dad49ed9586ed2a030d1916z.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S86f594cd851540bab153e7782ef830ccK.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S00c4ce34ec304633a257797e115ca649O.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S4a4ab14c7aba4d8b8361add2509bcc78w.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S15bfb52c881e4ec5964dfe9c7055d88aw.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S34179c2f251b4d2ead57f68ae053904fp.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/Sdd44a9782dad49ed9586ed2a030d1916z.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005009131006434.html?pdp_npi=6%40dis%21CAD%218.13%213.60%21%21%2139.86%2117.66%21%4021413d5a17743722430341999ec3dd%2112000049608002018%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'adhesive-cable-clips-desk-20-pack';

-- Stackable Shelf Risers 2-Pack
UPDATE shop_products SET
  price_cents = 2199,
  compare_at_cents = 2699,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S3890749dcc5b4154a7db7e4dffac30abs.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S2b46bb96f43c46fa9168b3ca1adf67acB.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sc5d20bd94d6a4d47a0a0f12fa3871b3do.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S86f6af5d5c884803ac6584d23bc6016fM.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S1d92bc9eaa344103ba213173d4360de0D.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Scf900d2c3eb148f0b48afa5d454fb149N.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S3890749dcc5b4154a7db7e4dffac30abs.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005010463310787.html?pdp_npi=6%40dis%21CAD%2113.42%218.99%21%21%219.54%216.39%21%4021413d5a17743722446672011ec3dd%2112000052495420411%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'stackable-shelf-risers-kitchen-cabinet';

-- Hanging Closet Organizer 6 Shelves
UPDATE shop_products SET
  price_cents = 2399,
  compare_at_cents = 3199,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/Sb0e4f07c95ea425c947fead11fe893bdN.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sf2f27a098e184fc6992a39cc08644d4d0.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S7cd838c2ff8e484b8d9f049bd41019c1r.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S79b2a01f18ac4385b71ec7ede7b926138.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S6213cd3b9d7e48188cd8ec6850f20794F.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd6438a5404544dfd81e7c911fd2db8fai.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/Sb0e4f07c95ea425c947fead11fe893bdN.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005009274548096.html?pdp_npi=6%40dis%21CAD%2115.97%2110.38%21%21%2111.35%217.38%21%4021413d5a17743722469232016ec3dd%2112000048577345774%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'hanging-closet-organizer-6-shelf';

-- Under-Bed Rolling Storage Bins
UPDATE shop_products SET
  price_cents = 5499,
  compare_at_cents = 7999,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/Sda13acb2722e4a72a790efea9bf6a21dg.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd32d4a32e4a148dfbc5d22f736405654v.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S37de3ec62ead47428d6959c080f47f8cW.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S1d5ec1235f694c76ac01bc266bcd7063h.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S45f7c13091f14cdda94b7d2e690fdd91i.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S58943b28bdb044a9bad92a788a2e9152B.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/Sda13acb2722e4a72a790efea9bf6a21dg.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005009927624115.html?pdp_npi=6%40dis%21CAD%2141.25%2125.99%21%21%2129.33%2118.48%21%4021413d5a17743722489862045ec3dd%2112000050599481103%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'under-bed-storage-bins-rolling-2-pack';

-- LED Strip Lights RGB 5m
UPDATE shop_products SET
  price_cents = 2299,
  compare_at_cents = 3799,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/Sc8bd7eb557f9433e9661e1f9e489f2d20.png','https://ae-pic-a1.aliexpress-media.com/kf/S676b0e9f250e45a3b8d2f3ae1439ed0b5.png','https://ae-pic-a1.aliexpress-media.com/kf/Sdb0f7fa806b845bd8409be606e6111b0j.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S3202099e961449db924d89cd58d5e180n.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S320c3a166403401db1f6fb191ad1c556d.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sb54e439f7d3d4231a8ae923d55f33e32q.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/Sc8bd7eb557f9433e9661e1f9e489f2d20.png',
  alibaba_url = 'https://www.aliexpress.com/item/1005011841056623.html?pdp_npi=6%40dis%21CAD%2119.16%219.58%21%21%2193.97%2146.99%21%4021413d5a17743722509522052ec3dd%2112000056745599255%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'led-strip-lights-rgb-remote-5m';

-- Adhesive Floating Shelves Acrylic
UPDATE shop_products SET
  price_cents = 2699,
  compare_at_cents = 4699,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S130d39c9a3514caead9e1b487bf41422f.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sdadea75cfa154b67b01e424108b3acd4b.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S79767f94584a4ca287458c74ca0f0cb4F.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S96caa9506403469dbec979e9788e0e8fg.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S2cb37e359edc4dfe80fbac15f308f2ffJ.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S130d39c9a3514caead9e1b487bf41422f.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005008535971764.html?pdp_npi=6%40dis%21CAD%2124.27%2111.89%21%21%21119.03%2158.31%21%4021413d5a17743722529572064ec3dd%2112000045609029734%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'adhesive-floating-shelf-acrylic-2-pack';

-- Peel & Stick Backsplash Tiles
UPDATE shop_products SET
  price_cents = 1299,
  compare_at_cents = 1399,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S37b0120312904c099a86cba3cb261b9bv.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Scfa4ee0f2e714cb3a8b071ae0fc4ad83P.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sfe99f2504ce0483aaea5707755406101R.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd36455a5bff54e809e0039e411d86a8et.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd14ee681a2a74ef2870853c11d7bb524z.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sb5b14b8888b84b6ebfce9c03d2521436u.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S37b0120312904c099a86cba3cb261b9bv.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005009629696967.html?pdp_npi=6%40dis%21CAD%216.04%214.23%21%21%2129.60%2120.72%21%4021413d5a17743722549972071ec3dd%2112000049683896972%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'peel-stick-backsplash-tiles-subway-10-pack';

-- Picture Ledge Shelf (manual price — AE search returned wrong product)
-- Comparable: $8-12 CAD on AE, retail ~$21.99 for 45% margin
UPDATE shop_products SET
  price_cents = 2199,
  compare_at_cents = 2999,
  updated_at = now()
WHERE slug = 'command-strip-picture-ledge-24-inch';

-- Removable Wallpaper Geometric
UPDATE shop_products SET
  price_cents = 2299,
  compare_at_cents = 2899,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S433dfb915f774423a1e685d28f4fbc3bx.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd2f384a8a60b45359526ac8e7af16626O.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sf657c5858af44bfb9e6d422725096b48h.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S6be8d608cbc5424495b0ae58783a2982T.jpg','https://ae-pic-a1.aliexpress-media.com/kf/S13a85397bcc2458ea88effc92ff01605m.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Scb6c51735882439aa856faa55a14c932Y.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S433dfb915f774423a1e685d28f4fbc3bx.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005005636506223.html?pdp_npi=6%40dis%21CAD%2114.45%219.68%21%21%2170.87%2147.48%21%4021413d5a17743722593582111ec3dd%2112000033836520018%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'removable-wallpaper-geometric-accent';

-- Magnetic Photo Frames Fridge
UPDATE shop_products SET
  price_cents = 1899,
  compare_at_cents = NULL,
  images = ARRAY['https://ae-pic-a1.aliexpress-media.com/kf/S87edd992e220472585d0c0a5092df4e5O.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sa4c5fceca5d449b9b7b6e7c07ebb4cff0.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sad43adc9135f4ec0a4791b7809749c8eX.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sef50ac4f752f44529ca3a34596d1f162o.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Saf5e53afb2694e199ee89487052f4963b.jpg','https://ae-pic-a1.aliexpress-media.com/kf/Sd89be7582d854fce8b1989322161cfe9D.jpg'],
  thumbnail_url = 'https://ae-pic-a1.aliexpress-media.com/kf/S87edd992e220472585d0c0a5092df4e5O.jpg',
  alibaba_url = 'https://www.aliexpress.com/item/1005009084389077.html?pdp_npi=6%40dis%21CAD%217.42%217.42%21%21%2136.40%2136.40%21%4021413d5a17743722613272137ec3dd%2112000047853371128%21affd%21%21%21%211%210%21',
  updated_at = now()
WHERE slug = 'magnetic-photo-frames-fridge-6-pack';

-- Add image domains to allow AliExpress CDN
-- NOTE: Update next.config.ts remotePatterns to include:
--   { protocol: 'https', hostname: 'ae01.alicdn.com' }
--   { protocol: 'https', hostname: 'ae04.alicdn.com' }
