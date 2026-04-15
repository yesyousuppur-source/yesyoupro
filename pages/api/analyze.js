export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { name, category, platform, mode, budget, experience, units } = req.body;
  if (!name) return res.status(400).json({ error: "Product/item name required" });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not configured" });

  // Detect if physical or digital/virtual
  const digitalCategories = ["Digital Products","Mobile Apps","PC / Console Games","Online Courses","Software & SaaS","Website / Blog","YouTube Channel","Instagram Page","Podcast","NFT & Crypto","Ebooks & Templates","Freelance Services","Social Media Account","Online Community / Group","Subscription Box","Affiliate Marketing"];
  const isDigital = digitalCategories.includes(category) || !category;

  let prompt = "";

  if (mode === "ads_platform") {
    prompt = `You are an expert digital marketer. Give a COMPLETE real ad strategy for this on ${platform||"Instagram"}:
Item: "${name}"
Category: ${category||"Any"}
Type: ${isDigital?"Digital/Virtual":"Physical Product"}

Return ONLY valid JSON:
{
  "account_setup": "Step 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\nStep 5: ...",
  "targeting": "Detailed targeting strategy specific to ${name} on ${platform}",
  "ad_keywords": ["keyword1","keyword2","keyword3","keyword4","keyword5","keyword6","keyword7","keyword8"],
  "script": "Complete 4-5 sentence ad script specifically for ${name}",
  "video_steps": "Step 1: ...\nStep 2: ...\nStep 3: ...\nStep 4: ...\nStep 5: ...\nStep 6: ...\nStep 7: ...\nStep 8: ...",
  "titles": ["Title option 1","Title option 2","Title option 3","Title option 4"],
  "budget": "Daily budget: INR X. Monthly: INR Y. Expected reach: Z people."
}`;

  } else if (mode === "description") {
    prompt = `You are an expert copywriter. Generate optimized listings/descriptions for:
Item: "${name}"
Category: ${category||"Any"}
Platform: ${platform||"Multiple"}
Type: ${isDigital?"Digital/Virtual":"Physical Product"}

Return ONLY valid JSON:
{"listings":[
  {"platform":"${platform||"Amazon/Main Platform"}","title":"SEO optimized title","description":"2-3 compelling sentences","bullets":["benefit1","benefit2","benefit3","benefit4","benefit5"]},
  {"platform":"Instagram Caption","title":"Viral caption with emojis","description":"Engaging 2-3 line caption","bullets":["#tag1 #tag2 #tag3","#tag4 #tag5 #tag6","#tag7 #tag8 #tag9"]},
  {"platform":"Google/SEO","title":"SEO meta title","description":"Meta description 155 chars","bullets":["SEO keyword1","SEO keyword2","SEO keyword3"]},
  {"platform":"WhatsApp/Telegram","title":"Short catchy title","description":"Simple message for sharing","bullets":["point1","point2","point3"]}
]}`;

  } else if (mode === "trending") {
    const cat = category || "Fashion";
    prompt = `You are an Indian market expert. List 6 trending items in "${cat}" category right now.
Items can be physical products, digital products, apps, games, services, or any other type.

Return ONLY valid JSON:
{"products":[
  {"name":"Trending item name","why_trending":"Why trending in India now","price_range":"INR X-Y or Free","tags":["tag1","tag2","tag3"]},
  {"name":"item2","why_trending":"reason","price_range":"INR X-Y","tags":["t1","t2"]},
  {"name":"item3","why_trending":"reason","price_range":"INR X-Y","tags":["t1","t2"]},
  {"name":"item4","why_trending":"reason","price_range":"INR X-Y","tags":["t1","t2"]},
  {"name":"item5","why_trending":"reason","price_range":"INR X-Y","tags":["t1","t2"]},
  {"name":"item6","why_trending":"reason","price_range":"INR X-Y","tags":["t1","t2"]}
]}`;

  } else if (mode === "competitor") {
    prompt = `You are a market analyst. Analyze top 4 competitors for: "${name}" on ${platform||"online"} in India.
This could be a product, app, game, service, channel, website, or anything.

Return ONLY valid JSON:
{"competitors":[
  {"name":"Competitor name","platform":"${platform||"Online"}","price":"INR X or Free","rating":"4.2/5","reviews":"2k","strengths":["s1","s2","s3"],"weaknesses":["w1","w2","w3"],"opportunity":"How to beat this for ${name}"},
  {"name":"comp2","platform":"${platform||"Online"}","price":"INR X","rating":"4.0/5","reviews":"1k","strengths":["s1","s2"],"weaknesses":["w1","w2"],"opportunity":"opp"},
  {"name":"comp3","platform":"${platform||"Online"}","price":"INR X","rating":"3.8/5","reviews":"800","strengths":["s1","s2"],"weaknesses":["w1","w2"],"opportunity":"opp"},
  {"name":"comp4","platform":"${platform||"Online"}","price":"INR X","rating":"4.5/5","reviews":"5k","strengths":["s1","s2","s3"],"weaknesses":["w1","w2"],"opportunity":"opp"}
]}`;

  } else if (mode === "supplier") {
    const q = encodeURIComponent(name);
    prompt = `You are a sourcing expert. Find best sources/suppliers for: "${name}" (${category||"Any"}) in India.
This could be a physical product supplier, digital asset source, reseller program, affiliate program, or any sourcing method.

Return ONLY valid JSON:
{"suppliers":[
  {"name":"Best source name","platform":"IndiaMart/AliExpress/Affiliate/etc","price_range":"INR X-Y or % commission","moq":"Min X units or No minimum","rating":"4.5/5","delivery":"X days or Instant","description":"Why this source is good for ${name}","tip":"Pro tip for getting best deal","search_url":"https://www.indiamart.com/search.mp?ss=${q}"},
  {"name":"source2","platform":"AliExpress","price_range":"USD X-Y","moq":"No min","rating":"4.2/5","delivery":"10-20 days","description":"desc","tip":"tip","search_url":"https://www.aliexpress.com/wholesale?SearchText=${q}"},
  {"name":"source3","platform":"Alibaba","price_range":"USD X-Y","moq":"50 units","rating":"4.0/5","delivery":"15-30 days","description":"desc","tip":"tip","search_url":"https://www.alibaba.com/trade/search?SearchText=${q}"},
  {"name":"source4","platform":"Direct/Other","price_range":"INR X-Y","moq":"Varies","rating":"4.3/5","delivery":"Varies","description":"desc","tip":"tip","search_url":"https://www.google.com/search?q=${q}+supplier+india"}
]}`;

  } else if (mode === "starter_guide") {
    const budgetAmt = budget || "5000";
    const exp = experience || "beginner";
    prompt = `You are an Indian business expert. Create a complete starter guide for someone who wants to sell/launch: "${name}" (${category||"Any"}) with budget INR ${budgetAmt}. Experience level: ${exp}.
This could be any type of business - physical product, digital product, app, service, channel, etc.

Return ONLY valid JSON:
{
  "platform_recommendation": {"name":"Best platform","why":"reason","commission":"X% or Free","difficulty":"Easy/Medium"},
  "steps": [
    {"step":1,"title":"Step title","description":"detailed action steps","time":"X days","cost":"INR X or Free"},
    {"step":2,"title":"title","description":"desc","time":"time","cost":"cost"},
    {"step":3,"title":"title","description":"desc","time":"time","cost":"cost"},
    {"step":4,"title":"title","description":"desc","time":"time","cost":"cost"},
    {"step":5,"title":"title","description":"desc","time":"time","cost":"cost"}
  ],
  "first_product": {"name":"Suggested first item to sell/launch","reason":"why start with this","expected_profit":"INR X per unit/month"},
  "tips": ["tip1","tip2","tip3","tip4","tip5"],
  "mistakes": ["mistake1","mistake2","mistake3"]
}`;

  } else if (mode === "beginner_product") {
    const budgetAmt = budget || "5000";
    const cat = category || "Fashion";
    prompt = `You are an Indian ecommerce/business expert. Find 6 best beginner-friendly items to sell/launch in "${cat}" with budget INR ${budgetAmt}.
Can include physical products, digital products, services, reselling, etc.

Return ONLY valid JSON:
{"products":[
  {"name":"Item name","category":"${cat}","buy_price":"INR X or Free","sell_price":"INR Y","profit_per_unit":"INR Z or X%","risk":"Low","demand":"High","why_good":"Why perfect for beginners","platform":"Best platform to sell","suppliers":"Where to source"},
  {"name":"item2","category":"${cat}","buy_price":"INR X","sell_price":"INR Y","profit_per_unit":"INR Z","risk":"Low","demand":"High","why_good":"reason","platform":"platform","suppliers":"source"},
  {"name":"item3","category":"${cat}","buy_price":"INR X","sell_price":"INR Y","profit_per_unit":"INR Z","risk":"Low","demand":"Medium","why_good":"reason","platform":"platform","suppliers":"source"},
  {"name":"item4","category":"${cat}","buy_price":"INR X","sell_price":"INR Y","profit_per_unit":"INR Z","risk":"Low","demand":"High","why_good":"reason","platform":"platform","suppliers":"source"},
  {"name":"item5","category":"INR X","sell_price":"INR Y","profit_per_unit":"INR Z","risk":"Medium","demand":"High","why_good":"reason","platform":"platform","suppliers":"source"},
  {"name":"item6","category":"${cat}","buy_price":"INR X","sell_price":"INR Y","profit_per_unit":"INR Z","risk":"Low","demand":"Very High","why_good":"reason","platform":"platform","suppliers":"source"}
]}`;

  } else if (mode === "sales_estimator") {
    prompt = `You are a market analyst. Estimate monthly sales/performance for: "${name}" on ${platform||"online"} in India.
This could be anything - product, app, game, channel, service, website, etc.

Return ONLY valid JSON:
{
  "monthly_units": {"low":10,"medium":35,"high":80},
  "monthly_revenue": {"low":"INR X","medium":"INR Y","high":"INR Z"},
  "monthly_profit": {"low":"INR A","medium":"INR B","high":"INR C"},
  "factors": [{"name":"factor","impact":"positive","detail":"detail"},{"name":"f2","impact":"negative","detail":"detail"}],
  "best_months": ["Month1","Month2","Month3"],
  "slow_months": ["Month1","Month2"],
  "tips": ["tip1 to increase sales","tip2","tip3"]
}`;

  } else if (mode === "price_optimizer") {
    prompt = `You are a pricing expert. Optimal pricing for: "${name}" on ${platform||"online"} in India.
Can be a product, service, subscription, app, course, or anything.

Return ONLY valid JSON:
{
  "recommended_price": "INR X",
  "price_range": {"minimum":"INR X","maximum":"INR Y","sweet_spot":"INR Z"},
  "competitor_prices": [{"seller":"Comp 1","price":"INR X","notes":"note"},{"seller":"Comp 2","price":"INR Y","notes":"note"},{"seller":"Comp 3","price":"INR Z","notes":"note"}],
  "pricing_strategy": "Detailed pricing strategy for ${name}",
  "psychological_tricks": ["trick1","trick2","trick3"],
  "when_to_discount": "When and how much to discount",
  "seasonal_pricing": ["festival tip","off-season tip"]
}`;

  } else if (mode === "inventory") {
    const unitsAmt = units || "50";
    prompt = `You are an inventory/stock management expert. Plan for: "${name}" (${category||"Any"}) starting with ${unitsAmt} units on ${platform||"online"}.
Adapt advice for whether this is physical inventory, digital licenses, service slots, etc.

Return ONLY valid JSON:
{
  "recommended_stock": {"starter":"X units/licenses","safe":"Y units","max":"Z units"},
  "reorder_point": "Reorder when X units remain",
  "storage_cost": "INR X per month or Free for digital",
  "turnover_days": "~X days to sell",
  "tips": ["tip1","tip2","tip3","tip4"],
  "seasonal_advice": "Seasonal stock advice",
  "risk": "Main risk and how to avoid it"
}`;

  } else if (mode === "review_analyzer") {
    prompt = `You are a customer insight expert. Analyze what users love and hate about: "${name}" (${category||"Any"}) in India.
This could be a product, app, game, service, website, channel, or anything.

Return ONLY valid JSON:
{
  "common_complaints": ["complaint1","complaint2","complaint3","complaint4","complaint5"],
  "what_customers_love": ["love1","love2","love3","love4","love5"],
  "keywords_in_reviews": ["keyword1","keyword2","keyword3","keyword4","keyword5"],
  "sentiment_score": "X/10",
  "opportunities": ["opportunity1","opportunity2","opportunity3"],
  "red_flags": ["avoid1","avoid2"],
  "product_improvements": ["improvement1","improvement2","improvement3"]
}`;

  } else if (mode === "niche_finder") {
    const cat = category || "Any";
    prompt = `You are a business niche expert for Indian market. Find 6 untapped profitable niches in "${cat}".
Include both physical AND digital/virtual niches - products, services, apps, content, games, anything.

Return ONLY valid JSON:
{"niches":[
  {"name":"Specific niche","competition":"Low","demand":"High","profit_margin":"X-Y%","investment":"INR X-Y or Free","why_untapped":"reason","best_platform":"platform","example_products":["item1","item2","item3"],"trend":"Growing"},
  {"name":"n2","competition":"Low","demand":"High","profit_margin":"X%","investment":"INR X","why_untapped":"reason","best_platform":"p","example_products":["p1","p2"],"trend":"Growing"},
  {"name":"n3","competition":"Low","demand":"High","profit_margin":"X%","investment":"INR X","why_untapped":"reason","best_platform":"p","example_products":["p1","p2"],"trend":"Stable"},
  {"name":"n4","competition":"Low","demand":"High","profit_margin":"X%","investment":"INR X","why_untapped":"reason","best_platform":"p","example_products":["p1","p2"],"trend":"Growing"},
  {"name":"n5","competition":"Low","demand":"High","profit_margin":"X%","investment":"INR X","why_untapped":"reason","best_platform":"p","example_products":["p1","p2"],"trend":"Growing"},
  {"name":"n6","competition":"Medium","demand":"Very High","profit_margin":"X%","investment":"INR X","why_untapped":"reason","best_platform":"p","example_products":["p1","p2"],"trend":"Growing"}
]}`;

  } else if (mode === "return_manager") {
    prompt = `You are an ecommerce returns expert for India. Analyze return rate and prevention for: "${name}" (${category||"Any"}) on ${platform||"Online"}.
Return ONLY valid JSON:
{
  "return_rate": "X-Y%",
  "industry_average": "Industry average: X%",
  "main_reasons": ["reason1","reason2","reason3","reason4","reason5"],
  "prevention_tips": ["tip1 to reduce returns","tip2","tip3","tip4","tip5"],
  "packaging_tips": "Specific packaging advice to reduce returns for this product",
  "description_fixes": ["What to add/fix in description1","fix2","fix3"],
  "policy_advice": "Return policy wording that reduces returns"
}`;

  } else if (mode === "festival_planner") {
    const season = req.body.season || "Diwali";
    prompt = `You are an Indian ecommerce festival strategist. Create complete ${season} plan for: "${name}" (${category||"Any"}) on ${platform||"Online"}.
Return ONLY valid JSON:
{
  "overview": "2-3 sentences about ${season} opportunity for this product in India",
  "timeline": [
    {"when":"4 weeks before","action":"Specific action to take"},
    {"when":"2 weeks before","action":"action"},
    {"when":"1 week before","action":"action"},
    {"when":"Festival week","action":"action"},
    {"when":"After festival","action":"action"}
  ],
  "pricing_strategy": "Specific pricing advice for ${season} - when to increase, how much discount",
  "stock_recommendation": "How much stock to keep, when to order, safety stock",
  "ad_strategy": "Ad budget breakdown and platform strategy for ${season}",
  "expected_sales_boost": "X-Y% increase expected during ${season}"
}`;

  } else if (mode === "launch_strategy") {
    prompt = `You are an expert ecommerce product launch strategist for India. Create a 30-day launch plan for "${name}" (${category||"Any"}) on ${platform||"Amazon"}.
Return ONLY valid JSON:
{
  "overview": "2-3 sentences about launch opportunity",
  "week_plan": [
    {"week":"Week 1 (Days 1-7)","tasks":["task1","task2","task3","task4"]},
    {"week":"Week 2 (Days 8-14)","tasks":["task1","task2","task3","task4"]},
    {"week":"Week 3 (Days 15-21)","tasks":["task1","task2","task3","task4"]},
    {"week":"Week 4 (Days 22-30)","tasks":["task1","task2","task3","task4"]}
  ],
  "pricing_strategy": "Detailed pricing advice for launch phase",
  "ad_budget": "How to allocate ad budget week by week",
  "review_strategy": "How to get first reviews legitimately"
}`;

  } else if (mode === "multi_platform") {
    prompt = `You are a multi-platform ecommerce expert for India. Suggest 3 best platforms to expand "${name}" (${category||"Any"}) beyond ${platform||"current platform"}.
Return ONLY valid JSON:
{
  "platforms": [
    {"name":"Best Platform Name","potential":"High","fee":"X%","why":"Specific reason why this platform suits this product","pricing_tip":"Price suggestion for this platform","setup_steps":"3-step quick setup guide"},
    {"name":"Platform 2","potential":"High","fee":"X%","why":"reason","pricing_tip":"tip","setup_steps":"steps"},
    {"name":"Platform 3","potential":"Medium","fee":"X%","why":"reason","pricing_tip":"tip","setup_steps":"steps"}
  ],
  "strategy": "Overall multi-platform expansion strategy for ${name}",
  "priority_order": ["Platform1","Platform2","Platform3"],
  "risk_warning": "What to avoid when expanding to multiple platforms"
}`;

  } else if (mode === "bundle_creator") {
    prompt = `You are a product bundling expert for Indian ecommerce. Create 4 profitable bundle ideas for "${name}" (${category||"Any"}) on ${platform||"Online"}.
Return ONLY valid JSON:
{
  "bundles": [
    {"name":"Creative bundle name","items":["${name}","Complementary item 2","item 3"],"single_price":"INR X (total if bought separately)","bundle_price":"INR Y (discounted)","margin_increase":"+X%","why_works":"Why customers will buy this bundle","listing_tip":"How to list/title this bundle for maximum sales"},
    {"name":"bundle2","items":["${name}","item2"],"single_price":"INR X","bundle_price":"INR Y","margin_increase":"+X%","why_works":"reason","listing_tip":"tip"},
    {"name":"bundle3","items":["${name}","item2","item3","item4"],"single_price":"INR X","bundle_price":"INR Y","margin_increase":"+X%","why_works":"reason","listing_tip":"tip"},
    {"name":"bundle4","items":["${name}","item2"],"single_price":"INR X","bundle_price":"INR Y","margin_increase":"+X%","why_works":"reason","listing_tip":"tip"}
  ],
  "top_bundle": "Recommend which bundle to launch first and exactly why"
}`;

  } else if (mode === "launch_strategy") {
    prompt = `You are an ecommerce launch strategist for India. Create a 30-day launch plan for "${name}" (${category||"Any"}) on ${platform||"Amazon"}.
Return ONLY valid JSON: {"overview":"2-3 sentences","week_plan":[{"week":"Week 1 (Days 1-7)","tasks":["task1","task2","task3"]},{"week":"Week 2 (Days 8-14)","tasks":["task1","task2","task3"]},{"week":"Week 3 (Days 15-21)","tasks":["task1","task2","task3"]},{"week":"Week 4 (Days 22-30)","tasks":["task1","task2","task3"]}],"pricing_strategy":"launch pricing advice","review_strategy":"how to get first reviews"}`;

  } else if (mode === "festival_planner") {
    const season = req.body.season || "Diwali";
    prompt = `You are an Indian ecommerce festival strategist. Create ${season} plan for "${name}" (${category||"Any"}) on ${platform||"Amazon"}.
Return ONLY valid JSON: {"overview":"opportunity in 2-3 sentences","timeline":[{"when":"4 weeks before","action":"action"},{"when":"2 weeks before","action":"action"},{"when":"1 week before","action":"action"},{"when":"Festival week","action":"action"},{"when":"After festival","action":"action"}],"pricing_strategy":"pricing advice","stock_recommendation":"stock advice","ad_strategy":"ad budget advice"}`;

  } else if (mode === "bundle_creator") {
    prompt = `You are a product bundling expert for Indian ecommerce. Create 4 bundle ideas for "${name}" (${category||"Any"}) on ${platform||"Amazon"}.
Return ONLY valid JSON: {"bundles":[{"name":"bundle name","items":["${name}","item2","item3"],"single_price":"INR X","bundle_price":"INR Y","margin_increase":"+X%","why_works":"reason","listing_tip":"tip"},{"name":"b2","items":["${name}","item2"],"single_price":"INR X","bundle_price":"INR Y","margin_increase":"+X%","why_works":"r","listing_tip":"t"},{"name":"b3","items":["${name}","item2","item3"],"single_price":"INR X","bundle_price":"INR Y","margin_increase":"+X%","why_works":"r","listing_tip":"t"},{"name":"b4","items":["${name}","item2"],"single_price":"INR X","bundle_price":"INR Y","margin_increase":"+X%","why_works":"r","listing_tip":"t"}],"top_bundle":"best bundle recommendation"}`;

  } else if (mode === "return_manager") {
    prompt = `You are an ecommerce returns expert for India. Analyze returns for "${name}" (${category||"Any"}) on ${platform||"Amazon"}.
Return ONLY valid JSON: {"return_rate":"X-Y%","industry_average":"Industry avg: X%","main_reasons":["r1","r2","r3","r4","r5"],"prevention_tips":["t1","t2","t3","t4","t5"],"packaging_tips":"packaging advice","description_fixes":["fix1","fix2","fix3"]}`;

  } else if (mode === "whatsapp_message") {
    prompt = `You are a WhatsApp marketing expert for Indian sellers. Create 3 WhatsApp broadcast messages for "${name}" (${category||"Any"}).
Return ONLY valid JSON: {"messages":[{"type":"Product Launch","text":"message text in Hindi/English mix"},{"type":"Sale Offer","text":"message with price and offer"},{"type":"Customer Testimonial","text":"social proof message"}]}`;

  } else if (mode === "instagram_captions") {
    prompt = `You are an Instagram marketing expert for Indian sellers. Create 5 captions for "${name}" (${category||"Any"}).
Return ONLY valid JSON: {"captions":[{"text":"caption text","hashtags":"#tag1 #tag2 #tag3 #tag4 #tag5"},{"text":"c2","hashtags":"#t"},{"text":"c3","hashtags":"#t"},{"text":"c4","hashtags":"#t"},{"text":"c5","hashtags":"#t"}]}`;

  } else if (mode === "title_optimizer") {
    prompt = `You are an ecommerce SEO expert. Create optimized product titles for "${name}" (${category||"Any"}) for multiple platforms.
Return ONLY valid JSON: {"titles":[{"platform":"Amazon","title":"optimized title with keywords","keywords":"main keywords"},{"platform":"Flipkart","title":"title","keywords":"keywords"},{"platform":"Meesho","title":"title","keywords":"keywords"},{"platform":"Instagram","title":"caption style title","keywords":"hashtags"}]}`;

  } else if (mode === "listing_checker") {
    prompt = `You are an ecommerce listing expert for India. Score and improve the listing for "${name}" (${category||"Any"}) on ${platform||"Amazon"}.
Return ONLY valid JSON: {"score":75,"issues":["issue1","issue2","issue3"],"improvements":["improvement1","improvement2","improvement3","improvement4"],"missing_keywords":["keyword1","keyword2","keyword3","keyword4","keyword5"]}`;

  } else if (mode === "review_reply") {
    const reviewType = category || "negative";
    prompt = `You are a customer service expert for Indian ecommerce. Generate 2 professional ${reviewType} review replies for: "${name}".
Return ONLY valid JSON: {"replies":[{"tone":"Professional","text":"reply text in Hinglish/English"},{"tone":"Empathetic","text":"reply text"}]}`;

  } else if (mode === "ad_copy") {
    const adPlatform = req.body.adPlatform || "Facebook";
    prompt = `You are an ad copy expert for Indian ecommerce. Create 3 ${adPlatform} ad copies for "${name}" (${category||"Any"}).
Return ONLY valid JSON: {"copies":[{"format":"Short Ad","text":"ad text (50-80 words)","cta":"Call to action"},{"format":"Story Ad","text":"story format text"},{"format":"Offer Ad","text":"discount/offer focused text","cta":"cta"}]}`;

  } else if (mode === "supplier_email") {
    prompt = `You are a procurement expert for Indian sellers. Create 2 supplier emails for "${name}" (${category||"Any"}).
Return ONLY valid JSON: {"emails":[{"subject":"Initial Inquiry - ${name}","body":"formal email body with quantity, quality requirements, price negotiation"},{"subject":"Follow Up - ${name} Order","body":"follow-up email with better negotiation"}]}`;

  } else if (mode === "return_policy") {
    prompt = `You are an ecommerce policy expert for India. Create return policies for "${name}" (${category||"Any"}) for 3 platforms.
Return ONLY valid JSON: {"policies":[{"platform":"Amazon","text":"complete return policy text"},{"platform":"Flipkart","text":"policy text"},{"platform":"Meesho","text":"policy text"}]}`;

  } else if (mode === "compliance_check") {
    prompt = `You are an Indian ecommerce compliance expert. Check requirements for "${name}" (${category||"Any"}).
Return ONLY valid JSON: {"gst_slab":"X%","hsn_code":"XXXXXXXX","certifications":["cert1","cert2"],"legal_requirements":["req1","req2","req3"],"warnings":["warning if any"]}`;

  } else if (mode === "ad_copy_generator") {
    prompt = `You are an expert ad copywriter for Indian ecommerce. Create 5 ad copies for "${name}" (${category||"Any"}) targeting Indian buyers.
Return ONLY valid JSON: {"ads":[{"platform":"Facebook Ad","copy":"ad text here","cta":"Shop Now"},{"platform":"Instagram Ad","copy":"text","cta":"cta"},{"platform":"Google Search Ad","copy":"text","cta":"cta"},{"platform":"WhatsApp Broadcast","copy":"Hindi mix text","cta":"cta"},{"platform":"YouTube Pre-roll","copy":"Hook + text","cta":"cta"}]}`;

  } else if (mode === "review_reply") {
    const review = req.body.review || "";
    prompt = `You are an expert ecommerce seller on ${platform||"Amazon"}. A customer left this review: "${review}". Product: "${name}". Write 3 professional reply options.
Return ONLY valid JSON: {"replies":[{"type":"Empathetic","reply":"full reply text"},{"type":"Solution Focused","reply":"offer solution reply"},{"type":"Apologetic + Offer","reply":"apology with replacement offer"}],"tip":"one practical tip to prevent this review in future"}`;

  } else if (mode === "listing_checker") {
    const listing = req.body.listing || "";
    prompt = `You are an Amazon/ecommerce listing optimization expert. Analyze this listing for "${name}" on ${platform||"Amazon"}: "${listing}". Score it and give improvements.
Return ONLY valid JSON: {"score":"XX","issues":["issue1","issue2","issue3","issue4","issue5"],"improvements":["fix1","fix2","fix3","fix4","fix5"],"missing_keywords":["kw1","kw2","kw3","kw4","kw5"],"optimized_title":"Better SEO title here"}`;

  } else if (mode === "fail_predictor") {
    const price = req.body.price || "0";
    prompt = `You are an expert Indian ecommerce analyst. Predict success/failure for this product launch:
Product: "${name}"
Category: ${category||"General"}
Platform: ${platform||"Amazon"}
Seller Price: Rs.${price}

Analyze: competition, demand, pricing, timing, market saturation.
Return ONLY valid JSON:
{
  "success_chance": "72%",
  "risk_level": "Medium",
  "verdict": "2-3 lines about overall chances and why",
  "suggested_price": "Rs.499",
  "competition_level": "High",
  "demand_level": "Medium",
  "market_size": "Large",
  "profit_margin": "25-35%",
  "fail_reasons": ["reason1","reason2","reason3"],
  "success_tips": ["tip1","tip2","tip3","tip4"]
}`;

  } else if (mode === "failure_predictor") {
    const sellingPrice = req.body.price || "unknown";
    prompt = `You are an expert Indian ecommerce market analyst with deep knowledge of Amazon India, Meesho, and Flipkart. Analyze this product launch:

Product: "${name}"
Category: ${category||"Any"}
Platform: ${platform||"Amazon India"}
Seller's Price: INR ${sellingPrice}

Give an HONEST, data-driven prediction. Consider: market saturation, competition, price wars, category growth, seasonal demand, return rates.

Return ONLY valid JSON:
{
  "success_chance": "72%",
  "risk_level": "Medium",
  "verdict": "2-3 sentence honest verdict about success probability",
  "suggested_price": "INR 449-549",
  "win_factors": ["factor1","factor2","factor3"],
  "fail_risks": ["risk1","risk2","risk3"],
  "action_plan": ["action1","action2","action3","action4"],
  "competitor_count": "50-100 sellers",
  "market_size": "Large",
  "market_price_range": "INR 299-799",
  "demand_level": "High",
  "break_even": "Detailed break-even analysis with units needed and timeline"
}`;

  } else {
    // DEFAULT - Universal analysis for ANYTHING
    prompt = `You are a universal market expert for India. Deeply analyze this:

Item/Product/Thing: "${name}"
Category: ${category||"Auto-detect"}
Platform: ${platform||"Auto-detect best platform"}

This could be ANYTHING - physical product, digital product, mobile app, PC/console game, website, social media page/channel, online course, service, software, NFT, or anything else.

Automatically detect what type of item this is and give accurate analysis.

Return ONLY valid JSON with real, specific data:
{
  "hooks": [
    "Real viral hook 1 specifically for ${name}",
    "Real hook 2 - problem/solution angle",
    "Real hook 3 - social proof angle",
    "Real hook 4 - urgency/FOMO angle",
    "Real hook 5 - curiosity angle"
  ],
  "keywords": [
    "keyword1 for ${name}",
    "keyword2",
    "keyword3",
    "keyword4",
    "keyword5",
    "keyword6",
    "keyword7",
    "keyword8",
    "keyword9",
    "keyword10"
  ],
  "description": "2-3 compelling sentences about ${name} - its benefits, unique value, and why people should care",
  "price_range": "INR X-Y or Free or Freemium - based on ${platform||"market"} pricing",
  "demand_level": "Very High / High / Medium / Low",
  "target_audience": [
    "Segment 1: Age, gender, interest, behavior specific to ${name}",
    "Segment 2: Different demographic",
    "Segment 3: Use-case based segment",
    "Segment 4: Geographic or income segment",
    "Segment 5: Occasion or gifting segment"
  ],
  "viral_score": "X/10",
  "competition_level": "Very High / High / Medium / Low",
  "item_type": "Physical Product / Digital Product / Mobile App / Game / Website / Social Media / Service / Course / Other",
  "best_platforms": ["Platform 1","Platform 2","Platform 3"],
  "monetization": "How to monetize this in India"
}`;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a universal market expert for Indian market. You can analyze ANYTHING - physical products, digital products, mobile apps, PC games, console games, websites, social media channels/pages, online courses, software, SaaS, services, NFTs, crypto, or any other type of item. Always respond with valid JSON only. Write real, specific, actionable content. No markdown, no backticks, no extra text.`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || "OpenAI error" });
    const text = data.choices?.[0]?.message?.content || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "Analysis failed: " + err.message });
  }
}
