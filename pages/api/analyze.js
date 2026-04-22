import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, category, platform, mode, price, season, review, listing, budget, experience, extra } = req.body;

  let prompt = "";

  if (mode === "main") {
    prompt = `You are an expert Indian ecommerce analyst. Analyze this product for Indian sellers:
Product: "${name}", Category: ${category||"General"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"viral_score":"75","demand":"High","competition":"Medium","price_range":"INR 299-599","profit_margin":"35%","trend":"Rising","target_audience":"Urban youth 18-35","best_season":"Festive (Oct-Dec)","marketing_angle":"Highlight quality and value","overview":"2-3 sentence product assessment","keywords":["keyword1","keyword2","keyword3","keyword4","keyword5"],"tips":["tip1","tip2","tip3"]}`;

  } else if (mode === "description") {
    prompt = `You are an expert copywriter for Indian ecommerce. Generate optimized listings for:
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Multiple"}
Return ONLY valid JSON:
{"listings":[{"platform":"${platform||"Amazon"}","title":"SEO optimized title under 200 chars","description":"2-3 compelling sentences highlighting benefits","bullets":["benefit1","benefit2","benefit3","benefit4","benefit5"]},{"platform":"Instagram Caption","title":"Viral caption with emojis","description":"Engaging 2-3 line caption","bullets":["#tag1 #tag2 #tag3","#tag4 #tag5 #tag6","#tag7 #tag8"]},{"platform":"WhatsApp","title":"Short catchy title","description":"Simple sharing message","bullets":["point1","point2","point3"]}]}`;

  } else if (mode === "trending") {
    const cat = extra?.category || category || "General";
    prompt = `You are an Indian ecommerce trend expert. Find trending products in ${cat} on Indian platforms right now.
Return ONLY valid JSON:
{"products":[{"name":"Product 1","trend_score":"92","reason":"Why trending now","price_range":"INR X-Y","platform_best":"Amazon/Meesho"},{"name":"Product 2","trend_score":"88","reason":"reason","price_range":"INR X-Y","platform_best":"platform"},{"name":"Product 3","trend_score":"85","reason":"reason","price_range":"INR X-Y","platform_best":"platform"},{"name":"Product 4","trend_score":"82","reason":"reason","price_range":"INR X-Y","platform_best":"platform"},{"name":"Product 5","trend_score":"78","reason":"reason","price_range":"INR X-Y","platform_best":"platform"}]}`;

  } else if (mode === "competitor") {
    prompt = `You are an Indian ecommerce competitive intelligence expert.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"overview":"Market overview in 2 sentences","competitors":[{"name":"Competitor brand 1","price":"INR X","rating":"4.2/5","reviews":"1000+","weakness":"their weakness","our_edge":"how to beat them"},{"name":"Competitor 2","price":"INR X","rating":"4.0/5","reviews":"500+","weakness":"weakness","our_edge":"edge"},{"name":"Competitor 3","price":"INR X","rating":"3.8/5","reviews":"200+","weakness":"weakness","our_edge":"edge"}],"strategy":"3 sentence differentiation strategy","keywords":["kw1","kw2","kw3"]}`;

  } else if (mode === "supplier") {
    prompt = `You are an expert in Indian product sourcing. Find suppliers for:
Product: "${name}", Category: ${category||"Any"}
Return ONLY valid JSON:
{"suppliers":[{"name":"IndiaMart Suppliers","platform":"IndiaMart","price_range":"INR X-Y per unit","moq":"50 units","rating":"4.3/5","delivery":"7-15 days","why":"Best for domestic sourcing","tip":"Search with specific keywords","search_url":"https://www.indiamart.com/search.mp?ss=${encodeURIComponent(name||'product')}"},{"name":"AliExpress Sellers","platform":"AliExpress","price_range":"USD X-Y","moq":"No minimum","rating":"4.1/5","delivery":"15-25 days","why":"Good for testing products","tip":"Order samples first","search_url":"https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(name||'product')}"},{"name":"Alibaba Manufacturers","platform":"Alibaba","price_range":"USD X-Y","moq":"100 units","rating":"4.0/5","delivery":"20-35 days","why":"Best for bulk orders","tip":"Negotiate MOQ and get samples","search_url":"https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(name||'product')}"}]}`;

  } else if (mode === "sales_estimator") {
    prompt = `You are an Indian ecommerce sales analyst.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"monthly_sales":"500-800 units","revenue_estimate":"INR 2,50,000-4,00,000","market_share":"2-5%","growth_trend":"15% MoM","best_months":["October","November","December"],"slow_months":["February","March"],"analysis":"2-3 sentence sales analysis","tips":["tip1","tip2","tip3"]}`;

  } else if (mode === "price_optimizer") {
    prompt = `You are an Indian ecommerce pricing expert.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"recommended_price":"INR 499","price_range":{"min":"INR 349","max":"INR 699"},"sweet_spot":"INR 499-549","competitor_avg":"INR 520","analysis":"Why this price works","strategies":[{"name":"Penetration","price":"INR 349","when":"Launch phase"},{"name":"Value","price":"INR 499","when":"Steady state"},{"name":"Premium","price":"INR 699","when":"After reviews"}],"tips":["tip1","tip2"]}`;

  } else if (mode === "inventory") {
    prompt = `You are an Indian ecommerce inventory expert.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"recommended_stock":"200 units","reorder_point":"50 units","reorder_quantity":"150 units","storage_tips":["tip1","tip2"],"seasons":{"peak":"Oct-Dec: stock 300+","low":"Feb-Mar: stock 50-75"},"analysis":"Inventory strategy in 2 sentences","monthly_plan":[{"month":"Jan","units":75},{"month":"Feb","units":50},{"month":"Mar","units":60},{"month":"Apr","units":80},{"month":"May","units":90},{"month":"Jun","units":85}]}`;

  } else if (mode === "review_analyzer") {
    prompt = `You are an expert at analyzing product reviews for Indian ecommerce.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"rating_prediction":"4.1/5","positive_keywords":["quality","value","fast delivery"],"negative_keywords":["packaging","sizing"],"common_complaints":["complaint1","complaint2"],"common_praises":["praise1","praise2"],"improvement_tips":["tip1","tip2","tip3"],"analysis":"Review prediction analysis in 2 sentences"}`;

  } else if (mode === "niche_finder") {
    prompt = `You are an Indian ecommerce niche research expert.
Product/Interest: "${name}", Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"niches":[{"name":"Niche 1","opportunity":"High","competition":"Low","avg_price":"INR 499","monthly_demand":"5000+ searches","why":"Why this niche is profitable"},{"name":"Niche 2","opportunity":"Medium","competition":"Medium","avg_price":"INR 799","monthly_demand":"3000+ searches","why":"reason"},{"name":"Niche 3","opportunity":"High","competition":"Low","avg_price":"INR 299","monthly_demand":"8000+ searches","why":"reason"}],"recommendation":"Best niche recommendation","tips":["tip1","tip2"]}`;

  } else if (mode === "starter_guide") {
    const budg = budget || extra?.budget || "10000";
    const exp = experience || extra?.experience || "beginner";
    prompt = `You are an Indian ecommerce mentor. Create a starter guide for a ${exp} seller with budget INR ${budg}.
Return ONLY valid JSON:
{"week_plan":[{"week":"Week 1","tasks":["Register on Amazon/Meesho","Research top 5 products","Order 10 samples"]},{"week":"Week 2","tasks":["List products with optimized titles","Take professional photos","Set competitive price"]},{"week":"Week 3","tasks":["Launch with 20% discount","Run small ad campaign","Collect first reviews"]},{"week":"Week 4","tasks":["Analyze sales data","Optimize listings","Reorder bestsellers"]}],"tools":["tool1","tool2","tool3"],"tips":["tip1","tip2","tip3"],"budget_breakdown":{"products":"50%","ads":"20%","tools":"10%","shipping":"20%"}}`;

  } else if (mode === "beginner_product") {
    prompt = `You are an Indian ecommerce expert helping beginners find their first product.
Preferences: ${JSON.stringify(extra||{})}
Return ONLY valid JSON:
{"products":[{"name":"Product 1","why":"Why ideal for beginners","investment":"INR X-Y","expected_margin":"30-40%","platform":"Meesho/Amazon","difficulty":"Easy","monthly_potential":"INR 15,000-25,000"},{"name":"Product 2","why":"reason","investment":"INR X-Y","expected_margin":"35-45%","platform":"platform","difficulty":"Easy","monthly_potential":"INR X-Y"},{"name":"Product 3","why":"reason","investment":"INR X-Y","expected_margin":"25-35%","platform":"platform","difficulty":"Medium","monthly_potential":"INR X-Y"}],"tip":"One key advice for beginners"}`;

  } else if (mode === "investment") {
    prompt = `You are an Indian ecommerce financial advisor.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon"}
Return ONLY valid JSON:
{"total_investment":"INR 25,000","breakdown":{"inventory":"INR 15,000","packaging":"INR 2,000","ads":"INR 5,000","platform_fees":"INR 1,500","misc":"INR 1,500"},"expected_roi":"45%","payback_period":"2-3 months","monthly_profit":"INR 8,000-12,000","risk":"Medium","analysis":"Investment analysis in 2 sentences"}`;

  } else if (mode === "bundle_creator") {
    prompt = `You are an Indian ecommerce bundling expert.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"bundles":[{"name":"Bundle Name 1","items":["${name}","complementary item 1","complementary item 2"],"bundle_price":"INR X","margin_increase":"+15%","why_works":"Why customers will buy this bundle"},{"name":"Bundle 2","items":["${name}","item2"],"bundle_price":"INR X","margin_increase":"+10%","why_works":"reason"},{"name":"Bundle 3","items":["${name}","item3","item4"],"bundle_price":"INR X","margin_increase":"+20%","why_works":"reason"}],"tip":"Bundling strategy tip"}`;

  } else if (mode === "return_manager") {
    prompt = `You are an Indian ecommerce returns specialist.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"return_rate":"8%","industry_average":"12% industry average","main_reasons":["reason1","reason2","reason3"],"prevention_tips":["tip1","tip2","tip3","tip4"],"return_policy":"Recommended return policy","packaging_tips":["tip1","tip2"],"analysis":"Returns reduction strategy in 2 sentences"}`;

  } else if (mode === "festival_planner") {
    const fest = season || "Diwali";
    prompt = `You are an Indian festive season ecommerce expert for ${fest}.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"festival":"${fest}","demand_boost":"2-3x normal","prep_timeline":[{"when":"6 weeks before","action":"Stock up 3x inventory"},{"when":"4 weeks before","action":"Create festival listings and offers"},{"when":"2 weeks before","action":"Start ad campaigns"},{"when":"1 week before","action":"Activate deals and coupons"},{"when":"Festival week","action":"Monitor and optimize daily"}],"pricing_strategy":"10-20% discount with gift wrapping","packaging":"Festival themed packaging tips","keywords":["festival keyword1","keyword2","keyword3"],"expected_sales_boost":"150-200% increase"}`;

  } else if (mode === "launch_strategy") {
    prompt = `You are an Indian ecommerce launch strategist.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"launch_date_tip":"Best day and time to launch","week_plan":[{"week":"Week 1","tasks":["task1","task2","task3"]},{"week":"Week 2","tasks":["task1","task2"]},{"week":"Week 3","tasks":["task1","task2"]},{"week":"Week 4","tasks":["task1","task2"]}],"pricing":{"launch":"20% below competitor","steady":"Match competitor after 50 reviews"},"ad_budget":"INR 200-500/day for first 2 weeks","review_strategy":"Get 10 reviews in first 2 weeks","tips":["tip1","tip2","tip3"]}`;

  } else if (mode === "multi_platform") {
    prompt = `You are a multi-platform Indian ecommerce expert.
Product: "${name}", Category: ${category||"Any"}
Return ONLY valid JSON:
{"platforms":[{"name":"Amazon India","potential":"High","fee":"8-15%","best_for":"Electronics, Books","tip":"Focus on A+ content"},{"name":"Flipkart","potential":"High","fee":"5-12%","best_for":"Fashion, Electronics","tip":"Use Flipkart Ads"},{"name":"Meesho","potential":"Medium","fee":"0-2%","best_for":"Fashion, Home","tip":"Price very competitively"},{"name":"Nykaa","potential":"Medium","fee":"20-30%","best_for":"Beauty, Wellness","tip":"Need good branding"},{"name":"Instagram Shop","potential":"Medium","fee":"2-5%","best_for":"Fashion, Lifestyle","tip":"Need 10k+ followers"}],"recommendation":"Best platform recommendation for this product","strategy":"2 sentence multi-platform strategy"}`;

  } else if (mode === "whatsapp_message") {
    prompt = `You are an Indian ecommerce WhatsApp marketing expert.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Online"}
Return ONLY valid JSON:
{"messages":[{"type":"Product Launch","text":"🎉 New Launch! [Product Name]\\n\\n✅ [Key benefit 1]\\n✅ [Key benefit 2]\\n✅ [Key benefit 3]\\n\\n💰 Price: INR XXX only!\\n🚀 Order now: [link]\\n\\nLimited stock!"},{"type":"Discount Offer","text":"🔥 FLASH SALE! 30% OFF\\n\\n[Product Name] at INR XXX (was INR XXX)\\n\\n⏰ Offer ends tonight!\\nOrder: [link]"},{"type":"Customer Testimonial","text":"⭐⭐⭐⭐⭐ Customer Review:\\n\\n\\"[Product] is amazing! [benefit]...\\" - Happy Customer\\n\\nGet yours: [link]"}]}`;

  } else if (mode === "instagram_captions") {
    prompt = `You are an Indian social media marketing expert.
Product: "${name}", Category: ${category||"Any"}
Return ONLY valid JSON:
{"captions":[{"type":"Product Showcase","text":"Elevate your [lifestyle] with [Product] ✨\\n\\n[Key benefit] that you deserve 💫\\n\\nShop now - link in bio! 🛒","hashtags":"#IndianSeller #MadeInIndia #OnlineShopping #[category] #[product]"},{"type":"Lifestyle","text":"Because you deserve the best 👑\\n\\n[Product] - [tagline]\\n\\nAvailable now 🔥","hashtags":"#Lifestyle #Quality #IndianBrand #Shopping"},{"type":"Offer","text":"🚨 LIMITED TIME OFFER 🚨\\n\\n[Product] at just INR XXX!\\n\\nDM to order 📩","hashtags":"#Sale #Offer #IndianShopping #Deal"}]}`;

  } else if (mode === "title_optimizer") {
    prompt = `You are an Indian ecommerce SEO title expert.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Return ONLY valid JSON:
{"titles":[{"platform":"${platform||"Amazon"}","title":"Optimized SEO title under 200 chars with main keyword, brand benefit, and specs","keywords":"main keywords used"},{"platform":"Flipkart","title":"Flipkart optimized title","keywords":"keywords"},{"platform":"Google SEO","title":"Meta title under 60 chars","keywords":"seo keywords"}],"tips":["tip1","tip2"]}`;

  } else if (mode === "listing_checker") {
    const listingContent = listing || extra?.listing || "No listing provided";
    prompt = `You are an Indian ecommerce listing optimization expert. Analyze this listing:
${listingContent}
Return ONLY valid JSON:
{"score":"72","issues":["Issue 1 with the listing","Issue 2","Issue 3"],"improvements":["Improvement 1","Improvement 2","Improvement 3"],"missing_keywords":["missing kw1","missing kw2","missing kw3"],"optimized_title":"Better title suggestion","analysis":"Overall listing analysis in 2 sentences"}`;

  } else if (mode === "review_reply") {
    const reviewText = review || extra?.review || "No review provided";
    prompt = `You are an Indian ecommerce customer service expert. Generate professional replies to this review:
Review: "${reviewText}"
Return ONLY valid JSON:
{"replies":[{"type":"Professional","reply":"Thank you for your feedback! [Address their concern professionally]. We're committed to your satisfaction. Please contact us at [support] for resolution."},{"type":"Empathetic","reply":"We sincerely apologize for your experience! [Show understanding]. We take this seriously and would love to make it right. Please DM us."},{"type":"Solution-focused","reply":"Thank you for bringing this to our attention! [Specific solution or action taken]. We'd like to offer [compensation/solution]. Contact us!"}]}`;

  } else if (mode === "ad_copy_generator") {
    prompt = `You are an Indian digital marketing expert.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Google/Meta"}
Return ONLY valid JSON:
{"copies":[{"platform":"Google Ads","copy":"Headline 1 (30 chars) | Headline 2 (30 chars) | Headline 3\\nDescription: Compelling 90 char description with CTA"},{"platform":"Facebook/Instagram","copy":"Hook line that stops scroll\\n\\nProblem your product solves\\n\\nSolution: [Product]\\n\\nCTA: Shop Now - INR XXX"},{"platform":"YouTube","copy":"First 5 seconds hook\\n\\nMain message\\n\\nCTA at end"}]}`;

  } else if (mode === "ads_platform") {
    prompt = `You are an Indian digital advertising expert for ${platform}.
Product: "${name}", Category: ${category||"Any"}
Return ONLY valid JSON:
{"account_setup":"Step 1: Create business account\\nStep 2: Set up payment\\nStep 3: Install pixel/tracking","targeting":"Detailed targeting strategy for Indian audience","ad_keywords":["keyword1","keyword2","keyword3","keyword4","keyword5"],"budget":"INR 300-500/day to start","script":"Video/image ad script or copy for ${platform}","titles":["Ad title 1","Ad title 2","Ad title 3"],"tips":["Platform-specific tip 1","tip 2"]}`;

  } else if (mode === "product_scorecard") {
    prompt = `You are an expert Indian ecommerce product analyst.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Score each metric from 0-100. Be realistic and honest.
Return ONLY valid JSON:
{"overall_score":"72","scores":[{"label":"Demand","score":"80"},{"label":"Competition","score":"55"},{"label":"Margin Potential","score":"70"},{"label":"Market Trend","score":"75"},{"label":"Platform Fit","score":"85"},{"label":"Scalability","score":"65"}],"verdict":"Honest 2-3 sentence product assessment with recommendation","strengths":["strength1","strength2","strength3"],"weaknesses":["weakness1","weakness2"]}`;

  } else if (mode === "keyword_research") {
    prompt = `You are an Indian ecommerce SEO and search keyword expert.
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}
Find the most valuable keywords Indian sellers should target.
Return ONLY valid JSON:
{"keywords":[{"keyword":"exact search term 1","volume":"High","competition":"Low"},{"keyword":"long tail keyword 2","volume":"Medium","competition":"Low"},{"keyword":"keyword 3","volume":"High","competition":"Medium"},{"keyword":"keyword 4","volume":"Medium","competition":"Low"},{"keyword":"keyword 5","volume":"Low","competition":"Low"},{"keyword":"keyword 6","volume":"High","competition":"High"},{"keyword":"keyword 7","volume":"Medium","competition":"Medium"},{"keyword":"keyword 8","volume":"Low","competition":"Low"}],"tip":"One actionable SEO tip for ${platform||"Amazon India"} sellers"}`;

  } else if (mode === "failure_predictor") {
    const sellingPrice = price || req.body.price || "unknown";
    prompt = `You are an expert Indian ecommerce market analyst. Analyze this product launch honestly:
Product: "${name}", Category: ${category||"Any"}, Platform: ${platform||"Amazon India"}, Price: INR ${sellingPrice}
Consider: market saturation, competition, margins, demand, return rates.
Return ONLY valid JSON:
{"success_chance":"72%","risk_level":"Medium","verdict":"Honest 2-3 sentence verdict about success probability and what seller must do","suggested_price":"INR 449-549","win_factors":["factor1","factor2","factor3"],"fail_risks":["risk1","risk2","risk3"],"action_plan":["action1","action2","action3","action4"],"competitor_count":"50-100 sellers","market_size":"Large","demand_level":"High","break_even":"Need 45 units per month to break even. At INR ${sellingPrice} with 30% margin, timeline is 2-3 months."}`;

  } else {
    prompt = `You are an Indian ecommerce expert. Analyze: "${name}" in ${category||"any category"} on ${platform||"Amazon India"}.
Return ONLY valid JSON:
{"overview":"Product analysis","keywords":["kw1","kw2","kw3"],"tips":["tip1","tip2","tip3"]}`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert Indian ecommerce analyst. Always return valid JSON only, no markdown, no explanation." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content.trim();
    const clean = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let data;
    try {
      data = JSON.parse(clean);
    } catch {
      // Try to extract JSON
      const match = clean.match(/\{[\s\S]*\}/);
      if (match) {
        data = JSON.parse(match[0]);
      } else {
        data = { overview: clean, error: "Parse error" };
      }
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Analysis failed", message: err.message });
  }
}
