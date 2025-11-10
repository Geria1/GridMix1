import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButtons } from "@/components/ShareButtons";
import { useState } from "react";

export default function Blog() {
  const [showFullArticle, setShowFullArticle] = useState<number | null>(null);
  
  const featuredPosts = [
    {
      title: "Net Zero 2050: Can the UK Stay the Course as U.S. Policy Shifts?",
      excerpt: "As the world races toward decarbonisation, the UK stands legally bound to hit net zero by 2050. But what happens if the U.S. turns its back on climate goals?",
      date: "June 29, 2025",
      tags: ["Policy", "Net Zero", "Economics"],
      readTime: "8 min read",
      content: `As the world races — or stumbles — toward decarbonisation, the UK stands out as a nation legally bound to hit net zero emissions by 2050. It's an ambitious goal, and one that has already reshaped British policy, energy infrastructure, and investment.

But what happens if the U.S. — the world's largest economy and one of its biggest polluters — turns its back on net zero?

I believe this question isn't just theoretical — it's existential. Here's what's at stake.

## What Is Net Zero — and Why 2050?

Net zero means the UK will emit no more greenhouse gases than it removes from the atmosphere by 2050. The target was written into UK law in 2019, making the country the first major economy to take that step.

Achieving it requires:
- A fully decarbonised electricity grid
- Electrification of transport and heating
- Investment in carbon capture, hydrogen, and energy storage
- Deep reductions in industrial and agricultural emissions

So far, the UK has made visible progress:
- Emissions down nearly 50% since 1990
- Wind power now the largest electricity source
- Coal totally eliminated from the grid

But the path ahead is steeper — and lonelier.

## The U.S. Is Backtracking. Why It Matters.

Across the Atlantic, political momentum around net zero is slipping:
- Climate legislation like the Inflation Reduction Act is under threat especially in the face of Trump's Big Beautiful Bill
- Fossil fuel subsidies and domestic drilling are back on the table
- Public messaging has shifted away from climate urgency

A U.S. backtrack matters because:
- The U.S. is still the world's second-largest emitter
- American industry influences global supply chains, costs, and capital
- If the U.S. slows down, others may follow — or hedge

So where does that leave the UK?

## What's the Economic Risk to the UK?

If Britain stays the course while the U.S. retreats, the UK could suffer short-term economic friction — particularly in global trade, energy prices, and domestic industry.

Let's break it down:

### 1. Competitive Pressure on Industry
UK manufacturers may pay more to decarbonise (e.g., steel, cement, chemicals) while U.S. firms cut costs by sticking with fossil fuels.

Impact:
- £billions in annual trade disadvantages if no protections (like carbon border taxes) are in place
- Job risk in exposed sectors

### 2. High Green Tech Costs
Without U.S. demand scaling up clean tech, the UK may pay more for early access to:
- Hydrogen infrastructure
- Grid-scale battery storage
- Carbon capture systems

Impact:
- 5–10% higher infrastructure costs through 2035
- Slower adoption of critical innovations

### 3. Capital & Investment Flow Risks
If U.S. investors pivot away from green finance, UK assets tied to net zero (e.g., green bonds, ESG funds) could see reduced global interest.

Impact:
- Higher cost of capital for green startups and infrastructure
- Pressure on the pound if green growth falters

### 4. Short-Term Energy Cost Burden
Consumers may face higher upfront costs (heat pumps, EVs, insulation) compared to U.S. households where fossil fuels remain artificially cheap.

## But the Long Game Favors the UK

Despite the turbulence, sticking to net zero is likely to benefit the UK in the long term. Here's why:

✔️ Green Jobs & Industrial Leadership
The UK is poised to become a global exporter of clean tech — especially in offshore wind, battery storage, and energy software. Up to 700,000 new jobs are expected in the green sector by 2035.

✔️ Energy Independence
The 2022 gas price spike showed how vulnerable fossil-reliant economies are. Net zero = resilience against global shocks.

✔️ Trade With Future-Facing Economies
The EU, Canada, Japan, and Australia are still advancing net zero. Aligning with them future-proofs trade access, investment, and supply chains.

✔️ Regulatory Power
Countries that lead the green transition will help set carbon border tax policies, digital emissions standards, and green finance rules. A net-zero UK can shape those conversations — and benefit from them.

## Final Thought: A Risk Worth Taking

If the U.S. retreats from climate goals, the UK will feel the heat — economically and politically. But giving up on net zero might expose the UK to even greater risks:
- Delayed climate impacts (flooding, heatwaves, food security)
- Missed economic transformation
- Weak global influence

Staying the course isn't just about climate—it's about leadership, security, and a future we can sustain.`
    },
    {
      title: "Carbon Intensity: Why It Matters and How to Use It for a Greener Future",
      excerpt: "Understanding carbon intensity is essential for anyone who uses electricity. Learn when electricity is cleanest and how to make smarter, greener energy decisions.",
      date: "June 29, 2025",
      tags: ["Carbon Intensity", "Data", "Technical"],
      readTime: "6 min read",
      content: `As the UK races toward its net-zero targets, understanding carbon intensity is no longer just a technical detail—it's essential knowledge for anyone who uses electricity. Whether you're a sustainability officer, an energy trader, or simply trying to reduce your carbon footprint at home, knowing when and how carbon intensity fluctuates helps you make smarter, greener decisions.

In this blog post, we'll explain what carbon intensity is, why it matters more than ever, and how it's calculated—so you can use energy with climate-conscious precision.

## What Is Carbon Intensity?

Carbon intensity refers to the amount of carbon dioxide (CO₂) emitted for every unit of electricity generated. It's measured in grams of CO₂ per kilowatt-hour (gCO₂/kWh).

Because the UK's electricity comes from a dynamic mix of sources—like wind, solar, gas, coal, and imports—carbon intensity isn't fixed. It varies hour by hour, depending on which sources are generating power at that moment.

## Why Carbon Intensity Matters

1. Smarter Energy Use
Using electricity when it's cleanest—typically when renewables dominate—means a lower personal or corporate carbon footprint.

2. Greener Operations
Businesses can integrate carbon intensity into sustainability strategies, scheduling energy-heavy tasks during low-carbon periods.

3. Informed Policy and Planning
Carbon intensity is a vital metric for tracking decarbonisation progress and making grid and infrastructure decisions.

4. Real-Time Climate Action
With tools like GridMix, users can make data-driven decisions to directly impact their emissions in real time.

## How Is Carbon Intensity Calculated?

### Step 1: Get the Generation Mix
Start with data showing how much electricity is being produced from each energy source at a specific time. This data is available from:
- GridMix (live data and visualisation)
- National Grid ESO
- Elexon

### Step 2: Apply Emission Factors
Each source of electricity has a known average emission factor:

| Source | Emission Factor (gCO₂/kWh) |
|--------|----------------------------|
| Coal | 937 |
| Gas | 394 |
| Biomass | 120 |
| Nuclear | 0 |
| Wind | 0 |
| Solar | 0 |
| Hydro | 0 |
| Imports | Varies |

Multiply each source's generation by its emission factor to get its total emissions.

### Step 3: Do the Maths
Add up the emissions, then divide by the total generation to find carbon intensity:

**Formula:**
Carbon Intensity = Total Emissions (gCO₂) ÷ Total Electricity (kWh)

### Example Calculation:

| Source | Generation (MWh) | Emission Factor | Emissions (kgCO₂) |
|--------|------------------|-----------------|-------------------|
| Gas | 1000 | 394 | 394,000 |
| Coal | 200 | 937 | 187,400 |
| Wind | 800 | 0 | 0 |

**Total Generation:** 2000 MWh = 2,000,000 kWh
**Total Emissions:** 581,400,000 gCO₂

**Carbon Intensity = 581,400,000 ÷ 2,000,000 = 290.7 gCO₂/kWh**

## How GridMix Helps You Track It

At GridMix, we automate all of this for you. Our platform delivers:
- Live and historical carbon intensity data
- Regional energy mix breakdowns
- Tools for tracking your energy-related emissions

This makes it easy to align your electricity use with low-carbon periods—without doing the maths yourself.

## Final Thoughts

In a time of climate urgency, understanding when electricity is clean and when it's carbon-heavy is one of the most impactful tools we have. Knowing the carbon intensity of the grid lets you act smarter, save emissions, and contribute to a more sustainable UK—minute by minute.`
    }
  ];

  const tags = ["Net Zero", "Policy", "Economics", "Carbon Intensity", "Wind", "Solar", "Data", "Technical"];

  const renderContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    const renderedElements: React.ReactNode[] = [];
    let skipNext = false;

    return paragraphs.map((paragraph: string, index: number) => {
      if (skipNext) {
        skipNext = false;
        return null;
      }
      if (paragraph.startsWith('##')) {
        return (
          <h2 key={index} className="blog-subheading text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('###')) {
        const title = paragraph.replace('### ', '');
        // Always render ### headers as regular subsection headers
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
            {title}
          </h3>
        );
      }
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={index} className="font-semibold text-gray-900 dark:text-white mb-2">
            {paragraph.replace(/\*\*/g, '')}
          </p>
        );
      }
      if (paragraph.includes('✔️')) {
        return (
          <div key={index} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
            <p className="font-semibold text-green-800 dark:text-green-200">
              {paragraph.replace('✔️ ', '')}
            </p>
          </div>
        );
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter((item: string) => item.trim());
        return (
          <ul key={index} className="list-disc list-inside space-y-1 mb-4">
            {items.map((item: string, itemIndex: number) => (
              <li key={itemIndex} className="text-gray-700 dark:text-gray-300">
                {item.replace('- ', '')}
              </li>
            ))}
          </ul>
        );
      }
      if (paragraph.includes('**Impact:**')) {
        const [header, ...content] = paragraph.split('\n');
        return (
          <div key={index} className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mb-4">
            <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              {header.replace(/\*\*/g, '')}
            </p>
            <ul className="list-disc list-inside space-y-1">
              {content.map((item: string, itemIndex: number) => (
                item.trim() && (
                  <li key={itemIndex} className="text-amber-700 dark:text-amber-300">
                    {item.replace('- ', '')}
                  </li>
                )
              ))}
            </ul>
          </div>
        );
      }
      if (paragraph.includes('|') && paragraph.includes('---')) {
        const lines = paragraph.split('\n').filter((line: string) => line.trim());
        const headers = lines[0].split('|').map((h: string) => h.trim()).filter((h: string) => h);
        const rows = lines.slice(2).map((line: string) => 
          line.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
        );
        return (
          <div key={index} className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {headers.map((header: string, hIndex: number) => (
                    <th key={hIndex} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: string[], rIndex: number) => (
                  <tr key={rIndex} className="border-b border-gray-200 dark:border-gray-700">
                    {row.map((cell: string, cIndex: number) => (
                      <td key={cIndex} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      return (
        <p key={index} className="mb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mesh-gradient">
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 dark:from-blue-900 dark:via-cyan-900 dark:to-emerald-900">
        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center space-y-6">
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 mb-4 scale-in">
              <span className="text-sm font-semibold text-white">
                ⚡ Energy Insights & Analysis
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 fade-in">
              GridMix Blog
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto slide-up">
              Decoding the UK's energy transition, one insight at a time
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Articles */}
            <div className="fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold gradient-text-energy">Featured Articles</h2>
                <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 px-4 py-1.5">
                  {featuredPosts.length} Articles
                </Badge>
              </div>

              <div className="space-y-8">
                {featuredPosts.map((post, postIndex) => (
                  <Card key={postIndex} className="bento-card hover:-translate-y-1 overflow-hidden">
                    {/* Article Header with Gradient */}
                    <div className="relative bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-emerald-600/10 dark:from-blue-600/20 dark:via-cyan-600/20 dark:to-emerald-600/20 p-8 border-b border-white/20 dark:border-gray-700/30">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
                      <div className="relative">
                        <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full">
                            <span className="text-gray-700 dark:text-gray-300">📅 {post.date}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full">
                            <span className="text-gray-700 dark:text-gray-300">⏱️ {post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      {showFullArticle !== postIndex ? (
                        <>
                          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag: string, tagIndex: number) => (
                              <Badge
                                key={tagIndex}
                                className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 border-0 px-4 py-1.5 text-sm font-medium hover:scale-105 transition-transform"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="space-y-6">
                            <ShareButtons
                              title={post.title}
                              description={post.excerpt}
                              className="py-6 border-t border-gray-200/50 dark:border-gray-700/50"
                            />

                            <Button
                              onClick={() => {
                                console.log('Expanding article:', postIndex);
                                setShowFullArticle(postIndex);
                              }}
                              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg py-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
                            >
                              Read Full Article →
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="prose prose-lg dark:prose-invert max-w-none">
                            <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                              {renderContent(post.content)}
                            </div>
                          </div>

                          <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50 space-y-6">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag: string, tagIndex: number) => (
                                <Badge
                                  key={tagIndex}
                                  className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 border-0 px-4 py-1.5 text-sm font-medium"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            <ShareButtons
                              title={post.title}
                              description={post.excerpt}
                            />

                            <Button
                              onClick={() => {
                                console.log('Collapsing article');
                                setShowFullArticle(null);
                              }}
                              className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/40 w-full md:w-auto text-lg py-4 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                            >
                              ← Back to Summary
                            </Button>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <NewsletterSignup
              title="More Articles Coming Soon"
              description="We're working on bringing you more insights about the UK's energy transition, data analysis techniques, and policy developments."
              source="blog-main"
              showName={true}
            />
          </div>

          {/* Modern Sidebar */}
          <div className="space-y-6 slide-up">
            {/* Newsletter Signup */}
            <div className="sticky top-24 space-y-6">
              <NewsletterSignup
                title="Stay Updated"
                description="Get notified when we publish new articles about UK energy trends and analysis."
                source="blog-sidebar"
                compact={true}
              />

              {/* Modern Tag Filters */}
              <Card className="bento-card">
                <CardHeader>
                  <CardTitle className="text-xl font-bold gradient-text-energy">
                    Browse Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        className="cursor-pointer bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30 hover:scale-110 hover:shadow-lg transition-all duration-300 px-4 py-2"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Modern Quick Stats */}
              <Card className="bento-card overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-xl font-bold gradient-text-energy">
                    ⚡ Live Grid Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 relative">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Wind Share</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">~20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Renewables</span>
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">~55%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Demand</span>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-400">42.0 GW</span>
                    </div>
                    <Button className="w-full btn-modern text-white mt-4">
                      View Live Dashboard →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}