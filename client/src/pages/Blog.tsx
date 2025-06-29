import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Blog() {
  const [showFullArticle, setShowFullArticle] = useState(false);
  
  const featuredPost = {
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
  };

  const tags = ["Net Zero", "Policy", "Economics", "Wind", "Solar", "Data", "Trends", "Nuclear"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            GridMix Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Insights, updates, and analysis from the UK energy system
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Article</h2>
              <Card className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        {featuredPost.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>{featuredPost.date}</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!showFullArticle ? (
                    <>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {featuredPost.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={() => setShowFullArticle(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Read Full Article →
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                          {featuredPost.content.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('##')) {
                              return (
                                <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                                  {paragraph.replace('## ', '')}
                                </h2>
                              );
                            }
                            if (paragraph.startsWith('###')) {
                              return (
                                <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                                  {paragraph.replace('### ', '')}
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
                              const items = paragraph.split('\n').filter(item => item.trim());
                              return (
                                <ul key={index} className="list-disc list-inside space-y-1 mb-4">
                                  {items.map((item, itemIndex) => (
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
                                    {content.map((item, itemIndex) => (
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
                            return (
                              <p key={index} className="mb-4">
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-wrap gap-2">
                          {featuredPost.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => setShowFullArticle(false)}
                        >
                          ← Back to Summary
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Coming Soon */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  More Articles Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're working on bringing you more insights about the UK's energy transition, 
                  data analysis techniques, and policy developments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Enter your email" 
                    className="flex-1"
                  />
                  <Button>
                    Subscribe for Updates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Stay Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Get notified when we publish new articles about UK energy trends and analysis.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Your email address" />
                  <Button className="w-full">
                    Sign up for updates
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tag Filters */}
            <Card className="border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Browse by Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
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
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Wind Share Today:</span>
                    <span className="font-medium text-gray-900 dark:text-white">~60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Renewable Share:</span>
                    <span className="font-medium text-gray-900 dark:text-white">~67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Grid Demand:</span>
                    <span className="font-medium text-gray-900 dark:text-white">29.8 GW</span>
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