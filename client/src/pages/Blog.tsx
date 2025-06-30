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

**Impact:**
- £billions in annual trade disadvantages if no protections (like carbon border taxes) are in place
- Job risk in exposed sectors

### 2. High Green Tech Costs
Without U.S. demand scaling up clean tech, the UK may pay more for early access to:
- Hydrogen infrastructure
- Grid-scale battery storage
- Carbon capture systems

**Impact:**
- 5–10% higher infrastructure costs through 2035
- Slower adoption of critical innovations

### 3. Capital & Investment Flow Risks
If U.S. investors pivot away from green finance, UK assets tied to net zero (e.g., green bonds, ESG funds) could see reduced global interest.

**Impact:**
- Higher cost of capital for green startups and infrastructure
- Pressure on the pound if green growth falters

### 4. Short-Term Energy Cost Burden
Consumers may face higher upfront costs (heat pumps, EVs, insulation) compared to U.S. households where fossil fuels remain artificially cheap.

## But the Long Game Favors the UK

Despite the turbulence, sticking to net zero is likely to benefit the UK in the long term. Here's why:

**✔️ Green Jobs & Industrial Leadership**
The UK is poised to become a global exporter of clean tech — especially in offshore wind, battery storage, and energy software. Up to 700,000 new jobs are expected in the green sector by 2035.

**✔️ Energy Independence**
The 2022 gas price spike showed how vulnerable fossil-reliant economies are. Net zero = resilience against global shocks.

**✔️ Trade With Future-Facing Economies**
The EU, Canada, Japan, and Australia are still advancing net zero. Aligning with them future-proofs trade access, investment, and supply chains.

**✔️ Regulatory Power**
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

### #1. Smarter Energy Use Using electricity when it's cleanest—typically when renewables dominate—means a lower personal or corporate carbon footprint.

### #2. Greener Operations Businesses can integrate carbon intensity into sustainability strategies, scheduling energy-heavy tasks during low-carbon periods.

### #3. Informed Policy and Planning Carbon intensity is a vital metric for tracking decarbonisation progress and making grid and infrastructure decisions.

### #4. Real-Time Climate Action With tools like GridMix, users can make data-driven decisions to directly impact their emissions in real time.

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
        // Check if it's a numbered subsection or step
        if (title.match(/^#\d+\./) || title.match(/^Step \d+:/)) {
          // Get the next paragraph content if it exists
          const nextParagraph = paragraphs[index + 1];
          const hasNextContent = nextParagraph && !nextParagraph.startsWith('#') && !nextParagraph.includes('|') && !nextParagraph.startsWith('**');
          
          if (hasNextContent) {
            skipNext = true;
          }
          
          return (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6 mb-4">
              <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                {title}
              </h3>
              {hasNextContent && (
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                  {nextParagraph}
                </p>
              )}
            </div>
          );
        }
        return (
          <h3 key={index} className="blog-subheading text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
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
                      <td key={cIndex} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300">
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
        <p key={index} className="blog-body-text mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="blog-subheading text-4xl font-bold text-gray-900 dark:text-white mb-2">
            GridMix Blog
          </h1>
          <p className="blog-body-text text-xl text-gray-600 dark:text-gray-300">
            UK energy decoded
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Articles */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
              <div className="space-y-6">
                {featuredPosts.map((post, postIndex) => (
                  <Card key={postIndex} className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {post.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {showFullArticle !== postIndex ? (
                        <>
                          <p className="blog-body-text text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="space-y-4">
                            <ShareButtons 
                              title={post.title}
                              description={post.excerpt}
                              className="py-3 border-t border-gray-200 dark:border-gray-700"
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag: string, tagIndex: number) => (
                                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <Button 
                                onClick={() => setShowFullArticle(postIndex)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                Read Full Article →
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="prose prose-lg dark:prose-invert max-w-none">
                            <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                              {renderContent(post.content)}
                            </div>
                          </div>
                          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                            <ShareButtons 
                              title={post.title}
                              description={post.excerpt}
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag: string, tagIndex: number) => (
                                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <Button 
                                variant="outline"
                                onClick={() => setShowFullArticle(null)}
                              >
                                ← Back to Summary
                              </Button>
                            </div>
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <NewsletterSignup
              title="Stay Updated"
              description="Get notified when we publish new articles about UK energy trends and analysis."
              source="blog-sidebar"
              compact={true}
            />

            {/* Tag Filters */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="blog-subheading text-lg font-semibold text-gray-900 dark:text-white">
                  Browse by Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Energy Stats */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="blog-subheading text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="blog-body-text text-gray-600 dark:text-gray-300">Wind Share Today:</span>
                    <span className="blog-body-text font-medium text-gray-900 dark:text-white">~20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="blog-body-text text-gray-600 dark:text-gray-300">Renewable Share:</span>
                    <span className="blog-body-text font-medium text-gray-900 dark:text-white">~55%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="blog-body-text text-gray-600 dark:text-gray-300">Grid Demand:</span>
                    <span className="blog-body-text font-medium text-gray-900 dark:text-white">42.0 GW</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <Button variant="ghost" size="sm" className="w-full text-blue-600 dark:text-blue-400">
                      View Live Dashboard →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}